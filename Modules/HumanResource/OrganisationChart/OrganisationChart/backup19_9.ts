import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { OrganisationChartGrid } from './OrganisationChartGrid';
import OrgChart from "../../OrgChart.js/src/orgchart.js"
import appendStyle from './OrgChartStyle';
import flowy from "../../flowy-master/engine/flowy.js"
import { isEmptyOrNull } from '@serenity-is/corelib/q';
import { indexOf } from '@serenity-is/corelib';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { isEmptyObject } from 'jquery';
import { Source } from 'ol/source';
import { EmployeeProfileService } from '../../ServerTypes/EmployeeProfile';
import { getLookup } from '@serenity-is/corelib/q';
import { OrganisationChartService } from '../../ServerTypes/OrganisationChart';
import { DepartmentService } from '../../ServerTypes/Department';
import { DivisionService } from '../../ServerTypes/Division';
import { SectionService } from '../../ServerTypes/Section';
import { confirmDialog, confirm, notifySuccess, notifyError, notifyInfo } from '@serenity-is/corelib/q';

//import OrgChart from 'orgchart'
export default function pageInit() {
    //if its parent of orgtree, set type as 0
    enum CardType {
        DEPARTMENT = 1,
        DIVISION = 2,
        SECTION = 3,
        EMPLOYEE = 4,
    }
    const enumNames = Object.keys(CardType).filter(key => isNaN(Number(key)));
    function containsEnumName(targetString: string): string[] {
        return enumNames.filter(name => targetString.includes(name));
    }
    const enumNameToValue = Object.fromEntries(
        enumNames.map(name => [name, CardType[name as keyof typeof CardType]])
    );
    function capitalizeFirstLetter(string) {
        if (string.length === 0) return ''; // Handle empty strings

        // Convert the first character to uppercase and the rest to lowercase
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    function getEnumNameFromValue(value: number): string | undefined {
        return CardType[value];
    }
    function getEnumValueFromString(targetString: string): number | undefined {
        // Find the matching enum name
        const matchingName = enumNames.find(name => targetString.includes(name));
        // Return the corresponding enum value
        return matchingName ? enumNameToValue[matchingName] : undefined;
    }
    function findMax(numbers: number[]): number {
        if (numbers.length === 0)
            throw new Error("The list is empty.");
        return Math.max(...numbers);
    }
    const numbers: number[] = [];
    for (const key of Object.keys(CardType)) {
        // Skip numeric keys which are reverse mappings
        if (isNaN(Number(key))) {
            const value = CardType[key as keyof typeof CardType];
            numbers.push(value)
        }
    }
    const EmployeeEnum: number = findMax(numbers);
    var StyleLink = appendStyle()
    document.head.appendChild(StyleLink)
    var container = document.createElement('div')
    container.id = "chart-container"
    var DepartmentPanel = document.createElement('div')
    DepartmentPanel.id = "DepartmentPanel"
    DepartmentPanel.className = "tabcontent"
    var DivisionPanel = document.createElement('div')
    DivisionPanel.id = "DivisionPanel"
    DivisionPanel.className = "tabcontent"
    var SectionPanel = document.createElement('div')
    SectionPanel.id = "SectionPanel"
    SectionPanel.className = "tabcontent"
    var EmployeePanel = document.createElement('div')
    EmployeePanel.id = "EmployeePanel"
    EmployeePanel.className = "tabcontent"
    var OccupationTable = getLookup("Occupation.Occupation")
    interface Node {
        id: number;
        name: string;   // The name of the person
        title: string;  // The job title of the person
        className: string;
        children?: Node[];
        nodeTitlePro: number;
        nodeContentPro: number;
    }
    interface Employee {
        id: number;
        ImgPath: string;
        OccupationId: number;
        EmployeeName: string;
        SectionId: number;
        DepartmentId: number;
        DivisionId: number;
    }
    var ListOfEmployeeData: Employee[] = []
    //{'nodeTitlePro': hierarchy , 'id':'{Department/Division/Section Id}', 'name': '{EmployeeName}', 'title': 'Department/Division/Section Name', 'className': "Hierarchy" }
    let datascource
    let datascource2
    OrganisationChartService.List({
    }, response => {
        var OrgChartStr = ""
        var maxId = 0
        var readIndex = 0
        for (var index in response.Entities) {
            if (response.Entities[index].Id > maxId) {
                maxId = response.Entities[index].Id
                readIndex = parseInt(index)
                OrgChartStr = response.Entities[readIndex].OrgChart
            }
        }
        function extractIds(data) {
            const ids = [];
            function traverse(node) {
                if (node && typeof node === 'object') {
                    if (node.hasOwnProperty('id'))
                        ids.push(parseInt(node.id));
                    if (Array.isArray(node.children))
                        node.children.forEach(child => traverse(child));
                }
            }
            traverse(data);
            return ids;
        }
        if (!isEmptyOrNull(OrgChartStr)) {
            datascource = JSON.parse(OrgChartStr)
            datascource2 = JSON.parse(JSON.stringify(datascource))
        }
        const ids = extractIds(datascource);
        DepartmentService.List({}, response => {
            var DepartmentContent = document.createElement('div')
            DepartmentContent.className = 'side-div'
            var DepartmentTable = document.createElement('table')
            DepartmentTable.id = "DepartmentTable"
            DepartmentContent.appendChild(DepartmentTable)
            var DepartmentRow = document.createElement('tr')
            for (var index in response.Entities) {
                var ElementId = response.Entities[index].Id
                var CardText = response.Entities[index].Name
                var EmployeeCard = GenerateCard(ElementId, CardText, CardType.DEPARTMENT)
                DepartmentRow.appendChild(EmployeeCard)
            }
            DepartmentTable.appendChild(DepartmentRow)
            DepartmentPanel.appendChild(DepartmentContent)
            DivisionService.List({}, response => {
                var DivisionContent = document.createElement('div')
                DivisionContent.className = 'side-div'
                var DivisionTable = document.createElement('table')
                DivisionTable.id = "DivisionTable"
                DivisionContent.appendChild(DivisionTable)
                var DivisionRow = document.createElement('tr')
                for (var index in response.Entities) {
                    var ElementId = response.Entities[index].Id
                    var CardText = response.Entities[index].Name
                    var EmployeeCard = GenerateCard(ElementId, CardText, CardType.DIVISION)
                    DivisionRow.appendChild(EmployeeCard)
                }
                DivisionTable.appendChild(DivisionRow)
                DivisionPanel.appendChild(DivisionContent)
                SectionService.List({}, response => {
                    var SectionContent = document.createElement('div')
                    SectionContent.className = 'side-div'
                    var SectionTable = document.createElement('table')
                    SectionTable.id = "SectionTable"
                    SectionContent.appendChild(SectionTable)
                    var SectionRow = document.createElement('tr')
                    //SectionRow.className = 'row'
                    for (var index in response.Entities) {
                        var ElementId = response.Entities[index].Id
                        var CardText = response.Entities[index].Name
                        var EmployeeCard = GenerateCard(ElementId, CardText, CardType.SECTION)
                        SectionRow.appendChild(EmployeeCard)
                    }
                    SectionTable.appendChild(SectionRow)
                    SectionPanel.appendChild(SectionContent)
                    EmployeeProfileService.List({}, response => {
                        var EmployeeContent = document.createElement('div')
                        EmployeeContent.className = 'side-div'
                        var EmployeeTable = document.createElement('table')
                        EmployeeTable.id = "EmployeeTable"
                        EmployeeContent.appendChild(EmployeeTable)
                        var EmployeeRow = document.createElement('tr')
                        for (var index in response.Entities) {
                            var ElementId = response.Entities[index].Id
                            var CardText = response.Entities[index].EmployeeName
                            //var EmployeeCard = GenerateCard(ElementId, CardText, CardType.EMPLOYEE)
                            var EmployeeCard = CreateEmployeeCard(ElementId, response.Entities[index].EmployeeName,
                                response.Entities[index].OccupationID, response.Entities[index].EmployeeImg)
                            EmployeeRow.appendChild(EmployeeCard)
                            ListOfEmployeeData.push({
                                'id': ElementId, 'ImgPath': response.Entities[index].EmployeeImg, 'OccupationId': response.Entities[index].OccupationID,
                                'EmployeeName': response.Entities[index].EmployeeName, 'DivisionId': response.Entities[index].DivisionID,
                                'DepartmentId': response.Entities[index].DepartmentID, "SectionId": response.Entities[index].SectionID
                            })

                        }
                        EmployeeTable.appendChild(EmployeeRow)
                        EmployeePanel.appendChild(EmployeeContent)

                        document.getElementById("chart-container").addEventListener("dragover", function (event) {
                            event.preventDefault()
                        })
                        document.getElementById("chart-container").addEventListener("drop", function (event) {
                            var data = event.dataTransfer.getData('text/plain');
                            console.log(data)
                            const jsonObject = JSON.parse(data);
                            console.log(jsonObject)
                            if ($('#chart-container').children().length == 0) {
                                if (!isEmptyOrNull(data)) {
                                    var title = null
                                    console.log(data)
                                    console.log(data.indexOf("FromExternalSource"))
                                    var name = null
                                    var id = null
                                    if (jsonObject.external) { // externla move

                                        if (jsonObject.nodeTitlePro > 1) //parent must be department
                                        {
                                            notifyError("The top must be a department")
                                            return
                                        }

                                        id = jsonObject.id
                                        title = jsonObject.title
                                        var EnumName = getEnumNameFromValue(jsonObject.nodeTitlePro)
                                        console.log(EnumName)
                                        var exactClassSelector = `[id="${jsonObject.id}"]`;
                                        var elementExactClass = $(exactClassSelector)

                                        if (jsonObject.external)
                                            elementExactClass.remove()
                                        //const matches = containsEnumName(elementExactClass.attr('class'));
                                        //const enumValue = getEnumValueFromString(elementExactClass.attr('class'));
                                        name = jsonObject.name
                                    }
                                    console.log(data.indexOf("FromExternalSource"))
                                    console.log(data)
                                    console.log('from ' + data)
                                    console.log('to ' + $(event.target).parent().attr('class'))
                                    if (isEmptyOrNull(name))
                                        name = title
                                    console.log(jsonObject.nodeTitlePro)
                                    var HierarchyValue = parseInt(jsonObject.nodeTitlePro) //is parent
                                    const bufferNode: Node = { 'nodeContentPro': null, 'nodeTitlePro': HierarchyValue, 'id': id, 'name': name, 'title': title, 'className': id + " Class" };
                                    console.log(bufferNode)
                                    console.log($('#chart-container').children().length)
                                    datascource2 = bufferNode
                                    datascource = JSON.parse(JSON.stringify(datascource2))
                                    console.log(orgchart)
                                    orgchart = new OrgChart({
                                        'chartContainer': '#chart-container',
                                        'data': datascource,
                                        // 'depth': 9999,
                                        'nodeContent': 'title',
                                        'nodeId': 'thisOrgChart',
                                        'exportButton': true,
                                        'exportFilename': 'MyOrgChart',
                                        'createNode': function ($node, data) {
                                            let ListCounter = 0, found = 0
                                            for (ListCounter = 0; ListCounter < ListOfEmployeeData.length; ListCounter++) {
                                                if (ListOfEmployeeData[ListCounter].id == data.nodeContentPro) {
                                                    found = 1
                                                    break
                                                }
                                            }
                                            if (found == 0)
                                                return
                                            var imgPath = ListOfEmployeeData[ListCounter].ImgPath;
                                            console.log(imgPath)
                                            const img = document.createElement('img');
                                            img.src = `/upload/${imgPath}`;
                                            img.className = 'avatar';
                                            img.crossOrigin = 'anonymous'
                                            img.draggable = false
                                            $node.querySelector('.title').appendChild(img);
                                            const contentElement = $node.querySelector('.content');
                                            const symbolElement = $node.querySelector('.symbol');
                                            if (contentElement && symbolElement)
                                                contentElement.insertBefore(symbolElement, contentElement.firstChild);
                                        }

                                        /*
                                        'createNode': function ($node, data) {
                                            let ListCounter = 0
                                            for (ListCounter = 0; ListCounter < ListOfEmployeeImg.length; ListCounter++) {
                                                console.log(ListOfEmployeeImg[ListCounter])
                                                if (ListOfEmployeeImg[ListCounter].id == data.id)
                                                    break
                                            }
                                            var imgPath = ListOfEmployeeImg[ListCounter].ImgPath;
                                            console.log(imgPath)
                                            const img = document.createElement('img');
                                            // console.log(data.id)
                                            // Set the src and class attributes
                                            img.src = `/upload/${imgPath}`;
                                            img.className = 'avatar';
                                            img.crossOrigin = 'anonymous'
                                            img.draggable = false
                                            $node.querySelector('.title').appendChild(img);
                                            const contentElement = $node.querySelector('.content');
                                            const symbolElement = $node.querySelector('.symbol');
                                            if (contentElement && symbolElement)
                                                contentElement.insertBefore(symbolElement, contentElement.firstChild);
                                        }
                                        */
                                    });
                                    ArrangePanel(EnumName)
                                    const jsonString = JSON.stringify(datascource);
                                    /*
                                    OrganisationChartService.Create({
                                        Entity:
                                        {
                                            "OrgChart": jsonString,

                                        },
                                    });
                                    */
                                    setCallbacks()
                                    console.log(elementExactClass)
                                    event.dataTransfer.dropEffect = 'none';
                                    EmployeeCardCallBack();

                                    ClearEmptyTd();
                                }
                                event.stopImmediatePropagation();
                            }
                        })
                        EmployeeCardCallBack()

                    })
                })
            })
        })
        function open(evt, id) {
            // Declare all variables
            var i, tabcontent, tablinks;
            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++)
                tabcontent[i].style.display = "none";
            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++)
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            // Show the current tab, and add an "active" class to the button that opened the tab
            if (document.getElementById(id) != null)
                document.getElementById(id).style.display = "block";
            evt.currentTarget.className += " active";
        }
        var ShiftTabNode = document.createElement('DIV');
        ShiftTabNode.setAttribute("class", "tabcontent");
        ShiftTabNode.setAttribute("id", "shifttab");
        ShiftTabNode.appendChild(DepartmentPanel)

        var ContentRow = document.createElement("div")
        ContentRow.setAttribute("class", "row")
        var TabRowNode = document.createElement('div');
        TabRowNode.setAttribute("class", "tab");

        document.querySelector('#GridDiv').appendChild(container);
        ContentRow.appendChild(TabRowNode)

        ContentRow.appendChild(DivisionPanel)
        ContentRow.appendChild(SectionPanel)
        ContentRow.appendChild(DepartmentPanel)
        ContentRow.appendChild(EmployeePanel)

        document.querySelector('.content').appendChild(ContentRow);

        var DepartmentTableButton = document.createElement('button');
        DepartmentTableButton.addEventListener('click', function () { open(event, 'DepartmentPanel'); }, false);
        DepartmentTableButton.setAttribute("class", "tablinks");
        DepartmentTableButton.innerText = 'Department'
        DepartmentTableButton.setAttribute("id", "defaultOpen");
        var DivisionTableButton = document.createElement('button');
        DivisionTableButton.addEventListener('click', function () { open(event, 'DivisionPanel'); }, false);
        DivisionTableButton.setAttribute("class", "tablinks");
        DivisionTableButton.innerText = 'Division'
        var SectionTableButton = document.createElement('button');
        SectionTableButton.addEventListener('click', function () { open(event, 'SectionPanel'); }, false);
        SectionTableButton.setAttribute("class", "tablinks");
        SectionTableButton.innerText = 'Section'

        var EmployeeTableButton = document.createElement('button');
        EmployeeTableButton.addEventListener('click', function () { open(event, 'EmployeePanel'); }, false);
        EmployeeTableButton.setAttribute("class", "tablinks");
        EmployeeTableButton.innerText = 'Employee'
        TabRowNode.appendChild(DepartmentTableButton)
        TabRowNode.appendChild(DivisionTableButton)
        TabRowNode.appendChild(SectionTableButton)
        TabRowNode.appendChild(EmployeeTableButton)
        // EmployeeTableButton.click();//open shift tab on default
        let orgchart = null

    });
    function removeNodeByName(root, TargetClassName: string): boolean {
        // Check if the root node matches the target
        if (root.className === TargetClassName)
            return true;
        // If there are children, check them recursively
        if (root.children) {
            for (let i = 0; i < root.children.length; i++) {
                if (removeNodeByName(root.children[i], TargetClassName)) {
                    // Remove the child node from the parent's children array
                    root.children.splice(i, 1);
                    return false; // Stop searching once the node is removed
                }
            }
        }
        return false; // Return false if the target node was not found
    }
    function addChildren(root, TargetClassName: string, newNode: Node): boolean {
        // If the current node's name matches the target name, add the new node
        if (root.className === TargetClassName) {
            if (!root.children)
                root.children = [newNode];
            else
                root.children.push(newNode);
            return true; // Node found and new node added
        }
        if (root.children)
            for (const child of root.children)
                if (addChildren(child, TargetClassName, newNode))
                    return false; // Stop recursion after adding the node

        return false; // Target node not found
    }
    function addSibling(root, TargetClassName: string, newNode: Node): boolean {
        if (root.children) {
            for (let i = 0; i < root.children.length; i++) {
                const child = root.children[i];
                if (child.className === TargetClassName) {
                    // Insert newNode at the same level
                    root.children.splice(i + 1, 0, newNode);
                    return true; // Node added, no need to continue
                }
                // Recursively search for the target node
                if (addSibling(child, TargetClassName, newNode))
                    return true; // Stop recursion after adding the nod
            }
        }
        return false; // Target node not found
    }
    function findTitleByClassName(data, className) {
        // Check if current node has the className
        if (data.className === className)
            return data.title;
        // If there are children, search them recursively
        if (data.children) {
            for (const child of data.children) {
                const result = findTitleByClassName(child, className);
                if (result)
                    return result;
            }
        }
        // Return null if className is not found
        return null;
    }
    function findIdByClassName(data, className) {
        // Check if current node has the className
        if (data.className === className)
            return data.id;
        // If there are children, search them recursively
        if (data.children) {
            for (const child of data.children) {
                const result = findIdByClassName(child, className);
                if (result)
                    return result;
            }
        }
        // Return null if className is not found
        return null;
    }
    function deleteNodeByClassNameAndTitle(data, className, title) {
        // Check if the current node matches the criteria

        if (data.className && data.title && data.className.trim() === className.trim() && data.title.trim() === title.trim())
            return null; // Return null to indicate deletion
        // If the node has children, check them
        if (data.children) {
            // Filter children and apply the function recursively
            data.children = data.children
                .map(child => deleteNodeByClassNameAndTitle(child, className, title))
                .filter(child => child !== null);
        }
        return data; // Return the modified node
    }
    function removeEmptyChildren(obj) {
        if (isEmptyOrNull(obj))
            return
        if (obj.children) {
            // Recursively process each child
            obj.children.forEach(child => removeEmptyChildren(child));
            // Remove the 'children' property if it is empty
            if (obj.children.length === 0)
                delete obj.children;
        }
    }
    function findChildrenByClassName(root, className) {
        // If the current node matches the className, return its children
        if (root.className.trim() === className.trim())
            return root.children || [];
        if (root.children && Array.isArray(root.children)) {
            for (let child of root.children) {
                let result = findChildrenByClassName(child, className);
                if (result)
                    return result;
            }
        }
        return null;
    }
    function ClearEmptyTd() {
        for (const key of Object.keys(CardType)) {
            // Skip numeric keys which are reverse mappings
            if (isNaN(Number(key))) {
                const value = CardType[key as keyof typeof CardType];
                var TargetTable = document.body.querySelector("#" + capitalizeFirstLetter(key) + "Table")
                if (!isEmptyOrNull(TargetTable)) {
                    var TRs = TargetTable.children
                    if (TRs.length > 0) {
                        for (let j = 0; j < TRs.length; j++) {
                            var Tds = TRs[j].children
                            if (TRs[j].children.length == 0) {
                                TRs[j].remove()
                                continue
                            }
                            for (let i = 0; i < Tds.length; i++) {
                                var Td = Tds[i]
                                if (Td.children.length == 0)
                                    Td.remove()
                            }
                        }
                    }
                }
            }
        }
    }
    function setCallbacks() { //callback for node on orgchart
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    var nodes = document.getElementsByClassName("node");
                    if (nodes.length > 0) {
                        let ElementArray: any[] = []
                        for (let j = 0; j < nodes.length; j++) {
                            var TargetElement = nodes[j] as HTMLDivElement
                            //console.log(TargetElement.className)
                            ElementArray.push(TargetElement)
                            ElementArray[j].addEventListener("dragover", function (event) {
                                const dragEvent = event as DragEvent;
                                if (dragEvent.dataTransfer) {
                                    event.preventDefault()
                                    dragEvent.dataTransfer.dropEffect = 'move';  // Indicate the drop action
                                    event.stopImmediatePropagation();
                                }
                            })
                            var jsonObject = JSON.parse(ElementArray[j].getAttribute('data-source'));
                            var relation = jsonObject.relationship
                            if (relation != '001' || nodes.length == 1)
                                ElementArray[j].draggable = true
                            ElementArray[j].addEventListener("drop", function (event) {
                                var data = event.dataTransfer.getData('text/plain'); // oobtain the data of the dropped element
                                const jsonObject = JSON.parse(data);
                                var EventTargetElement = $(event.target)
                                if (EventTargetElement.parent().attr('class') == "title")
                                    EventTargetElement = EventTargetElement.parent()
                                if (!isEmptyOrNull(data)) {
                                    var title = null
                                    var name = null
                                    var EmployeeName = null
                                    var id = null
                                    var hierarchy = null
                                    if (jsonObject.external) { // externla move
                                        id = jsonObject.id
                                        title = jsonObject.title
                                        name = jsonObject.name
                                        hierarchy = jsonObject.nodeTitlePro
                                        var EventTargetJson = JSON.parse(EventTargetElement.parent().attr("data-source"))
                                        var EventTargetHierarchy = EventTargetJson.nodeTitlePro
                                        console.log(jsonObject.parentId)
                                        console.log(EventTargetJson.parentId)
                                        console.log(isEmptyOrNull(EventTargetJson.parentId))

                                        if (EventTargetHierarchy >= hierarchy && !isEmptyOrNull(EventTargetJson.parentId)) {
                                            var String = capitalizeFirstLetter(getEnumNameFromValue(EventTargetHierarchy)) + ' cannot be above ' +
                                                capitalizeFirstLetter(getEnumNameFromValue(hierarchy))
                                            notifyError(String)
                                            return
                                        }
                                        var EnumName = getEnumNameFromValue(parseInt(jsonObject.nodeTitlePro))
                                        var exactClassSelector = `[id="${jsonObject.id}"]`;
                                        var elementExactClass = $(exactClassSelector)
                                        regex = /card\s+(\w+\s+\w+)\s+Class/;
                                    }
                                    var targetElementId = parseInt(EventTargetElement.parent().attr('class').replace('node', '').replace('Class', '').trim())
                                    if (targetElementId == parseInt(jsonObject.parentId) &&
                                        jsonObject.parentId !== undefined && targetElementId !== undefined)
                                        return
                                    if (isEmptyOrNull(jsonObject.parentId) && isEmptyOrNull(jsonObject.external))
                                        return
                                    if (isEmptyOrNull(EventTargetElement.parent().attr('class')))
                                        return
                                    var ClassName = jsonObject.className
                                    if (ClassName == null)
                                        ClassName = jsonObject.id
                                    if (hierarchy == null)
                                        hierarchy = jsonObject.nodeTitlePro
                                    var DestinationNode = EventTargetElement.parent().attr('class').replace('node', '').trim().replace('focused', '')
                                    if (DestinationNode == ClassName)
                                        return
                                    if (jsonObject.external == null)
                                        title = findTitleByClassName(datascource2, ClassName);
                                    if (id == null)
                                        id = findIdByClassName(datascource2, ClassName);
                                    if (name == null) {
                                        name = ClassName.replace('Class', '').trim()
                                        name = name.replace('focused', '')
                                    }
                                    name = name.replace('focused', '')
                                    if (EmployeeName == null)
                                        EmployeeName = jsonObject.name
                                    console.log(hierarchy)
                                    if (hierarchy != EmployeeEnum) {
                                        console.log('from ' + jsonObject.className)
                                        console.log('to ' + EventTargetElement.parent().attr('class'))
                                        var regex = /EmployeeRowId:\d+\s*/;
                                        var child_list = findChildrenByClassName(datascource2, ClassName)
                                        for (var index in child_list) {
                                            if (child_list[index].id == jsonObject.id)
                                                return
                                        }
                                        var ParentId = jsonObject.parentId
                                        var HierarchyValue = parseInt(jsonObject.nodeTitlePro)
                                        datascource2 = deleteNodeByClassNameAndTitle(datascource2, ClassName, title)
                                        if (!isEmptyOrNull(ParentId) && !ParentId.endsWith('Class'))
                                            ParentId = ParentId + ' Class';
                                        console.log(datascource2)
                                        for (var index in child_list) {
                                            console.log(jsonObject.nodeTitlePro)
                                            var EnumName = getEnumNameFromValue(child_list[index].nodeTitlePro)
                                            var bufferNode: Node = {
                                                'nodeContentPro': null,
                                                'nodeTitlePro': child_list[index].nodeTitlePro, 'id': child_list[index].id, 'name': child_list[index].name,
                                                'title': child_list[index].title, 'className': child_list[index].id + " Class"
                                            };
                                            console.log('haha')
                                            console.log(bufferNode)
                                            console.log(ParentId)
                                            console.log('from ' + child_list[index].title)
                                            console.log('to ' + EventTargetElement.parent().attr('class'))
                                            console.log(datascource2)
                                            console.log(addChildren(datascource2, ParentId, bufferNode))
                                        }
                                        EnumName = getEnumNameFromValue(jsonObject.nodeTitlePro)
                                        var bufferNode: Node = {
                                            'nodeContentPro': null,
                                            'nodeTitlePro': HierarchyValue, 'id': id, 'name': title,
                                            'title': title, 'className': id + " Class"
                                        };
                                        addChildren(datascource2, DestinationNode, bufferNode)
                                        removeEmptyChildren(datascource2)

                                    }
                                    else {//user drop the employee 
                                        console.log(datascource2)
                                        console.log(DestinationNode)
                                        console.log(id)
                                        const regex = /\d+/;
                                        var destinationHierarchy
                                        for (const key of Object.keys(CardType)) {
                                            if (isNaN(Number(key))) {
                                                const value = CardType[key as keyof typeof CardType];
                                                if (DestinationNode.includes(CardType[value])) {
                                                    destinationHierarchy = value
                                                    console.log(CardType[value])
                                                    console.log(DestinationNode)
                                                    var match = DestinationNode.match(regex);
                                                    var destinationHierarchyId = parseInt(match[0])
                                                    break
                                                }
                                            }
                                        }
                                        id = parseInt(id.replace(CardType[EmployeeEnum], ""))
                                        let ListCounter = 0
                                        for (ListCounter = 0; ListCounter < ListOfEmployeeData.length; ListCounter++) {
                                            if (ListOfEmployeeData[ListCounter].id == id) {
                                                break
                                            }
                                        }
                                        var employeeName = ListOfEmployeeData[ListCounter].EmployeeName
                                        console.log(ListOfEmployeeData)
                                        console.log(EventTargetJson)
                                        if (ListOfEmployeeData[ListCounter][capitalizeFirstLetter(CardType[destinationHierarchy]) + 'Id'] != destinationHierarchyId) {
                                            var String = ListOfEmployeeData[ListCounter].EmployeeName + ' is not in ' + EventTargetJson.name + ' '
                                                + capitalizeFirstLetter(CardType[destinationHierarchy]);
                                            notifyError(String)
                                            return
                                        }
                                        console.log(`SectionId ${ListOfEmployeeData[ListCounter]['SectionId']}`)
                                        console.log(capitalizeFirstLetter(CardType[destinationHierarchy]) + 'Id')
                                        console.log(`SectionId ${ListOfEmployeeData[ListCounter][capitalizeFirstLetter(CardType[destinationHierarchy]) + 'Id']}`)
                                        SetEmployeeByClassName(datascource2, DestinationNode, id, employeeName)
                                        console.log(datascource2)
                                    }
                                    if (jsonObject.external)
                                        elementExactClass.remove()
                                    var orgChartElement = document.getElementById("chart-container")
                                    orgChartElement.innerHTML = ''
                                    for (let i = 0; i < orgChartElement.children.length; i++)
                                        orgChartElement.children[i].remove()
                                    if (!isEmptyOrNull(datascource2)) {
                                        datascource = JSON.parse(JSON.stringify(datascource2))
                                        let orgchart = new OrgChart({
                                            'chartContainer': '#chart-container',
                                            'data': datascource,
                                            'nodeContent': 'title',
                                            'nodeId': 'thisOrgChart',
                                            'exportButton': true,
                                            'exportFilename': 'MyOrgChart',
                                            'createNode': function ($node, data) {
                                                let ListCounter = 0, found = 0
                                                for (ListCounter = 0; ListCounter < ListOfEmployeeData.length; ListCounter++) {
                                                    if (ListOfEmployeeData[ListCounter].id == data.nodeContentPro) {
                                                        found = 1
                                                        break
                                                    }
                                                }
                                                if (found == 0)
                                                    return
                                                var imgPath = ListOfEmployeeData[ListCounter].ImgPath;
                                                console.log(imgPath)
                                                const img = document.createElement('img');
                                                img.src = `/upload/${imgPath}`;
                                                img.className = 'avatar';
                                                img.crossOrigin = 'anonymous'
                                                img.draggable = false
                                                $node.querySelector('.title').appendChild(img);
                                                const contentElement = $node.querySelector('.content');
                                                const symbolElement = $node.querySelector('.symbol');
                                                if (contentElement && symbolElement)
                                                    contentElement.insertBefore(symbolElement, contentElement.firstChild);
                                            }


                                        })
                                        var EnumName = getEnumNameFromValue(jsonObject.nodeTitlePro)
                                        ArrangePanel(EnumName)

                                    }
                                    setCallbacks()
                                    event.dataTransfer.dropEffect = 'none';


                                    ClearEmptyTd()
                                    const jsonString = JSON.stringify(datascource2)
                                    /*
                                    OrganisationChartService.Create({
                                        Entity:
                                        {
                                            "OrgChart": jsonString,
                                        },
                                    });
                                    */
                                }
                                event.stopImmediatePropagation();
                            })
                            ElementArray[j].addEventListener("dragstart", function (event) {
                                var text = event.target.getAttribute('data-source')
                                console.log(text)
                                const jsonObject = JSON.parse(text);
                                console.log(jsonObject.relationship)
                                event.dataTransfer.setData('text/plain', text);
                                event.dataTransfer.dropEffect = 'move';  // Set the drop effect
                                event.stopImmediatePropagation();
                            })
                        }
                        observer.disconnect(); // Stop observing after finding the nodes
                    }
                    var AvatarNodes = document.getElementsByClassName("avatar")
                    for (let j = 0; j < AvatarNodes.length; j++) {
                        var AvatarNode = AvatarNodes[j] as HTMLElement
                        AvatarNode.draggable = false
                    }
                    var panel = document.getElementsByClassName("side-div");
                    for (let i = 0; i < panel.length; i++) {
                        panel[i].addEventListener("drop", function (event) {
                            var data = event.dataTransfer.getData('text/plain');
                            const jsonObject = JSON.parse(data)
                            console.log(jsonObject)
                            var hierarchy = jsonObject.nodeTitlePro
                            if (jsonObject.external)
                                return
                            var id = jsonObject.id
                            var title = jsonObject.title
                            var name = jsonObject.name
                            var ClassName = jsonObject.className
                            if (ClassName == null)
                                ClassName = jsonObject.id
                            var child_list = findChildrenByClassName(datascource2, ClassName)
                            var ParentId = getEnumNameFromValue(jsonObject.nodeTitlePro) + jsonObject.parentId
                            datascource2 = deleteNodeByClassNameAndTitle(datascource2, ClassName, title)
                            if (!isEmptyOrNull(ParentId) && !ParentId.endsWith('Class'))
                                ParentId = ParentId + ' Class';
                            console.log(child_list)
                            for (var index in child_list) {
                                console.log(jsonObject.nodeTitlePro)
                                var EnumName = getEnumNameFromValue(child_list[index].nodeTitlePro)
                                var bufferNode: Node = {
                                    'nodeContentPro': null,
                                    'nodeTitlePro': child_list[index].nodeTitlePro, 'id': child_list[index].id, 'name': child_list[index].name,
                                    'title': child_list[index].title, 'className': child_list[index].id + " Class"
                                };

                                addChildren(datascource2, ParentId, bufferNode)
                            }






                            removeEmptyChildren(datascource2)
                            var orgChartElement = document.getElementById("chart-container")
                            orgChartElement.innerHTML = ''
                            datascource = JSON.parse(JSON.stringify(datascource2))
                            console.log(datascource)
                            console.log(datascource2)
                            if (!isEmptyOrNull(datascource2)) {
                                let orgchart = new OrgChart({
                                    'chartContainer': '#chart-container',
                                    'data': datascource,
                                    'nodeContent': 'title',
                                    'nodeId': 'thisOrgChart',
                                    'exportButton': true,
                                    'exportFilename': 'MyOrgChart',
                                    'createNode': function ($node, data) {
                                        let ListCounter = 0, found = 0
                                        for (ListCounter = 0; ListCounter < ListOfEmployeeData.length; ListCounter++) {
                                            if (ListOfEmployeeData[ListCounter].id == data.nodeContentPro) {
                                                found = 1
                                                break
                                            }
                                        }
                                        if (found == 0)
                                            return
                                        var imgPath = ListOfEmployeeData[ListCounter].ImgPath;
                                        console.log(imgPath)
                                        const img = document.createElement('img');
                                        img.src = `/upload/${imgPath}`;
                                        img.className = 'avatar';
                                        img.crossOrigin = 'anonymous'
                                        img.draggable = false
                                        $node.querySelector('.title').appendChild(img);
                                        const contentElement = $node.querySelector('.content');
                                        const symbolElement = $node.querySelector('.symbol');
                                        if (contentElement && symbolElement)
                                            contentElement.insertBefore(symbolElement, contentElement.firstChild);
                                    }

                                });
                                setCallbacks()
                            }
                            else {
                                document.getElementById("chart-container").addEventListener("dragover", function (event) {
                                    event.preventDefault()
                                })
                                document.getElementById("chart-container").addEventListener("drop", function (event) {
                                    var data = event.dataTransfer.getData('text/plain');
                                    const jsonObject = JSON.parse(data);
                                    if ($('#chart-container').children().length == 0) {
                                        if (!isEmptyOrNull(data)) {
                                            var title = null
                                            var name = null
                                            var id = null
                                            if (jsonObject.external) { // externla move
                                                id = jsonObject.id
                                                title = jsonObject.title
                                                var exactClassSelector = `[id="${jsonObject.id}"]`;
                                                var elementExactClass = $(exactClassSelector)
                                                name = jsonObject.name
                                            }
                                            var bufferNode: Node = {
                                                'nodeContentPro': null,
                                                'nodeTitlePro': jsonObject.nodeTitlePro, 'id': id, 'name': name,
                                                'title': title, 'className': id + " Class"
                                            };
                                            datascource2 = bufferNode
                                            datascource = JSON.parse(JSON.stringify(datascource2))
                                            let orgchart = new OrgChart({
                                                'chartContainer': '#chart-container',
                                                'data': datascource,
                                                // 'depth': 9999,
                                                'nodeContent': 'title',
                                                'nodeId': 'thisOrgChart',
                                                'exportButton': true,
                                                'exportFilename': 'MyOrgChart',
                                                'createNode': function ($node, data) {
                                                    let ListCounter = 0, found = 0
                                                    for (ListCounter = 0; ListCounter < ListOfEmployeeData.length; ListCounter++) {
                                                        if (ListOfEmployeeData[ListCounter].id == data.nodeContentPro) {
                                                            found = 1
                                                            break
                                                        }
                                                    }
                                                    if (found == 0)
                                                        return
                                                    var imgPath = ListOfEmployeeData[ListCounter].ImgPath;
                                                    console.log(imgPath)
                                                    const img = document.createElement('img');
                                                    img.src = `/upload/${imgPath}`;
                                                    img.className = 'avatar';
                                                    img.crossOrigin = 'anonymous'
                                                    img.draggable = false
                                                    $node.querySelector('.title').appendChild(img);
                                                    const contentElement = $node.querySelector('.content');
                                                    const symbolElement = $node.querySelector('.symbol');
                                                    if (contentElement && symbolElement)
                                                        contentElement.insertBefore(symbolElement, contentElement.firstChild);
                                                }
                                            });
                                            const jsonString = JSON.stringify(datascource);
                                            OrganisationChartService.Create({
                                                Entity:
                                                {
                                                    "OrgChart": jsonString,
                                                },
                                            });
                                            setCallbacks()
                                            event.dataTransfer.dropEffect = 'none';
                                            if (jsonObject.external)
                                                elementExactClass.remove()
                                            ArrangePanel(EnumName)

                                        }
                                        event.stopImmediatePropagation();
                                    }
                                })
                            }
                            event.dataTransfer.dropEffect = 'none';
                            var TargetPanel
                            console.log(Object.keys(CardType))
                            var key = getEnumNameFromValue(hierarchy)
                            id = id.replace(key, "")
                            var TargetTable = document.body.querySelector("#" + capitalizeFirstLetter(key) + "Table") as HTMLElement
                            var TargetTableRows
                            var RowElementToAppend
                            var RowNumber
                            switch (hierarchy) {
                                case CardType.DEPARTMENT:
                                    console.log(TargetPanel)
                                    DepartmentService.Retrieve({
                                        EntityId: id
                                    }, response => {
                                        if (TargetTable.children.length == 0) {
                                            TargetTableRows = document.createElement('tr')
                                            TargetTable.appendChild(TargetTableRows)
                                            RowElementToAppend = TargetTableRows
                                            console.log(RowElementToAppend.offsetWidth)

                                        }
                                        else {
                                            TargetTableRows = TargetTable.children
                                            RowNumber = TargetTable.children.length
                                            RowElementToAppend = TargetTableRows[RowNumber - 1]
                                            console.log(RowElementToAppend.offsetWidth)

                                        } var Card = GenerateCard(response.Entity.Id, response.Entity.Name, CardType.DEPARTMENT)
                                        RowElementToAppend.appendChild(Card)

                                    });
                                    break;
                                case CardType.DIVISION:
                                    DivisionService.Retrieve({
                                        EntityId: id
                                    }, response => {
                                        if (TargetTable.children.length == 0) {
                                            TargetTableRows = document.createElement('tr')
                                            TargetTable.appendChild(TargetTableRows)
                                            RowElementToAppend = TargetTableRows
                                        }
                                        else {
                                            TargetTableRows = TargetTable.children
                                            RowNumber = TargetTable.children.length
                                            RowElementToAppend = TargetTableRows[RowNumber - 1]
                                            console.log(RowElementToAppend.offsetWidth)
                                        }
                                        var Card = GenerateCard(response.Entity.Id, response.Entity.Name, CardType.DIVISION)
                                        RowElementToAppend.appendChild(Card)
                                    });
                                    break;
                                case CardType.SECTION:
                                    SectionService.Retrieve({
                                        EntityId: id
                                    }, response => {
                                        if (TargetTable.children.length == 0) {
                                            TargetTableRows = document.createElement('tr')
                                            TargetTable.appendChild(TargetTableRows)
                                            RowElementToAppend = TargetTableRows
                                        }
                                        else {
                                            TargetTableRows = TargetTable.children
                                            RowNumber = TargetTable.children.length
                                            RowElementToAppend = TargetTableRows[RowNumber - 1]
                                        }
                                        var Card = GenerateCard(response.Entity.Id, response.Entity.Name, CardType.SECTION)
                                        RowElementToAppend.appendChild(Card)
                                    });
                                    break;
                                case CardType.EMPLOYEE:
                                    EmployeeProfileService.Retrieve({
                                        EntityId: id
                                    }, response => {
                                        if (TargetTable.children.length == 0) {
                                            TargetTableRows = document.createElement('tr')
                                            TargetTable.appendChild(TargetTableRows)
                                            RowElementToAppend = TargetTableRows
                                        }
                                        else {
                                            TargetTableRows = TargetTable.children
                                            RowNumber = TargetTable.children.length
                                            RowElementToAppend = TargetTableRows[RowNumber - 1]
                                        }
                                        var Card = GenerateCard(response.Entity.Id, response.Entity.EmployeeName, CardType.EMPLOYEE)
                                        RowElementToAppend.appendChild(Card)
                                    });
                                    break;
                                default:
                                // Code to execute if no cases match
                            }
                            const jsonString = JSON.stringify(datascource2)

                            event.stopImmediatePropagation();
                            EmployeeCardCallBack()
                            ClearEmptyTd()
                        })
                        panel[i].addEventListener("dragover", function (event) {
                            event.preventDefault()
                        })
                    }
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    function GenerateCard(ElementId, CardText, Type) {
        var EmployeeCol_2 = document.createElement('div')
        EmployeeCol_2.className = "flex-child"
        var EmployeeContainer = document.createElement('td')
        // EmployeeContainer.className = 'EmployeeContainer'
        var Employee = document.createElement('div')
        EmployeeContainer.appendChild(Employee)
        var CardClass = CardType[Type];
        Employee.className = "flex-container " + CardClass;
        Employee.style.border = '1px solid #ccc';
        Employee.style.padding = '10px';
        Employee.draggable = true;
        console.log(ElementId + CardClass)
        var DataSource = `{ "nodeContentPro":"null" ,"nodeTitlePro":"${Type}","id":"${CardClass + ElementId}",
        "type":"${Type}","title":"${CardText}","external": "true","ElementId": "" }`;
        Employee.setAttribute('data-source', DataSource);
        Employee.id = CardClass + ElementId.toString();
        var TitleContent = document.createElement('div');
        TitleContent.textContent = CardText;
        TitleContent.className = "CardTitle"
        EmployeeCol_2.appendChild(TitleContent)
        Employee.appendChild(EmployeeCol_2)
        Employee.addEventListener("dragstart", function (event) {
            var dragEvent = event.target as Element
            var StringToTransfer = dragEvent.getAttribute('data-source')
            event.dataTransfer.setData('text/plain', StringToTransfer);
            event.dataTransfer.dropEffect = 'move';  // Set the drop effect
        })
        Employee.addEventListener("dragend", function (event) {
        })
        return EmployeeContainer
    }
    function CreateEmployeeCard(EmployeeRowId, EmployeeName, OccupationId, EmployeeImg) {
        var EmployeeOccupation = null
        for (var LookupIndex in OccupationTable.items) {
            if (OccupationTable.items[LookupIndex].Id == OccupationId) {
                EmployeeOccupation = OccupationTable.items[LookupIndex].Name.replace(/\s/g, "")
                break
            }
        }
        var EmployeeCol_1 = document.createElement('div')
        EmployeeCol_1.className = "flex-child"
        var EmployeeCol_2 = document.createElement('div')
        //EmployeeCol_2.className = "flex-child"
        var EmployeeContainer = document.createElement('td')
        EmployeeContainer.className = 'EmployeeContainer'
        var Employee = document.createElement('div')
        EmployeeContainer.appendChild(Employee)
        Employee.className = "flex-container " + CardType[EmployeeEnum]
        Employee.style.border = '1px solid #ccc';
        Employee.style.padding = '10px';
        Employee.draggable = true
        //var DataSource = `{"id":"${EmployeeRowId}","name":"${EmployeeName}","title":"${EmployeeOccupation}","external": "true" }`;

        var DataSource = `{ "nodeContentPro":"null","name":"${EmployeeName}" ,"nodeTitlePro":"${EmployeeEnum}","id":"${CardType[EmployeeEnum] + EmployeeRowId}",
        "type":"${EmployeeEnum}","title":"${EmployeeOccupation}","external": "true","ElementId": "" }`;
        Employee.setAttribute('data-source', DataSource)
        Employee.id = CardType[EmployeeEnum] + EmployeeRowId.toString()
        var fragment = document.createElement("img");
        fragment.src = `/upload/${EmployeeImg}`;
        fragment.draggable = false
        fragment.className = 'EmployeeImage'
        var TitleContent = document.createElement('div')
        TitleContent.textContent = EmployeeName
        TitleContent.className = "CardTitle"
        var DivContent = document.createElement('div')
        DivContent.textContent = EmployeeOccupation
        DivContent.className = 'CardContent'
        EmployeeCol_1.appendChild(fragment)
        EmployeeCol_2.appendChild(TitleContent)
        EmployeeCol_2.appendChild(DivContent)
        Employee.appendChild(EmployeeCol_1)
        Employee.appendChild(EmployeeCol_2)
        Employee.addEventListener("dragstart", function (event) {
            var dragEvent = event.target as Element
            var StringToTransfer = dragEvent.getAttribute('data-source')
            event.dataTransfer.setData('text/plain', StringToTransfer);
            event.dataTransfer.dropEffect = 'move';  // Set the drop effect
        })
        Employee.addEventListener("dragend", function (event) {
        })
        return EmployeeContainer
    }
    function EmployeeCardCallBack() {
        var CardObserver = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    for (const key of Object.keys(CardType)) {
                        // Skip numeric keys which are reverse mappings
                        if (isNaN(Number(key))) {
                            const value = CardType[key as keyof typeof CardType];
                            var nodes = document.getElementsByClassName(key);
                            var loopCounter = nodes.length
                            console.log(nodes)
                            if (nodes.length > 0) {
                                var butText = capitalizeFirstLetter(key)
                                console.log(butText)
                                var xPath = `//button[text()='${butText}']`
                                console.log(xPath)
                                const button = document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLElement;
                                if (button) {
                                    button.click()
                                    console.log('Button found:', button);
                                } else {
                                }
                                var TargetPanel = document.body.querySelector("#" + capitalizeFirstLetter(key) + "Panel") as HTMLElement
                                var TargetTable = document.body.querySelector("#" + capitalizeFirstLetter(key) + "Table") as HTMLElement
                                console.log(TargetTable)
                                console.log(TargetPanel)

                                if (TargetTable.children.length) {
                                    var TargetRow = TargetTable.children[0] as HTMLElement
                                    var MaximumWidth = TargetPanel.offsetWidth
                                    console.log(`maximum width ${MaximumWidth}`)
                                    console.log(`maximum width ${TargetPanel.clientWidth}`)

                                    var NumberOfRows = TargetTable.children.length
                                    var RowCounter = 1
                                    var WidthSum = 0
                                    var LoopedId: any = []
                                    var ListOfElementId: any = []
                                    for (let j = 0; j < loopCounter; j++) {
                                        var TargetElement = nodes[j] as HTMLTableColElement
                                        var TargetElementId = TargetElement.id
                                        ListOfElementId.push(TargetElementId)
                                    }
                                    var j = 0
                                    while (j < loopCounter) {
                                        for (let p = 0; p < nodes.length; p++) {
                                            var currId = nodes[p].id
                                            if (LoopedId.indexOf(currId) == -1) {
                                                LoopedId.push(currId)
                                                var TargetElement = nodes[p] as HTMLElement;
                                                break
                                            }
                                        }
                                        if (value == EmployeeEnum) {
                                            //   console.log(TargetElement)
                                            var CardTitle = TargetElement.querySelector(".CardTitle") as HTMLElement;
                                            var CardTitleHeight = CardTitle.offsetHeight
                                            var CardContent = TargetElement.querySelector(".CardContent") as HTMLElement;
                                            var CardContentHeight = CardContent.offsetHeight
                                            var CardImg = TargetElement.querySelector(".EmployeeImage") as HTMLElement;
                                            var ImgWidth = (CardTitleHeight + CardContentHeight) / 16 * 9
                                            var ImgHeight = CardTitleHeight + CardContentHeight
                                            CardImg.style.width = ImgWidth + 'px'
                                            CardImg.style.height = ImgHeight + 'px'
                                        }
                                        var TargetElementId = TargetElement.id
                                        var CurrentWidth = TargetElement.offsetWidth
                                        console.log(TargetElement.parentElement)
                                        console.log(TargetElement.children[0])

                                        console.log(TargetElement.getBoundingClientRect())
                                        console.log(TargetElement.parentElement)
                                        console.log(TargetElement.parentElement.offsetWidth)

                                        if (CurrentWidth + WidthSum > MaximumWidth) {
                                            console.log('new row')
                                            WidthSum = 0
                                            var BufferRow
                                            if (RowCounter == NumberOfRows)//only one row
                                            {
                                                BufferRow = document.createElement('tr')
                                                TargetTable.appendChild(BufferRow)
                                            }
                                            else
                                                BufferRow = TargetTable.children[NumberOfRows - 1]
                                            var BufferTd = document.createElement('td')
                                            BufferTd.innerHTML = TargetElement.parentElement.innerHTML
                                            BufferTd.addEventListener("dragstart", function (event) {
                                                var dragEvent = event.target as Element
                                                var StringToTransfer = dragEvent.getAttribute('data-source')
                                                event.dataTransfer.setData('text/plain', StringToTransfer);
                                                event.dataTransfer.dropEffect = 'move';  // Set the drop effect
                                            })
                                            BufferTd.addEventListener("dragend", function (event) {
                                            })
                                            BufferRow.appendChild(BufferTd)
                                            RowCounter += 1
                                            TargetElement.parentElement.remove()
                                        }
                                        else {
                                            var found = false
                                            for (let i = 0; i < TargetTable.children[RowCounter - 1].children.length; i++) {
                                                var currId = TargetTable.children[RowCounter - 1].children[i].id
                                                if (currId == TargetElementId)
                                                    found = true
                                            }
                                            if (found == false) {
                                                var BufferTd = document.createElement('td')
                                                BufferTd.innerHTML = TargetElement.parentElement.innerHTML
                                                BufferTd.addEventListener("dragstart", function (event) {
                                                    var dragEvent = event.target as Element
                                                    var StringToTransfer = dragEvent.getAttribute('data-source')
                                                    event.dataTransfer.setData('text/plain', StringToTransfer);
                                                    event.dataTransfer.dropEffect = 'move';  // Set the drop effect
                                                })
                                                BufferTd.addEventListener("dragend", function (event) {
                                                })
                                                //console.log(TargetTable.children[RowCounter - 1])
                                                TargetTable.children[RowCounter - 1].appendChild(BufferTd)
                                                TargetElement.parentElement.remove()
                                                //console.log(TargetElement)
                                                //console.log(TargetElement.parentElement)
                                            }
                                        }
                                        console.log(BufferTd)
                                        WidthSum += CurrentWidth
                                        console.log(`Width sum :${WidthSum}`)
                                        j += 1
                                    }
                                }
                                ClearEmptyTd()
                                setCallbacks()
                                CardObserver.disconnect(); // Stop observing after finding the nodes
                            }
                        }
                    }
                }
            }
        });
        CardObserver.observe(document.body, { attributes: true, attributeFilter: ['style'], childList: true, subtree: true });
    }
    function SetEmployeeByClassName(root, TargetClassName, EmployeeRowId, EmployeeName) {
        // If the current node's name matches the target name, add the new node
        if (root.className === TargetClassName) {
            root.nodeContentPro = EmployeeRowId
            root.name = EmployeeName
            return true; // Node found and new node added
        }
        if (root.children)
            for (const child of root.children)
                if (SetEmployeeByClassName(child, TargetClassName, EmployeeRowId, EmployeeName))
                    return false; // Stop recursion after adding the node
        return false; // Target node not found
    }
    function ArrangePanel(key) {

        var CardObserver = new MutationObserver((mutationsList) => {
            const value = CardType[key as keyof typeof CardType];
            var nodes = document.getElementsByClassName(key);
            var loopCounter = nodes.length
            console.log(nodes)
            if (nodes.length > 0) {
                var butText = capitalizeFirstLetter(key)
                var xPath = `//button[text()='${butText}']`
                const button = document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLElement;
                if (button) {
                    button.click()
                } else {
                }
                var TargetPanel = document.body.querySelector("#" + capitalizeFirstLetter(key) + "Panel") as HTMLElement
                var TargetTable = document.body.querySelector("#" + capitalizeFirstLetter(key) + "Table") as HTMLElement
                console.log(TargetTable)
                if (TargetTable.children.length) {
                    var TargetRow = TargetTable.children[0] as HTMLElement
                    var MaximumWidth = TargetPanel.offsetWidth
                    console.log(MaximumWidth)
                    console.log(TargetPanel)

                    var NumberOfRows = TargetTable.children.length
                    var RowCounter = 1
                    var WidthSum = 0
                    var LoopedId: any = []
                    var ListOfElementId: any = []
                    for (let j = 0; j < loopCounter; j++) {
                        var TargetElement = nodes[j] as HTMLTableColElement
                        var TargetElementId = TargetElement.id
                        ListOfElementId.push(TargetElementId)
                    }
                    var j = 0
                    while (j < loopCounter) {
                        for (let p = 0; p < nodes.length; p++) {
                            var currId = nodes[p].id
                            if (LoopedId.indexOf(currId) == -1) {
                                LoopedId.push(currId)
                                var TargetElement = nodes[p] as HTMLTableColElement
                                break
                            }
                        }
                        if (value == EmployeeEnum) {
                            //   console.log(TargetElement)
                            var CardTitle = TargetElement.querySelector(".CardTitle") as HTMLElement;
                            var CardTitleHeight = CardTitle.offsetHeight
                            var CardContent = TargetElement.querySelector(".CardContent") as HTMLElement;
                            var CardContentHeight = CardContent.offsetHeight
                            var CardImg = TargetElement.querySelector(".EmployeeImage") as HTMLElement;
                            var ImgWidth = (CardTitleHeight + CardContentHeight) / 16 * 9
                            var ImgHeight = CardTitleHeight + CardContentHeight
                            CardImg.style.width = ImgWidth + 'px'
                            CardImg.style.height = ImgHeight + 'px'
                        }
                        var TargetElementId = TargetElement.id
                        var CurrentWidth = TargetElement.parentElement.offsetWidth
                        console.log(TargetElement)
                        console.log(TargetElement.parentElement.offsetWidth)
                        if (CurrentWidth + WidthSum > MaximumWidth) {
                            console.log('new row')
                            WidthSum = 0
                            var BufferRow
                            if (RowCounter == NumberOfRows)//only one row
                            {
                                BufferRow = document.createElement('tr')
                                TargetTable.appendChild(BufferRow)
                            }
                            else
                                BufferRow = TargetTable.children[NumberOfRows - 1]
                            var BufferTd = document.createElement('td')
                            BufferTd.innerHTML = TargetElement.parentElement.innerHTML
                            BufferTd.addEventListener("dragstart", function (event) {
                                var dragEvent = event.target as Element
                                var StringToTransfer = dragEvent.getAttribute('data-source')
                                event.dataTransfer.setData('text/plain', StringToTransfer);
                                event.dataTransfer.dropEffect = 'move';  // Set the drop effect
                            })
                            BufferTd.addEventListener("dragend", function (event) {
                            })
                            BufferRow.appendChild(BufferTd)
                            RowCounter += 1
                            TargetElement.parentElement.remove()
                        }
                        else {
                            var found = false
                            for (let i = 0; i < TargetTable.children[RowCounter - 1].children.length; i++) {
                                var currId = TargetTable.children[RowCounter - 1].children[i].id
                                if (currId == TargetElementId)
                                    found = true
                            }
                            if (found == false) {
                                var BufferTd = document.createElement('td')
                                BufferTd.innerHTML = TargetElement.parentElement.innerHTML
                                BufferTd.addEventListener("dragstart", function (event) {
                                    var dragEvent = event.target as Element
                                    var StringToTransfer = dragEvent.getAttribute('data-source')
                                    event.dataTransfer.setData('text/plain', StringToTransfer);
                                    event.dataTransfer.dropEffect = 'move';  // Set the drop effect
                                })
                                BufferTd.addEventListener("dragend", function (event) {
                                })
                                //console.log(TargetTable.children[RowCounter - 1])
                                TargetTable.children[RowCounter - 1].appendChild(BufferTd)
                                TargetElement.parentElement.remove()
                                //console.log(TargetElement)
                                //console.log(TargetElement.parentElement)
                            }
                        }
                        console.log(BufferTd)
                        console.log(BufferTd.offsetWidth)

                        WidthSum += CurrentWidth
                        j += 1
                    }
                }
                ClearEmptyTd()
                setCallbacks()

            }
            CardObserver.disconnect()
        })
        CardObserver.observe(document.body, { childList: true, subtree: true });

    }
}