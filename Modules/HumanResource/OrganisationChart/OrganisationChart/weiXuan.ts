import OrgChart from "../../../wwwroot/Scripts/Bom/jquery.orgchart.js"

import { Criteria, Decorators, FilterOperators, LookupEditor, TemplatedDialog } from "@serenity-is/corelib";
import { MasterRecordService } from "@/ServerTypes/Material/MasterRecordService";
import * as Q from "@serenity-is/corelib/q"
import { BomMasterService } from "@/ServerTypes/BOM/BomMasterService";
import { BomRelationshipService } from "@/ServerTypes/BOM/BomRelationshipService";
import { BomSelectionDialog } from "@/BOM/BomStructure/BomSelection";
import { ProcessDefineDialog } from "@/BOM/BomStructure/ProcessDefine";
import { ProcessRoutingRelationshipService } from "@/ServerTypes/BOM/ProcessRoutingRelationshipService";
import { BomMasterRow } from "@/ServerTypes/BOM/BomMasterRow";
import { MasterRecordRow } from "@/ServerTypes/Material/MasterRecordRow";
import { Authorization } from "@serenity-is/corelib/q";
import { BomPermissionKeys } from "@/ServerTypes/Permissions/BomPermissionKeys";
import { RetrieveResponse } from "@serenity-is/corelib/dist/q";
import { CitiesRow } from "@/ServerTypes/Master/CitiesRow";
import { BomMasterDialog } from "@/BOM/BomMaster/BomMasterDialog";
import { BomMasterLookupEditor } from "@/BOM/BomMaster/BomMasterLookupEditor";
import { uuid } from "@/Common/Function/General.js";



export class Bom {
    private static parentMaterialSelect: LookupEditor;
    private static materialSelect: LookupEditor;
    private static bomSelect: LookupEditor;
    private static orgChart;
    private static bomId;
    private static tempData;
    private static firstLayer;
    private static currencyCode = "";
    private static chosenBomId
    protected deletedNode = []
    protected changedNode = []
    protected modifyPermission = ""
    protected approvePermission = ""

