import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { OrganisationChartGrid } from './OrganisationChartGrid';
import OrgChart from "../OrgChart.js/src/orgchart.js"
import appendStyle from './OrgChartStyle';
import { isEmptyOrNull, serviceCall } from '@serenity-is/corelib/q';
import { isEmptyObject } from 'jquery';
import { EmployeeProfileRow, EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { getLookup } from '@serenity-is/corelib/q';
import { EmployeeRightsService, FinalOrganisationChartService, FullProfileService, OrganisationChartService, SplitOrganisationChartService, SplitOrganisationStructureService } from '../../../ServerTypes/OrganisationChart';
import { DivisionService, SectionService, DepartmentService } from '../../../ServerTypes/OrganisationHierarchy';
import { confirmDialog, confirm, notifySuccess, notifyError, notifyInfo } from '@serenity-is/corelib/q';
import { Decorators, EditorUtils, EntityDialog, RetrieveResponse, Select2Editor, Criteria } from '@serenity-is/corelib';
import { alertDialog, Authorization } from '@serenity-is/corelib/q';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { EmployeeProfileDialog } from '../../EmployeeProfile/EmployeeProfile/EmployeeProfileDialog';
import { EmployeePersonalProfileDialog } from '../../EmployeeProfile/EmployeePersonalProfile/EmployeePersonalProfileDialog';
import { EmployeeBasicDataDialog } from '../../EmployeeBasicData/EmployeeBasicData/EmployeeBasicDataDialog';
import html2canvas from "html2canvas";

export default function pageInit() {
    var firstTime = 1
    var addedClass;
    let addedIndex = 0

    var removedNodeId;
    let indexToRemove = 0;

    interface ExtractedData {
        hierarchyId: number | null;
        id: string | null;
        EmployeeRowId: number | null;
        Rights: EmployeeAdminRights | null;
    }
    enum CardType {
        DIRECTOR = 0,
        DIVISION = 1,
        DEPARTMENT = 2,
        SECTION = 3
    }

    function isOrgChartOutOfView() {
        const orgChart = document.querySelector('#chart-container .orgchart'); // Adjust selector if needed
       // const orgChart = document.querySelector('#orgChartContainer .orgchart'); // Adjust selector if needed

        if (!orgChart) return false;

        const rect = orgChart.getBoundingClientRect();

        return (
            rect.right < 0 || // Fully outside left
            rect.left > window.innerWidth || // Fully outside right
            rect.bottom < 0 || // Fully outside top
            rect.top > window.innerHeight // Fully outside bottom
        );
    }
    enum DisplayMode {
        DISPLAY = 0,
        FILTERING = 1
    }
    let orgStructDisplay = DisplayMode.DISPLAY
    let orgChartDisplay = DisplayMode.DISPLAY
    enum ChartType {
        OrgChart = 0,
        OrgStruct = 1,
    }
    function scrollToParent() {
        var chartToShift: string[] = ['#orgChartContainer', '#chart-container'];

        for (let i = 0; i < chartToShift.length; i++) {
            const orgChartContainer = document.querySelector(chartToShift[i]) as HTMLElement;
            if (!orgChartContainer) {
                console.log('aa')
                continue; // Skip if container does not exist
            }
         
            const parentNode = orgChartContainer.querySelector('.orgchart .DIRECTOR') as HTMLElement;
            if (!parentNode) {

                continue; // Skip if parent node does not exist
            }
            // Ensure container is scrollable
            orgChartContainer.style.overflow = 'auto';
            parentNode.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            // Try different scrolling methods
        }
    }    function capitalizeFirstLetter(string) {
        if (isEmptyOrNull(string))
            return ''; // Handle empty strings
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
    function GenerateEmployeeChoosingDialog() {
        var CustomDialog = document.createElement('dialog')
        CustomDialog.style.top = "50%";
        CustomDialog.style.left = "50%";
        CustomDialog.style.transform = "translate(-50%, -50%)";
        CustomDialog.innerHTML = `  <button id="confirmAddEmployee" type="button" class="btn btn-light btn-rounded   " data-mdb-ripple-color="#ffffff" style="background-color:#c2f0c2">Confirm</button>  <button id="closeDialog" type="button" class="btn btn-light btn-rounded   " data-mdb-ripple-color="#ffffff" style="background-color:#ffcccc">Close</button> <span style=" white-space: nowrap;" id = "TargetElementSpan"></span>`;
        CustomDialog.id = "EmployeeSelection"
        CustomDialog.addEventListener("", () => {
            CustomDialog.close();
        });
        const CustomDialogCloseButton = CustomDialog.querySelector("#closeDialog") as HTMLButtonElement;
        CustomDialogCloseButton.addEventListener("click", () => {
            CustomDialog.close();
        });
        const CustomDialogConfirmButton = CustomDialog.querySelector("#confirmAddEmployee") as HTMLButtonElement;
        CustomDialogConfirmButton.addEventListener("click", async function(e) {

            var EmployeeIdInput = document.getElementById('EmployeeIdInput') as HTMLInputElement;
            if ($(EmployeeIdInput).val() == '') {
                notifyError('Please fill in the Employee')
                return
            }
            let ListCounter = 0, OccupationId
            for (ListCounter = 0; ListCounter < ListOfEmployeeData.length; ListCounter++) {
                if (ListOfEmployeeData[ListCounter].id == $(EmployeeIdInput).val()) {
                    OccupationId = ListOfEmployeeData[ListCounter].OccupationId
                    break
                }
            }
            var str
            for (var LookupIndex in OccupationTable.items) {
                if (OccupationTable.items[LookupIndex].Id == OccupationId) {
                    str = OccupationTable.items[LookupIndex].Name
                    break
                }
            }

            var FinalOrgChartBuffer = JSON.parse(JSON.stringify(datascource2))
            var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
            console.log(ElementToSetEmployeeInDialog)
            TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, ElementToSetEmployeeInDialog)
            SetEmployeeById(TargetedFinalOrgChartBuffer, ElementToSetEmployeeInDialog, parseInt($(EmployeeIdInput).val()))
            datascource2 = FinalOrgChartBuffer
            await GenerateSaveOrgStructure()
            
            var findEmployeeBuffer = JSON.parse(JSON.stringify(FinalDatascource2))
            var TargetedFinalOrgChartBuffer = findEmployeeBuffer
            var IsEmployeeInOrgChart = findEmployee(SplitOrgChartList, parseInt($(EmployeeIdInput).val()))
            if (!isEmptyOrNull(IsEmployeeInOrgChart))//if the employee is in org chart
            {           //after adding the employee into org struct remove the employee in orgchart
                console.log(deleteNodeById(TargetedFinalOrgChartBuffer, IsEmployeeInOrgChart.id))
            }
            console.log(TargetedFinalOrgChartBuffer)
            console.log(IsEmployeeInOrgChart)

            FinalDatascource2 = findEmployeeBuffer

            var findEmployeeBuffer = JSON.parse(JSON.stringify(FinalDatascource2))

            var HierarchyLevelToSetEmployee = DecomposeStringToList(ElementToSetEmployeeInDialog, 0x88, 0x99)
            var childrenHolder
            TargetedFinalOrgChartBuffer = findEmployeeBuffer
            for (let i = 0; i < HierarchyLevelToSetEmployee.length; i++)
                TargetedFinalOrgChartBuffer = findByClassName(TargetedFinalOrgChartBuffer, HierarchyLevelToSetEmployee[i])
            console.log(TargetedFinalOrgChartBuffer)

            if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children))
                childrenHolder = {
                    ...TargetedFinalOrgChartBuffer.children
                }

            var insertNode: NodeRow = {
                className: `EMPLOYEE${parseInt($(EmployeeIdInput).val())} Class`,
                EmployeeRowId: parseInt($(EmployeeIdInput).val()),
                id: `${TargetedFinalOrgChartBuffer.id}${EncodeString(`EMPLOYEE${parseInt($(EmployeeIdInput).val())}`, 0x88, 0x99)}`,
                name: TargetedFinalOrgChartBuffer.name,
                title: TargetedFinalOrgChartBuffer.title,
                hierarchyLevel: TargetedFinalOrgChartBuffer.hierarchyLevel,
                parentId: `${TargetedFinalOrgChartBuffer.id}`,
                Rights: {
                    Appraisal: false,
                    LeaveApproval: false,
                    OtApproval: false,
                    MoneyClaiming: false,
                    Training: false
                }
            }
            addChildren(TargetedFinalOrgChartBuffer, TargetedFinalOrgChartBuffer.className, insertNode)
            for (var res in childrenHolder) {
                deleteNodeById(TargetedFinalOrgChartBuffer, childrenHolder[res].id)
            }
            if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children))
            TargetedFinalOrgChartBuffer = findByClassName(TargetedFinalOrgChartBuffer, insertNode.className)
            if (!isEmptyOrNull(childrenHolder)) {
                for (var res in childrenHolder) 
                    addChildren(TargetedFinalOrgChartBuffer, insertNode.className, childrenHolder[res])
            }
            
            FinalDatascource2 = findEmployeeBuffer


            GenerateSaveOrgChart()


            addedClass = `EMPLOYEE${parseInt($(EmployeeIdInput).val())}`
            addedIndex = HierarchyLevelToSetEmployee.length
            CustomDialog.close();

            return
            var findEmployeeBuffer = JSON.parse(JSON.stringify(FinalDatascource2))

            var HierarchyLevelToSetEmployee = DecomposeStringToList(ElementToSetEmployeeInDialog, 0x88, 0x99)
            var childrenHolder
            TargetedFinalOrgChartBuffer = findEmployeeBuffer
            for (let i = 0; i < HierarchyLevelToSetEmployee.length; i++) 
                TargetedFinalOrgChartBuffer = findByClassName(TargetedFinalOrgChartBuffer, HierarchyLevelToSetEmployee[i])
            if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children))
                childrenHolder = TargetedFinalOrgChartBuffer.children
            var insertNode: NodeRow = {
                className: `EMPLOYEE${parseInt($(EmployeeIdInput).val())} Class`,
                EmployeeRowId: parseInt($(EmployeeIdInput).val()),
                id: `${TargetedFinalOrgChartBuffer.id}${EncodeString(`EMPLOYEE${parseInt($(EmployeeIdInput).val())}`, 0x88, 0x99)}`,
                name: str,
                title: str,
                hierarchyLevel: EmployeeEnum,
                parentId: `${TargetedFinalOrgChartBuffer.id}`,
                children: isEmptyOrNull(TargetedFinalOrgChartBuffer.children) ? null: childrenHolder
            }




            console.log(addChildren(TargetedFinalOrgChartBuffer, TargetedFinalOrgChartBuffer.className, insertNode))
            FinalDatascource2 = findEmployeeBuffer
            console.log(IsEmployeeInOrgChart)
            console.log(findEmployeeBuffer)
            console.log(ElementToSetEmployeeInDialog)

            GenerateSaveOrgChart()
          
            /*
            if (HierarchyLevelToSetEmployee.length > 1) {
                for (let i = 1; i < HierarchyLevelToSetEmployee.length; i++) {
                    HierarchyLevel = HierarchyLevelToSetEmployee[i]
                    var HierarchyKey = getEnumNameFromValue(i)
                    TargetedFinalOrgChartBuffer = findByClassName(TargetedFinalOrgChartBuffer, HierarchyLevel)
                    var DatabaseData = `${HierarchyKey}${ListOfEmployeeData[ListCounter][capitalizeFirstLetter(HierarchyKey) + 'Id']} Class`
                    if (DatabaseData != TargetedFinalOrgChartBuffer.className) {
                        var correctDepartment = GetLookupValueFromId(capitalizeFirstLetter(getEnumNameFromValue(CardType.DEPARTMENT)), ListOfEmployeeData[ListCounter][capitalizeFirstLetter(getEnumNameFromValue(CardType.DEPARTMENT)) + 'Id'])
                        var correctDivision = GetLookupValueFromId(capitalizeFirstLetter(getEnumNameFromValue(CardType.DIVISION)), ListOfEmployeeData[ListCounter][capitalizeFirstLetter(getEnumNameFromValue(CardType.DIVISION)) + 'Id'])
                        var correctSection = GetLookupValueFromId(capitalizeFirstLetter(getEnumNameFromValue(CardType.SECTION)), ListOfEmployeeData[ListCounter][capitalizeFirstLetter(getEnumNameFromValue(CardType.SECTION)) + 'Id'])
                        var string = `${ListOfEmployeeData[ListCounter]["EmployeeName"]} should be in `;
                        if (!isEmptyOrNull(correctSection))
                            string += `${correctSection} ${capitalizeFirstLetter(getEnumNameFromValue(CardType.SECTION))}, under `
                        if (!isEmptyOrNull(correctDepartment))
                            string += `${correctDepartment} ${capitalizeFirstLetter(getEnumNameFromValue(CardType.DEPARTMENT))}, under `
                        if (!isEmptyOrNull(correctDivision))
                            string += `${correctDivision} ${capitalizeFirstLetter(getEnumNameFromValue(CardType.DIVISION))}`
                        alertDialog(string)
                        break
                    }
                }
            }
            */
            //HierarchyLevel = HierarchyLevelToSetEmployee[HierarchyLevelToSetEmployee.length - 1]
            //SetEmployeeByClassName(TargetedFinalOrgChartBuffer, HierarchyLevel, parseInt($(EmployeeIdInput).val()))




            addedClass = `EMPLOYEE${parseInt($(EmployeeIdInput).val())}`
            addedIndex = HierarchyLevelToSetEmployee.length



            //GenerateSaveOrgChart()

            //GenerateOrgChartData()
           // setCallbacks()

            CustomDialog.close();
        });
        var CustomTable = document.createElement('table');
        CustomTable.id = "EmployeeSelectionTable"
        var CustomTableRow = document.createElement('tr');
        var CustomTableRow2 = document.createElement('DIV');
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
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            pdfDialog.close();
            var dlg = document.getElementById('EmployeeSelection')
            dlg.close();
        }
    });
    function GeneratePdfDialog() {
        var pdfDialog = document.createElement('dialog')
        pdfDialog.id = 'pdfDialog'
        pdfDialog.innerHTML = `
    <button id="closePdf" type="button" style="position: absolute; top: 10px; right: 10px; background-color: #ffcccc; border: none; font-size: 20px; cursor: pointer;">
        &times;
    </button>
     <div id="pdfTitle" style="margin: 20px 0; font-size: 20px;"></div>

     <div style="margin-top: 10px;">
        <button id="prevPdf" class="pdf-nav-btn btn btn-light btn-rounded">&lt;</button>
        <button id="nextPdf" class="pdf-nav-btn btn btn-light btn-rounded">&gt;</button>
    </div>
`;

        pdfDialog.style.border = "none"; // Optional: remove border for aesthetics
        pdfDialog.style.width = "80%"; // Set a width for the dialog
        pdfDialog.style.height = "80%"; // Set a height for the dialog
        pdfDialog.style.transform = "translate(-50%, -50%)"; // Offset for centering
        pdfDialog.style.position = "fixed"; // Fixed positioning
        pdfDialog.style.top = "50%"; // Center vertically
        pdfDialog.style.left = "50%"; // Center horizontally

        const CustomDialogCloseButton = pdfDialog.querySelector("#closePdf") as HTMLButtonElement;
        CustomDialogCloseButton.addEventListener("click", () => {
            pdfDialog.close();
        });
        //img.src = `/upload/${imgPath}`;
        var pdf = document.createElement('iframe')
        //pdf.src = `/upload/EmployeeProfile/00000/00000034_ug53pfwxuh2sk.pdf`;
        pdf.type = `application/pdf`
        pdf.style.width = "100%"; // Full width of the dialog
        pdf.style.height = "calc(100% - 40px)"; // Full height minus button height (adjust as needed)
        pdf.id = 'pdf'
        pdfDialog.appendChild(pdf)
        document.body.appendChild(pdfDialog);
        document.getElementById("prevPdf").addEventListener("click", () => {
            currentPdfIndex = (currentPdfIndex - 1 + pdfSources.length) % pdfSources.length; // Loop to the end
            updatePdf();
        });

        document.getElementById("nextPdf").addEventListener("click", () => {
            currentPdfIndex = (currentPdfIndex + 1) % pdfSources.length; // Loop to the beginning
            updatePdf();
        });

    }
    function updatePdf() {
        const pdfEmbed = document.getElementById("pdf");
        pdfEmbed.src = pdfSources[currentPdfIndex];
        const pdfTitle = document.getElementById("pdfTitle");
        pdfTitle.textContent = pdfOriginalName[currentPdfIndex]; // Assuming you have access to the original name

        document.getElementById("prevPdf").disabled = currentPdfIndex === 0; // Disable if first PDF
        document.getElementById("nextPdf").disabled = currentPdfIndex === pdfSources.length - 1; // Disable if last PDF
    }
    GeneratePdfDialog()
    var Style = null;
    var DataPanStart = null;
    const sortedValues = Object.values(CardType)
        .filter(value => typeof value == 'number') // Ensure we are working with numbers
        .sort((a, b) => b - a); // Sort in descending order
    const numbers: number[] = [];
    var ElementToSetEmployeeInDialog = '';
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
    container.className = "BigTab"
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
        id: string;
        name: string;   // The name of the person
        title: string;  // The job title of the person
        className: string;
        children?: Node[];
        hierarchyLevel: number;
        hierarchyId: number;
        childrenIndex?: number;
        EmployeeRowId: number;
        Rights?: EmployeeAdminRights;
        extension?:number;
    }
    interface NodeRow {
        rowId?: number
        id: string;
        EmployeeRowId: number;
        name: string;
        title: string;
        className: string;
        hierarchyLevel: number;
        parentId: string | null; // Added parentId to track relationships
        Rights?: EmployeeAdminRights;
        children?: NodeRow[];
        childrenIndex?: number;
        hierarchyId?: number;
        extension?:number;

    }
    interface NodeRights {
        id: string;
        Rights: EmployeeAdminRights;
        EmployeeRowId: number;
        nodeHierarchy: number;
    }
    interface Employee {
        id: number;
        Rights?: EmployeeAdminRights;
        ImgPath: string;
        JobDescPath?: string;
        EmployeeId: string;
        OccupationId: number;
        EmployeeName: string;
        DepartmentId: number;
        DivisionId: number;
        SectionId: number;
        JobGradeId: number;
        SalaryDetails: number;
    }

    interface EmployeeAdminRights {
        LeaveApproval: boolean;
        OtApproval: boolean;
        MoneyClaiming: boolean;
        Appraisal: boolean;
        Training: boolean;
    }

    interface OrganisationHierarchy {
        Id: number;
        Name: string;
    }
    var ListOfDivision: OrganisationHierarchy[] = []
    var ListOfDepartment: OrganisationHierarchy[] = []
    var ListOfSection: OrganisationHierarchy[] = []
    let SplitOrgChartList: NodeRow[] = []

    var ListOfEmployeeData: Employee[] = []
    var EmployeeFilter: any[] = [] //list for employee that has retired, terminated or resigned
    //{'nodeTitlePro': hierarchy , 'id':'{Department/Division/Section Id}', 'name': '{EmployeeName}', 'title': 'Department/Division/Section Name', 'className': "Hierarchy" }
    // node content pro is employee row id
    let datascource
    let datascource2
    let FinalDatascource
    let FinalDatascource2
    var OccupationTable = getLookup("Occupation.Occupation")
    var JobGradeTable = getLookup("JobGrade.JobGrade")
    var criteria: any;
    let ListOfEmployeeInEmployeeProfile: number[] = [];

    let SectionList: number[] = [];
    let DepartmentList: number[] = [];
    let DivisionList: number[] = [];
    var spareOrgStructJson = null;
    var spareOrgChartJson = null;


    let SplitOrgStructList: NodeRow[] = []

    FullProfileService.List({

    }, response => {
        for (var index in response.Entities) {
            if (response.Entities[index].Resigned == 1 ||
                response.Entities[index].Terminated == 1 ||
                response.Entities[index].Retired == 1
                || response.Entities[index].IsActive == -1
            ) {
                EmployeeFilter.push(response.Entities[index].Id) // these are the employees to remove
                continue
            }
            ListOfEmployeeInEmployeeProfile.push(response.Entities[index].Id)
            ListOfEmployeeData.push({
                'id': response.Entities[index].Id, 'ImgPath': response.Entities[index].EmployeeImg, 'OccupationId': response.Entities[index].OccupationId,
                'EmployeeName': response.Entities[index].EmployeeName, 'EmployeeId': response.Entities[index].EmployeeId,
                'DivisionId': response.Entities[index].DivisionId,
                'DepartmentId': response.Entities[index].DepartmentId, "SectionId": response.Entities[index].SectionId,
                'JobDescPath': response.Entities[index].JobDescription, "JobGradeId": response.Entities[index].JobGradeId,
                'SalaryDetails': response.Entities[index].BasicSalary
            })
        }


        OrganisationChartService.List({
        }, response => {
            if (response.Entities.length > 0)
                spareOrgStructJson = response.Entities[0].OrgChart
            GenerateOrgStructure()

        })

        FinalOrganisationChartService.List({
        }, response => {
            if (response.Entities.length > 0)
                spareOrgChartJson = response.Entities[0].FinalOrgChart
            GenerateOrgChart()
        })


        if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources])//is HR
        {
            DivisionService.List({}, response => {
                var DivisionContent = document.createElement('div')
                DivisionContent.className = 'side-div'
                var DivisionTable = document.createElement('div')
                DivisionTable.id = "DivisionTable"
                DivisionTable.className = "wrapper"
                DivisionContent.appendChild(DivisionTable)
                var DivisionRow = document.createElement('div')
                DivisionRow.className = "wrapper"

                for (var index in response.Entities) {
                    var ElementId = response.Entities[index].Id
                    var CardText = response.Entities[index].Name
                    ListOfDivision.push({
                        Id: ElementId,
                        Name: CardText
                    })
                    var EmployeeCard = GenerateCard(ElementId, CardText, CardType.DIVISION)
                    EmployeeCard.className = "item"
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
                    DepartmentTable.className = "wrapper"

                    DepartmentContent.appendChild(DepartmentTable)
                    var DepartmentRow = document.createElement('div')
                    DepartmentRow.className = "wrapper"

                    for (var index in response.Entities) {
                        var ElementId = response.Entities[index].Id
                        var CardText = response.Entities[index].Name
                        ListOfDepartment.push({
                            Id: ElementId,
                            Name: CardText
                        })
                        var EmployeeCard = GenerateCard(ElementId, CardText, CardType.DEPARTMENT)
                        EmployeeCard.className = "item"
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
                        SectionTable.className = "wrapper"

                        SectionContent.appendChild(SectionTable)
                        var SectionRow = document.createElement('div')
                        SectionRow.className = "wrapper"

                        for (var index in response.Entities) {
                            var ElementId = response.Entities[index].Id
                            var CardText = response.Entities[index].Name
                            ListOfSection.push({
                                Id: ElementId,
                                Name: CardText
                            })
                            var EmployeeCard = GenerateCard(ElementId, CardText, CardType.SECTION)
                            EmployeeCard.className = "item"
                            if (!isEmptyOrNull(EmployeeCard))
                                SectionRow.appendChild(EmployeeCard)
                        }

                        SectionTable.appendChild(SectionRow)
                        SectionPanel.appendChild(SectionContent)
                        $('#defaultOpen').click()
                       // setCallbacks()
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

                        $('#searcher').on('input', async function () {
                            var searcherInput = $('#searcher').val()
                            var tabcontent = document.getElementsByClassName('tabcontent')
                            let i
                            for (i = 0; i < tabcontent.length; i++) {
                                if (tabcontent[i].style.display == 'block')
                                    break
                            }
                            var ChildrenList = tabcontent[i].children[0].querySelector('.wrapper').querySelector('.wrapper').children
                            const regex = new RegExp(searcherInput, 'gi');
                            for (i = 0; i < ChildrenList.length; i++) {
                                if (!regex.test(ChildrenList[i].textContent))
                                    ChildrenList[i].style.display = 'none'
                                else
                                    ChildrenList[i].style.display = ''

                            }

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

        }

        var ContentRow = document.createElement("div")
        ContentRow.setAttribute("class", "row div2")
        ContentRow.setAttribute("id", "ElementsTab")



        var TabRowNode = document.createElement('div');
        TabRowNode.setAttribute("class", "tab");
        var naviBar = document.createElement('nav')
        var naviBarContent = document.createElement('div')
        naviBarContent.innerHTML = `<div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                          <a class="tab-nav-item nav-link " id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="false">Organisation Structure</a>
                          <a class="tab-nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Organisation Chart</a>
                        </div>`
        naviBar.appendChild(naviBarContent)


        document.querySelector('#GridDiv').appendChild(naviBar);
        document.querySelector('#GridDiv').appendChild(container);
        var orgChartContainer = document.createElement('div')
        orgChartContainer.id = 'orgChartContainer'
        orgChartContainer.className = 'BigTab'
        document.querySelector('#GridDiv').appendChild(orgChartContainer);
        var init = 0
        function openBig(evt, id) {
            // Declare all variables
            var i, tabcontent, tablinks;
            if (id == OrgStructId) {
                $('.tab').show()
                const activeTabLink = document.querySelector('.tablinks.active');
                if (activeTabLink) {
                    var idBuffer = activeTabLink.textContent + "Panel"
                    if (document.getElementById(idBuffer) != null)
                        document.getElementById(idBuffer).style.display = "block";
                }
            }
            else if (id == OrgChartId) {
                $('.tab').hide()
                $('.tabcontent').hide()
            }
            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("BigTab");
            for (i = 0; i < tabcontent.length; i++)
                tabcontent[i].style.display = "none";
            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tab-nav-item");
            for (i = 0; i < tablinks.length; i++)
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            // Show the current tab, and add an "active" class to the button that opened the tab
            if (document.getElementById(id) != null)
                document.getElementById(id).style.display = "block";
            evt.currentTarget.className += " active";
            var OrgChart = document.getElementById('orgChartContainer')
            if (OrgChart.children.length == 0 &&
                !isEmptyOrNull(FinalDatascource2)) {
                GenerateOrgChart()
                DisableOrgChartMovement()
            }

            if (init <= 1) {
                init += 1
                scrollToParent()
            }
        }
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
                tablinks[i].className = tablinks[i].className.replace("active", "");
            // Show the current tab, and add an "active" class to the button that opened the tab
            if (document.getElementById(id) != null)
                document.getElementById(id).style.display = "block";
            var cards = document.getElementById(id).children[0].querySelector('.wrapper').querySelector('.wrapper').children
            for (let i = 0; i < cards.length; i++)
                cards[i].style.display = ''
            evt.currentTarget.className += " active";
        }
        var OrgStructId = 'chart-container'
        var OrgChartId = 'orgChartContainer'
        var OrgStructButton = document.getElementById('nav-home-tab')
        OrgStructButton.addEventListener('click', function () { openBig(event, OrgStructId); }, false);
        var OrgChartButton = document.getElementById('nav-profile-tab')
        OrgChartButton.addEventListener('click', function () { openBig(event, OrgChartId); }, false);
        OrgStructButton.click();
        if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) {
            ContentRow.appendChild(TabRowNode)
            ContentRow.appendChild(DivisionPanel)
            ContentRow.appendChild(SectionPanel)
            ContentRow.appendChild(DepartmentPanel)
            document.querySelector('.content').appendChild(ContentRow);
        }
        var ButtonHolder = document.createElement('div')
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
        ButtonHolder.appendChild(DivisionTableButton)
        ButtonHolder.appendChild(DepartmentTableButton)
        ButtonHolder.appendChild(SectionTableButton)

        var TextInputHolder = document.createElement('div')
        TextInputHolder.innerHTML = `    <input id="searcher" type="text" placeholder="Search..." style="margin-left: 10px;">`
        TabRowNode.appendChild(ButtonHolder)
        TabRowNode.appendChild(TextInputHolder)

        let orgchart = null

    })
    function stripClassSuffix(str: string): string {
        return str.endsWith("Class") ? str.slice(0, -5) : str;
    }
    function addChildren(root, TargetClassName: string, newNode: Node | NodeRow): boolean {
        // If the current node's name matches the target name, add the new node
        if (root.className.includes(TargetClassName)) {
            if (!root.children) {
                newNode.id = `${root.id}${EncodeString(stripClassSuffix(newNode.className), 0x88, 0x99)}`
                root.children = [newNode];
            }
            else {
                const checkId = (id: string): boolean => root.children.some((item) => item.id === id);
                if (checkId(newNode.id))//repeated children
                    return false
                newNode.id = `${root.id}${EncodeString(stripClassSuffix(newNode.className),0x88,0x99)}`
                root.children.push(newNode);
            }
            return true; // Node found and new node added
        }
        if (root.children)
            for (const child of root.children)
                if (addChildren(child, TargetClassName, newNode)) {
                    return false; // Stop recursion after adding the node
                }
        return false; // Target node not found
    }

    function hasChild(root, newNode) {
        if (root.children) {
            for (const child of root.children) {
                if (child.className === newNode.className)
                    return true; // Duplicate found

            }
        }
        return false; // No duplicate found
    }

    function checkRepeatedChildren(root, TargetClassName: string, newNode: Node): boolean {
        // If the current node's name matches the target name, add the new node
        //   console.log(root)
        if (!TargetClassName.endsWith("Class"))
            TargetClassName = TargetClassName + " Class"
        if (root.className === TargetClassName) {
            var result = hasChild(root, newNode)
            return result
        }
        if (root.children)
            for (const child of root.children)
                if (checkRepeatedChildren(child, TargetClassName, newNode))
                    return true; // Stop recursion after adding the node
        return false; // Target node not found
    }
    function listChildrenId(data: { id: string; parentId: string | null }[], parentId: string): string[] {
        const children = data.filter(item => item.parentId === parentId);
        const childIds = children.map(child => child.id);

        // Recursively find children of these children
        for (const child of children) {
            childIds.push(...listChildrenId(data, child.id));
        }

        return childIds;
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

    
    function deleteNodeById(data, id, returnOnDelete?) {
        if (Array.isArray(data)) {
            // Process each item in the array
            for (let i = 0; i < data.length; i++) {
                const child = data[i];
                // Recursively check and modify children
                deleteNodeById(child,id);
                // Remove the node if it matches the criteria
                if (child.id == id) {
                    data.splice(i, 1); // Remove the node from the array
                    i--; // Adjust the index after removal
                }
            }
        } else if (data.children) {
            // Process children nodes
            deleteNodeById(data.children, id);
            if (data.id == id) {
                console.log(id)
                return null;
            }
            // Indicate deletion for parent array processing
            
        }
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
    function findChildrenById(root, id) {
        // If the current node matches the className, return its children
        if (!isEmptyOrNull(root.id)) {
            if (root.id.trim() === id.trim())
                return root.children || [];
        }
        if (root.children && Array.isArray(root.children)) {
            for (let child of root.children) {
                let result = findChildrenById(child, id);
                if (result)
                    return result;
            }
        }
        return null;
    }
    function DisableOrgChartMovement() { //callback for node on orgchart
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {

                    var orgChartElement = document.getElementById("orgChartContainer")
                    if (!isEmptyOrNull(orgChartElement)) {
                        var orgDiv = orgChartElement.querySelector(".orgchart");
                        if (!isEmptyOrNull(orgDiv)) {
                            var nodes = orgDiv.getElementsByClassName('node')
                            for (let i = 0; i < nodes.length; i++) {
                                var jsonObject = JSON.parse(nodes[i].getAttribute('data-source'));
                                if (jsonObject.hierarchyLevel != EmployeeEnum)
                                    nodes[i].draggable = false
                            }
                        }
                    }


                     orgChartElement = document.getElementById("chart-container")

                    if (!isEmptyOrNull(orgChartElement)) {
                         orgDiv = orgChartElement.querySelector(".orgchart");

                        if (!isEmptyOrNull(orgDiv)) {
                             nodes = orgDiv.getElementsByClassName('node')
                            for (let i = 0; i < nodes.length; i++) {
                                var jsonObject = JSON.parse(nodes[i].getAttribute('data-source'));
                                if (jsonObject.children.length>0)
                                    nodes[i].draggable = false
                            }
                        }
                    }

                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    var pdfSources = [];
    var pdfOriginalName = [];
    let currentPdfIndex = 0;
  
    function setCallbacks() { //callback for node on orgchart
        const observer = new MutationObserver((mutationsList) => {
            var CheckChart = document.querySelector('#orgChartContainer').querySelector('.orgchart')
            var OrgStruct = document.querySelector('#chart-container').querySelector('.orgchart')
            if (isEmptyOrNull(CheckChart) || isEmptyOrNull(OrgStruct))
                return
            function scroll(id) {
                const orgChartContainer = document.getElementById(id) as HTMLElement;
                const parentNode = orgChartContainer.querySelector('.orgchart ') as HTMLElement;
                parentNode.style.transform = "matrix(1, 0, 0, 1, 0, 0)"; // Reset position

            }
            function isAnyNodeVisible(id) {
                const orgChart = document.querySelector(`${id} .orgchart`);

                const nodes = orgChart.querySelectorAll(".node");
                for (let node of nodes) {
                    const rect = node.getBoundingClientRect();
                    if (
                        rect.bottom > 0 && // Not fully above viewport
                        rect.top < window.innerHeight && // Not fully below viewport
                        rect.right > 0 && // Not fully left
                        rect.left < window.innerWidth // Not fully right
                    ) {
                        return true; // At least one node is visible
                    }
                }
                return false; // No nodes are visible
            }
            //for (const mutation of mutationsList) {
                console.log('muuu')
            //if (mutation.type === 'childList') {
            if ($('.tab-nav-item.nav-link.active').text() == 'Organisation Chart') {
                if (isAnyNodeVisible(`#orgChartContainer`) == false)//cannot see any node
                    scroll(`orgChartContainer`)
            }
            else if ($('.tab-nav-item.nav-link.active').text() == 'Organisation Structure') {
                if (isAnyNodeVisible(`#chart-container`) == false)//cannot see any node
                    scroll(`chart-container`)
            }
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
                                if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources])//is HR
                                    ElementArray[j].draggable = true
                            if (relation == '111')
                                ElementArray[j].draggable = false

                            ElementArray[j].addEventListener("drop", function (event) {
                                event.stopImmediatePropagation();
                                var StartPointData = event.dataTransfer.getData('text/plain'); // oobtain the data of the dropped element
                                if (isEmptyOrNull(StartPointData))
                                    return
                                var StartPointJson = JSON.parse(StartPointData);
                                var EventTargetElement = $(event.target)
                                if (!isEmptyOrNull(EventTargetElement.attr('class'))) {
                                    if (EventTargetElement.attr('class').includes('avatar'))
                                        EventTargetElement = EventTargetElement.parent()
                                }
                                if (isEmptyOrNull(EventTargetElement.parent().attr('data-source'))) {
                                    while (isEmptyOrNull(EventTargetElement.parent().attr('data-source')))
                                        EventTargetElement = EventTargetElement.parent()
                                }

                                if (isEmptyOrNull(StartPointJson.external))
                                    return
                                var destinationJson = JSON.parse(EventTargetElement.parent().attr('data-source'));
                                var EventTargetHierarchy = destinationJson.hierarchyLevel
                                var destinationClassName = destinationJson.className
                                var destinationId = destinationJson.id
                                var HierarchyLevelToSearch: any[] = DecomposeStringToList(destinationId, 0x88, 0x99)
                                if (!isEmptyOrNull(StartPointData)) {
                                    var StartPointTitle = null
                                    var StartPointName = null
                                    var StartPointId = null
                                    var StartPointHierarchyId = null
                                    var StartPointHierarchy = null
                                    if (StartPointJson.external) { // externla move
                                        StartPointId = StartPointJson.id
                                        StartPointHierarchyId = StartPointJson.hierarchyId
                                        StartPointTitle = StartPointJson.title
                                        StartPointName = StartPointJson.name
                                        StartPointHierarchy = StartPointJson.hierarchyLevel
                                        if (EventTargetHierarchy > StartPointHierarchy && !isEmptyOrNull(destinationJson.parentId)) {
                                            var StringToShow = capitalizeFirstLetter(getEnumNameFromValue(EventTargetHierarchy)) + ' cannot be above ' +
                                                capitalizeFirstLetter(getEnumNameFromValue(StartPointHierarchy))
                                            notifyError(StringToShow)
                                            event.stopImmediatePropagation();
                                            return
                                        }
                                    }
                                    var targetElementId = parseInt(EventTargetElement.parent().attr('class').replace('node', '').replace('Class', '').trim())
                                    if (targetElementId == parseInt(StartPointJson.parentId) &&
                                        StartPointJson.parentId !== undefined && targetElementId !== undefined)
                                        return
                                    if (isEmptyOrNull(StartPointJson.parentId) && isEmptyOrNull(StartPointJson.external))
                                        return
                                    if (isEmptyOrNull(EventTargetElement.parent().attr('class')))
                                        return
                                    var ClassName = StartPointJson.className
                                    if (StartPointHierarchy == null)
                                        StartPointHierarchy = StartPointJson.hierarchyLevel
                                    var DestinationNode = EventTargetElement.parent().attr('class').replace('node', '').trim().replace('focused', '')
                                    if (DestinationNode == ClassName)
                                        return
                                    if (StartPointHierarchy == EmployeeEnum) {
                                        if (EventTargetHierarchy == StartPointHierarchy)
                                            return
                                        console.log('haha')
                                        let i = 0
                                        var EmployeeRowId = parseInt(StartPointJson.EmployeeRowId)
                                        for (i = 0; i < ListOfEmployeeData.length; i++) {
                                            if (ListOfEmployeeData[i]["id"] == EmployeeRowId)
                                                break
                                        }
                                        var FinalOrgChartBuffer = JSON.parse(JSON.stringify(datascource2))
                                        var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                                        /*
                                        var Counter = 1
                                        for (const key of Object.keys(CardType)) {
                                            if (isNaN(Number(key))) {
                                                var id = ListOfEmployeeData[i][`${capitalizeFirstLetter(key)}Id`]
                                                if (isEmptyOrNull(id))
                                                    continue
                                                var TargetedClassName = `${key}${id}`
                                                if (HierarchyLevelToSearch[Counter] != TargetedClassName) {
                                                    var correctDepartment = GetLookupValueFromId(capitalizeFirstLetter(getEnumNameFromValue(CardType.DEPARTMENT)), ListOfEmployeeData[i][capitalizeFirstLetter(getEnumNameFromValue(CardType.DEPARTMENT)) + 'Id'])
                                                    var correctDivision = GetLookupValueFromId(capitalizeFirstLetter(getEnumNameFromValue(CardType.DIVISION)), ListOfEmployeeData[i][capitalizeFirstLetter(getEnumNameFromValue(CardType.DIVISION)) + 'Id'])
                                                    var correctSection = GetLookupValueFromId(capitalizeFirstLetter(getEnumNameFromValue(CardType.SECTION)), ListOfEmployeeData[i][capitalizeFirstLetter(getEnumNameFromValue(CardType.SECTION)) + 'Id'])
                                                    var string = `${ListOfEmployeeData[i]["EmployeeName"]} should be in `;

                                                    if (!isEmptyOrNull(correctSection))
                                                        string += `${correctSection} ${capitalizeFirstLetter(getEnumNameFromValue(CardType.SECTION))}, under `
                                                    if (!isEmptyOrNull(correctDepartment))
                                                        string += `${correctDepartment} ${capitalizeFirstLetter(getEnumNameFromValue(CardType.DEPARTMENT))}, under `
                                                    if (!isEmptyOrNull(correctDivision))
                                                        string += `${correctDivision} ${capitalizeFirstLetter(getEnumNameFromValue(CardType.DIVISION))}`
                                                    alertDialog(string)
                                                    break
                                                    //return
                                                }
                                                Counter+=1
                                            }
                                        }
                                        */
                                    }
                                    if (StartPointJson.external == null) {
                                        if (StartPointHierarchy == EmployeeEnum)
                                            StartPointTitle = findTitleByClassName(FinalDatascource2, ClassName);
                                        else
                                            StartPointTitle = findTitleByClassName(datascource2, ClassName);
                                    }
                                    if (StartPointId == null) {
                                        if (StartPointHierarchy == EmployeeEnum)
                                            StartPointId = findIdByClassName(FinalDatascource2, ClassName);
                                        else
                                            StartPointId = findIdByClassName(datascource2, ClassName);
                                    }
                                    if (StartPointName == null)
                                        StartPointName = ClassName.replace('Class', '').trim()
                                    StartPointName = StartPointName.replace('focused', '')
                                    //  console.log(StartPointHierarchy)
                                    //  console.log(EventTargetElement.parent().attr('data-source'))
                                    //   console.log(destinationJson)
                                    //   console.log('from ' + StartPointJson.className)
                                    //    console.log('to ' + EventTargetElement.parent().attr('class'))
                                    var child_list;
                                    // console.log(datascource2)
                                    // console.log(StartPointId)

                                    if (StartPointHierarchy == EmployeeEnum)
                                        child_list = findChildrenById(FinalDatascource2, StartPointId);
                                    else
                                        child_list = findChildrenById(datascource2, StartPointId);
                                    for (var index in child_list) {
                                        if (child_list[index].id == StartPointJson.id)
                                            return
                                    }
                                    var StartPointParentId = StartPointJson.parentId
                                    var HierarchyValue = parseInt(StartPointJson.hierarchyLevel)
                                    var EmployeeRowId = parseInt(StartPointJson.EmployeeRowId)
                                    var bufferNode: Node = {
                                        'EmployeeRowId': null,
                                        'hierarchyLevel': HierarchyValue,
                                        'id': StartPointId, 'name': StartPointTitle,
                                        'title': StartPointTitle, 'className': `${StartPointId} Class`,
                                        'hierarchyId': StartPointHierarchyId
                                    };
                                    if (StartPointHierarchy == EmployeeEnum) {
                                        bufferNode.EmployeeRowId = EmployeeRowId
                                        bufferNode.className = `EMPLOYEE${EmployeeRowId} Class`
                                    }
                                    if (StartPointHierarchy == EmployeeEnum) {
                                        var TargetedFinalOrgChartBuffer = FinalDatascource2
                                        TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, destinationId)
                                        if (!isEmptyOrNull(TargetedFinalOrgChartBuffer)) {
                                            if (checkRepeatedChildren(TargetedFinalOrgChartBuffer, destinationClassName, bufferNode))//check repeated children
                                                return
                                        }
                                    }
                                    else {
                                        var TargetedFinalOrgChartBuffer = datascource2
                                        TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, destinationId)
                                        if (checkRepeatedChildren(TargetedFinalOrgChartBuffer, destinationClassName, bufferNode))//check repeated children
                                            return
                                    }
                                    if (StartPointHierarchy == EmployeeEnum) {
                                        var FinalOrgChartBuffer = JSON.parse(JSON.stringify(FinalDatascource2))
                                        var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                                        TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, StartPointParentId)
                                        TargetedFinalOrgChartBuffer.children
                                            = TargetedFinalOrgChartBuffer.children.filter(child => child.EmployeeRowId !== StartPointJson.EmployeeRowId);
                                        for (var index in child_list)
                                            TargetedFinalOrgChartBuffer.children.push(child_list[index])
                                        FinalDatascource2 = FinalOrgChartBuffer
                                        TargetedFinalOrgChartBuffer = FinalDatascource2
                                        TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, destinationId)
                                        if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children)) {
                                            if (TargetedFinalOrgChartBuffer.children.length == 1 && isEmptyOrNull(TargetedFinalOrgChartBuffer.EmployeeRowId)) {//go down
                                                if (TargetedFinalOrgChartBuffer.children[0].hierarchyLevel == TargetedFinalOrgChartBuffer.hierarchyLevel) {
                                                    if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children[0].EmployeeRowId)) {
                                                        console.log(TargetedFinalOrgChartBuffer.children[0])
                                                       // if (TargetedFinalOrgChartBuffer.children[0].Extension == 1) {

                                                            destinationId = TargetedFinalOrgChartBuffer.children[0].id
                                                            DestinationNode = TargetedFinalOrgChartBuffer.children[0].className
                                                            TargetedFinalOrgChartBuffer = TargetedFinalOrgChartBuffer.children[0]
                                                       // }
                                                    }
                                                }
                                                
                                            }
                                        }
                                        console.log('haha')
                                        var EncodingBuffer = EncodeString(`EMPLOYEE${parseInt(StartPointJson.EmployeeRowId)}`, 0x88, 0x99)
                                        bufferNode.id = `${destinationId}${EncodingBuffer}`
                                        addChildren(TargetedFinalOrgChartBuffer, DestinationNode, bufferNode)
                                        removeEmptyChildren(FinalDatascource2)

                                        //var orgChartElement = document.getElementById("orgChartContainer")
                                        //var orgDiv = orgChartElement.querySelector(".orgchart");
                                        //Style = orgDiv.getAttribute('style')
                                        //DataPanStart = orgDiv.getAttribute('data-pan-start')
                                        //orgChartElement.innerHTML = ''

                                        if (!isEmptyOrNull(FinalDatascource2))
                                            GenerateSaveOrgChart()

                                        //orgDiv = orgChartElement.querySelector(".orgchart");
                                        //orgDiv.setAttribute('style', Style)
                                        //orgDiv.setAttribute('data-pan-start', DataPanStart)

                                    }
                                    else {
                                        var bufferId = EncodeString(StartPointId, 0x88, 0x99)
                                        if (!isEmptyOrNull(destinationId))
                                            bufferId = destinationId + bufferId
                                        var bufferNode: Node = {
                                            'EmployeeRowId': null,
                                            'hierarchyId': StartPointHierarchyId,
                                            'hierarchyLevel': HierarchyValue,
                                            'id': bufferId, 'name': StartPointTitle,
                                            'title': StartPointTitle, 'className': `${StartPointId} Class`
                                        };
                                        var TargetedFinalOrgChartBuffer = datascource2
                                        if (isEmptyOrNull(StartPointJson.external)) {
                                            TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, StartPointParentId)
                                            if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children)) {
                                                TargetedFinalOrgChartBuffer.children
                                                    = TargetedFinalOrgChartBuffer.children.filter(child => child.id !== StartPointJson.id);
                                                for (var index in child_list)
                                                    TargetedFinalOrgChartBuffer.children.push(child_list[index])
                                            }
                                        }
                                        TargetedFinalOrgChartBuffer = datascource2
                                        if (!isEmptyOrNull(HierarchyLevelToSearch))
                                            TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, destinationId)
                                        console.log(bufferNode)
                                        addChildren(TargetedFinalOrgChartBuffer, DestinationNode, bufferNode)
                                        removeEmptyChildren(datascource2)
                                        addListItem(destinationId, bufferId, bufferNode.name)
                                        if (!isEmptyOrNull(datascource2))
                                            GenerateSaveOrgStructure()
                                        console.log(destinationId)
                                        console.log(bufferId)
                                        console.log(bufferNode)
                                        console.log(DestinationNode)
                                        /*
                                          var FinalOrgChartBuffer = JSON.parse(JSON.stringify(FinalDatascource2))
                                            var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                                            TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, ElementToSetEmployee)
                                            TargetedFinalOrgChartBuffer.Rights[this.name] = isChecked
                                            FinalDatascource2 = FinalOrgChartBuffer
                                        */
                                        var PathList = DecomposeStringToList(destinationId, 0x88, 0x99)
                                        var FinalOrgChartBuffer = JSON.parse(JSON.stringify(FinalDatascource2))
                                        var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                                        let i=0
                                        for ( i = 0; i < PathList.length; i++) 
                                            TargetedFinalOrgChartBuffer = findByClassName(TargetedFinalOrgChartBuffer, PathList[i])
                                        deleteNodeById

                                        var TargetedClassName = PathList[PathList.length - 1]
                                        if (!isEmptyOrNull(TargetedFinalOrgChartBuffer)) {
                                            if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children)) {
                                                if (TargetedFinalOrgChartBuffer.children.length == 1 && isEmptyOrNull(TargetedFinalOrgChartBuffer.EmployeeRowId)) {
                                                    if (TargetedFinalOrgChartBuffer.children[0].hierarchyLevel == TargetedFinalOrgChartBuffer.hierarchyLevel) {
                                                        if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children[0].EmployeeRowId)) {
                                                            TargetedFinalOrgChartBuffer = TargetedFinalOrgChartBuffer.children[0]
                                                            TargetedClassName = TargetedFinalOrgChartBuffer.className
                                                        }
                                                    }
                                                    
                                                }
                                            }
                                            const bufferNodeCopy: Node = { ...bufferNode };
                                            bufferNodeCopy.id = `${TargetedFinalOrgChartBuffer.id}${EncodeString(stripClassSuffix(bufferNodeCopy.className), 0x88, 0x99)}`
                                            addChildren(TargetedFinalOrgChartBuffer, TargetedClassName, bufferNodeCopy)
                                            FinalDatascource2 = FinalOrgChartBuffer
                                            GenerateSaveOrgChart()
                                        }
                                    }
                                    event.dataTransfer.dropEffect = 'none';
                                }
                            })
                            ElementArray[j].addEventListener("dragstart", function (event) {
                                event.stopImmediatePropagation();
                                var text = event.target.getAttribute('data-source')
                                // console.log(text)
                                // console.log(jsonObject.relationship)
                                event.dataTransfer.setData('text/plain', text);
                                event.dataTransfer.dropEffect = 'move';  // Set the drop effect
                            })
                        }
                    }
                    var AvatarNodes = document.getElementsByClassName("avatar")
                    for (let j = 0; j < AvatarNodes.length; j++) {
                        var AvatarNode = AvatarNodes[j] as HTMLElement
                        AvatarNode.draggable = false
                    }
                    var panel = document.getElementsByClassName("side-div");
                    for (let i = 0; i < panel.length; i++) {
                        panel[i].addEventListener("drop", function (event) {
                            event.stopImmediatePropagation();
                            var data = event.dataTransfer.getData('text/plain');
                            var StartPointJsonObject = JSON.parse(data)
                            var hierarchy = StartPointJsonObject.hierarchyLevel
                            if (StartPointJsonObject.external)
                                return
                            var destinationHierarchy = StartPointJsonObject.hierarchyLevel
                            var id = StartPointJsonObject.id
                            var StartPointHierarchyId = StartPointJsonObject.hierarchyId
                            var title = StartPointJsonObject.title
                            var name = StartPointJsonObject.name
                            var ClassName = StartPointJsonObject.className
                            var StartPointParentId = StartPointJsonObject.parentId
                            if (ClassName == null)
                                ClassName = StartPointJsonObject.id
                            var child_list = findChildrenById(datascource2, id)
                            if (destinationHierarchy != EmployeeEnum) {
                                // removeListItem(id)
                                var FinalOrgChartBuffer = JSON.parse(JSON.stringify(datascource2))
                                var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                                TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, StartPointParentId)
                                deleteNodeById(TargetedFinalOrgChartBuffer, id)
                                TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                                var targetedIdList: any[] = DecomposeStringToList(StartPointParentId, 0x88, 0x99)
                                var targetedClass = `${targetedIdList[targetedIdList.length - 1]}`
                                var targetedId = `${targetedClass} Class`
                                TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, StartPointParentId)
                                for (var index in child_list) {
                                    var bufferIdSuffix = EncodeString(child_list[index].className, 0x88, 0x99)
                                    var bufferId = `${StartPointParentId}${bufferIdSuffix}`
                                    var bufferNode: Node = {
                                        'hierarchyId': StartPointHierarchyId,
                                        'EmployeeRowId': null,
                                        'hierarchyLevel': child_list[index].hierarchyLevel,
                                        'id': bufferId, 'name': child_list[index].name,
                                        'title': child_list[index].title, 'className': child_list[index].className
                                    };

                                    addChildren(TargetedFinalOrgChartBuffer, targetedId, bufferNode)
                                }
                                datascource2 = FinalOrgChartBuffer
                                removeEmptyChildren(datascource2)
                                datascource = JSON.parse(JSON.stringify(datascource2))
                                GenerateSaveOrgStructure()
                                var key = getEnumNameFromValue(hierarchy)
                                id = id.replace(key, "")

                                var PathList = DecomposeStringToList(StartPointJsonObject.id, 0x88, 0x99)
                                console.log(PathList)
                                var FinalOrgChartBuffer = JSON.parse(JSON.stringify(FinalDatascource2))
                                var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                                var TargetedFinalOrgChartParentBuffer = FinalOrgChartBuffer
                                let i = 0
                                for (i = 0; i < PathList.length-1; i++)
                                    TargetedFinalOrgChartParentBuffer = findByClassName(TargetedFinalOrgChartParentBuffer, PathList[i])
                                TargetedFinalOrgChartBuffer = findByClassName(TargetedFinalOrgChartParentBuffer, PathList[i])
                                if (!isEmptyOrNull(TargetedFinalOrgChartBuffer)) {
                                    //FinalOrgChartBuffer = JSON.parse(JSON.stringify(FinalDatascource2))
                                  
                                    /*
                                    if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children)) {
                                        if (TargetedFinalOrgChartBuffer.children.length == 1 && isEmptyOrNull(TargetedFinalOrgChartBuffer.EmployeeRowId)) {
                    
                                            if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children[0].EmployeeRowId)) {
                                                //deleteNodeById(TargetedFinalOrgChartBuffer, TargetedFinalOrgChartBuffer.children[0].id)
                                                TargetedFinalOrgChartBuffer = TargetedFinalOrgChartParentBuffer.children[0]
                                            }
                                            
                                        }
                                    }
                                    */
                                    var ListOfPath = DecomposeStringToList(TargetedFinalOrgChartBuffer.id, 0x88, 0x99)
                                    var newId = ''
                                    for (let i = 0; i < ListOfPath.length - 1; i++)
                                        newId = `${newId}${EncodeString(ListOfPath[i],0x88,0x99)}`
                                    
                                    var parentOfElementToRemove = SearchById(TargetedFinalOrgChartParentBuffer, newId)
                                    console.log(newId)
                                    console.log(parentOfElementToRemove)
                                    var childrenToAppend = TargetedFinalOrgChartBuffer.children
                                    if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children)) {
                                        if (TargetedFinalOrgChartBuffer.children.length == 1 && isEmptyOrNull(TargetedFinalOrgChartBuffer.EmployeeRowId)) {
                                            if (TargetedFinalOrgChartBuffer.children[0].hierarchyLevel == TargetedFinalOrgChartBuffer.hierarchyLevel) {
                                                if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children[0].EmployeeRowId)) { // go down
                                                    console.log(TargetedFinalOrgChartBuffer.children[0])
                                                   // if (TargetedFinalOrgChartBuffer.children[0].Extension == 1) {
                                                        childrenToAppend = TargetedFinalOrgChartBuffer.children[0].children
                                                        deleteNodeById(TargetedFinalOrgChartBuffer, TargetedFinalOrgChartBuffer.children[0].id)

                                                   // }
                                                }
                                            }
                                        }
                                    }
                                    deleteNodeById(parentOfElementToRemove, TargetedFinalOrgChartBuffer.id)

                                    console.log(TargetedFinalOrgChartParentBuffer)
                                    console.log(TargetedFinalOrgChartBuffer)
                                    //deleteNodeById(FinalOrgChartBuffer, TargetedFinalOrgChartBuffer.id)
                                    // deleteNodeById(FinalOrgChartBuffer, TargetedFinalOrgChartParentBuffer.id)
                                    if (!isEmptyOrNull(childrenToAppend)) {
                                        for (let i = 0; i < childrenToAppend.length; i++) {
                                            childrenToAppend[i].id = `${parentOfElementToRemove.id}${EncodeString(stripClassSuffix(childrenToAppend[i].className), 0x88, 0x99)
                                        }`
                                            addChildren(parentOfElementToRemove, parentOfElementToRemove.className, childrenToAppend[i])

                                        }
                                    }
                                    FinalDatascource2 = FinalOrgChartBuffer
                                    GenerateSaveOrgChart()
                                }
                            }

                        })
                        panel[i].addEventListener("dragover", function (event) {
                            event.stopImmediatePropagation();
                            event.preventDefault()
                        })
                    }

                    var CheckBoxes = document.getElementsByClassName("CheckBox");
                    for (let i = 0; i < CheckBoxes.length; i++) {
                        CheckBoxes[i].addEventListener('change', function handleCheckboxChange(this) {
                            event.stopImmediatePropagation();
                            const isChecked = this.checked;
                            var targetJson = JSON.parse(this.parentElement.parentElement.getAttribute('data-source'))
                            var targetEmployeeRowId = targetJson.EmployeeRowId
                            for (let ListCounter = 0; ListCounter < ListOfEmployeeData.length; ListCounter++) {
                                if (ListOfEmployeeData[ListCounter].id == targetEmployeeRowId) {
                                    break
                                }
                            }
                            var ElementToSetEmployee = targetJson.id
                            var FinalOrgChartBuffer = JSON.parse(JSON.stringify(FinalDatascource2))
                            var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                            TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, ElementToSetEmployee)






                            console.log(isEmptyOrNull(TargetedFinalOrgChartBuffer))






                            if (isEmptyOrNull(TargetedFinalOrgChartBuffer.Rights))
                                TargetedFinalOrgChartBuffer.Rights = {
                                "Appraisal": false,
                                    "LeaveApproval": false,
                                    "OtApproval": false,
                                    "Training": false,
                                    "MoneyClaiming": false,
                                }

                            TargetedFinalOrgChartBuffer.Rights[this.name] = isChecked
                            FinalDatascource2 = FinalOrgChartBuffer
                            var ListOfRights: NodeRights[] = extractRights(FinalOrgChartBuffer)
                            EmployeeRightsService.ClearOldAdminRightRecord({
                            }, response => {
                                for (let i = 0; i < ListOfRights.length; i++) {

                                    if (ListOfRights[i].nodeHierarchy != EmployeeEnum && !isEmptyOrNull(ListOfRights[i].EmployeeRowId)) {
                                        if (ListOfRights[i].nodeHierarchy != CardType.DIRECTOR) {
                                            EmployeeRightsService.Create({
                                                Entity: {
                                                    "EmployeeRowId": ListOfRights[i].EmployeeRowId,
                                                    "NodeId": ListOfRights[i].id,
                                                    "Appraisal": ListOfRights[i].Rights.Appraisal,
                                                    "LeaveApproval": ListOfRights[i].Rights.LeaveApproval,
                                                    "OtApproval": ListOfRights[i].Rights.OtApproval,
                                                    "Training": ListOfRights[i].Rights.Training,
                                                    "MoneyClaiming": ListOfRights[i].Rights.MoneyClaiming,
                                                }
                                            })
                                        }
                                        else {
                                            EmployeeRightsService.Create({
                                                Entity: {
                                                    "EmployeeRowId": ListOfRights[i].EmployeeRowId,
                                                    "NodeId": ListOfRights[i].id,
                                                    "Appraisal": true,
                                                    "LeaveApproval": true,
                                                    "OtApproval": true,
                                                    "Training": true,
                                                    "MoneyClaiming": true,
                                                }
                                            })

                                        }


                                    }

                                }



                            })
                        })
                    }
                    let SelectEmployee = $(".SelectEmployee")
                    SelectEmployee.on('click', function (event) {
                        event.stopImmediatePropagation();
                        let target = $(this)
                        let targetJson = JSON.parse(target.parent().attr('data-source'))
                        console.log(targetJson)

                        var targetId = targetJson.id
                        var ElementToSet = target.parent().attr('class')
                        ElementToSetEmployeeInDialog = targetId
                        var ElementToSetEmployeeClassName = ElementToSet.replace('node', '').trim()
                        var TargetElementSpan = document.getElementById('TargetElementSpan')
                        TargetElementSpan.textContent = findTitleByClassName(datascource2, ElementToSetEmployeeClassName)
                        findTitleByClassName(datascource2, ElementToSetEmployeeClassName)
                        EmployeeChoosingDialog.show()
                    })
                    var filterCheckBox = document.getElementsByClassName("filterCheckBox");
                    for (let i = 0; i < filterCheckBox.length; i++) {
                        filterCheckBox[i].addEventListener('change', function handleCheckboxChange(this) {
                            event.stopImmediatePropagation();
                            GenerateOrgStructure()
                        })
                    }
                    var OrgChartFilterCheckBox = document.getElementsByClassName("OrgChartFilterCheckBox");
                    for (let i = 0; i < OrgChartFilterCheckBox.length; i++) {
                        OrgChartFilterCheckBox[i].addEventListener('change', function handleCheckboxChange(this) {
                            event.stopImmediatePropagation();
                            GenerateOrgChart()
                        })
                    }
                    $('.clickable-icon').on('click', async function (e) { // remove PIC
                        e.stopImmediatePropagation();
                        var target = $(e.target)
                        var targetData = null
                        while (isEmptyOrNull(targetData)) {
                            targetData = target.attr('data-source')
                            target = target.parent()
                        }
                        var targetJson = JSON.parse(targetData)
                        var targetId = removedNodeId = targetJson.id
                        removedNodeId = `${removedNodeId}${EncodeString(`EMPLOYEE${targetJson.EmployeeRowId}`, 0x88, 0x99)}`
                        indexToRemove = DecomposeStringToList(removedNodeId,0x88,0x99).length - 1

                        var targetClassName = targetJson.className
                        var FinalOrgChartBuffer = JSON.parse(JSON.stringify(datascource2))
                        var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                        TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, targetId)
                        SetEmployeeByClassName(TargetedFinalOrgChartBuffer, targetClassName, null)
                        datascource2 = FinalOrgChartBuffer
                        await GenerateSaveOrgStructure()


                        var pathList = DecomposeStringToList(TargetedFinalOrgChartBuffer.id, 0x88, 0x99)
                        var FinalOrgChartBuffer = JSON.parse(JSON.stringify(FinalDatascource2))
                        var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                        var ChildrenList;
                        for (let i = 0; i < pathList.length; i++) 
                            TargetedFinalOrgChartBuffer = findByClassName(TargetedFinalOrgChartBuffer, pathList[i])
                        if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children)) {
                            if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children[0].children))
                                ChildrenList = TargetedFinalOrgChartBuffer.children[0].children
                            deleteNodeById(TargetedFinalOrgChartBuffer, TargetedFinalOrgChartBuffer.children[0].id)
                            if (!isEmptyOrNull(ChildrenList))
                                for (let i = 0; i < ChildrenList.length; i++)
                                    addChildren(TargetedFinalOrgChartBuffer, TargetedFinalOrgChartBuffer.className, ChildrenList[i])
                        }                        
                        FinalDatascource2 = FinalOrgChartBuffer
                        


                        var EmployeeInOrgStruct = countEmployee(SplitOrgStructList, targetJson.EmployeeRowId)
                        console.log(EmployeeInOrgStruct)
                        console.log(SplitOrgStructList)

                        if (EmployeeInOrgStruct == 0) //if employee not in org struct, add it back to the org chart
                        {
                            var FinalOrgChartBuffer = JSON.parse(JSON.stringify(FinalDatascource2))
                            var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                            var EmployeeData = ListOfEmployeeData.filter(Employee => Employee.id == targetJson.EmployeeRowId)
                            var DivisionClass = `DIVISION${EmployeeData[0].DivisionId}`
                            var DepartmentClass = `DEPARTMENT${EmployeeData[0].DepartmentId}`
                            var SectionClass = `SECTION${EmployeeData[0].SectionId}`
                            if (!isEmptyOrNull(EmployeeData)) {
                                if (!isEmptyOrNull(EmployeeData[0].DivisionId))
                                    TargetedFinalOrgChartBuffer = findByClassName(TargetedFinalOrgChartBuffer, DivisionClass)
                                if (!isEmptyOrNull(EmployeeData[0].DepartmentId))
                                    TargetedFinalOrgChartBuffer = findByClassName(TargetedFinalOrgChartBuffer, DepartmentClass)
                                if (!isEmptyOrNull(EmployeeData[0].SectionId))
                                    TargetedFinalOrgChartBuffer = findByClassName(TargetedFinalOrgChartBuffer, SectionClass)
                                console.log(TargetedFinalOrgChartBuffer)
                                console.log(EmployeeData)
                                var id = EncodeString(`EMPLOYEE${EmployeeData[0]["id"]}`, 0x88, 0x99)
                                var bufferNode: Node = {
                                    'hierarchyId': EmployeeData[0]["id"],
                                    'EmployeeRowId': EmployeeData[0]["id"],
                                    'hierarchyLevel': EmployeeEnum,
                                    'id': id, 'name': EmployeeData[0].EmployeeName,
                                    'title': EmployeeData[0].EmployeeName, 'className': `EMPLOYEE${EmployeeData[0].id} Class`
                                };
                                if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children)) {
                                    if (TargetedFinalOrgChartBuffer.children.length == 1 && isEmptyOrNull(TargetedFinalOrgChartBuffer.EmployeeRowId)) {//go down
                                        if (TargetedFinalOrgChartBuffer.children[0].hierarchyLevel == TargetedFinalOrgChartBuffer.hierarchyLevel) {
                                            if (!isEmptyOrNull(TargetedFinalOrgChartBuffer.children[0].EmployeeRowId)) {
                                                console.log(TargetedFinalOrgChartBuffer.children[0])
                                               // if (TargetedFinalOrgChartBuffer.children[0].Extension == 1)
                                                    TargetedFinalOrgChartBuffer = TargetedFinalOrgChartBuffer.children[0]
                                            }
                                        }

                                    }
                                }

                                addChildren(TargetedFinalOrgChartBuffer, TargetedFinalOrgChartBuffer.className, bufferNode)
                                FinalDatascource2 = FinalOrgChartBuffer

                            }
                        }


                        GenerateSaveOrgChart()
                   
                    })
                    $('#generateOrgChartButton').on('click', function (e) {
                        e.stopImmediatePropagation();

                        if (!isEmptyOrNull(FinalDatascource2)) {
                            confirmDialog("Do you want to generate Organization Chart? The original chart will be override.", () => {
                                GenerateOrgChartData()
                               // setCallbacks()
                            });
                        }
                        else {
                            GenerateOrgChartData()
                            //setCallbacks()
                        }
                    })
                    function clickExportButton(id) {
                        let chartContainer = document.querySelector(id),
                            mask = chartContainer.querySelector(':scope > .mask'),
                            sourceChart: HTMLElement = chartContainer.querySelector('.orgchart'),
                            flag = sourceChart.classList.contains('l2r') || sourceChart.classList.contains('r2l');

                        if (!mask) {
                            mask = document.createElement('div');
                            mask.setAttribute('class', 'mask');
                            mask.innerHTML = `<i class="fa fa-circle-o-notch fa-spin spinner"></i>`;
                            chartContainer.appendChild(mask);
                        } else {
                            mask.classList.remove('hidden');
                        }
                        chartContainer.classList.add('canvasContainer');

                        html2canvas(sourceChart, {
                            'width': flag ? sourceChart.clientHeight : sourceChart.clientWidth,
                            'height': flag ? sourceChart.clientWidth : sourceChart.clientHeight,
                            'onclone': function (cloneDoc) {
                                let canvasContainer = cloneDoc.querySelector('.canvasContainer');
                                canvasContainer.style.overflow = 'visible';
                                canvasContainer.querySelector('.orgchart').transform = ''
                            }
                        })
                            .then((canvas) => {
                                let downloadBtn = chartContainer.querySelector('.oc-download-btn');

                                chartContainer.querySelector('.mask').classList.add('hidden');
                                downloadBtn.setAttribute('href', canvas.toDataURL());
                                downloadBtn.click();
                            })
                            .catch((err) => {
                                console.error('Failed to export the curent orgchart!', err);
                            })
                            .finally(() => {
                                chartContainer.classList.remove('canvasContainer');
                            });
                    }
                    $('#exportOrgStructButton').on('click', function (e) {
                        e.stopImmediatePropagation();
                        clickExportButton('#chart-container')
                    })
                    $('#exportOrgChartButton').on('click', function (e) {
                        e.stopImmediatePropagation();
                        clickExportButton('#orgChartContainer')
                    })
                    $('#togglePanel').on('click', function (e) {
                        //  console.log('haha')
                        e.stopImmediatePropagation();
                        function isDivHidden(div) {
                            // Get the computed style of the div
                            const style = window.getComputedStyle(div);
                            return style.display === 'none';
                        }
                        const myDiv = document.getElementById('ElementsTab');
                        if (isDivHidden(myDiv)) {
                            myDiv.style.display = 'block'
                            this.textContent = 'Hide Tab'
                        } else {
                            myDiv.style.display = 'none'
                            this.textContent = 'Display Tab'
                        }
                    })
                    $('#toggleSidePanel').on('click', function (e) {
                        //  console.log('haha')
                        function isDivHidden(div) {
                            // Get the computed style of the div
                            const style = window.getComputedStyle(div);
                            // Check if display is 'none'
                            return style.display === 'none';
                        }

                        // Usage example
                        const myDiv = document.getElementById('left-panel');

                        if (isDivHidden(myDiv)) {
                            myDiv.style.display = 'block'
                            this.textContent = 'Hide Tab'
                        } else {
                            myDiv.style.display = 'none'
                            this.textContent = 'Display Tab'
                        }
                        e.stopImmediatePropagation();

                    })
                    $('#toggleOrgChartSidePanel').on('click', function (e) {
                        function isDivHidden(div) {
                            // Get the computed style of the div
                            const style = window.getComputedStyle(div);
                            // Check if display is 'none'
                            return style.display === 'none';
                        }
                        // Usage example
                        const myDiv = document.getElementById('chart-left-panel');

                        if (isDivHidden(myDiv)) {
                            myDiv.style.display = 'block'
                            this.textContent = 'Hide Tab'
                        } else {
                            myDiv.style.display = 'none'
                            this.textContent = 'Display Tab'
                        }
                        e.stopImmediatePropagation();

                    })


                    $('.orgchart').addClass('noncollapsable'); // deactivate
                    var orgChartElement = document.getElementById("orgChartContainer")

                    if (!isEmptyOrNull(orgChartElement) && Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) {
                        var orgDiv = orgChartElement.querySelector(".orgchart");
                        if (!isEmptyOrNull(orgDiv)) {
                            var nodes = orgDiv.getElementsByClassName('node')
                            for (let i = 0; i < nodes.length; i++) {
                                var jsonObject = JSON.parse(nodes[i].getAttribute('data-source'));
                                if (jsonObject.hierarchyLevel != EmployeeEnum) 
                                    nodes[i].draggable = false
                                if (!isEmptyOrNull(jsonObject.EmployeeRowId)) {
                                    nodes[i].addEventListener("click", function (event) {
                                        event.stopImmediatePropagation();
                                        var target = $(event.target)
                                        let displayPdf = false

                                        if (target.hasClass('CheckBox')) {
                                            return
                                        }

                                        else if (target.hasClass('dot'))//display pdf
                                            displayPdf = true
                                        var targetData = null
                                        while (isEmptyOrNull(targetData)) {
                                            targetData = target.attr('data-source')
                                            target = target.parent()
                                        }
                                        var targetJson = JSON.parse(targetData);
                                        var targetEmployeeRowId = targetJson.EmployeeRowId
                                        if (displayPdf == true) {
                                            //display pdf
                                            //console.log(ListOfEmployeeData)
                                            const employeeRow = ListOfEmployeeData.find(employee => employee.id === targetEmployeeRowId);
                                            //console.log(employeeRow)
                                            var pdf = document.getElementById('pdf')
                                            //  console.log(pdf)
                                            //  console.log($(pdf))
                                            pdfSources = []
                                            pdfOriginalName = []
                                            try {
                                                const result = JSON.parse(employeeRow.JobDescPath);
                                                // console.log(result); // This line will not be executed if jsonString is invalid
                                                for (let i = 0; i < result.length; i++) {
                                                    pdfSources.push(`/upload/${result[i].Filename}`)
                                                    pdfOriginalName.push(`${result[i].OriginalName}`)
                                                }
                                            } catch (error) {
                                                pdf.src = `/upload/${employeeRow.JobDescPath}`
                                            }
                                            updatePdf(); // Load the first PDF
                                            currentPdfIndex = 0;
                                            pdfDialog.show()
                                            //pdf.src = `/upload/EmployeeProfile/00000/00000034_ug53pfwxuh2sk.pdf`;
                                            //img.src = `/upload/${imgPath}`;
                                            return
                                        }

                                        else {//display employee profile
                                            var dlg = new EmployeeBasicDataDialog(targetEmployeeRowId)
                                            dlg.loadByIdAndOpenDialog(targetEmployeeRowId)

                                        }
                                    })
                                }
                            }
                        }
                    }
                   
                    if (firstTime == 1)
                        scrollToParent()
                    firstTime = 0
                    observer.disconnect(); // Stop observing after finding the nodes

               // }
           // }
        });
        observer.observe(document.querySelector('#orgChartContainer'), { childList: true, subtree: true, attributes: true });
    }
    function extractEmployeeInOrgChart(node) {
        let results = [];
        if (node.EmployeeRowId !== undefined && !isEmptyOrNull(node.EmployeeRowId))
            results.push(parseInt(node.EmployeeRowId))
        if (node.children && Array.isArray(node.children)) {
            for (let child of node.children)
                results = results.concat(extractEmployeeInOrgChart(child));
        }
        return results;
    }
    function ExtendTree(children) {
        function stripClassSuffix(str: string): string {
            return str.endsWith("Class") ? str.slice(0, -5) : str;
        }

        for (let child of children) {
            // Check if the child has children and store them
            const nestedChildren = child.children || [];
            var idBuffer = `${child.id}`;

            // Condition to modify child
            if (child.EmployeeRowId != null && child.hierarchyLevel !== EmployeeEnum) {
                child.children = [];
                // Encode the ID
                idBuffer = `${child.id}${EncodeString(`EMPLOYEE${child.EmployeeRowId}`, 0x88, 0x99)}`;
                var bufferNode: NodeRow = {
                    EmployeeRowId: child.EmployeeRowId,
                    hierarchyLevel: child.hierarchyLevel,
                    name: child.name,
                    id: idBuffer,
                    title: child.title,
                    className: `EMPLOYEE${child.EmployeeRowId} Class`,
                    children: nestedChildren.length ? nestedChildren : undefined, // Only add children if they exist
                    extension: 1,
                    parentId: child.id
                }
                // Push modified child information into the children array
                child.children.push(bufferNode);
                // Clear EmployeeRowId
                child.EmployeeRowId = null;
            }
            if (nestedChildren.length > 0) {
                for (let nestedChild of nestedChildren) {
                    var strip = stripClassSuffix(nestedChild.className)
                    var newId = `${idBuffer}${EncodeString(strip, 0x88, 0x99)}`;
                    nestedChild.id = newId
                }
                ExtendTree(nestedChildren);
            }
        }
        return children;
    }
    function SearchById(node, id) {
        // Check if the current node has Rights and EmployeeRowId
        if (node.id == id)
            return node

        if (node.children) {
            for (const child of node.children) {
                var result = SearchById(child, id);
                if (result)
                    return result
            }
        }
        return null;
    }
    function extractRightsAndEmployeeRowId(node: Node): ExtractedData[] {
        let result: ExtractedData[] = [];
        // Check if the current node has Rights and EmployeeRowId
        if (node.Rights && node.EmployeeRowId) {
            result.push({
                hierarchyId: node.hierarchyLevel,
                id: node.id,
                EmployeeRowId: node.EmployeeRowId,
                Rights: node.Rights
            });
        }
        else if (!isEmptyOrNull(node.EmployeeRowId) && node.hierarchyLevel != EmployeeEnum)
            result.push({
                hierarchyId: node.hierarchyLevel,
                id: node.id,
                EmployeeRowId: node.EmployeeRowId,
                Rights: {
                    OtApproval: false,
                    LeaveApproval: false,
                    Appraisal: false,
                    MoneyClaiming: false,
                    Training:false
                }
            });
        // Recursively process children if they exist
        if (node.children) {
            for (const child of node.children)
                result = result.concat(extractRightsAndEmployeeRowId(child));
        }
        return result;
    }

    function GenerateOrgChartData() {
        
        // Recursive function to traverse the employee structure and collect data
        function fillInRights(node) {
            if (node.hierarchy == CardType.DIRECTOR) {
                var Right = {
                    'Appraisal': true,
                    'LeaveApproval': true,
                    'OtApproval': true,
                    'MoneyClaiming': true,
                    'Training': true
                }
                node.Rights = Right
            }
            else if (isEmptyOrNull(node.Rights) && !isEmptyOrNull(node.EmployeeRowId)) {
                var Right = {
                    'Appraisal': false,
                    'LeaveApproval': false,
                    'OtApproval': false,
                    'MoneyClaiming': false,
                    'Training': false
                }
                node.Rights = Right
            }
            if (node.children) {
                for (const child of node.children)
                    fillInRights(child);
            }
        }
        if (!isEmptyOrNull(FinalDatascource2))
            var ListOfRights: ExtractedData[] = extractRightsAndEmployeeRowId(FinalDatascource2)
        let EmployeeInOrgChart: number[] = extractEmployeeInOrgChart(datascource2)
        //console.log(JSON.parse(JSON.stringify(datascource2)))
        var GenerativeOrgChartBuffer = JSON.parse(JSON.stringify(datascource2))
        var FinalOrgChartBuffer
        /*
        for (let i = 0; i < ListOfEmployeeData.length; i++) {
             FinalOrgChartBuffer = JSON.parse(JSON.stringify(datascource2))
            var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
            for (const key of Object.keys(CardType)) {
                if (isNaN(Number(key))) {
                var id = ListOfEmployeeData[i][`${capitalizeFirstLetter(key)}Id`];
                if (isEmptyOrNull(id))
                    continue
                var TargetedClassName = `${key}${id} Class`
                    TargetedFinalOrgChartBuffer = findByClassName(TargetedFinalOrgChartBuffer, TargetedClassName)
                    if (TargetedFinalOrgChartBuffer == null) {
                        var correctDepartment = GetLookupValueFromId(capitalizeFirstLetter(getEnumNameFromValue(CardType.DEPARTMENT)), ListOfEmployeeData[i][capitalizeFirstLetter(getEnumNameFromValue(CardType.DEPARTMENT)) + 'Id'])
                        var correctDivision = GetLookupValueFromId(capitalizeFirstLetter(getEnumNameFromValue(CardType.DIVISION)), ListOfEmployeeData[i][capitalizeFirstLetter(getEnumNameFromValue(CardType.DIVISION)) + 'Id'])
                        var correctSection = GetLookupValueFromId(capitalizeFirstLetter(getEnumNameFromValue(CardType.SECTION)), ListOfEmployeeData[i][capitalizeFirstLetter(getEnumNameFromValue(CardType.SECTION)) + 'Id'])
                        var string = `${ListOfEmployeeData[i]["EmployeeName"]} should be in `;
                        if (!isEmptyOrNull(correctSection))
                            string += `${correctSection} ${capitalizeFirstLetter(getEnumNameFromValue(CardType.SECTION))}, under `
                        if (!isEmptyOrNull(correctDepartment))
                            string += `${correctDepartment} ${capitalizeFirstLetter(getEnumNameFromValue(CardType.DEPARTMENT))}, under `
                        if (!isEmptyOrNull(correctDivision))
                            string += `${correctDivision} ${capitalizeFirstLetter(getEnumNameFromValue(CardType.DIVISION))}`
                        alertDialog(string)
                    break
                    }
            }
            }
        }
        */
        FinalOrgChartBuffer = JSON.parse(JSON.stringify(GenerativeOrgChartBuffer))


        //fill in employee
        //START

        for (let i = 0; i < ListOfEmployeeData.length; i++) {
            //if (EmployeeInOrgChart.includes(ListOfEmployeeData[i].id) || EmployeeFilter.includes(ListOfEmployeeData[i].id)) 
            //    continue
            if (EmployeeInOrgChart.includes(ListOfEmployeeData[i].id))
                continue

            var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
            var str
            for (var LookupIndex in OccupationTable.items) {
                if (OccupationTable.items[LookupIndex].Id == ListOfEmployeeData[i]["OccupationId"]) {
                    str = OccupationTable.items[LookupIndex].Name
                    break
                }
            }

            var id = EncodeString(`EMPLOYEE${ListOfEmployeeData[i]["id"]}`, 0x88, 0x99)
            var bufferNode: Node = {
                'hierarchyId': ListOfEmployeeData[i]["id"],
                'EmployeeRowId': ListOfEmployeeData[i]["id"],
                'hierarchyLevel': EmployeeEnum,
                'id': id, 'name': str,
                'title': str, 'className': `EMPLOYEE${ListOfEmployeeData[i].id} Class`
            };
            var PrevDestination;
            let counter = 0;
            let ignore = 0;
            for (const key of Object.keys(CardType)) {
                if (isNaN(Number(key))) {
                    if (isEmptyOrNull(ListOfEmployeeData[i][`${capitalizeFirstLetter(key)}Id`]))
                        continue
                    var DestinationNode = `${key}${ListOfEmployeeData[i][capitalizeFirstLetter(key) + 'Id']} Class`
                    var Holder = TargetedFinalOrgChartBuffer
                    TargetedFinalOrgChartBuffer = findByClassName(TargetedFinalOrgChartBuffer, DestinationNode)
                    if (isEmptyOrNull(TargetedFinalOrgChartBuffer)) {
                        if (counter > 0) {
                            TargetedFinalOrgChartBuffer = Holder
                            DestinationNode = PrevDestination
                        }
                        else {
                            TargetedFinalOrgChartBuffer = findByClassName(FinalOrgChartBuffer, `${getEnumNameFromValue(CardType.DIRECTOR)}`) 
                            ignore = 1;
                        }
                        break
                    }
                    PrevDestination = DestinationNode
                    counter += 1
                }
            }
            /*
            if (TargetedFinalOrgChartBuffer.children.length == 1) {
                bufferNode.id = TargetedFinalOrgChartBuffer.children[0].id + bufferNode.id
                ForceChildren(TargetedFinalOrgChartBuffer.children[0], bufferNode)
            }
            else {
            */
            if (!isEmptyOrNull(TargetedFinalOrgChartBuffer)) {
                if (!EmployeeInOrgChart.includes(ListOfEmployeeData[i].id)) {
                    bufferNode.id = TargetedFinalOrgChartBuffer.id + bufferNode.id
                    addChildren(TargetedFinalOrgChartBuffer, DestinationNode, bufferNode)
                }
            }

            // }

        }
        //END






        var obj = FinalOrgChartBuffer
        var edited = ExtendTree(obj.children)
        obj.children = []
        obj.children = edited






        //THIS SECTION WILL fill in rights
        //START
        var ListOfUnusedRights: ExtractedData[] = []
        if (!isEmptyOrNull(ListOfRights)) {
            for (let i = 0; i < ListOfRights.length; i++) {
                var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                var buffer: Node = SearchById(TargetedFinalOrgChartBuffer, ListOfRights[i].id)
                //console.log(buffer)
                if (isEmptyOrNull(buffer)) {
                    if (ListOfRights[i].hierarchyId <= CardType.SECTION) {
                        if (ListOfRights[i].id != removedNodeId)
                        ListOfUnusedRights.push(ListOfRights[i])
                    }
                    continue
                }
                //if (!isEmptyOrNull(buffer))
                 buffer.Rights = ListOfRights[i].Rights

            }
        }
        if (!isEmptyOrNull(removedNodeId)) {

            for (let i = 0; i < ListOfUnusedRights.length; i++) {
                var newPath = DecomposeStringToList(ListOfUnusedRights[i].id, 0x88, 0x99)
                newPath.splice(indexToRemove, 1)
                var newId = ComposeListToString(newPath, 0x88, 0x99)

                var buffer: Node = SearchById(TargetedFinalOrgChartBuffer, newId)
                if (!isEmptyOrNull(buffer))
                    buffer.Rights = ListOfUnusedRights[i].Rights
            }


            removedNodeId = ''
        }
        else if (!isEmptyOrNull(addedClass)) {
            for (let i = 0; i < ListOfUnusedRights.length; i++) {
                var newPath = DecomposeStringToList(ListOfUnusedRights[i].id, 0x88, 0x99)
                newPath.splice(addedIndex, 0, addedClass)
                var newId = ComposeListToString(newPath, 0x88, 0x99)

                var buffer: Node = SearchById(TargetedFinalOrgChartBuffer, newId)
                if (!isEmptyOrNull(buffer))
                    buffer.Rights = ListOfUnusedRights[i].Rights
            }
            addedClass=''
        }
        TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
        fillInRights(TargetedFinalOrgChartBuffer)
        // END

        FinalDatascource2 = FinalOrgChartBuffer
        //    var orgChartElement = document.getElementById("orgChartContainer")
        //    orgChartElement.innerHTML = ''
        //   for (let i = 0; i < orgChartElement.children.length; i++)
        //       orgChartElement.children[i].remove()
        GenerateSaveOrgChart()

    }
    function GenerateCard(ElementId, CardText, Type) {
        var EmployeeCol_2 = document.createElement('div')
        EmployeeCol_2.className = "flex-child"
        var EmployeeContainer = document.createElement('td')
        var Employee = document.createElement('div')
        EmployeeContainer.appendChild(Employee)
        var CardClass = CardType[Type];
        Employee.className = "flex-container " + CardClass;
        Employee.style.border = '1px solid #ccc';
        Employee.style.padding = '10px';
        Employee.draggable = true;

        var DataSource = `{ "EmployeeRowId":"null","hierarchyLevel":"${Type}","hierarchyId":"${ElementId}" ,"id":"${CardClass + ElementId}",
        "type":"${Type}","title":"${CardText}","external": "true","ElementId": "", "className":"${CardClass + ElementId} Class"}`;
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
    function SetEmployeeByClassName(root, TargetClassName, EmployeeRowId) {
        if (!TargetClassName.endsWith("Class"))
            TargetClassName = TargetClassName + " Class"
        // If the current node's name matches the target name, add the new node
        if (root.className === TargetClassName) {
            if (isEmptyOrNull(EmployeeRowId))
                root.EmployeeRowId = null
            else
                root.EmployeeRowId = parseInt(EmployeeRowId)
            return true; // Node found and new node added
        }
        if (root.children)
            for (const child of root.children)
                if (SetEmployeeByClassName(child, TargetClassName, EmployeeRowId))
                    return false; // Stop recursion after adding the node
        return false; // Target node not found
    }
    function SetEmployeeById(root, id, EmployeeRowId) {
        // If the current node's name matches the target name, add the new node
        if (root.id === id) {
            if (isEmptyOrNull(EmployeeRowId))
                root.EmployeeRowId = null
            else
                root.EmployeeRowId = parseInt(EmployeeRowId)
            return true; // Node found and new node added
        }
        if (root.children)
            for (const child of root.children)
                if (SetEmployeeById(child, id, EmployeeRowId))
                    return false; // Stop recursion after adding the node
        return false; // Target node not found
    }
    function findEmployee(data: NodeRow[], EmployeeRowId: number): NodeRow {
        
        let result = null; // Variable to hold the result
        if (isEmptyOrNull(data))
            return result
       // console.log(EmployeeRowId)
        for (let i = 0; i < data.length;i++)
        {
            //if (data[i].hierarchyLevel == EmployeeEnum)
            //    console.log(data[i])

            if (data[i].hierarchyLevel == EmployeeEnum && data[i].EmployeeRowId == EmployeeRowId) {
                return data[i]; // Return the found object
            }
        }

        return null; // Return null if no match is found
    }
    function countEmployee(data: NodeRow[], EmployeeRowId):number {

        let result = 0; // Variable to hold the result
        if (isEmptyOrNull(data))
            return result

        for (let i = 0; i < data.length; i++) {
            if (data[i].EmployeeRowId == EmployeeRowId) {
                result+=1
            }
        }
      

        return result; // Return null if no match is found
    }



    function findByClassName(data, className) {
        // console.log(data)

        if (!className.endsWith("Class"))
            className = className + " Class"
        let result = null; // Variable to hold the result
        if (isEmptyOrNull(data))
            return result

        const queue = [data]; // Initialize a queue with the root object

        while (queue.length > 0) {
            const current = queue.shift(); // Get the first element in the queue

            // Check if the current object has the className we're looking for
            if (current.className === className) {
                return current; // Return the found object
            }

            // Add children to the queue for later processing
            if (current.children) {
                queue.push(...current.children);
            }
        }

        return result; // Return null if no match is found
        /*
    function search(obj) {
        console.log(obj)
        // Check if the current object has the className we're looking for
        if ("className" in obj) {
            if (obj.className === className) {
                result = obj; // Store the result
                return; // Exit the function once a match is found
            }
        }
      
        // Recursively search through children if the result is not found
        if (obj.children) {
            for (const child of obj.children) {
                search(child);
                if (result)  // If result is found, no need to continue searching
                    return;
            }
        }
    }
    search(data);
    return result;
    */
    }
    function traceParents(item, allData) {
        let parents = [];
        let parent = allData.find(obj => obj.id == item);
        while (parent) {
            parents.push(parent);
            parent = allData.find(obj => obj.id == parent.parentId);
        }
        return parents;
    }
    function GenerateOrgStructure() {

        SplitOrganisationStructureService.List({
        }, response => {
            if (SplitOrgStructList.length == 0) {
                for (let i = 0; i < response.Entities.length; i++) {
                    var EmployeeRowId = response.Entities[i].EmployeeRowId
                    if (EmployeeFilter.indexOf(response.Entities[i].EmployeeRowId) != -1) {
                        EmployeeRowId = null
                        SplitOrganisationStructureService.Update({
                            EntityId: response.Entities[i].Id,
                            Entity:
                            {
                                "EmployeeRowId": null
                            }
                        });
                    }
                    SplitOrgStructList.push({
                        id: response.Entities[i].NodeId,
                        EmployeeRowId: EmployeeRowId,
                        name: response.Entities[i].Name,
                        title: response.Entities[i].Title,
                        className: response.Entities[i].ClassName,
                        hierarchyLevel: response.Entities[i].HierarchyLevel,
                        parentId: response.Entities[i].ParentId,
                        hierarchyId: response.Entities[i].hierarchyId,
                        childrenIndex: response.Entities[i].childrenIndex
                    })
                }
            }
            const checkedBoxes = Array.from(document.querySelectorAll('.filterCheckBox:checked'));
            const checkedIds = checkedBoxes.map(box => box.getAttribute('wantedId'));
            var Json, filterFlag = 0;
            if (checkedIds.length > 0) {
                filterFlag = 1;
                let OrgStructFinalResult = [];
                checkedIds.forEach(item => {
                    OrgStructFinalResult.push(item);
                    const parents = traceParents(item, SplitOrgStructList);
                    OrgStructFinalResult.push(...parents);
                });
                OrgStructFinalResult = Array.from(new Set(OrgStructFinalResult.map(obj => obj.id)))
                    .map(id => SplitOrgStructList.find(obj => obj.id === id));
                Json = GenerateJson(OrgStructFinalResult)
            }
            else {
                Json = GenerateJson(SplitOrgStructList)
                datascource2 = JSON.parse(JSON.stringify(Json))
            }

            if (isEmptyOrNull(Json)) {
                if (isEmptyOrNull(spareOrgStructJson))
                    Json = GenerateDefaultOrgStruct()
                else
                    Json = JSON.parse(spareOrgStructJson)
            }

            if (filterFlag == 0)
                datascource2 = JSON.parse(JSON.stringify(Json))

            var orgChartElement = document.getElementById("chart-container")
            var panel = orgChartElement.querySelector("#left-panel");
            if (isEmptyOrNull(panel)) {
                var LeftPanel = document.createElement("div")
                LeftPanel.id = "left-panel"
                LeftPanel.className = "left-panel-class"
                orgChartElement.append(LeftPanel)
                var BulletList = GenerateUl(datascource2, ChartType.OrgStruct)
                $('#left-panel').append(BulletList)
                $('#left-panel').addClass("scrollable")
            }

            GenerateStructure(Json, 'chart-container', filterFlag);

            if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) {
              //  console.log('haha')
                var generateOrgChartButton = orgChartElement.querySelector("#chart-container .buttonGroup");
                if (isEmptyOrNull(generateOrgChartButton)) {
                  //  console.log('haha')

                    generateOrgChartButton = document.createElement('div')
                    generateOrgChartButton.className = 'buttonGroup'
                    generateOrgChartButton.innerHTML =
                        `
            <button id="generateOrgChartButton" class="btn btn-light btn-rounded" style="top: 50px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);">Generate Organisation Chart</button>
            <a id="downloadOrgStructButton" class="btn btn-light btn-rounded oc-download-btn"  download="orgStruct.png" style="top: 85px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);">Download Organisation Structure</a>
            <button id="exportOrgStructButton" class="btn btn-light btn-rounded oc-export-btn"  style="top: 85px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);">Download Organisation Structure</button>

            <button id="togglePanel" class="btn btn-light btn-rounded" style="bottom: 10px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);">Hide Tab</button>
            <button id="toggleSidePanel" class="btn btn-light btn-rounded" style="bottom: 10px; left: 10px; position: absolute; background-color: rgb(197, 216, 240);">Hide Filter Tab</button>
            `
                    orgChartElement.appendChild(generateOrgChartButton)
                }
            }
            //setCallbacks()

        })


    }
    let StructArray: NodeRow[]
    async function GenerateSaveOrgStructure() {
        function extractFirstNumber(input: string): number | null {
            const match = input.match(/\d+/);
            return match ? Number(match[0]) : null;
        }

        function isEmployeeClassFormat(input: string): boolean {
            return /^EMPLOYEE\d+/.test(input);
        }

        // ✅ Step 1: Ensure DeleteAll completes before proceeding
        await new Promise<void>((resolve, reject) => {
            SplitOrganisationStructureService.DeleteAll({}, response => resolve(), error => reject(error));
        });

        // ✅ Step 2: Process and store data after DeleteAll completes
        datascource = JSON.parse(JSON.stringify(datascource2));
        StructArray = splitIntoNodes(datascource2);

        // ✅ Step 3: Create all nodes and wait for them to complete
        const createRequests = StructArray.map(struct => {
            return new Promise<void>((resolve, reject) => {
                let ElementRowID;
                const ClassList = DecomposeStringToList(struct.id, 0x88, 0x99);

                if (isEmployeeClassFormat(ClassList[ClassList.length - 1])) {
                    ElementRowID = extractFirstNumber(ClassList[ClassList.length - 2]);
                } else {
                    ElementRowID = extractFirstNumber(struct.className);
                }

                SplitOrganisationStructureService.Create({
                    Entity: {
                        "ParentId": struct.parentId,
                        "NodeId": struct.id,
                        "Name": struct.name,
                        "Title": struct.title,
                        "ClassName": struct.className,
                        "HierarchyLevel": struct.hierarchyLevel,
                        "EmployeeRowId": struct.EmployeeRowId,
                        "hierarchyId": struct.hierarchyId,
                        "childrenIndex": struct.childrenIndex,
                        "ElementRowId": ElementRowID
                    }
                }, response => {
                    if (response && response.EntityId) 
                        struct.rowId = response.EntityId; // Assign NodeRowId
                    resolve()
                }, error => reject(error));
            });
        });

        // ✅ Wait until ALL Create requests are completed before moving forward
        await Promise.all(createRequests);

        // ✅ Step 4: Proceed with the rest of the logic after everything is completed
        SplitOrgStructList = StructArray;
        const checkedBoxes = Array.from(document.querySelectorAll('.filterCheckBox:checked'));
        const checkedIds = checkedBoxes.map(box => box.getAttribute('wantedId'));

        let Json;
        let filterFlag = 0;
        if (checkedIds.length > 0) {
            filterFlag = 1;
            let OrgStructFinalResult = [];
            checkedIds.forEach(item => {
                OrgStructFinalResult.push(item);
                const parents = traceParents(item, SplitOrgStructList);
                OrgStructFinalResult.push(...parents);
            });
            OrgStructFinalResult = Array.from(new Set(OrgStructFinalResult.map(obj => obj.id)))
                .map(id => SplitOrgStructList.find(obj => obj.id === id));
            Json = GenerateJson(OrgStructFinalResult);
        } else {
            Json = GenerateJson(SplitOrgStructList);
        }

        const BulletList = GenerateUl(datascource2, ChartType.OrgStruct);
        $('#left-panel').html('');
        $('#left-panel').append(BulletList);
        $('#left-panel').addClass('scrollable');

        GenerateStructure(Json, 'chart-container', filterFlag);
    }

    /*
    function GenerateSaveOrgStructure() {
        function extractFirstNumber(input: string): number | null {
            const match = input.match(/\d+/);
            return match ? Number(match[0]) : null;
        }
        function isEmployeeClassFormat(input: string): boolean {
            return /^EMPLOYEE\d+/.test(input);
        }
        SplitOrganisationStructureService.DeleteAll({
        }, response => {
            datascource = JSON.parse(JSON.stringify(datascource2))
            StructArray = splitIntoNodes(datascource2)
            for (let i = 0; i < StructArray.length; i++) {
                var ElementRowID
                var ClassList = DecomposeStringToList(StructArray[i].id, 0x88, 0x99)
                if (isEmployeeClassFormat(ClassList[ClassList.length - 1]))
                    ElementRowID = extractFirstNumber(ClassList[ClassList.length - 2])
                else
                    ElementRowID = extractFirstNumber(StructArray[i].className)

                SplitOrganisationStructureService.Create({
                    Entity:
                    {
                        "ParentId": StructArray[i].parentId,
                        "NodeId": StructArray[i].id,
                        "Name": StructArray[i].name,
                        "Title": StructArray[i].title,
                        "ClassName": StructArray[i].className,
                        "HierarchyLevel": StructArray[i].hierarchyLevel,
                        "EmployeeRowId": StructArray[i].EmployeeRowId,
                        "hierarchyId": StructArray[i].hierarchyId,
                        "childrenIndex": StructArray[i].childrenIndex,
                        "ElementRowId": ElementRowID
                    },
                });
            }
            SplitOrgStructList = StructArray
            const checkedBoxes = Array.from(document.querySelectorAll('.filterCheckBox:checked'));
            const checkedIds = checkedBoxes.map(box => box.getAttribute('wantedId'));
            var Json, filterFlag = 0;
            if (checkedIds.length > 0) {
                filterFlag = 1
                let OrgStructFinalResult = [];
                checkedIds.forEach(item => {
                    OrgStructFinalResult.push(item);
                    const parents = traceParents(item, SplitOrgStructList);
                    OrgStructFinalResult.push(...parents);
                });
                OrgStructFinalResult = Array.from(new Set(OrgStructFinalResult.map(obj => obj.id)))
                    .map(id => SplitOrgStructList.find(obj => obj.id === id));
                Json = GenerateJson(OrgStructFinalResult)
            }
            else
                Json = GenerateJson(SplitOrgStructList)
            var BulletList = GenerateUl(Json, ChartType.OrgStruct)
            $('#left-panel').html('');
            $('#left-panel').append(BulletList);
            GenerateStructure(Json, 'chart-container', filterFlag)
        })

    }
    */
    function GenerateDefaultOrgStruct() {
        var title = getEnumNameFromValue(CardType.DIRECTOR)
        var name = title
        var id = EncodeString(title, 0x88, 0x99)
        var bufferNode: Node = {
            'hierarchyId': CardType.DIRECTOR,
            'EmployeeRowId': null,
            'hierarchyLevel': CardType.DIRECTOR,
            'id': id, 'name': name,
            'title': title, 'className': title + " Class"
        };
        return bufferNode
    }
    function GenerateStructure(InputJson, containerId, filter) {
        var orgChartElement = document.getElementById(containerId)
        if (orgChartElement) {
            var orgDiv = orgChartElement.querySelector(".orgchart");
            if (orgDiv) {
                Style = orgDiv.getAttribute('style')
                DataPanStart = orgDiv.getAttribute('data-pan-start')
                orgDiv.remove()
            }
        }

        let orgchart = new OrgChart({
            'chartContainer': `#${containerId}`,
            'data': InputJson,
            'nodeContent': 'title',
            'nodeId': 'thisOrgChart',
            'zoom': true,
            'pan': true,
            'renderCompleted':setCallbacks(),
            //'renderCompleted': setCallbacks(),
            'createNode': function (node, data) {
                let image = ""
    
                if (node.hierarchyLevel != EmployeeEnum)
                    node.draggable = false
                let $jqueryObject = $(node);

                if (isEmptyOrNull(data.EmployeeRowId)) { // no employee
                    if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) {
                        image = `<button type="button"  class="btn btn-light btn-rounded SelectEmployee" data-mdb-ripple-color="#ffffff" style="background-color:#e4dbd8"> <span style="display:block;">Select Employee</span> </button>`
                        $jqueryObject.append(image)
                    }
                }
                else {
                    var employeeRow = ListOfEmployeeData.find(employee => employee.id === data.EmployeeRowId);
                    var imgPath = employeeRow.ImgPath;
                    image = ` 

                    <div  style="display: flex; align-items: center; height: 100%;" class=" row">
                        </div>
                <div style="text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px">
                    <div style="text-align: left;height: 100%;width:100%;padding-right:0">
                            <div class="col-1"  style="font-size: 10px; display: flex; justify-content: space-between; align-items: center; width: 100%; white-space: nowrap;"> <span  style="display: block;white-space: nowrap;"> ${employeeRow.EmployeeName} </span>  </div>
                            </div>
                    `
                    $jqueryObject.append(image)
                    if (data.hierarchyLevel != EmployeeEnum && Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) {
                        let cancelButton = `<div class="fa fa-times btn clickable-icon"></div>`
                        let div = $jqueryObject.find(".col-1")
                        div.append(cancelButton)

                    }
                    var imgContainer = document.createElement('div');

                    var img = document.createElement('img');
                    img.src = `/upload/${imgPath}`;
                    img.className = 'avatar';
                    img.crossOrigin = 'anonymous'
                    img.draggable = false
                    img.width = 63;
                    img.height = 112.5;
                    img.style.marginRight = '20px'
                    // Add an error event listener

                    img.onerror = function () {
                        // Handle the error, e.g., set a placeholder image
                        img.src = ''; // Replace with your placeholder path
                    };

                    imgContainer.appendChild(img)
                    let row = $jqueryObject.find(".row")
                    row.append(imgContainer)
                }
                let content = $jqueryObject.find(".content")
                content.remove()
            }
        });
        console.log(filter)
        console.log(orgStructDisplay)
        console.log(isOrgChartOutOfView())
        if (filter == orgStructDisplay) 
            orgchart.chart.style = Style
        
        else 
            orgStructDisplay = filter

        return orgchart
    }
    function GenerateUl(node, type) {
        if (isEmptyOrNull(node)) return;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        if (type === ChartType.OrgStruct)
            checkbox.className = 'filterCheckBox';
        else if (type === ChartType.OrgChart)
            checkbox.className = 'OrgChartFilterCheckBox';

        // Step 1: Collect the state of all checkboxes and toggle buttons before regenerating the list
        const checkedCheckboxes = {};
        const toggleStates = {};

        const allCheckboxes = document.querySelectorAll(`input.${checkbox.className}`);
        allCheckboxes.forEach(cb => {
            checkedCheckboxes[cb.getAttribute('wantedId')] = cb.checked;
        });

        const allToggles = document.querySelectorAll(`.${checkbox.className}.toggle`);
        allToggles.forEach(toggle => {
            const nodeId = toggle.getAttribute('wantedid');
            toggleStates[nodeId] = toggle.textContent === '-';
        });

        // Step 2: Create the main <ul> element
        const ul = document.createElement('ul');
        ul.classList.add('nested');
       // ul.id = 'bulletList';

        const li = document.createElement('li');
        li.textContent = `${node.name}`;

        if (!isEmptyOrNull(node.EmployeeRowId)) {
            const employeeRow = ListOfEmployeeData.find(employee => employee.id === node.EmployeeRowId);
            if (!isEmptyOrNull(employeeRow))
                li.textContent = `${li.textContent} (${employeeRow.EmployeeId})`;
        }

        // Step 3: Create and restore checkbox states
        checkbox.setAttribute('wantedId', node.id);
        checkbox.style.marginLeft = '10px';

        if (checkedCheckboxes[node.id] !== undefined && checkedCheckboxes[node.id] === true)
            checkbox.checked = checkedCheckboxes[node.id];
        if (node.className != 'DIRECTOR Class')
        li.appendChild(checkbox);

        // Step 4: Toggle button for parent nodes
        if (node.children && node.children.length > 0 && node.hierarchyLevel !== CardType.DIRECTOR) {
            const toggleSpan = document.createElement('span');
            toggleSpan.classList.add('toggle');
            toggleSpan.classList.add(`${checkbox.className}`);

            toggleSpan.textContent = '+'; // Default to collapsed
            toggleSpan.style.cursor = 'pointer';
            toggleSpan.style.color = '#007BFF';
            toggleSpan.style.textDecoration = 'underline';
            toggleSpan.setAttribute('wantedId', node.id);

            li.prepend(toggleSpan);

            // Toggle event listener
            toggleSpan.addEventListener('click', () => {
                console.log('haha')
                toggleChildNodes(li, toggleSpan);
            });

            // Restore previous toggle state
            if (toggleStates[node.id]) toggleSpan.textContent = '-';
        }

        // Step 5: Generate child elements
        if (node.children && node.children.length > 0) {
            const childUl = document.createElement('ul');
            childUl.style.display = node.hierarchyLevel === CardType.DIRECTOR ? 'block' : (toggleStates[node.id] ? 'block' : 'none');

            node.children.forEach(child => {
                childUl.appendChild(GenerateUl(child, type));
            });

            li.appendChild(childUl);
        }

        // Step 6: Ensure checking a parent also checks all children
        checkbox.addEventListener('change', (event) => {
            event.stopPropagation(); // Prevents accidental triggering of parent events
            setChildCheckboxes(li, checkbox.checked);
        });

        ul.appendChild(li);
        return ul;
    }

    // **Helper function to toggle all child elements and checkboxes**
    function toggleChildNodes(parentLi: HTMLElement, toggleSpan: HTMLElement) {
        const childUls = parentLi.querySelector('ul');
        const isExpanding = toggleSpan.textContent === '+';
        childUls.style.display = isExpanding ? 'block' : 'none';
     

        // Update the toggle button symbol for ALL child nodes
        const allChildToggles = parentLi.querySelector('.toggle');
        allChildToggles.textContent = isExpanding ? '-' : '+';


        // Update the clicked toggle button itself
        toggleSpan.textContent = isExpanding ? '-' : '+';
    }

    // **Helper function to check/uncheck all child checkboxes**
    function setChildCheckboxes(parentLi: HTMLElement, isChecked: boolean) {
        const childCheckboxes = parentLi.querySelectorAll('input[type="checkbox"]');
        childCheckboxes.forEach(childCheckbox => {
            (childCheckbox as HTMLInputElement).checked = isChecked;
        });
    }

    /*
    function GenerateUl(node, type) {
        if (isEmptyOrNull(node))
            return
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        if (type === ChartType.OrgStruct) 
            checkbox.className = 'filterCheckBox';
         else if (type === ChartType.OrgChart)
            checkbox.className = 'OrgChartFilterCheckBox';
        

        // Step 1: Collect the state of all checkboxes with the class 'filterCheckBox' before generating the list
        const checkedCheckboxes = {};
        const toggleStates = {};  // To track the toggle state (expanded/collapsed)

        const allCheckboxes = document.querySelectorAll(`input.${checkbox.className}`);
        allCheckboxes.forEach(checkbox => {
            checkedCheckboxes[checkbox.getAttribute('wantedId')] = checkbox.checked;
        });

        const allToggles = document.querySelectorAll(`.${checkbox.className}.toggle`);
        allToggles.forEach(toggle => {
            const nodeId = toggle.getAttribute('wantedid');
            toggleStates[nodeId] = toggle.textContent === '-';  // If the text is '-', it's expanded
        });
        // Step 2: Create the main <ul> element for the current level
        const ul = document.createElement('ul');
        ul.classList.add('nested'); // Add class for collapsibility
        ul.id = 'bulletList';
        const li = document.createElement('li');
        li.textContent = `${node.name}`;
        if (!isEmptyOrNull(node.EmployeeRowId)) {
            //  console.log(node)
            const employeeRow = ListOfEmployeeData.find(employee => employee.id === node.EmployeeRowId);
            //console.log(employeeRow)
            if (!isEmptyOrNull(employeeRow))
                li.textContent = `${li.textContent} (${employeeRow.EmployeeId})`;
        }
        // Step 3: Create the checkbox
        checkbox.setAttribute('wantedId', node.id); // Set a custom attribute for the node ID
        checkbox.style.marginLeft = '10px';
        // Restore the checked state if applicable
        if (checkedCheckboxes[node.id] !== undefined && checkedCheckboxes[node.id] === true)
            checkbox.checked = checkedCheckboxes[node.id];
        // Add the checkbox to the <li> element
        li.appendChild(checkbox);

        // Step 4: Only add a toggle button if the node has children (and is not of type DIRECTOR)
        if (node.children && node.children.length > 0 && node.hierarchyLevel !== CardType.DIRECTOR) {
            const toggleSpan = document.createElement('span');
            toggleSpan.classList.add('toggle');
            toggleSpan.classList.add(`${checkbox.className}`);

            toggleSpan.textContent = '+'; // Default to '+' for collapsed state
            toggleSpan.style.cursor = 'pointer';
            toggleSpan.style.color = '#007BFF';
            toggleSpan.style.textDecoration = 'underline';
            toggleSpan.setAttribute('wantedId', node.id); // Set a custom attribute for the node ID

            li.prepend(toggleSpan);

            // Attach the toggle event listener
            toggleSpan.addEventListener('click', () => {
                // Toggle the visibility of the child <ul> element
                const childUl = li.querySelector('ul');
                if (childUl) {
                    childUl.style.display = (childUl.style.display === 'none' || childUl.style.display === '') ? 'block' : 'none';
                    toggleSpan.textContent = (childUl.style.display === 'none') ? '+' : '-'; // Change the toggle symbol
                }
            });

            // Check if this node was previously expanded and set its state
            if (toggleStates[node.id]) 
                toggleSpan.textContent = '-'; // If previously expanded, set to '-'
            
        }

        // Step 5: If the node has children, create child <ul> elements
        if (node.children && node.children.length > 0) {
            const childUl = document.createElement('ul');

            // For DIRECTOR level, always show children by default
            const childUlState = node.hierarchyLevel === CardType.DIRECTOR ? 'block' : (toggleStates[node.id] ? 'block' : 'none');
            childUl.style.display = childUlState; // Set the visibility based on the previous toggle state or default for DIRECTOR

            node.children.forEach((child) => {
                childUl.appendChild(GenerateUl(child, type)); // Recursively generate <ul> for children
            });
            li.appendChild(childUl);
        }

        // Append the <li> to the <ul>
        ul.appendChild(li);

        // Step 6: Return the generated <ul>
        return ul;
    }
    */

    function addListItem(parentId, newItemId, newItemContent, checkboxClass = 'filterCheckBox') {
        // Find the checkbox with the matching parent ID
        const targetCheckbox = document.querySelector(`[wantedid="${parentId}"]`);

        if (!targetCheckbox) {
           // console.error(`No element found with wantedId: ${parentId}`);
            return;
        }

        // Locate the closest parent <li> for the checkbox
        const parentListItem = targetCheckbox.closest('li');

        if (!parentListItem) {
           // console.error(`No parent <li> found for wantedId: ${parentId}`);
            return;
        }

        // Check if the parent <li> already has a nested <ul>
        let nestedUl = parentListItem.querySelector('ul.nested');
        if (!nestedUl) {
            // If no nested <ul>, create one
            nestedUl = document.createElement('ul');
            nestedUl.classList.add('nested');
            nestedUl.style.display = 'none'; // Hidden initially
            // Add a toggle span (+/-) for collapsibility
            const toggleSpan = document.createElement('span');
            toggleSpan.classList.add('toggle');
            toggleSpan.textContent = '+'; // Default collapsed state
            toggleSpan.style.cursor = 'pointer';
            toggleSpan.style.color = '#007BFF';
            toggleSpan.style.textDecoration = 'underline';

            // Add the toggle event listener
            toggleSpan.addEventListener('click', () => {
                if (nestedUl.style.display === 'none') {
                    nestedUl.style.display = 'block';
                    toggleSpan.textContent = '-';
                } else {
                    nestedUl.style.display = 'none';
                    toggleSpan.textContent = '+';
                }
            });

            // Prepend the toggle button to the parent <li>
            parentListItem.prepend(toggleSpan);

            // Append the nested <ul> to the parent <li>
            parentListItem.appendChild(nestedUl);
        }

        // Check if an <li> with the same wantedId already exists
        const existingItem = nestedUl.querySelector(`[wantedid="${newItemId}"]`);
        if (existingItem) {
            //console.warn(`Item with wantedId "${newItemId}" already exists.`);
            return;
        }

        // Create the new <li> item with a checkbox inside the nested <ul>
        const newListItem = document.createElement('li');
        const checkedBoxes = Array.from(document.querySelectorAll('.filterCheckBox:checked'));
        if (checkedBoxes.length > 0)
            newListItem.innerHTML = `
        ${newItemContent}
        <input type="checkbox" class="${checkboxClass}" wantedid="${newItemId}" style="margin-left: 10px;" checked>
    `;
        else
            newListItem.innerHTML = `
        ${newItemContent}
        <input type="checkbox" class="${checkboxClass}" wantedid="${newItemId}" style="margin-left: 10px;">
    `;

        // Append the new <li> to the nested <ul>
        nestedUl.appendChild(newListItem);
    }

    function GenerateJson(ListOfStruct) {
        return buildHierarchy(ListOfStruct);
    }

    function GenerateOrgChart() {
        function findParentByEmployeeRowId(children, employeeRowIdToRemove) {
            for (let child of children) {
                // Check if this child is the one to remove
                if (child.EmployeeRowId === employeeRowIdToRemove)
                    return child; // Found the child
                // If not found, check its children recursively
                if (child.children) {
                    const found = findParentByEmployeeRowId(child.children, employeeRowIdToRemove);
                    if (found)
                        return found; // Return if found in nested children
                }
            }
            return null; // Not found
        }
        function filterChildren(children, employeeRowIdToRemove) {
            let wasFiltered = false; // Track if any child was removed

            const filteredChildren = children
                .filter(child => {
                    if (child.EmployeeRowId === employeeRowIdToRemove) {
                        wasFiltered = true; // Found a match to remove
                        return false; // Exclude this child
                    }
                    return true; // Keep this child
                })
                .map(child => {
                    if (child.children) {
                        const result = filterChildren(child.children, employeeRowIdToRemove);
                        if (result.wasFiltered) {
                            wasFiltered = true; // Update if nested filtering removed anything
                        }
                        child.children = result.children; // Update child.children with the filtered children
                    }
                    return child;
                });

            return {
                wasFiltered: wasFiltered,
                children: filteredChildren
            };
        }
        function removeNodeByEmployeeRowId(data, employeeRowIdToRemove) {
            var result = false
            if (isEmptyOrNull(data.children))
                return
            var parentNode = findParentByEmployeeRowId(data.children, employeeRowIdToRemove)
            if (isEmptyOrNull(parentNode))
                return
            var Route: any[] = DecomposeStringToList(parentNode.id, 0x88, 0x99)
            if (parentNode) {
                var parent = data
                parent = SearchById(parent, parentNode.id)
                // Get children to move
                const childrenToMove = parent.children || [];
                parent = data
                for (let i = 0; i < Route.length - 1; i++)
                    parent = findByClassName(parent, Route[i])
                if (parent) {
                    if (parent.children) {
                        const bufferOutput = filterChildren(parent.children, employeeRowIdToRemove);
                        parent.children = bufferOutput.children
                        if (isEmptyOrNull(parent.children))
                            parent.children = childrenToMove
                        else
                            parent.children.push(...childrenToMove);
                        result = bufferOutput.wasFiltered
                        data = parent
                    }
                }
            }
            return result
        }
        var ListOfCurrentEmployeeInOrgChart: number[] = []

        SplitOrganisationChartService.List({
        }, response => {
            var insert = 0
            if (SplitOrgChartList.length == 0) {
                insert = 1
                for (let i = 0; i < response.Entities.length; i++) {
                    var EmployeeRowId = response.Entities[i].EmployeeRowId
                    ListOfCurrentEmployeeInOrgChart.push(EmployeeRowId)
                    SplitOrgChartList.push({
                        extension: response.Entities[i].Extension,
                        rowId: response.Entities[i].Id,
                        id: response.Entities[i].NodeId,
                        EmployeeRowId: EmployeeRowId,
                        name: response.Entities[i].Name,
                        title: response.Entities[i].Title,
                        className: response.Entities[i].ClassName,
                        hierarchyLevel: response.Entities[i].HierarchyLevel,
                        parentId: response.Entities[i].ParentId,
                        childrenIndex: response.Entities[i].childrenIndex,
                    })
                }
            }
            EmployeeRightsService.List({
            }, response => {
                if (insert == 1) {
                    for (let i = 0; i < response.Entities.length; i++) {
                        var ObjToInsertRghts = SplitOrgChartList.find(obj => obj.id === response.Entities[i].NodeId);
                        if (ObjToInsertRghts) {
                            var EmployeeRightBuffer: EmployeeAdminRights = {
                                Appraisal: response.Entities[i].Appraisal,
                                LeaveApproval: response.Entities[i].LeaveApproval,
                                OtApproval: response.Entities[i].OtApproval,
                                Training: response.Entities[i].Training,
                                MoneyClaiming: response.Entities[i].MoneyClaiming
                            }
                            ObjToInsertRghts.Rights = EmployeeRightBuffer
                        }
                    }
                }
                const checkedBoxes = Array.from(document.querySelectorAll('.OrgChartFilterCheckBox:checked'));
                const checkedIds = checkedBoxes.map(box => box.getAttribute('wantedId'));
                var Json,filter = 0
                if (checkedIds.length > 0) {
                    filter = 1
                    let OrgChartFinalResult = [];
                    checkedIds.forEach(item => {
                        OrgChartFinalResult.push(item);
                        const parents = traceParents(item, SplitOrgChartList);
                        OrgChartFinalResult.push(...parents);
                    });
                    // Remove duplicates
                    OrgChartFinalResult = Array.from(new Set(OrgChartFinalResult.map(obj => obj.id)))
                        .map(id => SplitOrgChartList.find(obj => obj.id === id));
                    Json = GenerateJson(OrgChartFinalResult)
                }
                else {
                    Json = GenerateJson(SplitOrgChartList)
                    FinalDatascource2 = JSON.parse(JSON.stringify(Json))
                }
                if (isEmptyOrNull(Json)) {
                    if (isEmptyOrNull(spareOrgStructJson))
                        return
                    else {
                        Json = JSON.parse(spareOrgChartJson)
                        FinalDatascource2 = JSON.parse(JSON.stringify(Json))
                    }
                }

                var orgChartElement = document.getElementById("orgChartContainer")
                var panel = orgChartElement.querySelector("#chart-left-panel");
                //console.log(Json)
                var GenerateSave = false
                if (checkedIds.length == 0) {
                    for (let i = 0; i < EmployeeFilter.length; i++) {
                        //  console.log(EmployeeFilter[i])
                        var result = removeNodeByEmployeeRowId(FinalDatascource2, EmployeeFilter[i])
                        if (result == true && GenerateSave == false)
                            GenerateSave = result
                    }
                }
                 // console.log('here')
                //  console.log(GenerateSave)
                //  console.log(FinalDatascource2)
                if (GenerateSave == true) {
                    GenerateSaveOrgChart()
                    return
                }
                if (isEmptyOrNull(panel)) {
                    var LeftPanel = document.createElement("div")
                    LeftPanel.id = "chart-left-panel"
                    LeftPanel.className = "left-panel-class"
                    orgChartElement.append(LeftPanel)
                    var BulletList = GenerateUl(FinalDatascource2, ChartType.OrgChart)
                    $('#chart-left-panel').append(BulletList)
                    $('#chart-left-panel').addClass('scrollable');

                }
                var orgChartElement = document.getElementById("orgChartContainer")
                if (orgChartElement) {
                    var orgDiv = orgChartElement.querySelector(".orgchart");
                    if (orgDiv) {
                        Style = orgDiv.getAttribute('style')
                        orgDiv.remove()
                    }
                }
                if (filter == 1)
                    FinalDatascource = JSON.parse(JSON.stringify(Json))
                else
                    FinalDatascource = JSON.parse(JSON.stringify(FinalDatascource2))
                let orgchart = new OrgChart({
                    'chartContainer': '#orgChartContainer',
                    'data': FinalDatascource,
                    'nodeContent': 'title',
                    'zoom': true,
                    'pan': true,
                    'renderCompleted': setCallbacks(), // Delay to allow rendering
                    'createNode': function (node, data) {
                        let image = ""
                        if (data.hierarchyLevel > CardType.SECTION)
                            node.draggable = true

                        let $jqueryObject = $(node);
                        if (!isEmptyOrNull(data.EmployeeRowId)) {
                            var employeeRow = ListOfEmployeeData.find(employee => employee.id === data.EmployeeRowId);
                            var JobGradeName = '-';
                            // console.log(employeeRow)
                            if (!isEmptyOrNull(employeeRow.JobGradeId)) {
                                if (!isEmptyOrNull(JobGradeTable.itemById[employeeRow.JobGradeId].Name))
                                    JobGradeName = JobGradeTable.itemById[employeeRow.JobGradeId].Name;
                            }
                            var basicPay = Authorization.userDefinition.Permissions[PermissionKeys.HumanResources] == true ? employeeRow.SalaryDetails : ''
                            if (!isEmptyOrNull(basicPay))
                             basicPay = `Salary Details : ${basicPay}`
                            var imgPath = employeeRow.ImgPath;
                            image = ` 
                    <div  style=" display: flex; align-items: center; height: 100%; flex-direction: column;" class=" rowData">
                        </div>
                    <div style=" text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px">
                    <div style="text-align: left;height: 100%;width:100%;padding-right:0">
                            <div class="col-1"  style="font-size: 10px; display: flex; justify-content: space-between; align-items: center; width: 100%; white-space: nowrap;"> <span  style="display: block;white-space: nowrap;"> Name : ${employeeRow.EmployeeName} <br> Job Grade : ${JobGradeName} <br> ${basicPay} </span>  </div>
                            </div>
                    `;
                            if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources])//is HR
                            {
                                if (data.hierarchyLevel != EmployeeEnum && data.hierarchyLevel != CardType.DIRECTOR) {
                                    var button
                                    if (!isEmptyOrNull(data.Rights)) {
                                        button = `
                                <div>
                                    <i class="fas fa-band-aid" title="Approve Leave Requests"></i>
                                    <i class="fa fa-wrench" title="Approve Overtime Requests"></i>
                                   <i class="fa fa-money-bill" title="Approve Money Claiming Requests"></i>
                                    <i class="fa fa-check" title="Evaluate Employee Requests"></i>
                                    <i class="far fa-clock" title="Manage Training Requests"></i>
                                </div>
                                <div>
                            `;
                                        var desiredOrder: (keyof EmployeeAdminRights)[] = [
                                            'LeaveApproval',
                                            'OtApproval',
                                            'MoneyClaiming',
                                            'Appraisal',
                                            'Training'
                                        ];
                                        // Loop through the rights object to create the checkbox elements

                                        for (const key of desiredOrder) {
                                            var value = data.Rights[key]
                                            // Determine the checked attribute based on the value
                                            const checkedAttribute = value ? 'checked' : '';
                                            button += `
                    <input class="CheckBox" name="${key}" type="checkbox"  title="${key.replace(/([A-Z])/g, ' $1')}" ${checkedAttribute}>
                `;
                                        }
                                        button += '</div>';
                                    }
                                    else {
                                        button = `
                    <div>
                    <i class="fas fa-band-aid" title="Approve Leave Requests" ></i>
                    <i class="fa fa-wrench" title="Approve Overtime Requests"></i>
                    <i class="fa fa-money-bill" title="Approve Money Claiming Requests"></i>
                    <i class="fa fa-check"  title="Evaluate Employee Requests"></i>
                    <i class="far fa-clock" title="Manage Training Requests"></i>
                    </div>
                    <div>
                    <input class = "CheckBox"  name="LeaveApproval" type="checkbox"  title="Approve Leave Requests">
                    <input  class = "CheckBox" name="OtApproval" type="checkbox" title="Approve Overtime Requests">
                    <input class = "CheckBox"  name="MoneyClaiming" type="checkbox" title="Approve Money Claiming Requests" >
                    <input class = "CheckBox"  name="Appraisal" type="checkbox" title="Evaluate Employee Requests" >
                    <input class = "CheckBox"  name="Training" type="checkbox" title="Manage Training Requests" >

                    </div>    
`
                                    }
                                    image = button + image
                                }

                            }
                            $jqueryObject.append(image)
                            var img = document.createElement('img');
                            img.src = `/upload/${imgPath}`;
                            img.className = 'avatar';
                            img.crossOrigin = 'anonymous'
                            img.draggable = false
                            img.width = 63;
                            img.height = 112.5;
                            img.style.marginRight = '20px'
                            img.onerror = function () {
                                // Handle the error, e.g., set a placeholder image
                                img.src = ''; // Replace with your placeholder path
                            };
                            let row = $jqueryObject.find(".rowData")
                            row.append(img)
                            var ViewButton = document.createElement('span');
                            ViewButton.className = 'dot';
                            if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources])//is HR
                                row.append(ViewButton)
                        }
                        let content = $jqueryObject.find(".content")
                        content.remove()
                    }
                });
               // setCallbacks()
                $("#orgChartContainer").on("change", ".CheckBox", function () {
                    const isChecked = this.checked;
                    var targetJson = JSON.parse(this.parentElement.parentElement.getAttribute('data-source'))
                    var targetEmployeeRowId = targetJson.EmployeeRowId
                    for (let ListCounter = 0; ListCounter < ListOfEmployeeData.length; ListCounter++) {
                        if (ListOfEmployeeData[ListCounter].id == targetEmployeeRowId) {
                            break
                        }
                    }
                    var ElementToSetEmployee = targetJson.id
                    var FinalOrgChartBuffer = JSON.parse(JSON.stringify(FinalDatascource2))
                    var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                    TargetedFinalOrgChartBuffer = SearchById(TargetedFinalOrgChartBuffer, ElementToSetEmployee)
                    TargetedFinalOrgChartBuffer.Rights[this.name] = isChecked
                    FinalDatascource2 = FinalOrgChartBuffer
                    var ListOfRights: NodeRights[] = extractRights(FinalOrgChartBuffer)
                    //console.log(ListOfRights)
                    EmployeeRightsService.ClearOldAdminRightRecord({
                    }, response => {
                        for (let i = 0; i < ListOfRights.length; i++) {
                            if (ListOfRights[i].nodeHierarchy != EmployeeEnum && !isEmptyOrNull(ListOfRights[i].EmployeeRowId)) {
                                if (ListOfRights[i].nodeHierarchy != CardType.DIRECTOR) {
                                    EmployeeRightsService.Create({
                                        Entity: {
                                            "EmployeeRowId": ListOfRights[i].EmployeeRowId,
                                            "NodeId": ListOfRights[i].id,
                                            "Appraisal": ListOfRights[i].Rights.Appraisal,
                                            "LeaveApproval": ListOfRights[i].Rights.LeaveApproval,
                                            "OtApproval": ListOfRights[i].Rights.OtApproval,
                                            "Training": ListOfRights[i].Rights.Training,
                                            "MoneyClaiming": ListOfRights[i].Rights.MoneyClaiming,
                                        }
                                    })
                                }
                                else {
                                    EmployeeRightsService.Create({
                                        Entity: {
                                            "EmployeeRowId": ListOfRights[i].EmployeeRowId,
                                            "NodeId": ListOfRights[i].id,
                                            "Appraisal":true,
                                            "LeaveApproval": true,
                                            "OtApproval": true,
                                            "Training": true,
                                            "MoneyClaiming": true,
                                        }
                                    })

                                }
                            }

                        }



                    })
                })
                if (filter == orgChartDisplay) {
                    orgchart.chart.style = Style
                }
                else
                    orgChartDisplay = filter

                if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources]) {
                    var generateOrgChartButton = orgChartElement.querySelector(".buttonGroup");
                    if (isEmptyOrNull(generateOrgChartButton)) {
                        generateOrgChartButton = document.createElement('div')
                        generateOrgChartButton.className = 'buttonGroup'
                        generateOrgChartButton.innerHTML =
                            `
            <a id="downloadOrgChartButton" class="btn btn-light btn-rounded oc-download-btn"  download="orgChart.png" style="top: 50px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);">Download Organisation Chart</a>
            <button id="exportOrgChartButton" class="btn btn-light btn-rounded oc-export-btn"  style="top: 50px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);">Download Organisation Chart</button>

            <button id="toggleOrgChartSidePanel" class="btn btn-light btn-rounded" style="bottom: 10px; left: 10px; position: absolute; background-color: rgb(197, 216, 240);">Hide Filter Tab</button>
            `
                        orgChartElement.appendChild(generateOrgChartButton)
                    }
                }


            })
        })

    }
    function GenerateSaveOrgChart() {
        function extractFirstNumber(input: string): number | null {
            const match = input.match(/\d+/);
            return match ? Number(match[0]) : null;
        }
        function isEmployeeClassFormat(input: string): boolean {
            return /^EMPLOYEE\d+/.test(input);
        }
        SplitOrganisationChartService.DeleteAll({
        }, response => {
            console.log(FinalDatascource2)
            SplitOrgChartList = splitIntoNodes(FinalDatascource2);
            for (let i = 0; i < SplitOrgChartList.length; i++) {
                var ElementRowID
                var ClassList = DecomposeStringToList(SplitOrgChartList[i].id, 0x88, 0x99)
                if (isEmployeeClassFormat(ClassList[ClassList.length - 1]))
                    ElementRowID = extractFirstNumber(ClassList[ClassList.length - 2])
                else
                    ElementRowID = extractFirstNumber(SplitOrgChartList[i].className)
                var title = SplitOrgChartList[i].title
                var name = SplitOrgChartList[i].name
                if (isEmptyOrNull(title))
                    title = '-'
                if (isEmptyOrNull(name))
                    name = '-'

                SplitOrganisationChartService.Create({
                    Entity:
                    {
                        "ParentId": SplitOrgChartList[i].parentId,
                        "NodeId": SplitOrgChartList[i].id,
                        "Name": name,
                        "Title": title,
                        "ClassName": SplitOrgChartList[i].className,
                        "HierarchyLevel": SplitOrgChartList[i].hierarchyLevel,
                        "EmployeeRowId": SplitOrgChartList[i].EmployeeRowId,
                        "childrenIndex": SplitOrgChartList[i].childrenIndex,
                        "ElementRowId": ElementRowID
                    },
                }, response => {
                    SplitOrgChartList[i].rowId = response.EntityId
                });
            }
            var ListOfRights: ExtractedData[] = extractRightsAndEmployeeRowId(FinalDatascource2)
            var ListOfUnusedRights: ExtractedData[] = []
            var FinalOrgChartBuffer = JSON.parse(JSON.stringify(FinalDatascource2))
            if (!isEmptyOrNull(ListOfRights)) {
                for (let i = 0; i < ListOfRights.length; i++) {
                    var TargetedFinalOrgChartBuffer = FinalOrgChartBuffer
                    var buffer: Node = SearchById(TargetedFinalOrgChartBuffer, ListOfRights[i].id)
                    //console.log(buffer)
                    if (isEmptyOrNull(buffer)) {
                        if (ListOfRights[i].hierarchyId <= CardType.SECTION) {
                            if (ListOfRights[i].id != removedNodeId)
                                ListOfUnusedRights.push(ListOfRights[i])
                        }
                        continue
                    }
                    buffer.Rights = ListOfRights[i].Rights

                }
            }
            if (!isEmptyOrNull(removedNodeId)) {
                for (let i = 0; i < ListOfUnusedRights.length; i++) {
                    var newPath = DecomposeStringToList(ListOfUnusedRights[i].id, 0x88, 0x99)
                    newPath.splice(indexToRemove, 1)
                    var newId = ComposeListToString(newPath, 0x88, 0x99)
                    var buffer: Node = SearchById(FinalOrgChartBuffer, newId)
                    if (!isEmptyOrNull(buffer))
                        buffer.Rights = ListOfUnusedRights[i].Rights
                }
                removedNodeId = ''
            }
            else if (!isEmptyOrNull(addedClass)) {
                for (let i = 0; i < ListOfUnusedRights.length; i++) {
                    var newPath = DecomposeStringToList(ListOfUnusedRights[i].id, 0x88, 0x99)
                    newPath.splice(addedIndex, 0, addedClass)
                    var newId = ComposeListToString(newPath, 0x88, 0x99)
                    var buffer: Node = SearchById(FinalOrgChartBuffer, newId)
                    if (!isEmptyOrNull(buffer))
                        buffer.Rights = ListOfUnusedRights[i].Rights
                }
                addedClass = ''
            }

            EmployeeRightsService.ClearOldAdminRightRecord({
            }, response => {
                for (let i = 0; i < ListOfRights.length; i++) {
                    if (ListOfRights[i].hierarchyId != EmployeeEnum && !isEmptyOrNull(ListOfRights[i].EmployeeRowId)) {
                        if (ListOfRights[i].hierarchyId != CardType.DIRECTOR) {
                            EmployeeRightsService.Create({
                                Entity: {
                                    "EmployeeRowId": ListOfRights[i].EmployeeRowId,
                                    "NodeId": ListOfRights[i].id,
                                    "Appraisal": ListOfRights[i].Rights.Appraisal,
                                    "LeaveApproval": ListOfRights[i].Rights.LeaveApproval,
                                    "OtApproval": ListOfRights[i].Rights.OtApproval,
                                    "Training": ListOfRights[i].Rights.Training,
                                    "MoneyClaiming": ListOfRights[i].Rights.MoneyClaiming,
                                }
                            })
                        }
                        else {
                            EmployeeRightsService.Create({
                                Entity: {
                                    "EmployeeRowId": ListOfRights[i].EmployeeRowId,
                                    "NodeId": ListOfRights[i].id,
                                    "Appraisal": true,
                                    "LeaveApproval": true,
                                    "OtApproval": true,
                                    "Training": true,
                                    "MoneyClaiming": true,
                                }
                            })

                        }

                    }
                }
            })


            var orgChartElement = document.getElementById("orgChartContainer")
            if (orgChartElement) {
                var orgDiv = orgChartElement.querySelector(".orgchart");
                if (orgDiv) {
                    Style = orgDiv.getAttribute('style')
                    DataPanStart = orgDiv.getAttribute('data-pan-start')
                    orgDiv.remove()
                }
            }

            var BulletList = GenerateUl(FinalDatascource2, ChartType.OrgChart)
            $('#chart-left-panel').html('');
            $('#chart-left-panel').append(BulletList);
            $('#chart-left-panel').addClass('scrollable');

            removeEmptyChildren(FinalDatascource2)

            FinalDatascource = JSON.parse(JSON.stringify(FinalDatascource2))
            let orgchart = new OrgChart({
                'chartContainer': '#orgChartContainer',
                'data': FinalDatascource,
                'nodeContent': 'title',
                'nodeId': 'thisOrgChart',
                'zoom': true,
                'pan': true,
                'id': 'orgChart',
                'renderCompleted':  setCallbacks(),
                'createNode': function (node, data) {
                    let image = ""
                    let $jqueryObject = $(node);
                    if (!isEmptyOrNull(data.EmployeeRowId)) {
                        var employeeRow = ListOfEmployeeData.find(employee => employee.id === data.EmployeeRowId);
                        //   console.log(JobGradeTable.itemById)
                        //  console.log(employeeRow.JobGradeId)
                        var JobGradeName = '-'
                        if (!isEmptyOrNull(employeeRow.JobGradeId)) {
                            if (!isEmptyOrNull(JobGradeTable.itemById[employeeRow.JobGradeId].Name))
                                JobGradeName = JobGradeTable.itemById[employeeRow.JobGradeId].Name;
                        }
                        var basicPay = Authorization.userDefinition.Permissions[PermissionKeys.HumanResources] == true ? employeeRow.SalaryDetails : ''
                        if (!isEmptyOrNull(basicPay))
                            basicPay = `Salary Details : ${basicPay}`
                        var imgPath = employeeRow.ImgPath;
                        image = ` 
                    <div  style="display: flex; align-items: center; height: 100%; flex-direction: column;" class=" rowData">
                        </div>
                <div style="text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px">
                    <div style="text-align: left;height: 100%;width:100%;padding-right:0">
                            <div class="col-1"  style="font-size: 10px; display: flex; justify-content: space-between; align-items: center; width: 100%; white-space: nowrap;"> <span  style="display: block;white-space: nowrap;"> Name : ${employeeRow.EmployeeName} <br> Job Grade : ${JobGradeName} <br> ${basicPay} </span>  </div>
                            </div>`
                        if (data.hierarchyLevel != EmployeeEnum && data.hierarchyLevel != CardType.DIRECTOR) {
                            var button
                            if (!isEmptyOrNull(data.Rights)) {
                                button = `
                <div>
                     <i class="fas fa-band-aid" title="Approve Leave Requests"></i>
                    <i class="fa fa-wrench" title="Approve Overtime Requests"></i>
                   <i class="fa fa-money-bill" title="Approve Money Claiming Requests"></i>
                    <i class="fa fa-check" title="Evaluate Employee Requests"></i>
                    <i class="far fa-clock" title="Manage Training Requests"></i>
                </div>
                <div>`;
                                var desiredOrder: (keyof EmployeeAdminRights)[] = [
                                    'LeaveApproval',
                                    'OtApproval',
                                    'MoneyClaiming',
                                    'Appraisal',
                                    'Training'
                                ];


                                // Loop through the rights object to create the checkbox elements
                                for (const key of desiredOrder) {
                                    var value = data.Rights[key]

                                    // Determine the checked attribute based on the value
                                    const checkedAttribute = value ? 'checked' : '';
                                    //  console.log(value)
                                    //  console.log(key)

                                    button += `
                    <input class="CheckBox" name="${key}" type="checkbox" title="${key.replace(/([A-Z])/g, ' $1')}" ${checkedAttribute}>
                `;
                                }

                                // Close the div tag
                                button += '</div>';
                            }
                            else {
                                button = `
                    <div>
                 <i class="fas fa-band-aid" title="Approve Leave Requests"></i>
                    <i class="fa fa-wrench" title="Approve Overtime Requests"></i>
                   <i class="fa fa-money-bill" title="Approve Money Claiming Requests"></i>
                    <i class="fa fa-check" title="Evaluate Employee Requests"></i>
                    <i class="far fa-clock" title="Manage Training Requests"></i>
                    </div>
                    <div>
                    <input class = "CheckBox"  name="LeaveApproval" type="checkbox"  title="Approve Leave Requests">
                    <input  class = "CheckBox" name="OtApproval" type="checkbox" title="Approve Overtime Requests">
                    <input class = "CheckBox"  name="MoneyClaiming" type="checkbox" title="Approve Money Claiming Requests" >
                    <input class = "CheckBox"  name="Appraisal" type="checkbox" title="Evaluate Employee Requests" >
                    <input class = "CheckBox"  name="Training" type="checkbox" title="Manage Training Requests" >

                    </div>    
`

                            }
                            image = button + image
                        }
                        $jqueryObject.append(image)

                        var img = document.createElement('img');
                        img.src = `/upload/${imgPath}`;
                        img.className = 'avatar';
                        img.crossOrigin = 'anonymous'
                        img.draggable = false
                        img.width = 63;
                        img.height = 112.5;
                        img.style.marginRight = '20px'

                        img.onerror = function () {
                            // Handle the error, e.g., set a placeholder image
                            img.src = ''; // Replace with your placeholder path
                        };

                        let row = $jqueryObject.find(".rowData")
                        row.append(img)
                        var ViewButton = document.createElement('span');
                        ViewButton.className = 'dot';
                        if (Authorization.userDefinition.Permissions[PermissionKeys.HumanResources])//is HR
                            row.append(ViewButton)


                    }
                    let content = $jqueryObject.find(".content")
                    content.remove()
                }

            });

            console.log(isOrgChartOutOfView())

            if (!isEmptyOrNull(Style))
                orgchart.chart.style = Style

            const jsonString = JSON.stringify(FinalDatascource2);
            FinalOrganisationChartService.Create({
                Entity:
                {
                    "FinalOrgChart": jsonString,
                },
            });
           // setCallbacks()

        })



    }
    function GetLookupValueFromId(destinationHierarchy, destinationHierarchyId) {
        var str

        var table = getLookup(`${capitalizeFirstLetter(destinationHierarchy)}.${capitalizeFirstLetter(destinationHierarchy)}`)
        for (var LookupIndex in table.items) {
            if (table.items[LookupIndex].Id == destinationHierarchyId) {
                str = table.items[LookupIndex].Name.replace(/\s/g, "")
                break
            }
        }
        return str
    }

    function DecomposeStringToList(StringToDecompose: String, Starter, Ender) {
        var buffer = '', start = false
        var bufferList: any[] = []
        for (let i = 0; i < StringToDecompose.length; i++) {
            var charCode = StringToDecompose.charCodeAt(i)
            if (charCode == Starter || (start == true && charCode != Ender))//start
            {
                if (start == true)
                    buffer += StringToDecompose[i].toString()
                start = true
            }
            else if (charCode == Ender) // end
            {
                bufferList.push(buffer)
                start = false
                buffer = ''
            }
        }
        return bufferList
    }
    function ComposeListToString(List: string[], Starter, Ender) {
        var result: string = '';
        for (let i = 0; i < List.length; i++) {
            result = `${result}${EncodeString(List[i], Starter, Ender)}`
        }
        return result
    }
    function EncodeString(OriginalString, Starter, Ender) {
        if (OriginalString.endsWith('Class'))
            OriginalString = OriginalString.slice(0, -5); // Remove the last 5 characters
        var buffer = String.fromCharCode(Starter) + OriginalString + String.fromCharCode(Ender)
        return buffer.replace(/\s+/g, ''); // Removes all spaces
    }
    var counter = 0
    function splitIntoNodes(root) {
        const nodes: NodeRow[] = [];
        function processNode(node: Node, parentId: string | null, childIndex: number | null = 0) {
            // Add current node to the nodes table
            counter+=1
            nodes.push({
                id: node.id,
                EmployeeRowId: node.EmployeeRowId,
                name: node.name,
                title: node.title,
                className: node.className,
                hierarchyLevel: node.hierarchyLevel,
                parentId: parentId,
                hierarchyId: node.hierarchyId,
                childrenIndex: childIndex // Store the index of this child in its parent's children array
            });
            // Recursively process children
            if (node.children)
                node.children.forEach((child, index) => processNode(child, node.id, index));
        }

        processNode(root, null, null);

        return nodes;
    }
    function extractRights(node) {
        const ListOfRights: NodeRights[] = [];
        function processRights(node: Node) {
            // Add current node to the nodes table
            if (node.Rights) {
                ListOfRights.push(
                    {
                        id: node.id,
                        Rights: node.Rights,
                        EmployeeRowId: node.EmployeeRowId,
                        nodeHierarchy: node.hierarchyLevel
                    }
                );

            }

            // Recursively process children
            if (node.children)
                node.children.forEach((child) => processRights(child));
        }

        processRights(node)
        return ListOfRights

    }
    function buildHierarchy(data: NodeRow[]) {
        const map = {};
        let root = null;
        // Step 1: Create a map of the items by their id
        data.forEach(item => {
            if (!isEmptyOrNull(item))
                map[item.id] = { ...item }; // Create a copy of the item to avoid direct mutation

        });

        // Step 2: Build the hierarchy by assigning children to their respective parent nodes
        data.forEach(item => {
            if (!isEmptyOrNull(item)) {
                if (item.parentId) {
                    const parent = map[item.parentId];
                    if (parent) { // Ensure the parent exists in the map
                        if (!parent.children)
                            parent.children = [];
                        parent.children[item.childrenIndex] = map[item.id]; // Place the child at the correct index
                    }
                } else
                    root = map[item.id]; // Assuming there's only one root node


            }
        });

        // Step 3: Remove empty 'children' properties recursively
        function cleanChildrenArray(node) {
            if (node.children) {
                node.children = node.children.filter(child => child !== undefined); // Remove gaps
                node.children.forEach(cleanChildrenArray); // Recursively clean children
                if (node.children.length === 0) {
                    delete node.children;
                }
            }
            return node;
        }

        return root ? cleanChildrenArray(root) : null; // Clean up and return the root node
    }
}