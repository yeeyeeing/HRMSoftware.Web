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

//import OrgChart from 'orgchart'
export default function pageInit() {
    var StyleLink = appendStyle()
    document.head.appendChild(StyleLink)
    var container = document.createElement('div')
    container.id = "chart-container"
    var EmployeePanel = document.createElement('div')
    EmployeePanel.id = "EmployeePanel"
    EmployeePanel.className = "side-div"
    var OccupationTable = getLookup("Occupation.Occupation")

    interface Node {
        id: number;
        name: string;   // The name of the person
        title: string;  // The job title of the person
        className: string;
        children?: Node[];
    }

    interface Employee {
        id: number;
        ImgPath: string;
        OccupationId: number;
        EmployeeName: string;
    }

    var ListOfEmployeeImg: Employee[] = []

    /*
    let datascource = {
        'id': '1',
        'name': 'Lao Lao',
        'title': 'general manager',
        'className':"Lao Lao Class",
        'children': [
            { 'id': '2', 'name': 'Bo Miao', 'title': 'department manager', 'className': "2"},
            {
                'id': '3', 'name': 'Su Miao', 'title': 'department manager', 'className': "3",
                'children': [
                    { 'id': '4', 'name': 'Tie Hua', 'title': 'senior engineer', 'className': "4" },
                    {
                        'id': '5', 'name': 'Hei Hei', 'title': 'senior engineer', 'className': "5",
                        'children': [
                            { 'id': '6', 'name': 'Pang Pang', 'title': 'engineer', 'className': "6" },
                            { 'id': '7', 'name': 'Xiang Xiang', 'title': 'UE engineer', 'className': "7" }
                        ]
                    }
                ]
            },
            { 'id': '8', 'name': 'Yu Jie', 'title': 'department manager', 'className': "8" },
            { 'id': '9', 'name': 'Yu Li', 'title': 'department manager', 'className': "9" },
            { 'id': '10', 'name': 'Hong Miao', 'title': 'department manager', 'className': "10" },
            { 'id': '11', 'name': 'Yu Wei', 'title': 'department manager', 'className': "11" },
            { 'id': '12', 'name': 'Chun Miao', 'title': 'department manager', 'className': "12" },
            { 'id': '13', 'name': 'Yu Tie', 'title': 'department manager', 'className': "13" }
        ]
    }
   */

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
                    if (node.hasOwnProperty('id')) {
                        ids.push(parseInt(node.id));
                    }
                    if (Array.isArray(node.children)) {
                        node.children.forEach(child => traverse(child));
                    }
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
        EmployeeProfileService.List({
        }, response => {
            // var EmployeeContainer = document.createElement('td')
            var EmployeeTable = document.createElement('table')
            EmployeeTable.id = "EmployeeTable"

            var EmployeeRow = document.createElement('tr')

            for (var index in response.Entities) {
                var EmployeeRowId = response.Entities[index].Id
                ListOfEmployeeImg.push({ 'id': EmployeeRowId, 'ImgPath': response.Entities[index].EmployeeImg, 'OccupationId': response.Entities[index].OccupationID, 'EmployeeName': response.Entities[index].EmployeeName })
                if (ids.indexOf(EmployeeRowId) != -1)
                    continue
                var EmployeeCard = CreateEmployeeCard(EmployeeRowId, response.Entities[index].EmployeeName,
                    response.Entities[index].OccupationID, response.Entities[index].EmployeeImg)
                EmployeeRow.appendChild(EmployeeCard)
            }
            EmployeeTable.appendChild(EmployeeRow)
            EmployeePanel.appendChild(EmployeeTable)
            EmployeePanel.addEventListener("drop", function (event) {
                var data = event.dataTransfer.getData('text/plain');
                const jsonObject = JSON.parse(data)
                console.log(jsonObject)
                if (jsonObject.external)
                    return
                var id = jsonObject.id
                var title = jsonObject.title
                var name = jsonObject.name
                var ClassName = jsonObject.className
                if (ClassName == null)
                    ClassName = jsonObject.id
                var child_list = findChildrenByClassName(datascource2, ClassName)
                var ParentId = jsonObject.parentId
                datascource2 = deleteNodeByClassNameAndTitle(datascource2, ClassName, title)
                if (!isEmptyOrNull(ParentId)) {
                    if (!ParentId.endsWith('Class'))
                        ParentId = ParentId + ' Class';
                }
                for (var index in child_list) {
                    var bufferNode: Node = { 'id': child_list[index].id, 'name': child_list[index].name, 'title': child_list[index].title, 'className': child_list[index].id + " Class" };
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
                        // 'depth': 9999,
                        'nodeContent': 'title',
                        'nodeId': 'thisOrgChart',
                        'exportButton': true,
                        'exportFilename': 'MyOrgChart',
                        /*
                        'createNode': function ($node, data) {
                            let ListCounter = 0
                            for (ListCounter = 0; ListCounter < ListOfEmployeeImg.length; ListCounter++) {
                                if (ListOfEmployeeImg[ListCounter].id == data.id)
                                    break
                            }
                            var imgPath = ListOfEmployeeImg[ListCounter].ImgPath;
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
                        */
                    });
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
                                const bufferNode: Node = { 'id': id, 'name': name, 'title': title, 'className': id + " Class" };
                                datascource2 = bufferNode
                                datascource = JSON.parse(JSON.stringify(datascource2))
                                orgchart = new OrgChart({
                                    'chartContainer': '#chart-container',
                                    'data': datascource,
                                    // 'depth': 9999,
                                    'nodeContent': 'title',
                                    'nodeId': 'thisOrgChart',
                                    'exportButton': true,
                                    'exportFilename': 'MyOrgChart',
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
                                        console.log(ListOfEmployeeImg)
                                    }
                                    */
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
                            }
                            EmployeeCardCallBack()
                            event.stopImmediatePropagation();
                        }
                    })
                }
                event.dataTransfer.dropEffect = 'none';
                EmployeeProfileService.Retrieve({
                    EntityId: id
                }, response => {
                    console.log(isEmptyOrNull(datascource))
                    console.log(isEmptyOrNull(datascource2))

                    console.log(EmployeePanel)
                    console.log(EmployeePanel.children)
                    console.log(EmployeePanel.children.length)
                    var EmployeeTable = EmployeePanel.children[0]
                    var EmployeeTableRows
                    var RowElementToAppend
                    var RowNumber
                    if (EmployeeTable.children.length == 0) {
                        EmployeeTableRows = document.createElement('tr')
                        EmployeeTable.appendChild(EmployeeTableRows)
                        RowElementToAppend = EmployeeTableRows
                    }
                    else {
                        EmployeeTableRows = EmployeeTable.children
                        RowNumber = EmployeeTable.children.length
                        RowElementToAppend = EmployeeTableRows[RowNumber - 1]
                    }
                    var EmployeeCard = CreateEmployeeCard(response.Entity.Id, response.Entity.EmployeeName,
                        response.Entity.OccupationID, response.Entity.EmployeeImg)
                    RowElementToAppend.appendChild(EmployeeCard)
                    EmployeeCardCallBack()
                });
                const jsonString = JSON.stringify(datascource2)
                OrganisationChartService.Create({
                    Entity:
                    {
                        "OrgChart": jsonString,
                    },
                });
                event.stopImmediatePropagation();
                ClearEmptyTd()
                EmployeeCardCallBack()
            })
            EmployeePanel.addEventListener("dragover", function (event) {
                event.preventDefault()
            })
            EmployeeCardCallBack()
            if (!isEmptyObject(datascource)) {
                console.log('hereee')
                orgchart = new OrgChart({
                    'chartContainer': '#chart-container',
                    'data': datascource,
                    'depth': 9999,
                    'nodeContent': 'title',
                    'nodeId': 'thisOrgChart',
                    'exportButton': true,
                    'exportFilename': 'MyOrgChart',
                    'createNode': function ($node, data) {
                        let ListCounter = 0
                        for (ListCounter = 0; ListCounter < ListOfEmployeeImg.length; ListCounter++) {
                            if (ListOfEmployeeImg[ListCounter].id == data.id)
                                break
                        }
                        var imgPath = ListOfEmployeeImg[ListCounter].ImgPath;
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
                    console.log(data)
                    const jsonObject = JSON.parse(data);
                    console.log('heree')
                    if ($('#chart-container').children().length == 0) {
                        if (!isEmptyOrNull(data)) {
                            var title = null
                            console.log(data)
                            console.log(data.indexOf("FromExternalSource"))
                            var name = null
                            var id = null
                            if (jsonObject.external) { // externla move
                                id = jsonObject.id
                                title = jsonObject.title
                                var exactClassSelector = `[id="${jsonObject.id}"]`;
                                var elementExactClass = $(exactClassSelector)
                                name = jsonObject.name
                            }
                            console.log(data.indexOf("FromExternalSource"))
                            console.log(data)
                            console.log('from ' + data)
                            console.log('to ' + $(event.target).parent().attr('class'))
                            const bufferNode: Node = { 'id': id, 'name': name, 'title': title, 'className': id + " Class" };
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


                                    /*
                                 EmployeeProfileService.Retrieve({
                                     EntityId: data.id
                                 }, response => {
                                     const img = document.createElement('img');
                                     // Set the src and class attributes
                                     img.src = `/upload/${response.Entity.EmployeeImg}`;
                                     img.className = 'avatar';
                                     img.crossOrigin = 'anonymous'
                                     img.draggable = false

                                     $node.querySelector('.title').appendChild(img);

                                     const contentElement = $node.querySelector('.content');
                                     const symbolElement = $node.querySelector('.symbol');
                                     if (contentElement && symbolElement) {
                                         contentElement.insertBefore(symbolElement, contentElement.firstChild);
                                     }
                                 });
                                 */
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
                        }
                        ClearEmptyTd()
                        EmployeeCardCallBack()
                        event.stopImmediatePropagation();
                    }
                })
            }
        })
        document.querySelector('#GridDiv').appendChild(container);
        document.querySelector('.content').appendChild(EmployeePanel);
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
        if (root.children) {
            for (const child of root.children) {
                if (addChildren(child, TargetClassName, newNode))
                    return false; // Stop recursion after adding the node
            }
        }
        return false; // Target node not found
    }
    // Recursive function to find the target node's parent and add a new node at the same level
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
    // Recursive function to delete node by className and title
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
        var TRs = $('#EmployeeTable').children()
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
    function setCallbacks() {
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
                            console.log(ElementArray[j].getAttribute('data-source'))
                            var jsonObject = JSON.parse(ElementArray[j].getAttribute('data-source'));
                            var relation = jsonObject.relationship

                            if (relation != '001' || nodes.length == 1)
                                ElementArray[j].draggable = true


                            ElementArray[j].addEventListener("drop", function (event) {
                                var data = event.dataTransfer.getData('text/plain');
                                console.log(data)
                                const jsonObject = JSON.parse(data);
                                console.log(jsonObject)
                                if (!isEmptyOrNull(data)) {
                                    var title = null
                                    var name = null
                                    var EmployeeName = null
                                    var id = null
                                    if (jsonObject.external) { // externla move
                                        id = jsonObject.id
                                        title = jsonObject.title
                                        name = jsonObject.name

                                        var exactClassSelector = `[id="${jsonObject.id}"]`;
                                        var elementExactClass = $(exactClassSelector)
                                        regex = /card\s+(\w+\s+\w+)\s+Class/;
                                    }
                                    var EventTargetElement = $(event.target)
                                    if (EventTargetElement.parent().attr('class') == "title")
                                        EventTargetElement = EventTargetElement.parent()
                                    var targetElementId = parseInt(EventTargetElement.parent().attr('class').replace('node', '').replace('Class', '').trim())
                                    if (targetElementId == parseInt(jsonObject.parentId) && jsonObject.parentId !== undefined && targetElementId !== undefined)
                                        return
                                    if (isEmptyOrNull(jsonObject.parentId) && isEmptyOrNull(jsonObject.external))
                                        return
                                    if (isEmptyOrNull(EventTargetElement.parent().attr('class')))
                                        return
                                    var ClassName = jsonObject.className
                                    if (ClassName == null)
                                        ClassName = jsonObject.id
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
                                    if (EmployeeName == null)
                                        EmployeeName = jsonObject.name
                                    console.log('from ' + jsonObject.className)
                                    console.log('to ' + EventTargetElement.parent().attr('class'))
                                    var regex = /EmployeeRowId:\d+\s*/;
                                    var child_list = findChildrenByClassName(datascource2, ClassName)
                                    for (var index in child_list) {
                                        if (child_list[index].id == jsonObject.id)
                                            return
                                    }
                                    var ParentId = jsonObject.parentId
                                    datascource2 = deleteNodeByClassNameAndTitle(datascource2, ClassName, title)
                                    if (!isEmptyOrNull(ParentId)) {
                                        if (!ParentId.endsWith('Class'))
                                            ParentId = ParentId + ' Class';
                                    }
                                    for (var index in child_list) {
                                        var bufferNode: Node = { 'id': child_list[index].id, 'name': child_list[index].name, 'title': child_list[index].title, 'className': child_list[index].id + " Class" };
                                        addChildren(datascource2, ParentId, bufferNode)
                                    }
                                    var bufferNode: Node = { 'id': id, 'name': EmployeeName, 'title': title, 'className': id + " Class" };
                                    addChildren(datascource2, DestinationNode, bufferNode)
                                    removeEmptyChildren(datascource2)
                                    var orgChartElement = document.getElementById("chart-container")
                                    orgChartElement.innerHTML = ''
                                    for (let i = 0; i < orgChartElement.children.length; i++)
                                        orgChartElement.children[i].remove()
                                    if (!isEmptyOrNull(datascource2)) {
                                        datascource = JSON.parse(JSON.stringify(datascource2))
                                        let orgchart = new OrgChart({
                                            'chartContainer': '#chart-container',
                                            'data': datascource,
                                            // 'depth': 9999,
                                            'nodeContent': 'title',
                                            'nodeId': 'thisOrgChart',
                                            'exportButton': true,
                                            'exportFilename': 'MyOrgChart',
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
                                    }
                                    setCallbacks()
                                    EmployeeCardCallBack()
                                    event.dataTransfer.dropEffect = 'none';
                                    if (jsonObject.external)
                                        elementExactClass.remove()
                                    ClearEmptyTd()
                                    const jsonString = JSON.stringify(datascource2)
                                    OrganisationChartService.Create({
                                        Entity:
                                        {
                                            "OrgChart": jsonString,

                                        },
                                    });
                                }
                                event.stopImmediatePropagation();
                            })
                            ElementArray[j].addEventListener("dragstart", function (event) {
                                //  console.log(event.target.getAttribute('data-source'))
                                // console.log(event.target)
                                var text = event.target.getAttribute('data-source')
                                console.log(text)
                                const jsonObject = JSON.parse(text);
                                console.log(jsonObject.relationship)
                                // if (jsonObject.relationship)
                                // var text = event.target.className.replace('focused', '')
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
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
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
        EmployeeCol_2.className = "flex-child"
        var EmployeeContainer = document.createElement('td')
        // EmployeeContainer.className = 'EmployeeContainer'
        var Employee = document.createElement('div')
        EmployeeContainer.appendChild(Employee)
        Employee.className = "flex-container"
        Employee.style.border = '1px solid #ccc';
        Employee.style.padding = '10px';
        Employee.draggable = true
        var DataSource = `{"id":"${EmployeeRowId}","name":"${EmployeeName}","title":"${EmployeeOccupation}","external": "true" }`;
        Employee.setAttribute('data-source', DataSource)
        Employee.id = EmployeeRowId.toString()
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
        var EmployeeCardObserver = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    var nodes = document.getElementsByClassName("flex-container");
                    var loopCounter = nodes.length
                    if (nodes.length > 0) {
                        var EmployeePanel = document.body.querySelector("#EmployeePanel") as HTMLElement
                        var MaximumWidth = EmployeePanel.offsetWidth
                        var EmployeeTable = document.body.querySelector("#EmployeeTable") as HTMLElement
                        var NumberOfRows = EmployeeTable.children.length
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
                            var TargetElementId = TargetElement.id
                            var CardTitle = TargetElement.querySelector(".CardTitle") as HTMLElement;
                            var CardTitleHeight = CardTitle.offsetHeight
                            var CardContent = TargetElement.querySelector(".CardContent") as HTMLElement;
                            var CardContentHeight = CardContent.offsetHeight
                            var CardImg = TargetElement.querySelector(".EmployeeImage") as HTMLElement;
                            var ImgWidth = (CardTitleHeight + CardContentHeight) / 16 * 9
                            var ImgHeight = CardTitleHeight + CardContentHeight
                            CardImg.style.width = ImgWidth + 'px'
                            CardImg.style.height = ImgHeight + 'px'
                            var CurrentWidth = TargetElement.parentElement.offsetWidth
                            if (CurrentWidth + WidthSum > MaximumWidth) {
                                WidthSum = 0
                                var BufferRow
                                if (RowCounter == NumberOfRows)//only one row
                                {
                                    BufferRow = document.createElement('tr')
                                    EmployeeTable.appendChild(BufferRow)
                                }
                                else
                                    BufferRow = EmployeeTable.children[NumberOfRows - 1]
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
                                console.log(BufferRow.children)
                                console.log(TargetElement)
                                TargetElement.parentElement.remove()
                            }
                            else {
                                var found = false
                                for (let i = 0; i < EmployeeTable.children[RowCounter - 1].children.length; i++) {
                                    var currId = EmployeeTable.children[RowCounter - 1].children[i].id
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
                                    EmployeeTable.children[RowCounter - 1].appendChild(BufferTd)
                                    TargetElement.parentElement.remove()
                                }
                            }
                            WidthSum += CurrentWidth
                            j += 1
                        }
                        ClearEmptyTd()
                        setCallbacks()
                        EmployeeCardObserver.disconnect(); // Stop observing after finding the nodes
                    }
                }
            }
        });
        EmployeeCardObserver.observe(document.body, { childList: true, subtree: true });
    }
}