    constructor() {
        let th = this
        if (!Authorization.hasPermission(BomPermissionKeys.Modify)) {
            th.modifyPermission = "disabled"
        }
        if (!Authorization.hasPermission(BomPermissionKeys.Approve)) {
            th.approvePermission = "disabled"
        }
        $(".save-button").addClass(th.modifyPermission)
        document.addEventListener("dragover", (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "copy"
        });
        function handleContentRemoval(mutationsList, observer) {

            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.target.className === 'node ' && mutation.addedNodes.length > 0) {
                    let hierarchy = Bom.orgChart.getHierarchy();
                    const rootId = hierarchy.id;
                    Bom.tempData = Bom.generateCostStructure(hierarchy, rootId);
                    Bom.firstLayer = 0

                    th.calculateCosting(rootId, Bom.tempData)
                    $(`#${rootId} .price-holder`).html(Bom.firstLayer.toString())

                    for (let i = 0; i < Bom.tempData.length; i++) {
                        let nodeId = Bom.tempData[i][2]
                        let total = Bom.tempData[i][4] + Bom.tempData[i][5] + Bom.tempData[i][6]
                        $(`#${nodeId} .price-holder`).html(total.toString())

                    }

                }

            }
        }
        let target = document.getElementById("bom-main")
        const config = { attributes: true, childList: true, subtree: true };
        const observer = new MutationObserver(handleContentRemoval);
        observer.observe(target, config);

        $("#save-row").on('click', '.save-button', function (e) {

            if ($(e.target).is(this) || $.contains(this, e.target)) {

                if (Bom.orgChart !== undefined) {
                    let materialQuantity = $("input[name='materialQuantity']").filter(function () {
                        return $.trim($(this).val()).length == 0
                    }).length == 0;
                    if (materialQuantity == false) {
                        Q.notifyError("Please key in the quantity for each item.")
                    }
                    else {
                        let hierarchy = Bom.orgChart.getHierarchy();
                        const rootId = hierarchy.id;

                        let materialId = $(`#${rootId} input[name='materialid']`).val()
                        let qty = $(`#${rootId} input[name='materialQuantity']`).val()


                        BomMasterService.List({
                            Criteria: Criteria.and(Criteria("MaterialID").eq(materialId), Criteria("IsActive").eq(1))
                        }, async response => {
                            let length = response.Entities.length
                            if (length == 0) {
                                let dlg = new BomSelectionDialog(1, materialId)
                                dlg.element.on('dialogclose', function (data) {
                                    let revision = dlg.revision
                                    let saveState = dlg.saveState
                                    if (saveState == true) {

                                        BomMasterService.Create({
                                            Entity: {
                                                MaterialId: materialId,
                                                Quantity: qty,
                                                Revision: revision
                                            }
                                        }, response => {
                                            let bomId = response.EntityId
                                            Bom.bomId = bomId
                                            if (Authorization.hasPermission(BomPermissionKeys.Approve)) {
                                                $(".approve-btn").removeClass("disabled")
                                            }


                                            let result = Bom.generatePaths(hierarchy, rootId);
                                            for (let i = 0; i < result.length; i++) {

                                                let item = result[i]
                                                let parentId = item[1]
                                                let parentMaterialId = $(`#${parentId} input[name='materialid']`).val()
                                                let childId = item[2]

                                                let childMaterialId = $(`#${childId} input[name='materialid']`).val()
                                                let quantity = item[3]
                                                let generateWo = false
                                                let generateWoElement = $(`#productionOrder-${childId}`)
                                                if (generateWoElement.hasClass("checked")) {
                                                    generateWo = true
                                                }

                                                let generatePr = false
                                                let generatePrElement = $(`#purchaseRequisition-${childId}`)
                                                if (generatePrElement.hasClass("checked")) {
                                                    generatePr = true
                                                }

                                                BomRelationshipService.Create({
                                                    Entity: {
                                                        BomId: bomId,
                                                        MainUniqueId: rootId,
                                                        ParentUniqueId: parentId,
                                                        ChildUniqueId: childId,
                                                        ParentMaterialId: parentMaterialId,
                                                        ChildMaterialId: childMaterialId,
                                                        Quantity: quantity,
                                                        GenerateProductionOrder: generateWo,
                                                        GeneratePurchaseRequisition: generatePr
                                                    }
                                                }, async response1 => {
                                                    let createdId = response1.EntityId
                                                    let child = document.getElementById(childId)
                                                    let jsonData = JSON.parse(child.dataset.routing)

                                                    const promise5 = jsonData.map(async (item, i) => {
                                                        try {

                                                            let parentUniqueId = item["ParentUniqueID"]
                                                            let childUniqueId = item["ChildUniqueID"]
                                                            let parentProcessId = item["ParentProcessID"]
                                                            let childProcessId = item["ChildProcessID"]
                                                            let pos_x = item["PosX"]
                                                            let pos_y = item["PosY"]
                                                            // ProcessRoutingRelationshipService.Create({
                                                            //     Entity:{
                                                            //         BomRelationshipId:createdId,
                                                            //         ParentUniqueId:parentUniqueId,
                                                            //         ChildUniqueId: childUniqueId,
                                                            //         ParentProcessId: parentProcessId,
                                                            //         ChildProcessId: childProcessId,
                                                            //         PosX: pos_x,
                                                            //         PosY: pos_y
                                                            //     }
                                                            // })
                                                        } catch (e) {
                                                            console.log(e)
                                                        }
                                                    })
                                                    await Promise.all(promise5)
                                                })
                                            }

                                        }).then(function () {
                                            Q.notifySuccess("The BOM structure has been saved.")
                                        })
                                    }

                                })
                                dlg.dialogOpen()

                            } else {
                                let itemStructure = Bom.generatePaths(hierarchy, rootId);
                                itemStructure = itemStructure.map(subArray => [Bom.bomSelect.value, ...subArray]);
                                let updatable = false
                                if (Bom.bomSelect.value != "") {
                                    await $.ajax({
                                        type: "POST",
                                        url: '/BomStructureUpdatable',
                                        data: {


                                            arr: JSON.stringify(itemStructure)
                                        },
                                        success(data: any, textStatus: string, jqXHR: JQueryXHR): any {
                                            if (data === 0) {
                                                updatable = false
                                            }
                                            else {
                                                updatable = true
                                            }
                                        }
                                    })
                                }

                                if (updatable) {
                                    Q.confirm("There is a BOM structure record for the parent material. Create a new BOM for the material or update the existing BOM.", () => {
                                        let dlg = new BomSelectionDialog(1, materialId)
                                        dlg.element.on('dialogclose', function (data) {
                                            let revision = dlg.revision
                                            let saveState = dlg.saveState
                                            let validFrom = dlg.validFrom
                                            if (saveState == true) {
                                                BomMasterService.Create({
                                                    Entity: {
                                                        MaterialId: materialId,
                                                        Quantity: qty,
                                                        Revision: revision,
                                                        ValidFrom: validFrom
                                                    }
                                                }, response => {
                                                    let bomId = response.EntityId

                                                    Bom.bomId = bomId
                                                    if (Authorization.hasPermission(BomPermissionKeys.Approve)) {
                                                        $(".approve-btn").removeClass("disabled")
                                                    }

                                                    let result = Bom.generatePaths(hierarchy, rootId);
                                                    for (let i = 0; i < result.length; i++) {

                                                        let item = result[i]
                                                        let parentId = item[1]
                                                        let parentMaterialId = $(`#${parentId} input[name='materialid']`).val()
                                                        let childId = item[2]

                                                        let childMaterialId = $(`#${childId} input[name='materialid']`).val()
                                                        let quantity = item[3]
                                                        let generateWo = false
                                                        let generateWoElement = $(`#productionOrder-${childId}`)
                                                        if (generateWoElement.hasClass("checked")) {
                                                            generateWo = true
                                                        }
                                                        let generatePr = false
                                                        let generatePrElement = $(`#purchaseRequisition-${childId}`)
                                                        if (generatePrElement.hasClass("checked")) {
                                                            generatePr = true
                                                        }
                                                        BomRelationshipService.Create({
                                                            Entity: {
                                                                BomId: bomId,
                                                                MainUniqueId: rootId,
                                                                ParentUniqueId: parentId,
                                                                ChildUniqueId: childId,
                                                                ParentMaterialId: parentMaterialId,
                                                                ChildMaterialId: childMaterialId,
                                                                Quantity: quantity,
                                                                GenerateProductionOrder: generateWo,
                                                                GeneratePurchaseRequisition: generatePr
                                                            }
                                                        }, async response1 => {
                                                            let createdId = response1.EntityId
                                                            let child = document.getElementById(childId)
                                                            let jsonData = JSON.parse(child.dataset.routing)
                                                            // const promise5 = jsonData.map(async (item,i)=>{
                                                            //     try{
                                                            //
                                                            //         let parentUniqueId = item["ParentUniqueID"]
                                                            //         let childUniqueId = item["ChildUniqueID"]
                                                            //         let parentProcessId = item["ParentProcessID"]
                                                            //         let childProcessId = item["ChildProcessID"]
                                                            //         let pos_x = item["PosX"]
                                                            //         let pos_y = item["PosY"]
                                                            //         ProcessRoutingRelationshipService.Create({
                                                            //             Entity:{
                                                            //                 BomRelationshipId:createdId,
                                                            //                 ParentUniqueId:parentUniqueId,
                                                            //                 ChildUniqueId: childUniqueId,
                                                            //                 ParentProcessId: parentProcessId,
                                                            //                 ChildProcessId: childProcessId,
                                                            //                 PosX: pos_x,
                                                            //                 PosY: pos_y
                                                            //             }
                                                            //         })
                                                            //     }
                                                            //     catch(e){
                                                            //         console.log(e)
                                                            //     }
                                                            // })
                                                            // await Promise.all(promise5)
                                                        })
                                                    }

                                                }).then(function () {
                                                    Q.notifySuccess("The BOM structure has been saved.")
                                                })
                                            }
                                        })
                                        dlg.dialogOpen()

                                    }, {
                                        yesButton: "Create",
                                        noButton: "Update",
                                        onNo: async function () {
                                            let itemStructure = Bom.generatePaths(hierarchy, rootId);
                                            itemStructure = itemStructure.map(subArray => [Bom.bomSelect.value, ...subArray]);
                                            await $.ajax({
                                                type: "POST",
                                                url: '/BomUpdate',
                                                data: {


                                                    arr: JSON.stringify(itemStructure)
                                                },
                                                success(data: any, textStatus: string, jqXHR: JQueryXHR): any {
                                                    if (data === 0) {
                                                        Q.notifyWarning("There is no change in BOM structure.")
                                                    } else {
                                                        Q.notifySuccess("The new BOM structure has been saved.")
                                                    }
                                                }
                                            })
                                            //let dlg = new BomSelectionDialog(1, materialId)
                                            // dlg.element.on('dialogclose', function (data) {
                                            //     let revision = dlg.revision
                                            //     let saveState = dlg.saveState
                                            //     let validFrom = dlg.validFrom
                                            //     if (saveState == true) {
                                            //         BomMasterService.Create({
                                            //             Entity: {
                                            //                 MaterialId: materialId,
                                            //                 Quantity: qty,
                                            //                 Revision: revision,
                                            //                 ValidFrom: validFrom
                                            //             }
                                            //         }, response => {
                                            //             let bomId = response.EntityId
                                            //
                                            //             let result = Bom.generatePaths(hierarchy, rootId);
                                            //             for (let i = 0; i < result.length; i++) {
                                            //
                                            //                 let item = result[i]
                                            //                 let parentId = item[1]
                                            //                 let parentMaterialId = $(`#${parentId} input[name='materialid']`).val()
                                            //                 let childId = item[2]
                                            //
                                            //                 let childMaterialId = $(`#${childId} input[name='materialid']`).val()
                                            //                 let quantity = item[3]
                                            //                 let generateWo = false
                                            //                 let generateWoElement = $(`#productionOrder-${childId}`)
                                            //                 if (generateWoElement.hasClass("checked")) {
                                            //                     generateWo = true
                                            //                 }
                                            //                 let generatePr = false
                                            //                 let generatePrElement = $(`#purchaseRequisition-${childId}`)
                                            //                 if (generatePrElement.hasClass("checked")) {
                                            //                     generatePr = true
                                            //                 }
                                            //                 BomRelationshipService.Create({
                                            //                     Entity: {
                                            //                         BomId: bomId,
                                            //                         MainUniqueId: rootId,
                                            //                         ParentUniqueId: parentId,
                                            //                         ChildUniqueId: childId,
                                            //                         ParentMaterialId: parentMaterialId,
                                            //                         ChildMaterialId: childMaterialId,
                                            //                         Quantity: quantity,
                                            //                         GenerateProductionOrder: generateWo,
                                            //                         GeneratePurchaseRequisition: generatePr
                                            //                     }
                                            //                 }, async response1 => {
                                            //                     let createdId = response1.EntityId
                                            //                     let child = document.getElementById(childId)
                                            //                     let jsonData = JSON.parse(child.dataset.routing)
                                            //                     // const promise5 = jsonData.map(async (item,i)=>{
                                            //                     //     try{
                                            //                     //
                                            //                     //         let parentUniqueId = item["ParentUniqueID"]
                                            //                     //         let childUniqueId = item["ChildUniqueID"]
                                            //                     //         let parentProcessId = item["ParentProcessID"]
                                            //                     //         let childProcessId = item["ChildProcessID"]
                                            //                     //         let pos_x = item["PosX"]
                                            //                     //         let pos_y = item["PosY"]
                                            //                     //         ProcessRoutingRelationshipService.Create({
                                            //                     //             Entity:{
                                            //                     //                 BomRelationshipId:createdId,
                                            //                     //                 ParentUniqueId:parentUniqueId,
                                            //                     //                 ChildUniqueId: childUniqueId,
                                            //                     //                 ParentProcessId: parentProcessId,
                                            //                     //                 ChildProcessId: childProcessId,
                                            //                     //                 PosX: pos_x,
                                            //                     //                 PosY: pos_y
                                            //                     //             }
                                            //                     //         })
                                            //                     //     }
                                            //                     //     catch(e){
                                            //                     //         console.log(e)
                                            //                     //     }
                                            //                     // })
                                            //                     // await Promise.all(promise5)
                                            //                 })
                                            //             }
                                            //
                                            //         }).then(function () {
                                            //             Q.notifySuccess("The BOM structure has been saved.")
                                            //         })
                                            //     }
                                            // })
                                            //dlg.dialogOpen()
                                            // dlg.element.on('dialogclose',function(data){
                                            //     let bomId = dlg.bomId
                                            //     let saveState = dlg.saveState
                                            //    
                                            //     if(saveState==true){
                                            //         let id = []
                                            //         BomRelationshipService.List({
                                            //             Criteria:Criteria.and(Criteria("BomID").eq(bomId),Criteria("IsActive").eq(1))
                                            //         },response1 => {
                                            //             response1.Entities.forEach(data=>{
                                            //                 id.push(data.Id)
                                            //             })
                                            //         }).then(async function(){
                                            //            
                                            //            
                                            //             const promises = id.map(async (tableId, i) => {
                                            //                 try {
                                            //                     BomRelationshipService.Delete({
                                            //                         EntityId:tableId
                                            //                     })
                                            //                 }
                                            //                 catch (error) {
                                            //                     console.error("Error occured when modifying BOM structure.", error);
                                            //                 }
                                            //             })
                                            //             await Promise.all(promises)
                                            //             const routingDeleteId = []
                                            //             // const promise3 = id.map(async (tableId, i) => {
                                            //             //     try {
                                            //             //         ProcessRoutingRelationshipService.List({
                                            //             //             Criteria:Criteria.and(Criteria("BomRelationshipID").eq(tableId),Criteria("IsActive").eq(1))
                                            //             //         },response1 => {
                                            //             //             response1.Entities.forEach(data=>{
                                            //             //                 routingDeleteId.push(data.Id)
                                            //             //             })
                                            //             //         })
                                            //             //     }
                                            //             //     catch (error) {
                                            //             //         console.error("Error occured when delete process routing.", error);
                                            //             //     }
                                            //             // })
                                            //             // await Promise.all(promise3)
                                            //             // const promise4 = routingDeleteId.map(async (tableId, i) => {
                                            //             //     try {
                                            //             //         ProcessRoutingRelationshipService.Delete({
                                            //             //             EntityId:tableId
                                            //             //         })
                                            //             //     }
                                            //             //     catch (error) {
                                            //             //         console.error("Error occured when delete process routing.", error);
                                            //             //     }
                                            //             // })
                                            //             // await Promise.all(promise4)
                                            //             let result = Bom.generatePaths(hierarchy,rootId);
                                            //             const promises2 = result.map(async (item,i)=>{
                                            //                 let parentId = item[1]
                                            //                 let parentMaterialId = $(`#${parentId} input[name='materialid']`).val()
                                            //                 let childId = item[2]
                                            //
                                            //                 let childMaterialId = $(`#${childId} input[name='materialid']`).val()
                                            //                 let quantity = item[3]
                                            //                 let generateWo = false
                                            //                 let generateWoElement = $(`#productionOrder-${childId}`)
                                            //                 if(generateWoElement.hasClass("checked")){
                                            //                     generateWo = true
                                            //                 }
                                            //                 BomRelationshipService.Create({
                                            //                     Entity:{
                                            //                         BomId:bomId,
                                            //                         MainUniqueId:rootId,
                                            //                         ParentUniqueId:parentId,
                                            //                         ChildUniqueId:childId,
                                            //                         ParentMaterialId:parentMaterialId,
                                            //                         ChildMaterialId:childMaterialId,
                                            //                         Quantity:quantity,
                                            //                         GenerateProductionOrder:generateWo
                                            //                     }
                                            //                 },async response1 => {
                                            //                     let createdId = response1.EntityId
                                            //                     let child = document.getElementById(childId)
                                            //                     let jsonData = JSON.parse(child.dataset.routing)
                                            //                     // const promise5 = jsonData.map(async (item,i)=>{
                                            //                     //     try{
                                            //                     //        
                                            //                     //         let parentUniqueId = item["ParentUniqueID"]
                                            //                     //         let childUniqueId = item["ChildUniqueID"]
                                            //                     //         let parentProcessId = item["ParentProcessID"]
                                            //                     //         let childProcessId = item["ChildProcessID"]
                                            //                     //         let pos_x = item["PosX"]
                                            //                     //         let pos_y = item["PosY"]
                                            //                     //         ProcessRoutingRelationshipService.Create({
                                            //                     //             Entity:{
                                            //                     //                 BomRelationshipId:createdId,
                                            //                     //                 ParentUniqueId:parentUniqueId,
                                            //                     //                 ChildUniqueId: childUniqueId,
                                            //                     //                 ParentProcessId: parentProcessId,
                                            //                     //                 ChildProcessId: childProcessId,
                                            //                     //                 PosX: pos_x,
                                            //                     //                 PosY: pos_y
                                            //                     //             }
                                            //                     //         })
                                            //                     //     }
                                            //                     //     catch(e){
                                            //                     //         console.log(e)
                                            //                     //     }
                                            //                     // })
                                            //                     // await Promise.all(promise5)
                                            //                    
                                            //                 })
                                            //             })
                                            //             await Promise.all(promises2)
                                            //             // for(let i =0;i<result.length;i++){
                                            //             //
                                            //             //     let item = result[i]
                                            //             //     let parentId = item[1]
                                            //             //     let parentMaterialId = $(`#${parentId} input[name='materialid']`).val()
                                            //             //     let childId = item[2]
                                            //             //
                                            //             //     let childMaterialId = $(`#${childId} input[name='materialid']`).val()
                                            //             //     let quantity = item[3]
                                            //             //     BomRelationshipService.Create({
                                            //             //         Entity:{
                                            //             //             BomId:bomId,
                                            //             //             MainUniqueId:rootId,
                                            //             //             ParentUniqueId:parentId,
                                            //             //             ChildUniqueId:childId,
                                            //             //             ParentMaterialId:parentMaterialId,
                                            //             //             ChildMaterialId:childMaterialId,
                                            //             //             Quantity:quantity
                                            //             //         }
                                            //             //     })
                                            //             // }
                                            //             Q.notifySuccess("The BOM structure has been saved.")
                                            //         })
                                            //     
                                            //     }
                                            // })
                                            // dlg.dialogOpen()
                                        }
                                    })
                                }
                                else {
                                    Q.confirm("There is a BOM structure record for the parent material. Create a new BOM for the material?", () => {
                                        let dlg = new BomSelectionDialog(1, materialId)
                                        dlg.element.on('dialogclose', function (data) {
                                            let revision = dlg.revision
                                            let saveState = dlg.saveState
                                            let validFrom = dlg.validFrom
                                            if (saveState == true) {
                                                BomMasterService.Create({
                                                    Entity: {
                                                        MaterialId: materialId,
                                                        Quantity: qty,
                                                        Revision: revision,
                                                        ValidFrom: validFrom
                                                    }
                                                }, response => {
                                                    let bomId = response.EntityId
                                                    Bom.bomId = bomId
                                                    if (Authorization.hasPermission(BomPermissionKeys.Approve)) {
                                                        $(".approve-btn").removeClass("disabled")
                                                    }

                                                    let result = Bom.generatePaths(hierarchy, rootId);
                                                    for (let i = 0; i < result.length; i++) {

                                                        let item = result[i]
                                                        let parentId = item[1]
                                                        let parentMaterialId = $(`#${parentId} input[name='materialid']`).val()
                                                        let childId = item[2]

                                                        let childMaterialId = $(`#${childId} input[name='materialid']`).val()
                                                        let quantity = item[3]
                                                        let generateWo = false
                                                        let generateWoElement = $(`#productionOrder-${childId}`)
                                                        if (generateWoElement.hasClass("checked")) {
                                                            generateWo = true
                                                        }
                                                        let generatePr = false
                                                        let generatePrElement = $(`#purchaseRequisition-${childId}`)
                                                        if (generatePrElement.hasClass("checked")) {
                                                            generatePr = true
                                                        }
                                                        BomRelationshipService.Create({
                                                            Entity: {
                                                                BomId: bomId,
                                                                MainUniqueId: rootId,
                                                                ParentUniqueId: parentId,
                                                                ChildUniqueId: childId,
                                                                ParentMaterialId: parentMaterialId,
                                                                ChildMaterialId: childMaterialId,
                                                                Quantity: quantity,
                                                                GenerateProductionOrder: generateWo,
                                                                GeneratePurchaseRequisition: generatePr
                                                            }
                                                        }, async response1 => {
                                                            let createdId = response1.EntityId
                                                            let child = document.getElementById(childId)
                                                            let jsonData = JSON.parse(child.dataset.routing)
                                                            // const promise5 = jsonData.map(async (item,i)=>{
                                                            //     try{
                                                            //
                                                            //         let parentUniqueId = item["ParentUniqueID"]
                                                            //         let childUniqueId = item["ChildUniqueID"]
                                                            //         let parentProcessId = item["ParentProcessID"]
                                                            //         let childProcessId = item["ChildProcessID"]
                                                            //         let pos_x = item["PosX"]
                                                            //         let pos_y = item["PosY"]
                                                            //         ProcessRoutingRelationshipService.Create({
                                                            //             Entity:{
                                                            //                 BomRelationshipId:createdId,
                                                            //                 ParentUniqueId:parentUniqueId,
                                                            //                 ChildUniqueId: childUniqueId,
                                                            //                 ParentProcessId: parentProcessId,
                                                            //                 ChildProcessId: childProcessId,
                                                            //                 PosX: pos_x,
                                                            //                 PosY: pos_y
                                                            //             }
                                                            //         })
                                                            //     }
                                                            //     catch(e){
                                                            //         console.log(e)
                                                            //     }
                                                            // })
                                                            // await Promise.all(promise5)
                                                        })
                                                    }

                                                }).then(function () {
                                                    Q.notifySuccess("The BOM structure has been saved.")
                                                })
                                            }
                                        })
                                        dlg.dialogOpen()

                                    }, {
                                        yesButton: "Create",
                                        cancelButton: "Cancel",
                                        noButton: false
                                    })
                                }
                            }
                        })





                    }


                }
            }
        })

    }
    public calculateCosting(nodeId, tree) {
        const children = tree.filter((item) => item[1] === nodeId)
        if (children.length == 0) {
            let nodeIndex = Bom.tempData.findIndex((item) => item[2] === nodeId);
            if (nodeIndex != -1) {
                Bom.tempData[nodeIndex][6] = 0;
            }

            return 0
        }
        let totalPrice = 0;
        for (const child of children) {
            const childId = child[2];
            const childPrice = Number(child[4]);
            const childRouting = Number(child[5])
            const childTotalPrice = this.calculateCosting(childId, tree);
            totalPrice += childPrice + childTotalPrice + childRouting;
        }
        const nodeIndex = Bom.tempData.findIndex((item) => item[2] === nodeId);
        if (nodeIndex == -1) {
            Bom.firstLayer = totalPrice
        }
        else {
            Bom.tempData[nodeIndex][6] = totalPrice;
        }

        return totalPrice;
    }
    private static generateCostStructure(json, rootId, parent = rootId) {
        const paths = [];
        if (json.id) {

            if (rootId == parent && rootId == json.id) {

            }
            else if (rootId == parent && rootId != json.id) {
                let quantity = Number($(`#${json.id} input[name='materialQuantity']`).val())
                let price = Number($(`#${json.id} input[name='materialActualPrice']`).val())
                let routing = $(`#${json.id} input[name='materialRouting']`).val()
                let routingValue = routing === 'undefined' ? 0 : Number(routing)
                const path = [rootId, rootId, json.id, quantity, price, routingValue];

                paths.push(path);
            }
            else {
                let quantity = Number($(`#${json.id} input[name='materialQuantity']`).val())
                let price = Number($(`#${json.id} input[name='materialActualPrice']`).val())
                let routing = $(`#${json.id} input[name='materialRouting']`).val()
                let routingValue = routing === 'undefined' ? 0 : Number(routing)
                const path = [rootId, parent, json.id, quantity, price, routingValue];

                paths.push(path);
            }
            parent = json.id;
        }

        if (json.children && json.children.length > 0) {
            for (const child of json.children) {
                paths.push(...this.generateCostStructure(child, rootId, parent));
                parent = json.id; // Update the parent after processing children
            }
        }

        return paths;
    }
    public async lookup() {

        let material = $("#Material")
        let parentMaterial = $("#ParentMaterial")
        let bom = $("#Bom")
        let th = this

        Bom.materialSelect = new LookupEditor(material, {
            lookupKey: MasterRecordRow.lookupKey,
            filterField: "IsActive",
            filterValue: "1"

        });
        Bom.parentMaterialSelect = new LookupEditor(parentMaterial, {
            lookupKey: MasterRecordRow.lookupKey,
            filterField: "IsActive",
            filterValue: "1"

        });
        Bom.bomSelect = new BomMasterLookupEditor(bom, {
            lookupKey: BomMasterRow.lookupKey,
            filterField: "IsActive",
            filterValue: "1",


        });

        material.addClass(th.modifyPermission)
        parentMaterial.addClass(th.modifyPermission)
        let fake = [1]

        Bom.materialSelect.element.on("click", function (e) {
            if (Bom.materialSelect.value != "") {
                let materialId = Bom.materialSelect.value


                MasterRecordService.Retrieve({
                    EntityId: materialId
                }, response => {
                    let price = 0
                    let currencyCode = ""
                    let costing = BomRelationshipService.MaterialCost({
                        EntityId: materialId
                    }, response1 => {
                        price = response1[0]["Total"]
                        currencyCode = response1[0]["Currency"]
                    })
                    costing.promise().done(function () {
                        let image = response.Entity.Picture;
                        let type = response.Entity.MaterialTypeName
                        if (image == null) {
                            image = "Image/Image_not_available.png"
                        }
                        let partNumber = response.Entity.MaterialNumber;
                        let description = response.Entity.MaterialDescription
                        let randomId = uuid()

                        let structure = `<div class="material-card" draggable="true" id="${randomId}">
                                    <input type="hidden" name="nodeType" value="2">
                                    <input type="hidden" name="materialId" value="${materialId}">
                                    <input type="hidden" name="materialNumber" value="${partNumber}">
                                     <input type="hidden" name="materialImage" value="${image}">
                                    <input type="hidden" name="materialType" value="${type}">
                                    <input type="hidden" name="materialPrice" value="${price}">
                                    <input type="hidden" name="materialCurrencyCode" value="${currencyCode}">
                                    <input type="hidden" name="materialDescription" value="${description}"> 
                                  <div class="pull-right clickable close-icon" data-effect="fadeOut"><i class="fa fa-times"></i></div>

                                  <img class="card-img-top" src="/upload/${image}" alt="Material ">
                                  <div class="card-body">
                                    <p class="card-text">${partNumber}</p>
                                  </div>
                                </div>`

                        $(".display-container").append(structure)
                        th.enableDragAndDrop(randomId)
                        $('.close-icon').click(function () {
                            $(this).closest('.material-card').remove();
                        });
                    })


                })
            }

        })
        Bom.parentMaterialSelect.element.on("click", function (e) {
            if (Bom.parentMaterialSelect.value != "") {
                let materialId = Bom.parentMaterialSelect.value
                MasterRecordService.Retrieve({
                    EntityId: materialId
                }, response => {

                    let price = 0
                    let currencyCode = ""
                    let costing = BomRelationshipService.MaterialCost({
                        EntityId: materialId
                    }, response1 => {
                        price = response1[0]["Total"]
                        currencyCode = response1[0]["Currency"]
                    })
                    costing.promise().done(function () {
                        let image = response.Entity.Picture;
                        let type = response.Entity.MaterialTypeName
                        if (image == null) {
                            image = "Image/Image_not_available.png"
                        }
                        let partNumber = response.Entity.MaterialNumber;
                        let description = response.Entity.MaterialDescription;
                        let randomId = uuid()
                        let structure = `<div class="material-card" draggable="true" id="${randomId}">
                                    <input type="hidden" name="nodeType" value="1">
                                    <input type="hidden" name="materialId" value="${materialId}">
                                    <input type="hidden" name="materialNumber" value="${partNumber}">
                                     <input type="hidden" name="materialImage" value="${image}">
                                    <input type="hidden" name="materialType" value="${type}">
                                    <input type="hidden" name="materialPrice" value="${price}">
                                    <input type="hidden" name="materialCurrencyCode" value="${currencyCode}">
                                    <input type="hidden" name="materialDescription" value="${description}"> 
                                  <div class="pull-right clickable close-icon" data-effect="fadeOut"><i class="fa fa-times"></i></div>

                                  <img class="card-img-top" src="/upload/${image}" alt="Material ">
                                  <div class="card-body">
                                    <p class="card-text">${partNumber}</p>
                                  </div>
                                </div>`

                        $(".display-container-parent").append(structure)
                        th.enableDragAndDrop(randomId)
                        $('.close-icon').click(function () {
                            // Find the closest parent with class "material-card" and remove it
                            $(this).closest('.material-card').remove();
                        });
                    })


                })
            }

        })
        Bom.bomSelect.element.on("click", async function (e) {

            Bom.bomId = Bom.bomSelect.value
            if (Bom.bomSelect.value != "") {

                if (Bom.orgChart !== undefined) {

                    Q.confirm("Overwrite the chart?", async () => {
                        if (Authorization.hasPermission(BomPermissionKeys.Approve)) {
                            BomMasterService.Retrieve({
                                EntityId: Bom.bomSelect.value
                            }, response => {
                                let approvalStatus = response.Entity.ApprovalStatus
                                if (approvalStatus == true) {
                                    $(".disapprove-btn").removeClass("disabled")
                                    $(".approve-btn").addClass("disabled")
                                }
                                else {
                                    $(".approve-btn").removeClass("disabled")
                                    $(".disapprove-btn").addClass("disabled")
                                }
                            })
                        }

                        let parentNode = document.querySelector('.orgchart').querySelector('.node')
                        Bom.orgChart.removeNodes(parentNode)
                        Bom.orgChart = undefined
                        await drawGraph()
                        $("#bom-main").on('change', "input[name='materialQuantity']", function () {
                            let newQuantity = $(this).val()
                            let unitPrice = $(this).parent(".node").find("input[name='materialUnitPrice']").val()
                        })


                    })
                } else {
                    if (Authorization.hasPermission(BomPermissionKeys.Approve)) {
                        BomMasterService.Retrieve({
                            EntityId: Bom.bomSelect.value
                        }, response => {
                            let approvalStatus = response.Entity.ApprovalStatus
                            if (approvalStatus == true) {
                                $(".disapprove-btn").removeClass("disabled")
                                $(".approve-btn").addClass("disabled")
                            }
                            else {
                                $(".approve-btn").removeClass("disabled")
                                $(".disapprove-btn").addClass("disabled")
                            }
                        })


                    }
                    await drawGraph()
                    $("#bom-main").on('change', "input[name='materialQuantity']", function () {
                        let newQuantity = $(this).val()
                        let node = $(this).closest(".node ").attr("id")

                        let unitPrice = $(this).parentsUntil(".part-details").find("input[name='materialUnitPrice']").val();
                        let actualPrice = $(this).parentsUntil(".part-details").find("input[name='materialActualPrice']").val()
                        if (actualPrice != 0) {
                            $(this).parentsUntil(".part-details").find("input[name='materialActualPrice']").val(unitPrice * newQuantity)
                        }
                        $(this).parentsUntil(".part-details").find(".price-holder").html((unitPrice * newQuantity).toString())
                        let hierarchy = Bom.orgChart.getHierarchy()
                        let rootId = hierarchy.id
                        Bom.tempData = Bom.generateCostStructure(hierarchy, rootId);
                        Bom.firstLayer = 0
                        th.calculateCosting(rootId, Bom.tempData)
                        $(`#${rootId} .price-holder`).html(Bom.firstLayer.toString())
                        //$(`#${node} .actualPrice-holder`).html((unitPrice*newQuantity).toString())

                        for (let i = 0; i < Bom.tempData.length; i++) {

                            let nodeId = Bom.tempData[i][2]
                            let total = (Bom.tempData[i][4] + Bom.tempData[i][5] + Bom.tempData[i][6])
                            $(`#${nodeId} .price-holder`).html(total.toString())
                        }

                    })

                }

                async function routing() {
                    BomRelationshipService.List({
                        Criteria: Criteria.and(Criteria("BomID").eq(Bom.bomSelect.value), Criteria("IsActive").eq(1))
                    }, response => {
                        response.Entities.forEach(data => {
                            let bomRelationshipId = data.Id
                            let childUniqueId = data.ChildUniqueId
                            ProcessRoutingRelationshipService.ProcessRouting({
                                EntityId: bomRelationshipId
                            }, response1 => {
                                let nodeBind = document.getElementById(childUniqueId)
                                nodeBind.dataset.routing = JSON.stringify(response1)
                            })
                        })
                    })
                }

                async function drawGraph() {
                    BomRelationshipService.BomStructure({
                        EntityId: Bom.bomSelect.value
                    }, response => {

                        let datasource = th.buildTree(response)
                        Bom.orgChart = new OrgChart({
                            'chartContainer': '#bom-main',
                            'data': datasource,
                            'nodeContent': 'title',
                            'draggable': Authorization.hasPermission(BomPermissionKeys.Modify),
                            'direction': 'l2r',
                            'parentNodeSymbol': "fa-list",
                            'zoom': true,
                            'pan': true,
                            'createNode': function (node, data) {
                                let $jqueryObject = $(node);
                                let title = $jqueryObject.find(".title")
                                title.html("")
                                let content = $jqueryObject.find(".content")
                                content.html("")
                                let image = ""
                                let generateWo = data.generateProductionOrder == 0 ? "" : "checked"
                                let generatePr = data.generatePurchaseRequisition == 0 ? "" : "checked"
                                let deleteBtn = ""
                                if (data.main == false) {
                                    deleteBtn = `<div class="btn pull-right clickable delete-node-icon ${th.modifyPermission}" data-effect="fadeOut" ><i class="fa fa-times"></i></div>`
                                }
                                if (data.image === "") {
                                } else {
                                    image = `<div style="height: 80%" class=" row">
                        ${deleteBtn}
                        <input type="hidden" name="materialid" value="${data.materialId}">
                        <div class="col-5" style="align-items: center;justify-content: center;display: flex;height: 100%;margin-left:10px">
                            <img draggable="false" src="/upload/${data.image}"  style="max-width:100%;max-height:100%;width:auto;height:auto;object-fit: contain">
                        </div>
                        <div class="col-6 part-details"  style="text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px">
                            <div style="text-align: left;height: 100%;width:100%;padding-right:0">
                            
                                <div style="width:100%" class="detail-row row">
                                    <div title="Material Number" class="col-2 label-icon-name">
                                        <i class="fa fa-cog"></i>
                                    </div>
                                    <div class="col-10 part-name">${data.name}</div>
                                </div>
                                <div style="width:100%" class="detail-row row">
                                    <div title="Material Type" class="col-2 label-icon-type">
                                        <i class="fa fa-layer-group"></i>
                                    </div>
                                    <div class="col-10 part-type">${data.type}</div>
                                </div>
                                <div style="width:100%" class="detail-row row">
                                    <div title="Material Description" class="col-2 label-icon-type">
                                        <i class="fa fa-align-justify"></i>
                                    </div>
                                    <div class="col-10 part-description">${data.description}</div>
                                </div>
                                <div style="width:100%" class="detail-row row">
                                    <div title="Quantity" class="col-2 label-icon-quantity">
                                        <i class="fa fa-cubes"></i>
                                    </div>
                                    <div class="col-10 part-quantity">
                                        <div class="editor" style="display: flex;">
                                            <input class="editor"  name="materialQuantity" value="${data.quantity}"/>
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" name="materialActualPrice" value="${data.actualPrice}"/>
                                <input type="hidden" name="materialRouting" value="${data.routing}"/>
                                <input type="hidden" name="materialUnitPrice" value="${data.price / data.quantity}"/>
                                <div style="width:100%" class="detail-row row">
                                    <div title="Actual Price" class="col-2 label-icon-actualprice">
                                        <i class="fa fa-coins"></i>
                                    </div>
                                    <div class="col-10 part-actualprice">${data.currencyCode} <span class="actualPrice-holder">${data.actualPrice}</span></div>
                                </div>
                                <div style="width:100%" class="detail-row row">
                                    <div title="Calculated Price" class="col-2 label-icon-price">
                                        <i class="fa fa-coins"></i>
                                    </div>
                                    <div class="col-10 part-price">${data.currencyCode} <span class="price-holder">${data.price}</span></div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="button-row">
                        <button class="btn process-btn" title="Process Routing"><i class="fa fa-stream"></i></button>
                        <div class="inline-action wo-box ${generateWo} ${th.modifyPermission}" title="Generate Production Order" id="productionOrder-${data.id}"></div>
                        <div class="inline-action pr-box ${generatePr} ${th.modifyPermission}" title="Generate Purchase Requisition" id="purchaseRequisition-${data.id}"></div>

                    </div>`
                                }

                                content.append(image)

                            }
                        });
                        Bom.orgChart.chart.classList.add('view-state');

                        $("#bom-main").on('click', '.wo-box', function () {
                            let target = $(this)
                            let id = target.attr("id")
                            let arr = id.split("-")
                            arr.shift()
                            let uniqueId = arr.join("-")
                            let val = false
                            if (target.hasClass("checked")) {
                                target.removeClass("checked")
                            }
                            else {
                                target.addClass("checked")
                                val = true
                            }

                            BomRelationshipService.List({
                                Criteria: Criteria.and(Criteria("ChildUniqueID").eq(uniqueId), Criteria("IsActive").eq("1"))
                            }, response1 => {
                                response1.Entities.forEach(data => {
                                    BomRelationshipService.Update({
                                        EntityId: data.Id,
                                        Entity: {
                                            GenerateProductionOrder: val
                                        }
                                    })
                                })
                            })
                        })
                        $("#bom-main").on('click', '.pr-box', function () {
                            let target = $(this)
                            let id = target.attr("id")
                            let arr = id.split("-")
                            arr.shift()
                            let uniqueId = arr.join("-")
                            let val = false
                            if (target.hasClass("checked")) {
                                target.removeClass("checked")
                            }
                            else {
                                target.addClass("checked")
                                val = true
                            }

                            BomRelationshipService.List({
                                Criteria: Criteria.and(Criteria("ChildUniqueID").eq(uniqueId), Criteria("IsActive").eq("1"))
                            }, response1 => {
                                response1.Entities.forEach(data => {
                                    BomRelationshipService.Update({
                                        EntityId: data.Id,
                                        Entity: {
                                            GeneratePurchaseRequisition: val
                                        }
                                    })
                                })
                            })
                        })

                    }).then(function () {
                        routing()
                    })
                }
            }
            else {

                $(".approve-btn").addClass("disabled")
                $(".disapprove-btn").addClass("disabled")
            }
        })
        $('#bom-main').on('click', '.delete-node-icon', function (e) {
            if ($(e.target).is(this) || $.contains(this, e.target)) {
                let latestNode = e.target.closest('.node')
                let parentNode = document.querySelector('.orgchart').querySelector('.node')
                if (parentNode == latestNode) {
                    Q.confirm("Delete the whole chart?", () => {
                        Bom.orgChart.removeNodes(latestNode);
                        Bom.orgChart = undefined
                    })
                } else {

                    Bom.orgChart.removeNodes(latestNode);
                    let parent = Bom.orgChart._closest(latestNode, el => el.nodeName === 'TABLE').parentNode
                    let child = $(parent).find(".node")
                    child.each(function (index, elem) {
                        let childDataSource = elem.getAttribute("data-source")

                        let childJson = JSON.parse(childDataSource)
                        th.deletedNode.push(childJson)
                    })



                }
            }
        });
        $('#bom-main').on('click', '.process-btn', function (e) {
            if ($(e.target).is(this) || $.contains(this, e.target)) {
                let closest: HTMLElement = e.target.closest(".node")
                let bomUniqueId = closest.id
                let dlg = new ProcessDefineDialog(closest.dataset.routing, bomUniqueId)
                dlg.element.on('dialogclose', function (f) {
                    let state = dlg.saveState
                    if (state == true) {
                        let jsonData = dlg.finalJson
                        let closest: HTMLElement = e.target.closest(".node")

                        closest.dataset.routing = JSON.stringify(jsonData)
                    }
                })
                dlg.dialogOpen()
            }
        })
        $(".approve-btn").on('click', function () {
            if (Bom.bomId != undefined) {
                Q.confirm("Approve this BOM?", () => {

                    Q.serviceCall<RetrieveResponse<any>>({
                        service: BomMasterService.baseUrl + '/BomApprove',
                        data: {
                            'bomId': Bom.bomId
                        },
                        method: "GET",
                        async: false,

                        async onSuccess(response) {
                            //@ts-ignore
                            for (var key in response.CustomData) {
                                //@ts-ignore
                                let item = response.CustomData[key]
                                if (key == "200") {
                                    Q.notifySuccess(item)
                                    $(".disapprove-btn").removeClass("disabled")
                                    $(".approve-btn").addClass("disabled")
                                }
                                else if (key == "500") {
                                    Q.notifyError(item)

                                }
                            }
                        }
                    }
                    )
                })
            }
        })
        $(".disapprove-btn").on('click', function () {
            if (Bom.bomId != undefined) {
                Q.confirm("Disapprove this BOM?", () => {
                    Q.serviceCall<RetrieveResponse<any>>({
                        service: BomMasterService.baseUrl + '/BomDisapprove',
                        data: {
                            'bomId': Bom.bomId
                        },
                        method: "GET",
                        async: false,

                        async onSuccess(response) {
                            //@ts-ignore
                            for (var key in response.CustomData) {
                                //@ts-ignore
                                let item = response.CustomData[key]
                                if (key == "200") {
                                    Q.notifySuccess(item)
                                    $(".disapprove-btn").addClass("disabled")
                                    $(".approve-btn").removeClass("disabled")
                                }
                                else if (key == "500") {
                                    Q.notifyError(item)
                                }
                            }

                        }
                    }
                    )
                })
            }




        })
    }
    public loadBomBlock() {
        // 'children': [{'id':randomId,'materialId':materialId,'name':materialNumber,"image":materialImage,"type":materialType,"quantity":materialQuantity,'relationship':rel,'currencyCode':currencyCode,'price':price,'actualPrice':price}]

    }
    public enableDragAndDrop(cardId) {
        let isDragging = false;
        let th = this
        function closest(el, fn) {
            return el && ((fn(el) && el !== document.querySelector('.orgchart')) ? el : closest(el.parentNode, fn));
        }
        var dragSrcEl = null;
        function handleDragStart(e) {
            this.style.opacity = '0.4';

            dragSrcEl = this;
            e.target.style.cursor = 'copy'
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('text/html', this.innerHTML);

            isDragging = true;
        }

        function handleDragOver(e) {
            e.dataTransfer.dropEffect = 'copy';
            if (e.preventDefault) {
                e.preventDefault();
            }


            return false;
        }

        function handleDragEnter(e) {
            e.preventDefault();
            //this.classList.add('over');
            //this.style.border = "3px dotted #666"
        }

        function handleDragLeave(e) {
            e.preventDefault();
            //this.classList.remove('over');
            //this.style.removeProperty("border")
        }

        function handleDrop(e) {
            e.dataTransfer.dropEffect = 'move';
            if (dragSrcEl != this) {

                // const sourceContent = dragSrcEl.innerHTML;
                // dragSrcEl.innerHTML = this.innerHTML;
                // this.innerHTML = sourceContent;


            }
            e.stopImmediatePropagation();
        }

        function handleDragEnd(e) {

            //e.target.style.backgroundColor = '';
            //e.target.style.cursor = 'default';
            if (isDragging) {
                isDragging = false;
                e.dataTransfer.getData('text/html')
                this.style.opacity = '1';
                const source = e.target.closest(".material-card");
                let nodeType = source.querySelector("input[name='nodeType']").value
                let materialId = source.querySelector("input[name='materialId']").value
                let materialNumber = source.querySelector("input[name='materialNumber']").value
                let materialType = source.querySelector("input[name='materialType']").value
                let materialImage = source.querySelector("input[name='materialImage']").value
                let materialDescription = source.querySelector("input[name='materialDescription']").value
                let materialQuantity = 1
                let randomId = uuid()
                let price = source.querySelector("input[name='materialPrice']").value;
                let currencyCode = source.querySelector("input[name='materialCurrencyCode']").value;



                if (nodeType == 1) {
                    let zone = document.elementFromPoint(e.clientX, e.clientY)
                    if (zone.id == "bom-main") {
                        let datasource = { 'id': randomId, 'materialId': materialId, 'name': materialNumber, "image": materialImage, "type": materialType, "quantity": materialQuantity, 'currencyCode': currencyCode, 'price': price, 'actualPrice': price }
                        Bom.orgChart = new OrgChart({
                            'chartContainer': '#bom-main',
                            'data': datasource,
                            'nodeContent': 'title',
                            'draggable': Authorization.hasPermission(BomPermissionKeys.Modify),
                            'direction': 'l2r',
                            'parentNodeSymbol': "fa-list",
                            'zoom': true,
                            'pan': true,
                            'createNode': function (node, data) {

                                let $jqueryObject = $(node);
                                let title = $jqueryObject.find(".title")
                                title.html("")
                                let content = $jqueryObject.find(".content")
                                content.html("")
                                let image = ""

                                if (data.image === "") {
                                } else {
                                    image = `<div style="height: 100%" class=" row">
                        <div class="btn pull-right clickable delete-node-icon ${th.modifyPermission}" data-effect="fadeOut" ><i class="fa fa-times"></i></div>

                        <input type="hidden" name="materialid" value="${data.materialId}">
                        <div class="col-5" style="align-items: center;justify-content: center;display: flex;height: 100%;margin-left:10px">
                            <img draggable="false" src="/upload/${data.image}"  style="max-width:100%;max-height:100%;width:auto;height:auto;object-fit: contain">
                        </div>
                        <div class="col-6 part-details"  style="text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px">
                            <div style="text-align: left;height: 100%;width:100%;padding-right:0">
                            
                                <div style="width:100%" class="detail-row row">
                                    <div title="Material Number" class="col-2 label-icon-name">
                                        <i class="fa fa-cog"></i>
                                    </div>
                                    <div class="col-10 part-name">${data.name}</div>
                                </div>
                                <div style="width:100%" class="detail-row row">
                                    <div title="Material Type" class="col-2 label-icon-type">
                                        <i class="fa fa-layer-group"></i>
                                    </div>
                                    <div class="col-10 part-type">${data.type}</div>
                                </div>
                                <div style="width:100%" class="detail-row row">
                                    <div title="Material Description" class="col-2 label-icon-type">
                                        <i class="fa fa-align-justify"></i>
                                    </div>
                                    <div class="col-10 part-description">${data.description}</div>
                                </div>
                                <div style="width:100%" class="detail-row row">
                                    <div title="Quantity" class="col-2 label-icon-quantity">
                                        <i class="fa fa-cubes"></i>
                                    </div>
                                    <div class="col-10 part-quantity">
                                        <div class="editor" style="display: flex;">
                                            <input class="editor" name="materialQuantity" value="${data.quantity}"/>
                                        </div>
                                    </div>
                                    <input type="hidden" name="materialActualPrice" value="${data.price}"/>
                                    <input type="hidden" name="materialRouting" value="0"/>
                                    <input type="hidden" name="materialUnitPrice" value="${data.price / data.quantity}"/>
                                    <div style="width:100%" class="detail-row row">
                                        <div title="Actual Price" class="col-2 label-icon-actualprice">
                                            <i class="fa fa-coins"></i>
                                        </div>
                                        <div class="col-10 part-actualprice">${data.currencyCode} <span class="actualPrice-holder">${data.actualPrice}</span></div>
                                    </div>
                                    <div style="width:100%" class="detail-row row">
                                        <div title="Price" class="col-2 label-icon-price">
                                            <i class="fa fa-coins"></i>
                                        </div>
                                        <div class="col-10 part-price">${data.currencyCode} <span class="price-holder">${data.price}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div><div class="button-row">
                        <button class="btn process-btn" title="Process Routing"><i class="fa fa-stream"></i></button>
                        <div class="inline-action wo-box ${th.modifyPermission}" title="Generate Production Order" id="productionOrder-${data.id}"></div>
                        <div class="inline-action pr-box ${th.modifyPermission}" title="Generate Purchase Requisition" id="purchaseRequisition-${data.id}"></div>

                    </div>`
                                }

                                content.append(image)

                            }
                        });
                        Bom.orgChart.chart.classList.add('view-state');
                        let bomMain = $("#bom-main")
                        bomMain.on('click', '.wo-box', function () {
                            let target = $(this)
                            if (target.hasClass("checked")) {
                                target.removeClass("checked")
                            }
                            else {
                                target.addClass("checked")
                            }
                        })
                        bomMain.on('click', '.pr-box', function () {
                            let target = $(this)
                            if (target.hasClass("checked")) {
                                target.removeClass("checked")
                            }
                            else {
                                target.addClass("checked")
                            }
                        })
                    }

                }
                else if (nodeType == 2) {
                    const dropTarget = document.elementFromPoint(e.clientX, e.clientY).closest(".node");
                    if (dropTarget != null) {
                        BomMasterService.List({
                            Criteria: Criteria.and(Criteria("IsActive").eq("1"), Criteria("MaterialID").eq(materialId))
                        }, response => {
                            if (response.Entities.length == 0) {
                                //@ts-ignore
                                let hasChild = dropTarget.parentNode.colSpan > 1;
                                if (!hasChild) {
                                    let rel = '100';
                                    let dataSource = dropTarget.getAttribute("data-source")
                                    let jsonData = JSON.parse(dataSource)
                                    let parentUniqueId = jsonData["id"]
                                    let similarItem = th.deletedNode.find(item => item.parentId == parentUniqueId && item.materialId == materialId)
                                    if (similarItem != null) {
                                        randomId = similarItem["id"]
                                        th.deletedNode.filter(item => item.id !== randomId);

                                    }
                                    Bom.orgChart.addChildren(dropTarget, {
                                        'children': [{ 'id': randomId, 'materialId': materialId, 'name': materialNumber, "description": materialDescription, "image": materialImage, "type": materialType, "quantity": materialQuantity, 'relationship': rel, 'currencyCode': currencyCode, 'price': price, 'actualPrice': price }]

                                    });

                                }
                                else {
                                    let dataSource = dropTarget.getAttribute("data-source")
                                    let jsonData = JSON.parse(dataSource)
                                    let parentUniqueId = jsonData["id"]
                                    let similarItem = th.deletedNode.find(item => item.parentId == parentUniqueId && item.materialId == materialId)
                                    if (similarItem != null) {
                                        randomId = similarItem["id"]
                                        th.deletedNode.filter(item => item.id !== randomId);

                                    }
                                    Bom.orgChart.addSiblings(closest(dropTarget, el => el.nodeName === 'TABLE').querySelector('.nodes').querySelector('.node'),
                                        {
                                            'siblings': [{ 'id': randomId, 'materialId': materialId, 'name': materialNumber, "description": materialDescription, "image": materialImage, "type": materialType, "quantity": materialQuantity, 'relationship': '110', 'currencyCode': currencyCode, 'price': price, 'actualPrice': price }]
                                        });
                                }
                            }
                            else {
                                Q.confirm("There are bom records for this material. Load the structures from the records?", () => {
                                    let dialogDiv = $('<div/>')
                                        .addClass("editorDialog")

                                        ;

                                    response.Entities.forEach(data => {
                                        let choice = $('<div/>')
                                            .attr('data-didpid', data.Id)
                                            .attr('data-pid', data.Id)
                                            .css({
                                                display: 'flex',
                                                flexDirection: 'row',
                                                flex: "auto",
                                                backgroundColor: "#7df1",
                                                border: "solid #7df2 1px",
                                                margin: "2px",
                                                cursor: "pointer",
                                                borderRadius: "5px",
                                                padding: "0.1em"
                                            });
                                        choice.append($('<p/>').attr("title", "Bom")
                                            .addClass('pidEditor')
                                            .attr('data-didpid', data.Id)
                                            .attr('data-pid', data.Id)
                                            .css({
                                                margin: "0",
                                                marginLeft: "1em",
                                                cursor: "pointer",
                                                width: "60px",
                                                textAlign: "center",
                                                borderRadius: "0.1em",
                                                backgroundColor: "#7df1"
                                            }).text(data.Id));
                                        choice.append($('<p/>')
                                            .attr('data-didpid', data.Id)
                                            .attr('data-pid', data.Id)
                                            .css({
                                                margin: "0",
                                                marginLeft: "1em",
                                                width: "450px",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                fontSize: "1.1em"
                                            }).text(data.CombinedName));
                                        choice.hover(function () {
                                            $(this).css({ backgroundColor: "#7df5" })
                                        }, function () {
                                            $(this).css({ backgroundColor: "#7df1" })
                                        });
                                        dialogDiv.append(choice);
                                        choice.on('click', function (f) {
                                            Bom.chosenBomId = f.target.getAttribute("data-didpid")
                                            $('.editorDialog').dialog('close');
                                        })
                                    })
                                    let choice = $('<div/>')
                                        .attr('data-didpid', "")
                                        .attr('data-pid', "")
                                        .css({
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flex: "auto",
                                            backgroundColor: "#f771",
                                            border: "solid #f772 1px",
                                            margin: "2px",
                                            cursor: "pointer",
                                            borderRadius: "5px",
                                            padding: "0.1em"
                                        });
                                    choice.append($('<p/>').attr("title", "Machine Group")
                                        .addClass('pidEditor')
                                        .attr('data-didpid', "")
                                        .attr('data-pid', "")
                                        .css({
                                            margin: "0",
                                            marginLeft: "1em",
                                            cursor: "pointer",
                                            width: "60px",
                                            textAlign: "center",
                                            borderRadius: "0.1em",
                                            backgroundColor: "#f771"
                                        }).text("❌"));
                                    choice.append($('<p/>')
                                        .attr('data-didpid', "")
                                        .attr('data-pid', "")
                                        .css({
                                            margin: "0",
                                            marginLeft: "1em",
                                            width: "450px",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            fontSize: "1.1em"
                                        }).text("None"));
                                    choice.hover(function () {
                                        $(this).css({ backgroundColor: "#f775" })
                                    }, function () {
                                        $(this).css({ backgroundColor: "#f771" })
                                    });

                                    dialogDiv.append(choice);
                                    choice.on('click', function (f) {
                                        Bom.chosenBomId = undefined
                                        $('.editorDialog').dialog('close');
                                    })
                                    dialogDiv.dialog({
                                        autoOpen: false,
                                        modal: true,
                                        title: 'Bom',
                                        buttons: {
                                            "Cancel": function () {
                                                $('.editorDialog').dialog("close").remove();
                                            }
                                        },

                                    });
                                    dialogDiv.dialog('option', 'position', {
                                        of: window
                                    });
                                    dialogDiv.dialog('open');
                                    dialogDiv.on('dialogclose', function () {
                                        if (Bom.chosenBomId != undefined) {
                                            BomRelationshipService.BomStructure({
                                                EntityId: Bom.chosenBomId
                                            }, response => {

                                                let datasource = th.buildTree(response)

                                                //@ts-ignore
                                                let hasChild = dropTarget.parentNode.colSpan > 1;
                                                if (!hasChild) {
                                                    let rel = '100';
                                                    Bom.orgChart.addChildren(dropTarget, {
                                                        'children': [datasource]

                                                    });
                                                    th.addBomChildren(datasource.children, datasource.id)


                                                }
                                                else {
                                                    Bom.orgChart.addSiblings(closest(dropTarget, el => el.nodeName === 'TABLE').querySelector('.nodes').querySelector('.node'),
                                                        {
                                                            'siblings': [datasource]
                                                        });
                                                    //th.addBomSibling(datasource.children,datasource.id)
                                                }

                                            })
                                        }

                                    })
                                    $('.editorDialog').closest('.ui-dialog').css({
                                        width: "fit-content",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"
                                    })
                                })

                            }
                        })
                        // BomRelationshipService.BomStructure({
                        //     EntityId: Bom.bomSelect.value
                        // }, response => {
                        //    
                        //     let datasource = th.buildTree(response)
                        // })




                    }
                    else {
                        let zone = document.elementFromPoint(e.clientX, e.clientY)
                        if (zone.id == "bom-main") {

                            Q.notifyWarning("Please add the parent first before you add the child.")
                        }

                    }
                }

            }



            // items.forEach(function (item:HTMLElement) {
            //     item.classList.remove('over');
            //     item.style.removeProperty("border")
            // });
            return false;

        }

        let item = document.getElementById(cardId)
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
        document.addEventListener("dragover", (event) => {
            event.preventDefault();
        });


    }

    private static generatePaths(json, rootId, parent = rootId) {
        const paths = [];
        if (json.id) {
            let generateWo = "0"
            let generateWoElement = $(`#productionOrder-${json.id}`)
            if (generateWoElement.hasClass("checked")) {
                generateWo = "1"
            }

            let generatePr = "0"
            let generatePrElement = $(`#purchaseRequisition-${json.id}`)
            if (generatePrElement.hasClass("checked")) {
                generatePr = "1"
            }
            if (rootId == parent && rootId == json.id) {
                let quantity = $(`#${json.id} input[name='materialQuantity']`).val()
                let price = $(`#${json.id} input[name='materialPrice']`).val()
                let parentMaterialId = $(`#${rootId} input[name='materialid']`).val()
                let childMaterialId = $(`#${json.id} input[name='materialid']`).val()

                const path = [rootId, null, json.id, quantity, price, null, childMaterialId, generateWo, generatePr];
                paths.push(path);
            }
            else if (rootId == parent && rootId != json.id) {
                let quantity = $(`#${json.id} input[name='materialQuantity']`).val()
                let price = $(`#${json.id} input[name='materialPrice']`).val()
                let parentMaterialId = $(`#${rootId} input[name='materialid']`).val()
                let childMaterialId = $(`#${json.id} input[name='materialid']`).val()
                const path = [rootId, rootId, json.id, quantity, price, parentMaterialId, childMaterialId, generateWo, generatePr];


                paths.push(path);
            }
            else {
                let quantity = $(`#${json.id} input[name='materialQuantity']`).val()
                let price = $(`#${json.id} input[name='materialPrice']`).val()
                let parentMaterialId = $(`#${parent} input[name='materialid']`).val()
                let childMaterialId = $(`#${json.id} input[name='materialid']`).val()
                const path = [rootId, parent, json.id, quantity, price, parentMaterialId, childMaterialId, generateWo, generatePr];

                paths.push(path);
            }
            parent = json.id;
        }

        if (json.children && json.children.length > 0) {
            for (const child of json.children) {
                paths.push(...this.generatePaths(child, rootId, parent));
                parent = json.id; // Update the parent after processing children
            }
        }

        return paths;
    }
    public materialInputUI() {
        let buttonRow = `
        <div class="tool-buttons " style="float: right;margin-bottom: 5px;">
            <div class="buttons-outer ">
                <div class="buttons-inner">
                    <div class="tool-button save-button icon-tool-button " data-action="save">
                        <div class="button-outer"><span class="button-inner"><i class="fa fa-save text-green"></i> Save</span>
                        </div>
                    </div>
                    <div class="tool-button approve-btn icon-tool-button disabled">
                        <div class="button-outer"><span class="button-inner"><i class="fa fa-check-circle text-green"></i> Approve</span>
                        </div>
                    </div>
                    <div class="tool-button disapprove-btn icon-tool-button disabled">
                        <div class="button-outer"><span class="button-inner"><i class="fa fa-times-circle text-red"></i> Disapprove</span>
                        </div>
                    </div>
                </div>
            </div>
             </div>`
        $('#save-row').append(buttonRow)
        let bomSelect = `<div class="col-sm-12">
                        <div class="category">
                            <div class="field Material">
                                <label class="caption" for="Bom">BOM</label>
                                <div class="editor" style="display: flex;">
                                    <input class="editor" id="Bom" />
                                </div>
                            </div></div>
                        </div>`
        $("#select-bom").append(bomSelect)

        let th = this


        let input = `<div class="s-PropertyGrid">
                        <div style="margin-left:auto"><i class="fa fa-caret-up" id="ce-btn" style="font-size:20px"></i></div>
                        <div class="categories row" id="material-panel">
                            <div class="col-sm-4">
                                <div class="category">
                                    <div class="field Material">
                                        <label class="caption" for="ParentMaterial">Parent Material</label>
                                        <div class="editor" style="display: flex;">
                                            <input class="editor" id="ParentMaterial" />
                                        </div>
                                    </div>

                                </div>
                                <div class="display-container-parent">
                                    
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <div class="category">
                                    <div class="field Material">
                                        <label class="caption" for="Material">Child Material</label>
                                        <div class="editor" style="display: flex;">
                                            <input class="editor" id="Material" />
                                        </div>
                                    </div>

                                </div>
                                <div class="display-container">
                                
                                
                            </div>
                            </div>
                            
                        </div>
                    </div>`
        $("#inputPanel").append(input)
        $("#ce-btn").on("click", function () {
            if ($(this).hasClass("fa-caret-up")) {
                $(this).removeClass("fa-caret-up")
                $(this).addClass("fa-caret-down")
                $("#material-panel").hide()
                $("#bom-main").css({
                    height: "650px"
                })
            }
            else if ($(this).hasClass("fa-caret-down")) {
                $(this).removeClass("fa-caret-down")
                $(this).addClass("fa-caret-up")
                $("#material-panel").show()
                $("#bom-main").css({
                    height: "400px"
                })
            }
        })
        $(`<div class="info-button" title="View BOM additional information" style="z-index:10;font-size:16px;top:0;left:10px;width:25px;height:25px;display:flex;justify-content: center;align-items: center;background-color:var(--s-tabs-text);color:white;border-radius:50%">
            <i class="fa fa-info-circle"></i>
        </div>`).insertBefore($("#bom-main"))
        $(".info-button").on("click", function () {
            if (Bom.bomId != undefined) {
                let dlg = new BomMasterDialog()
                dlg.loadByIdAndOpenDialog(Bom.bomId)
            }
            else 
                Q.notifyWarning("No BOM is selected.")
        })
    }
    public addChildById(tree, parentId, newChild) {
        if (tree.id === parentId) {


            tree.children.push(newChild);
        } else {


            tree.children.forEach(child => {
                this.addChildById(child, parentId, newChild);
            });
        }
    }
    public addBomSibling(tree, parentId) {
        function closest(el, fn) {
            return el && ((fn(el) && el !== document.querySelector('.orgchart')) ? el : closest(el.parentNode, fn));
        }

        tree.children.forEach(child => {
            let dropTarget = document.getElementById(child.id)
            let target = closest(dropTarget, el => el.nodeName === 'TABLE').querySelector('.nodes').querySelector('.node')
            Bom.orgChart.addSiblings(target, { 'siblings': [child] })
            this.addBomSibling(child.children, child.id)
        })
    }
    public addBomChildren(tree, parentId) {
        tree.children.forEach(child => {
            let target = document.getElementById(child.id)
            Bom.orgChart.addChildren(target, { 'children': [child] })
            this.addBomChildren(child.children, child.id)
        })
    }
    public removeEmptyChildren(node) {
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => {
                this.removeEmptyChildren(child);
            });

            if (node.children.length === 0) {
                delete node.children;
            }
        }
        else {
            delete node.children;
        }
        return node
    }

    public buildTree(array) {
        let mainPicture = array[0]["Picture"]
        if (mainPicture == null) {
            mainPicture = "Image/Image_not_available.png"
        }
        const tree = {
            id: array[0]["MainUniqueID"],
            materialId: array[0]["MainMaterialID"],
            name: array[0]["MaterialNumber"],
            description: array[0]["Description"],
            type: array[0]["Type"],
            image: mainPicture,
            quantity: array[0]["Quantity"],
            price: array[0]["Total"],
            currencyCode: array[0]["CurrencyCode"],
            actualPrice: array[0]["ActualPrice"],
            routing: array[0]["Routing"],
            generateProductionOrder: array[0]["GenerateProductionOrder"],
            generatePurchaseRequisition: array[0]["GeneratePurchaseRequisition"],
            relationship: '100',
            children: [],
            main: true
        };
        for (let i = 1; i < array.length; i++) {
            let item = array[i]
            let id = item["ChildUniqueID"]
            let main = item["MainMaterialID"]
            let parentUniqueId = item["ParentUniqueID"]
            let parent = item["ParentMaterialID"]
            let child = item["ChildMaterialID"]
            let materialNumber = item["MaterialNumber"]
            let description = item["Description"]
            let materialType = item["Type"]
            let picture = item["Picture"]
            let quantity = item["Quantity"]
            let price = item["Total"]
            let currencyCode = item["CurrencyCode"]
            let actualPrice = item["ActualPrice"]
            let routing = item["Routing"]
            let generateProductionOrder = item["GenerateProductionOrder"]
            let generatePurchaseRequisition = item["GeneratePurchaseRequisition"]
            if (picture == null) {
                picture = "Image/Image_not_available.png"
            }
            const newChild = {
                id: id,
                materialId: child,
                name: materialNumber,
                description: description,
                type: materialType,
                image: picture,
                quantity: quantity,
                price: price,
                currencyCode: currencyCode,
                actualPrice: actualPrice,
                routing: routing,
                generateProductionOrder: generateProductionOrder,
                generatePurchaseRequisition: generatePurchaseRequisition,
                relationship: '100',
                children: [],
                main: false
            }
            this.addChildById(tree, parentUniqueId, newChild)
        }

        let result = this.removeEmptyChildren(tree);
        return result
    }
    public HierarchyChart() {

        const json = [
            [1, 1, 2, 0],
            [1, 1, 3, 5.5],
            [1, 2, 4, 0],
            [1, 2, 5, 3],
            [1, 4, 6, 1.5],
            [1, 3, 7, 2]

        ]
        let firstLayer = 0
        function calculateCosting(nodeId, tree) {
            const children = tree.filter((item) => item[1] === nodeId)
            if (children.length == 0) {
                let nodeIndex = json.findIndex((item) => item[2] === nodeId);
                if (nodeIndex != -1) {
                    json[nodeIndex][4] = 0;
                }

                return 0
            }
            let totalPrice = 0;
            for (const child of children) {
                const childId = child[2];
                const childPrice = child[3];

                const childTotalPrice = calculateCosting(childId, tree);
                totalPrice += childPrice + childTotalPrice;
            }
            const nodeIndex = json.findIndex((item) => item[2] === nodeId);
            if (nodeIndex == -1) {
                firstLayer = totalPrice
            }
            else {
                json[nodeIndex][4] = totalPrice;
            }

            return totalPrice;
        }


        const rootId = json[0][0];
        calculateCosting(1, json)
        //console.log(json,firstLayer)
    }



}