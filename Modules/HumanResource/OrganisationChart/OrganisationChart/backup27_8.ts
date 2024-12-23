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
import { Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { alertDialog } from '@serenity-is/corelib/q';

//import OrgChart from 'orgchart'
export default function pageInit() {
    //if its parent of orgtree, set type as 0
    enum CardType {
        DIVISION = 1,
        DEPARTMENT = 2,
        SECTION = 3
    }
    const enumNames = Object.keys(CardType).filter(key => isNaN(Number(key)));
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
    function findMax(numbers: number[]): number {
        if (numbers.length === 0)
            throw new Error("The list is empty.");
        return Math.max(...numbers);
    }
    // Recursive function to extract all nodeContentPro values
    function extractClassesInOrgChart(node) {
        let results = [];
        console.log(node.className)
        if (node.className != undefined)
            results.push('node ' + node.className);

        // If children exist, recursively call extractNodeContentPro on each child
        if (node.children && Array.isArray(node.children)) {
            for (let child of node.children) {
                results = results.concat(extractClassesInOrgChart(child));
            }
        }
        return results;
    }
    function GenerateEmployeeChoosingDialog() {
        var CustomDialog = document.createElement('dialog')
        CustomDialog.style.top = "50%";
        CustomDialog.style.left = "50%";
        CustomDialog.style.transform = "translate(-50%, -50%)";
        CustomDialog.innerHTML = `  < button id = "confirmAddEmployee" type = "button" class= "btn btn-light btn-rounded   " data - mdb - ripple - color = "#ffffff" style = "background-color:#c2f0c2" > Confirm </ button >  < button id = "closeDialog" type = "button" class= "btn btn-light btn-rounded   " data - mdb - ripple - color = "#ffffff" style = "background-color:#ffcccc" > Close </ button > < span style = " white-space: nowrap;" id = "TargetElementSpan" ></ span >`;
        CustomDialog.id = "EmployeeSelection"
        CustomDialog.addEventListener("", () => {
            CustomDialog.close();
        });
        const CustomDialogCloseButton = CustomDialog.querySelector("#closeDialog") as HTMLButtonElement;
        CustomDialogCloseButton.addEventListener("click", () => {
            CustomDialog.close();
        });
        const CustomDialogConfirmButton = CustomDialog.querySelector("#confirmAddEmployee") as HTMLButtonElement;
        CustomDialogConfirmButton.addEventListener("click", () => {
            var EmployeeIdInput = document.getElementById('EmployeeIdInput') as HTMLInputElement;

            if ($(EmployeeIdInput).val() == '') {
                notifyError('Please fill in the Employee')
                return
            }
            let ListCounter = 0, name
            console.log(ListOfEmployeeData)
            for (ListCounter = 0; ListCounter < ListOfEmployeeData.length; ListCounter++) {
                if (ListOfEmployeeData[ListCounter].id == $(EmployeeIdInput).val()) {
                    name = ListOfEmployeeData[ListCounter].EmployeeName
                    break
                }
            }
            var destinationHierarchy
            var DestinationNode = ElementToSetEmployee.replace('node', '').trim()
            const regex = /\d+/;
            if (DestinationNode.includes('focused'))
                DestinationNode.replace('focused', '')
            var CardTypeClass
            for (const key of Object.keys(CardType)) {
                if (isNaN(Number(key))) {
                    const value = CardType[key as keyof typeof CardType];
                    if (DestinationNode.includes(CardType[value])) {
                        destinationHierarchy = value
                        CardTypeClass = CardType[value]
                        console.log(CardType[value])
                        console.log(DestinationNode)
                        var match = DestinationNode.match(regex);
                        var destinationHierarchyId = `${CardTypeClass}${parseInt(match[0])}`
                        break
                    }
                }
            }
            /*
            console.log(destinationHierarchy)
            console.log(sortedValues.length)
            console.log(value)
            var className = `node ${CardTypeClass}${destinationHierarchyId} Class`
            var exactClassSelector = `[class="${className}"]`;
            var elementExactClass = $(exactClassSelector)
            var parent = elementExactClass.attr('data-parent').match(regex)[0]
            var destinationId = elementExactClass.attr('class').match(regex)[0]
            console.log(destinationId)
            console.log(className)
            console.log(elementExactClass.attr('class'))
            console.log(parent)
            */
            // for (let i = destinationHierarchy; i >= 1; i--) {
            console.log(destinationHierarchy)

            for (let i = destinationHierarchy; i >= 1; i--) {

                var value = i
                var NextValue = i + 1
                // data from employee list
                var key = CardType[i];
                console.log(key)
                console.log(ListOfEmployeeData[ListCounter][capitalizeFirstLetter(key) + 'Id'])
                var destination = ListOfEmployeeData[ListCounter][capitalizeFirstLetter(key) + 'Id']
                console.log(destination)
                console.log(ListOfEmployeeData[ListCounter])

                //


                //data from hierarchy level
                var className = `node ${destinationHierarchyId}
    Class`
                console.log(className)
                var exactClassSelector = `[class= "${className}"]`;
                var elementExactClass = $(exactClassSelector)
                var parent = elementExactClass.attr('data-parent')
                console.log(parent)
                console.log(elementExactClass)
                console.log(elementExactClass.attr('class'))

                var destinationId = parseInt(elementExactClass.attr('class').match(regex)[0])
                console.log(destinationHierarchyId)
                console.log(destination)
                console.log(destinationId)

                if (destinationId != destination) {
                    var str
                    var table = getLookup(`${capitalizeFirstLetter(key)}.${capitalizeFirstLetter(key)}`)
                    for (var LookupIndex in table.items) {
                        if (table.items[LookupIndex].Id == destinationId) {
                            str = table.items[LookupIndex].Name.replace(/\s / g, "")
                            break
                        }
                    }
                    var String = ListOfEmployeeData[ListCounter].EmployeeName + ' is not in ' + str + ' '
                        + capitalizeFirstLetter(CardType[value]);
                    alertDialog(String)
                    event.stopImmediatePropagation();
                    return
                }
                destinationHierarchyId = parent
                console.log(destinationId)
                //
                /*
                if (ListOfEmployeeData[ListCounter][capitalizeFirstLetter(CardType[destinationHierarchy]) + 'Id'] != destinationHierarchyId) {
                    var str
                    var table = getLookup(`${capitalizeFirstLetter(CardType[destinationHierarchy])}.${capitalizeFirstLetter(CardType[destinationHierarchy])}`)
                    for (var LookupIndex in table.items) {
                        if (table.items[LookupIndex].Id == destinationHierarchyId) {
                            str = table.items[LookupIndex].Name.replace(/\s/g, "")
                            break
                        }
                    }
                    var String = ListOfEmployeeData[ListCounter].EmployeeName + ' is not in ' + str + ' '
                        + capitalizeFirstLetter(CardType[value]);
                    notifyError(String)
                    event.stopImmediatePropagation();
                    return
                }
                */
            }
            var orgChartElement = document.getElementById("chart-container")
            orgChartElement.innerHTML = ''
            for (let i = 0; i < orgChartElement.children.length; i++)
                orgChartElement.children[i].remove()
            console.log(datascource2)
            SetEmployeeByClassName(datascource2, ElementToSetEmployee.replace('node', '').trim(), $(EmployeeIdInput).val(), name)
            g()

            console.log(ElementToSetEmployee)
            console.log($(EmployeeIdInput).val())
            console.log(ElementToSetEmployee.replace('node', '').replace('Class', "").trim())

            CustomDialog.close();
        });
        var CustomTable = document.createElement('table');
        CustomTable.id = "EmployeeSelectionTable"
        var CustomTableRow = document.createElement('tr');
        var CustomTableRow2 = document.createElement('DIV');
        var CustomTableRow4 = document.createElement('tr');

        var fragment = document.createElement("img");
        fragment.setAttribute("id", "employeeImg");
        fragment.width = 63;
        fragment.height = 112.5;
        fragment.style.display = 'block';
        fragment.style.margin = '0 auto';
        CustomTableRow2.appendChild(fragment)

        var EmployeeIdTextNode = document.createElement('span');
        EmployeeIdTextNode.textContent = "ID"
        EmployeeIdTextNode.style.display = 'block'; // Ensure it's a block-level element
        EmployeeIdTextNode.style.whiteSpace = 'nowrap'; // Prevent text from wrapping
        var EmployeeIdTextNodeContainer = document.createElement('TD');
        EmployeeIdTextNodeContainer.appendChild(EmployeeIdTextNode);


        var EmployeeNameTextNode = document.createElement('span');
        EmployeeNameTextNode.textContent = "Name"
        EmployeeNameTextNode.style.display = 'block'; // Ensure it's a block-level element
        EmployeeNameTextNode.style.whiteSpace = 'nowrap'; // Prevent text from wrapping
        var EmployeeNameTextNodeContainer = document.createElement('TD');;
        EmployeeNameTextNodeContainer.appendChild(EmployeeNameTextNode);












        var EmployeeIdSelector = document.createElement('TD');
        var EmployeeIdInput = document.createElement('input');
        EmployeeIdInput.id = "EmployeeIdInput"
        EmployeeIdSelector.appendChild(EmployeeIdInput)


        var EmployeeNameSelector = document.createElement('TD');
        var EmployeeNameInput = document.createElement('input');
        EmployeeNameInput.id = "EmployeeNameInput"
        EmployeeNameSelector.appendChild(EmployeeNameInput)


        CustomTableRow.appendChild(EmployeeIdTextNodeContainer)
        CustomTableRow.appendChild(EmployeeIdSelector)
        CustomTableRow.appendChild(EmployeeNameTextNodeContainer)
        CustomTableRow.appendChild(EmployeeNameSelector)
        CustomTable.appendChild(CustomTableRow)
        CustomDialog.appendChild(CustomTableRow2)
        CustomDialog.appendChild(CustomTable)
        document.body.appendChild(CustomDialog);

        return CustomDialog
    }
    function CheckEmptyEmployee(node) {
        // Helper function to perform the check and handle recursion
        function checkNode(node) {
            // If nodeContentPro is undefined, handle the error
            if (node.nodeContentPro == undefined) {
                console.log(node)
                notifyError(`please set employee in charge for ${node.name}`); // Notify or handle the error as needed
                return true; // Return true to indicate that an error has been found
            }
            // If the node has children, recursively check each child
            if (node.children) {
                for (let child of node.children) {
                    // If an error is detected in any child, return immediately
                    if (checkNode(child)) {
                        return true; // Stop further recursion
                    }
                }
            }
            return false; // No error detected
        }

        // Start the checking process
        var res = checkNode(node);
        return res
    }
    const sortedValues = Object.values(CardType)
        .filter(value => typeof value == 'number') // Ensure we are working with numbers
        .sort((a, b) => b - a); // Sort in descending order
    const numbers: number[] = [];
    let ElementToSetEmployee = '';
    let ElementInOrgChart: any[] = [];
    for (const key of Object.keys(CardType)) {
        // Skip numeric keys which are reverse mappings
        if (isNaN(Number(key))) {
            const value = CardType[key as keyof typeof CardType];
            numbers.push(value)
        }
    }
    const minimmumVal = Math.min(...numbers);
    const maximumVal: number = findMax(numbers);
    const EmployeeEnum = maximumVal + 1
    let EmployeeChoosingDialog = GenerateEmployeeChoosingDialog()
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
        EmployeeId: string;
        OccupationId: number;
        EmployeeName: string;
        DepartmentId: number;
        DivisionId: number;
        SectionId: number;
    }
    var ListOfEmployeeData: Employee[] = []
    //{'nodeTitlePro': hierarchy , 'id':'{Department/Division/Section Id}', 'name': '{EmployeeName}', 'title': 'Department/Division/Section Name', 'className': "Hierarchy" }
    // node content pro is employee row id
    let datascource
    let datascource2
    var OccupationTable = getLookup("Occupation.Occupation")
    var DepartmentLookup = getLookup("Department.Department")
    var DivisionLookup = getLookup("Division.Division")
    var SectionLookup = getLookup("Section.Section")

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
        if (!isEmptyOrNull(OrgChartStr)) {
            datascource = JSON.parse(OrgChartStr)
            datascource2 = JSON.parse(JSON.stringify(datascource))
            ElementInOrgChart = extractClassesInOrgChart(datascource2)
            console.log(ElementInOrgChart)
        }

        DivisionService.List({}, response => {
            var DivisionContent = document.createElement('div')
            DivisionContent.className = 'side-div'
            var DivisionTable = document.createElement('div')
            DivisionTable.id = "DivisionTable"
            DivisionContent.appendChild(DivisionTable)
            var DivisionRow = document.createElement('div')
            for (var index in response.Entities) {
                var ElementId = response.Entities[index].Id
                var CardText = response.Entities[index].Name
                var CardClass = CardType[CardType.DIVISION];
                var className = 'node ' + CardClass + ElementId.toString() + ' Class'
                if (ElementInOrgChart.length > 0) {
                    if (ElementInOrgChart.includes(className))
                        continue
                }
                var EmployeeCard = GenerateCard(ElementId, CardText, CardType.DIVISION)
                if (!isEmptyOrNull(EmployeeCard))
                    DivisionRow.appendChild(EmployeeCard)
            }
            DivisionTable.appendChild(DivisionRow)
            DivisionPanel.appendChild(DivisionContent)

            DepartmentService.List({}, response => {
                var DepartmentContent = document.createElement('div')
                DepartmentContent.className = 'side-div'
                var DepartmentTable = document.createElement('div')
                DepartmentTable.id = "DepartmentTable"
                DepartmentContent.appendChild(DepartmentTable)
                var DepartmentRow = document.createElement('div')
                for (var index in response.Entities) {
                    var ElementId = response.Entities[index].Id
                    var CardText = response.Entities[index].Name
                    var CardClass = CardType[CardType.DEPARTMENT];
                    var className = 'node ' + CardClass + ElementId.toString() + ' Class'
                    if (ElementInOrgChart.length > 0) {
                        if (ElementInOrgChart.includes(className))
                            continue
                    }
                    var EmployeeCard = GenerateCard(ElementId, CardText, CardType.DEPARTMENT)
                    if (!isEmptyOrNull(EmployeeCard))
                        DepartmentRow.appendChild(EmployeeCard)
                }
                DepartmentTable.appendChild(DepartmentRow)
                DepartmentPanel.appendChild(DepartmentContent)
                SectionService.List({}, response => {
                    var SectionContent = document.createElement('div')
                    SectionContent.className = 'side-div'
                    var SectionTable = document.createElement('div')
                    SectionTable.id = "SectionTable"
                    SectionContent.appendChild(SectionTable)
                    var SectionRow = document.createElement('div')
                    for (var index in response.Entities) {
                        var ElementId = response.Entities[index].Id
                        var CardText = response.Entities[index].Name
                        var CardClass = CardType[CardType.SECTION];
                        var className = 'node ' + CardClass + ElementId.toString() + ' Class'
                        if (ElementInOrgChart.length > 0) {
                            if (ElementInOrgChart.includes(className))
                                continue
                        }
                        var EmployeeCard = GenerateCard(ElementId, CardText, CardType.SECTION)
                        if (!isEmptyOrNull(EmployeeCard))
                            SectionRow.appendChild(EmployeeCard)
                    }
                    SectionTable.appendChild(SectionRow)
                    SectionPanel.appendChild(SectionContent)
                    EmployeeProfileService.List({}, response => {
                        for (var index in response.Entities) {
                            var ElementId = response.Entities[index].Id
                            ListOfEmployeeData.push({
                                'id': ElementId, 'ImgPath': response.Entities[index].EmployeeImg, 'OccupationId': response.Entities[index].OccupationID,
                                'EmployeeName': response.Entities[index].EmployeeName, 'EmployeeId': response.Entities[index].EmployeeID,
                                'DivisionId': response.Entities[index].DivisionID,
                                'DepartmentId': response.Entities[index].DepartmentID, "SectionId": response.Entities[index].SectionID
                            })
                        }
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

                                        if (jsonObject.nodeTitlePro != minimmumVal) //parent must be department
                                        {
                                            notifyError(`The top must be a ${capitalizeFirstLetter(CardType[minimmumVal])}`)
                                            event.stopImmediatePropagation();
                                            return
                                        }

                                        id = jsonObject.id
                                        title = jsonObject.title
                                        var EnumName = getEnumNameFromValue(jsonObject.nodeTitlePro)
                                        console.log(EnumName)
                                        var exactClassSelector = `[id= "${jsonObject.id}"]`;
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
                                    datascource2 = bufferNode
                                    GenerateOrgChart()
                                    ArrangePanel(EnumName)
                                    console.log(elementExactClass)
                                    event.dataTransfer.dropEffect = 'none';
                                    ClearEmptyTd();
                                }
                                event.stopImmediatePropagation();
                            }
                        })
                        if (!isEmptyObject(datascource)) {
                            console.log(datascource2)
                            console.log(EmployeeInOrgChart)
                            ElementInOrgChart = extractClassesInOrgChart(datascource2)
                            GenerateOrgChart()
                        }
                        EmployeeCardCallBack()
                        setCallbacks()
                        var EmployeeIdInputElement = document.getElementById("EmployeeIdInput")
                        $(EmployeeIdInputElement).on('change', async function () {
                            if ($(EmployeeNameInputElement).val() != $(EmployeeIdInputElement).val())
                                $(EmployeeNameInputElement).val($(EmployeeIdInputElement).val()).trigger('change')

                            var BufferEmployeeImage = document.createElement("img");
                            BufferEmployeeImage.width = 63;
                            BufferEmployeeImage.height = 112.5;
                            BufferEmployeeImage.style.display = 'block';
                            BufferEmployeeImage.style.margin = '0 auto';
                            var EmployeeImage = $("#employeeImg")
                            if (isEmptyOrNull($(EmployeeIdInputElement).val())) {
                                EmployeeImage.replaceWith(BufferEmployeeImage)
                                BufferEmployeeImage.setAttribute("id", "employeeImg");
                                return
                            }
                            let ListCounter = 0, imgPath
                            for (ListCounter = 0; ListCounter < ListOfEmployeeData.length; ListCounter++) {
                                if (ListOfEmployeeData[ListCounter].id == parseInt($(EmployeeNameInputElement).val())) {
                                    imgPath = ListOfEmployeeData[ListCounter].ImgPath
                                    break
                                }
                            }
                            if (!isEmptyOrNull($(EmployeeNameInputElement).val()))
                                BufferEmployeeImage.src = "/upload/" + imgPath
                            EmployeeImage.replaceWith(BufferEmployeeImage)
                            BufferEmployeeImage.setAttribute("id", "employeeImg");


                        })
                        var EmployeeNameInputElement = document.getElementById("EmployeeNameInput")
                        $(EmployeeNameInputElement).on('change', async function () {
                            if ($(EmployeeNameInputElement).val() != $(EmployeeIdInputElement).val())
                                $(EmployeeIdInputElement).val($(EmployeeNameInputElement).val()).trigger('change')

                            var BufferEmployeeImage = document.createElement("img");
                            BufferEmployeeImage.width = 63;
                            BufferEmployeeImage.height = 112.5;
                            BufferEmployeeImage.style.display = 'block';
                            BufferEmployeeImage.style.margin = '0 auto';
                            var EmployeeImage = $("#employeeImg")

                            if (isEmptyOrNull($(EmployeeNameInputElement).val())) {
                                EmployeeImage.replaceWith(BufferEmployeeImage)
                                BufferEmployeeImage.setAttribute("id", "employeeImg");
                                return
                            }
                            let ListCounter = 0, imgPath
                            for (ListCounter = 0; ListCounter < ListOfEmployeeData.length; ListCounter++) {
                                if (ListOfEmployeeData[ListCounter].id == parseInt($(EmployeeNameInputElement).val())) {
                                    imgPath = ListOfEmployeeData[ListCounter].ImgPath
                                    break
                                }
                            }
                            if (!isEmptyOrNull($(EmployeeNameInputElement).val()))
                                BufferEmployeeImage.src = "/upload/" + imgPath
                            EmployeeImage.replaceWith(BufferEmployeeImage)
                            BufferEmployeeImage.setAttribute("id", "employeeImg");




                        })
                        var counter = 0
                        var ListLength = ListOfEmployeeData.length
                        let EmployeeIdInputEditor = new Select2Editor($("#EmployeeIdInput"))
                        let EmployeeNameInputEditor = new Select2Editor($("#EmployeeNameInput"))
                        ListOfEmployeeData.forEach(option => {
                            counter += 1
                            EmployeeIdInputEditor.addItem({ id: (option.id).toString(), text: (option.EmployeeId).toString(), }); // 8am - 6pm , will consider lates
                            EmployeeNameInputEditor.addItem({ id: (option.id).toString(), text: (option.EmployeeName).toString(), }); // 8am - 6pm , will consider lates
                            if (counter == ListLength) {
                                $('#EmployeeIdInput').trigger('change')
                                $('#EmployeeNameInput').trigger('change')
                            }
                        });

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

        var ContentRow = document.createElement("div")
        ContentRow.setAttribute("class", "row")
        var TabRowNode = document.createElement('div');
        TabRowNode.setAttribute("class", "tab");

        document.querySelector('#GridDiv').appendChild(container);
        ContentRow.appendChild(TabRowNode)
        ContentRow.appendChild(DivisionPanel)
        ContentRow.appendChild(SectionPanel)
        ContentRow.appendChild(DepartmentPanel)
        // ContentRow.appendChild(EmployeePanel)
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
        TabRowNode.appendChild(DivisionTableButton)
        TabRowNode.appendChild(DepartmentTableButton)
        TabRowNode.appendChild(SectionTableButton)
        let orgchart = null
        let EmployeeInOrgChart = []
    });
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
                                if (EventTargetElement.parent().attr('class').includes('row') || EventTargetElement.parent().attr('class').includes('btn'))
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
                                        console.log(EventTargetElement.parent())
                                        var EventTargetJson = JSON.parse(EventTargetElement.parent().attr("data-source"))
                                        var EventTargetHierarchy = EventTargetJson.nodeTitlePro
                                        console.log(jsonObject.parentId)
                                        console.log(EventTargetJson.parentId)
                                        console.log(isEmptyOrNull(EventTargetJson.parentId))
                                        if (EventTargetHierarchy >= hierarchy && !isEmptyOrNull(EventTargetJson.parentId)) {
                                            var String = capitalizeFirstLetter(getEnumNameFromValue(EventTargetHierarchy)) + ' cannot be above ' +
                                                capitalizeFirstLetter(getEnumNameFromValue(hierarchy))
                                            notifyError(String)
                                            event.stopImmediatePropagation();
                                            return
                                        }
                                        var EnumName = getEnumNameFromValue(parseInt(jsonObject.nodeTitlePro))
                                        var exactClassSelector = `[id= "${jsonObject.id}"]`;
                                        var elementExactClass = $(exactClassSelector)
                                        regex = / card\s + (\w +\s +\w +)\s + Class /;
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
                                    console.log('from ' + jsonObject.className)
                                    console.log('to ' + EventTargetElement.parent().attr('class'))
                                    var regex = / EmployeeRowId:\d +\s */;
                                    var child_list = findChildrenByClassName(datascource2, ClassName)
                                    for (var index in child_list) {
                                        if (child_list[index].id == jsonObject.id)
                                            return
                                    }
                                    var ParentId = jsonObject.parentId
                                    console.log(ParentId)
                                    console.log(jsonObject)
                                    // return
                                    var HierarchyValue = parseInt(jsonObject.nodeTitlePro)
                                    datascource2 = deleteNodeByClassNameAndTitle(datascource2, ClassName, title)
                                    if (!isEmptyOrNull(ParentId))
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
                                        /*
                                        console.log('haha')
                                        console.log(bufferNode)
                                        console.log(ParentId)
                                        console.log('from ' + child_list[index].title)
                                        console.log('to ' + EventTargetElement.parent().attr('class'))
                                        console.log(datascource2)
                                        console.log(addChildren(datascource2, ParentId, bufferNode))
                                        */
                                    }
                                    EnumName = getEnumNameFromValue(jsonObject.nodeTitlePro)
                                    var bufferNode: Node = {
                                        'nodeContentPro': null,
                                        'nodeTitlePro': HierarchyValue, 'id': id, 'name': title,
                                        'title': title, 'className': `${id}
                Class`
                                    };
                                    if (HierarchyValue == EmployeeEnum) {
                                        bufferNode.nodeContentPro = id
                                        bufferNode.className = `EMPLOYEE${bufferNode.className}`
                                    }
                                    addChildren(datascource2, DestinationNode, bufferNode)
                                    removeEmptyChildren(datascource2)


                                    if (jsonObject.external)
                                        elementExactClass.remove()
                                    var orgChartElement = document.getElementById("chart-container")
                                    orgChartElement.innerHTML = ''
                                    for (let i = 0; i < orgChartElement.children.length; i++)
                                        orgChartElement.children[i].remove()


                                    if (!isEmptyOrNull(datascource2)) {
                                        GenerateOrgChart()


                                        var EnumName = getEnumNameFromValue(jsonObject.nodeTitlePro)
                                        ArrangePanel(EnumName)


                                    }
                                    setCallbacks()
                                    event.dataTransfer.dropEffect = 'none';
                                    ClearEmptyTd()
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
                            if (!isEmptyOrNull(datascource2)) {
                                GenerateOrgChart()
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
                                                var exactClassSelector = `[id= "${jsonObject.id}"]`;
                                                var elementExactClass = $(exactClassSelector)
                                                name = jsonObject.name
                                            }
                                            var bufferNode: Node = {
                                                'nodeContentPro': null,
                                                'nodeTitlePro': jsonObject.nodeTitlePro, 'id': id, 'name': name,
                                                'title': title, 'className': id + " Class"
                                            };
                                            datascource2 = bufferNode
                                            GenerateOrgChart()

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
                            console.log(Object.keys(CardType))
                            var key = getEnumNameFromValue(hierarchy)
                            id = id.replace(key, "")
                            console.log(key)
                            var TargetTable = document.body.querySelector("#" + capitalizeFirstLetter(key) + "Table") as HTMLElement
                            console.log(TargetTable)
                            var TargetTableRows
                            var RowElementToAppend
                            var RowNumber
                            switch (hierarchy) {
                                case CardType.DEPARTMENT:
                                    DepartmentService.Retrieve({
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
                                        var Card = GenerateCard(response.Entity.Id, response.Entity.Name, CardType.DEPARTMENT)
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
                                default:
                                // Code to execute if no cases match
                            }
                            const jsonString = JSON.stringify(datascource2)
                            event.stopImmediatePropagation();
                            ClearEmptyTd()
                        })
                        panel[i].addEventListener("dragover", function (event) {
                            event.preventDefault()
                        })
                    }
                    let SelectEmployee = $(".SelectEmployee")
                    SelectEmployee.on('click', function (event) {
                        console.log('haha')
                        event.stopImmediatePropagation();
                        let target = $(this)
                        ElementToSetEmployee = target.parent().attr('class')
                        var ElementToSetEmployeeClassName = ElementToSetEmployee.replace('node', '').trim()

                        console.log(EmployeeChoosingDialog)
                        var TargetElementSpan = document.getElementById('TargetElementSpan')
                        TargetElementSpan.textContent = findTitleByClassName(datascource2, ElementToSetEmployeeClassName)
                        console.log(findTitleByClassName(datascource2, ElementToSetEmployeeClassName))
                        console.log(datascource2)
                        console.log(ElementToSetEmployee)
                        console.log(ElementToSetEmployeeClassName)

                        EmployeeChoosingDialog.show()

                    })

                    $('.clickable-icon').on('click', function (e) {
                        e.stopImmediatePropagation();
                        console.log('hahaha')
                        console.log(e.target.parentElement.parentElement.parentElement.parentElement.className)
                        var TargetClassName = e.target.parentElement.parentElement.parentElement.parentElement.className.replace('node', '').trim()
                        SetEmployeeByClassName(datascource2, TargetClassName, null, null)


                        var orgChartElement = document.getElementById("chart-container")
                        orgChartElement.innerHTML = ''
                        for (let i = 0; i < orgChartElement.children.length; i++)
                            orgChartElement.children[i].remove()
                        GenerateOrgChart()


                    })

                    $('#generateOrgChartButton').on('click', function (e) {

                        e.stopImmediatePropagation();
                        console.log('hereeee')
                        console.log(datascource2)
                        var res = CheckEmptyEmployee(datascource2)
                        console.log(res)

                        // Get enum values and sort them in descending order
                        var prev_id
                        for (let i = 0; i < ListOfEmployeeData.length; i++) {
                            console.log(`Employee Name: ${ListOfEmployeeData[i]["EmployeeName"]}`)
                            console.log(`Employee Id: ${ListOfEmployeeData[i]["EmployeeId"]}`)
                            var parentId = null
                            for (const value of sortedValues) {

                                var key = Object.keys(CardType).find(key => CardType[key as keyof typeof CardType] == value);

                                // Skip numeric keys which are reverse mappings

                                /*
                                console.log(`${capitalizeFirstLetter(key)}Id`)
                                console.log(`${key}: ${ListOfEmployeeData[i][`${capitalizeFirstLetter(key)}Id`]}`)
                                */
                                var id = ListOfEmployeeData[i][`${capitalizeFirstLetter(key)}
        Id`]

                                var className = `node ${key}${id}
        Class`
                                var exactClassSelector = `[class= "${className}"]`;
                                var elementExactClass = $(exactClassSelector)
                                console.log(exactClassSelector)
                                var supposedParentId = elementExactClass.attr('data-parent')
                                /*
                                console.log(parentId)
                                console.log(id)
                                */
                                if (!isEmptyOrNull(parentId)) {
                                    if (parentId != id) {
                                        notifyError('Error in employee profile')
                                        var correct1 = GetLookupValueFromId(capitalizeFirstLetter(key), id)
                                        var correct2 = GetLookupValueFromId(capitalizeFirstLetter(key), parentId)
                                        alertDialog(`${ListOfEmployeeData[i]["EmployeeName"]} should be in ${correct1} ${capitalizeFirstLetter(key)}`)
                                        return
                                    }
                                }
                                console.log(supposedParentId)
                                parentId = parseInt(supposedParentId.match(/\d +/)[0])

                                /*
                                console.log(supposedParentId)
                                console.log(DataParent)
                                console.log(elementExactClass)
                                console.log(className)
                                console.log(`${key}${id}`)
                                */
                            }
                        }
                        let EmployeeInOrgChart: any[] = extractEmployeeInOrgChart(datascource2)
                        console.log(EmployeeInOrgChart)

                        for (let i = 0; i < ListOfEmployeeData.length; i++) {
                            if (EmployeeInOrgChart.includes(ListOfEmployeeData[i]["id"]))
                                continue
                            var str

                            for (var LookupIndex in OccupationTable.items) {
                                if (OccupationTable.items[LookupIndex].Id == ListOfEmployeeData[i]["OccupationId"]) {
                                    str = OccupationTable.items[LookupIndex].Name.replace(/\s / g, "")
                                    break
                                }
                            }
                            console.log(str)
                            var bufferNode: Node = {
                                'nodeContentPro': ListOfEmployeeData[i]["id"],
                                'nodeTitlePro': EmployeeEnum, 'id': ListOfEmployeeData[i]["id"], 'name': str,
                                'title': str, 'className': ListOfEmployeeData[i]["id"] + " Class"
                            };
                            var Target = CardType[maximumVal]
                            var DestinationNode = `${Target}${ListOfEmployeeData[i][capitalizeFirstLetter(Target) + 'Id']}
    Class`
                            console.log(DestinationNode)
                            addChildren(datascource2, DestinationNode, bufferNode)
                            console.log(`Id: ${ListOfEmployeeData[i]["id"]}`)
                            console.log(`Id: ${ListOfEmployeeData[i]["SectionId"]}`)
                        }

                        var orgChartElement = document.getElementById("chart-container")
                        orgChartElement.innerHTML = ''
                        for (let i = 0; i < orgChartElement.children.length; i++)
                            orgChartElement.children[i].remove()
                        GenerateOrgChart()


                        console.log(datascource2)
                        console.log(ListOfEmployeeData)


                    })


                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    function extractEmployeeInOrgChart(node) {
        let results = [];
        if (node.nodeContentPro !== undefined && !isEmptyOrNull(node.nodeContentPro))
            results.push(parseInt(node.nodeContentPro));

        // If children exist, recursively call extractNodeContentPro on each child
        if (node.children && Array.isArray(node.children)) {
            for (let child of node.children) {
                results = results.concat(extractEmployeeInOrgChart(child));
            }
        }

        return results;
    }
    function GenerateCard(ElementId, CardText, Type) {
        var EmployeeCol_2 = document.createElement('div')
        EmployeeCol_2.className = "flex-child"
        var EmployeeContainer = document.createElement('td')
        // EmployeeContainer.className = 'EmployeeContainer'
        var Employee = document.createElement('div')
        EmployeeContainer.appendChild(Employee)
        var CardClass = CardType[Type];
        var className = 'node ' + CardClass + ElementId.toString() + ' Class'
        var exactClassSelector = `[class= "${className}"]`;

        var elementExactClass = $(exactClassSelector)
        console.log(elementExactClass)
        console.log(className)

        if (elementExactClass.length > 0) {
            return
        }
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
                                var xPath = `//button[text()='${butText}']`
                                const button = document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLElement;
                                if (button) {
                                    button.click()
                                }
                                else {
                                }
                                var TargetPanel = document.body.querySelector("#" + capitalizeFirstLetter(key) + "Panel") as HTMLElement
                                var TargetTable = document.body.querySelector("#" + capitalizeFirstLetter(key) + "Table") as HTMLElement
                                console.log(TargetTable)
                                console.log(TargetPanel)
                                if (TargetTable.children.length) {
                                    var MaximumWidth = TargetPanel.offsetWidth
                                    console.log(`maximum width ${MaximumWidth}`)

                                    var NumberOfRows = TargetTable.children.length
                                    console.log(`Number of rows ${NumberOfRows}`)
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


                                        var TargetElementId = TargetElement.id
                                        var CurrentWidth = TargetElement.parentElement.offsetWidth

                                        if (CurrentWidth + WidthSum > MaximumWidth) {
                                            WidthSum = 0
                                            var BufferRow
                                            if (RowCounter >= NumberOfRows) {
                                                BufferRow = document.createElement('div')
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
                                        WidthSum += CurrentWidth
                                        j += 1
                                    }
                                }
                                ClearEmptyTd()
                                CardObserver.disconnect(); // Stop observing after finding the nodes
                            }
                        }
                    }
                }
            }
        });
        CardObserver.observe(document.body, { childList: true, subtree: true });
    }
    function SetEmployeeByClassName(root, TargetClassName, EmployeeRowId, EmployeeName) {
        // If the current node's name matches the target name, add the new node
        if (root.className === TargetClassName) {
            root.nodeContentPro = EmployeeRowId
            return true; // Node found and new node added
        }
        if (root.children)
            for (const child of root.children)
                if (SetEmployeeByClassName(child, TargetClassName, EmployeeRowId, EmployeeName))
                    return false; // Stop recursion after adding the node
        return false; // Target node not found
    }
    function addHybridProperty(root, TargetClassName) {
        // Add the hybrid property to the current node
        if (root.className === TargetClassName) {
            root.hybrid = true
            return true; // Node found and new node added
        }
        if (root.children)
            for (const child of root.children)
                if (addHybridProperty(child, TargetClassName))
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
                }
                else {
                }
                var TargetPanel = document.body.querySelector("#" + capitalizeFirstLetter(key) + "Panel") as HTMLElement
                var TargetTable = document.body.querySelector("#" + capitalizeFirstLetter(key) + "Table") as HTMLElement
                console.log(TargetTable)
                console.log(TargetPanel)
                if (TargetTable.children.length) {
                    var MaximumWidth = TargetPanel.offsetWidth
                    console.log(`maximum width ${MaximumWidth}`)

                    var NumberOfRows = TargetTable.children.length
                    console.log(`Number of rows ${NumberOfRows}`)
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
                        var TargetElementId = TargetElement.id
                        var CurrentWidth = TargetElement.offsetWidth
                        /*
                        console.log(TargetElement.parentElement)
                        console.log(TargetElement.children[0])

                        console.log(TargetElement.getBoundingClientRect())
                        console.log(TargetElement.parentElement)
                        console.log(TargetElement.parentElement.offsetWidth)
                        */
                        if (CurrentWidth + WidthSum > MaximumWidth) {
                            console.log('new row')
                            WidthSum = 0
                            var BufferRow
                            if (RowCounter >= NumberOfRows) {
                                BufferRow = document.createElement('div')
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
                        console.log(`Width sum:${WidthSum}`)
                        j += 1
                    }
                }
                ClearEmptyTd()
                CardObserver.disconnect(); // Stop observing after finding the nodes
            }
            CardObserver.disconnect()
        })
        CardObserver.observe(document.body, { childList: true, subtree: true });
    }
    function GenerateOrgChart() {
        datascource = JSON.parse(JSON.stringify(datascource2))
        let orgchart = new OrgChart({
            'chartContainer': '#chart-container',
            'data': datascource,
            //'depth': 9999,
            'nodeContent': 'title',
            'nodeId': 'thisOrgChart',
            'zoom': true,
            'pan': true,
            'verticalDepth': 5, // From the 3th level of orgchart, nodes will be aligned vertically.

            'createNode': function (node, data) {
                let image = ""
                let ListCounter = 0, found = 0
                console.log(ListOfEmployeeData)
                console.log(node)
                console.log(`${data.name}`)
                console.log(data)

                let $jqueryObject = $(node);

                for (ListCounter = 0; ListCounter < ListOfEmployeeData.length; ListCounter++) {
                    if (ListOfEmployeeData[ListCounter].id == data.nodeContentPro) {
                        found = 1
                        break
                    }
                }
                console.log(found)
                console.log(data.nodeContentPro)
                if (found == 0) {
                    image = `< button type = "button"  class= "btn btn-light btn-rounded SelectEmployee" data - mdb - ripple - color = "#ffffff" style = "background-color:#e4dbd8" > < span style = "display:block;" > Select Employee </ span > </ button >`
                    $jqueryObject.append(image)

                }
                else {
                    var imgPath = ListOfEmployeeData[ListCounter].ImgPath;
                    image = ` 
                                    < div style = "height: 100%" class= " row" >
                        </ div >
                < div style = "text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px" >
                            < div style = "text-align: left;height: 100%;width:100%;padding-right:0" >


                            < div class= "col-1"  style = "font-size: 10px; display: flex; justify-content: space-between; align-items: center; width: 100%; white-space: nowrap;" > < span  style = "display: block;white-space: nowrap;" > ${ListOfEmployeeData[ListCounter].EmployeeName} </ span >  </ div >


                            </ div >
                    `




                    $jqueryObject.append(image)
                    if (data.nodeTitlePro != EmployeeEnum) {
                        let cancelButton = `< div class= "fa fa-times btn clickable-icon" ></ div >`
                        let div = $jqueryObject.find(".col-1")
                        div.append(cancelButton)

                    }
                    var img = document.createElement('img');
                    img.src = `/ upload /${imgPath}`;
                    img.className = 'avatar';
                    img.crossOrigin = 'anonymous'
                    img.draggable = false
                    img.width = 63;
                    img.height = 112.5;
                    img.style.display = 'block';
                    img.style.margin = '0 auto';
                    let row = $jqueryObject.find(".row")
                    row.append(img)
                }
                let content = $jqueryObject.find(".content")
                content.remove()


            }
        });
        var chart_container = document.getElementById('chart-container')
        var generateOrgChartButton = document.createElement('div')
        generateOrgChartButton.innerHTML =
            `<button id="generateOrgChartButton" class= "btn btn-light btn-rounded" style = "top: 10px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);" > Generate Organisation Chart</button>`
        chart_container.appendChild(generateOrgChartButton)
        setCallbacks()
        const jsonString = JSON.stringify(datascource2);

        OrganisationChartService.Create({
            Entity:
            {
                "OrgChart": jsonString,
            },
        });

    }
    function GetLookupValueFromId(destinationHierarchy, destinationHierarchyId) {
        var str
        var table = getLookup(`${capitalizeFirstLetter(CardType[destinationHierarchy])}.${capitalizeFirstLetter(CardType[destinationHierarchy])}`)
        for (var LookupIndex in table.items) {
            if (table.items[LookupIndex].Id == destinationHierarchyId) {
                str = table.items[LookupIndex].Name.replace(/\s / g, "")
                break
            }
        }
        return str
    }
}

