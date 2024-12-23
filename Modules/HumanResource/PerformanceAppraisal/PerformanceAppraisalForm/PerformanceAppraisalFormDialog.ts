import {Decorators, EntityDialog, ListResponse} from '@serenity-is/corelib';
import {
    PerformanceAppraisalEvaluationRow,
    PerformanceAppraisalEvaluationService,
    PerformanceAppraisalFormForm,
    PerformanceAppraisalFormRow,
    PerformanceAppraisalFormService, PerformanceAppraisalResponseRow,
    PerformanceAppraisalResponseService,
    PerformanceAppraisalReviewerRow,
    PerformanceAppraisalReviewerService, PerformanceAppraisalTemplateRow,
    PerformanceAppraisalTemplateService,
    PerformanceAppraisalTypeService,
} from '../../../ServerTypes/PerformanceAppraisal';
import {EmployeeProfileService} from "@/ServerTypes/EmployeeProfile/EmployeeProfileService";
import {DepartmentService} from "@/ServerTypes/OrganisationHierarchy/DepartmentService";
import { DepartmentRow } from "@/ServerTypes/OrganisationHierarchy/DepartmentRow";
import { confirm, alertDialog } from '@serenity-is/corelib/q';

@Decorators.panel()
@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalFormDialog')
export class PerformanceAppraisalFormDialog extends EntityDialog<PerformanceAppraisalFormRow, any> {
    protected getFormKey() {
        return PerformanceAppraisalFormForm.formKey;
    }

    protected getRowDefinition() {
        return PerformanceAppraisalFormRow;
    }

    protected getService() {
        return PerformanceAppraisalFormService.baseUrl;
    }

    protected form = new PerformanceAppraisalFormForm(this.idPrefix);
    
    protected updateInterface() {
        super.updateInterface();

        this.toolbar.findButton('export-pdf-button').toggle(this.isEditMode());
    }

    formID: number;

    public getID(formID: number): void {
        this.formID = formID;
    }
    
    protected onDialogOpen(): void {
        super.onDialogOpen();

        // console.log("ID get : ", this.formID);

        this.dialogTitle = "";
        this.element.closest(".ui-dialog").css("top", "2%");

        const container = $('<div id="form-container"></div>').appendTo(this.element);
        const templateId: number[] = [];
        const templateName: string[] = [];

        const appraisalTypeId: number[] = [];
        const appraisalType: string[] = [];

        const reviewerRowId: number[] = [];
        const reviewerList: string[] = [];

        const targetRowID: number[] = [];
        const targetList: string[] = [];
        
        const departID: number[] = [];
        const departName: string[] = [];
        
        PerformanceAppraisalTemplateService.List({}, async response => {

            for (let index in response.Entities) {
                const entity = response.Entities[index];
                templateId.push(entity.Id);
                templateName.push(entity.TemplateName);
            }

            await PerformanceAppraisalTypeService.List({}, async response1 => {

                for (let index in response1.Entities) {
                    const entity = response1.Entities[index];
                    appraisalTypeId.push(entity.Id);
                    appraisalType.push(entity.Type);
                }

                await EmployeeProfileService.List({}, async response2 => {

                    let departmentMap = {};

                    await DepartmentService.List({}, async responseDept => {
                        for (let deptIndex in responseDept.Entities) {
                            const dept = responseDept.Entities[deptIndex];
                            departmentMap[dept.Id] = dept.Name;
                        }
                        
                        for (let index in response2.Entities) {
                            const entity = response2.Entities[index];
                            reviewerRowId.push(entity.Id);
                            reviewerList.push(entity.EmployeeName);

                            targetRowID.push(entity.Id);
                            targetList.push(entity.EmployeeName);

                            const departmentId = entity.DepartmentID;
                            const departmentName = departmentMap[departmentId] || 'Unknown';
                            departID.push(departmentId);
                            departName.push(departmentName);
                        }
                        
                        const departmentNameList: string[] = [];

                        await DepartmentService.List({}, async departResponse => {

                            for (let index in departResponse.Entities) {
                                const entity = departResponse.Entities[index];

                                departmentNameList.push(entity.Name);
                            }
                        });

                        this.displayForm(container, templateId, templateName, appraisalTypeId, appraisalType,
                            reviewerRowId, reviewerList, targetRowID, targetList, departID, departName, departmentNameList);
                    });
                });
            })
        });
        
        this.applyChangesButton.remove();
        this.saveAndCloseButton.remove();
        this.deleteButton.remove();

    }

    public displayForm(FormContainer: JQuery, templateId: number[], templateName: string[], appraisalTypeId: number[],
                       appraisalType: string[], reviewerRowId: number[], reviewerList: string[], targetRowID: number[], 
                       targetList: string[], departId: number[], departName: string[], departmentName: string[]): void {
        FormContainer.empty();
       
        PerformanceAppraisalFormService.List({
            Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.formID]
        }, response => {
            
            if (response.Entities.length === 0) {
                // New Form Record
                const formData = response.Entities[0];

                const FormHtml = `
                    <div class="field-row">
                        <div class="field" style="width: 48%;">
                            <label for="TemplateId" class="field-label">Template:</label>
                            <select id="TemplateId" class="field-select">
                                <option value="">Select Template</option>
                                ${templateId.map((id, i) => `<option value="${id}">${templateName[i]}</option>`).join('')}
                            </select>
                        </div>
                        <div class="field" style="width: 48%;">
                            <label for="AppraisalTypeId" class="field-label">Appraisal Type:</label>
                            <select id="AppraisalTypeId" class="field-select">
                                <option value="">Select Appraisal Type</option>
                                ${appraisalTypeId.map((id, i) => `<option value="${id}">${appraisalType[i]}</option>`).join('')}
                            </select>
                        </div>
                    </div>
    
                    <div class="field-row">
                        <div class="field" style="width: 108%;">
                            <label for="TargetList" class="field-label">Target:</label>
                            <div class="field-box">
                                <div class="search-target-container">
                                    <div class="target-close-inline">
                                        <input type="text" id="TargetSearch" class="search-box" placeholder="Search target...">
                                        <span id="clearTargetSearch" class="target-clear-icon fa fa-times"></span>
                                    </div>
                                    <div class="filter-target-close-inline">
                                        <select id="FilterTargetDepartment" class="field-select-filter-target">
                                            <option value="">Filter</option>
                                        </select>
                                        <span id="clearTargetFilter" class="filter-target-clear-icon fa fa-times"></span>
                                    </div>
                                </div>
                                <div>
                                    <input type="checkbox" id="selectAll_target" name="selectAll_target">
                                    <label for="selectAll_target" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                </div>
                                <div class="target-list-container">
                                    ${targetRowID.map((id, i) => `
                                        <div class="target-list">
                                            <input type="checkbox" id="Target_${id}" name="TargetList" value="${id}">
                                            <label for="Target_${id}" class="target-name">${targetList[i]}</label>
                                            <label class="depart-name">${departName[i]}</label>
                                            <hr style="color: #222222;">
                                        </div>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="new-date-field-row">
                        <div class="field" style="width: 48%;">
                            <label for="StartDate" class="field-label">Start Date:</label>
                            <input type="text" id="StartDate" class="field-select" style="width: 150px;">
                        </div>
                    </div>
                `;
                
                const saveButton = $('<button><i class="fa fa-save"></i> Save</button>').prependTo(this.element);

                saveButton.css({
                    'position': 'relative',
                    'border': '1px solid #b1b1b1',
                    'background-color': 'white',
                    'padding': '7px 9px',
                    'border-radius': '5px',
                    'font-size': '16px',
                    'cursor': 'pointer',
                    'width': '80px'

                });
                saveButton.hover(
                    function() {
                        $(this).css({
                            'background-color': 'gray',
                            'color': 'black'
                        });
                    },
                    function() {
                        $(this).css({
                            'background-color': 'white', 
                            'color': 'black' 
                        });
                    }
                );

                saveButton.on('click', () => this.saveData());

                const closeButton = $('<button><i class="fa fa-times"></i></button>').prependTo(this.element);

                closeButton.css({
                    'position': 'absolute',     
                    'top': '25px',              
                    'right': '25px',            
                    'border': '1px solid transparent',   
                    'background-color': 'white',     
                    'padding': '7px 9px',            
                    'border-radius': '5px',          
                    'font-size': '22px',             
                    'cursor': 'pointer',             
                    'width': '40px',                 
                    'text-align': 'center'
                });

                closeButton.hover(
                    function() {
                        $(this).css({
                            'background-color': 'gray',
                            'color': 'black'
                        });
                    },
                    function() {
                        $(this).css({
                            'background-color': 'white',
                            'color': 'black'
                        });
                    }
                );

                closeButton.on('click', () => {
                    this.dialogClose();
                });
                
                $(FormHtml).appendTo(FormContainer);

                const departmentReviewerSelect = $('#FilterReviwerDepartment');
                departmentReviewerSelect.empty().append('<option value="">Filter</option>');
                departmentName.forEach(department => {
                    departmentReviewerSelect.append(`<option value="${department.toLowerCase()}">${department}</option>`);
                });

                const departmentTargetSelect = $('#FilterTargetDepartment');
                departmentTargetSelect.empty().append('<option value="">Filter</option>');
                departmentName.forEach(department => {
                    departmentTargetSelect.append(`<option value="${department.toLowerCase()}">${department}</option>`);
                });
                
                this.initializeDatePickers();
                this.applyStyles(FormContainer);
                this.addSelectAllFunctionality('#selectAll_reviewer', '.review-list-container input[type="checkbox"]');
                this.addSelectAllFunctionality('#selectAll_target', '.target-list-container input[type="checkbox"]');
                this.addSearchFunctionality('#ReviewerSearch', '#clearReviewerSearch', '.review-list-container input[type="checkbox"]', reviewerList);
                this.addSearchFunctionality('#TargetSearch', '#clearTargetSearch','.target-list-container input[type="checkbox"]', targetList);
                this.addFilterFunctionality('#FilterReviwerDepartment', '#clearReviewerFilter', '.review-list-container div', departName);
                this.addFilterFunctionality('#FilterTargetDepartment', '#clearTargetFilter', '.target-list-container div', departName);
                
            }else {
                
                const formData = response.Entities[0];

                PerformanceAppraisalResponseService.List({
                    Criteria: [[PerformanceAppraisalResponseRow.Fields.FormId], '=', this.formID]
                }).then((resResponse: ListResponse<any>) => {
                    
                    // Response Found
                    if (resResponse.Entities.length > 0) {

                        const tempID = formData.TemplateId || '';
                        const tempName = formData.TemplateName || '';
                        const typeID = formData.TypeId || '';
                        const targetID = formData.EmployeeRowId || '';
                        const startDate = formData.StartDate;
                        const endDate = formData.EndDate;
                        const reviewStartDate = formData.EvaluateStartDate;
                        const reviewEndDate = formData.EvaluateEndDate;
                        const approvalStartDate = formData.ApprovalStartDate;
                        const approvalEndDate = formData.ApprovalEndDate;

                        function formatDate(dateString) {
                            const date = new Date(dateString);
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                            const day = String(date.getDate()).padStart(2, '0');
                            const hours = String(date.getHours()).padStart(2, '0');
                            const minutes = String(date.getMinutes()).padStart(2, '0');
                            const seconds = String(date.getSeconds()).padStart(2, '0');

                            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                        }

                        const formattedStartDate = formatDate(startDate);
                        const formattedEndDate = formatDate(endDate);
                        const formattedReviewStartDate = formatDate(reviewStartDate);
                        const formattedReviewEndDate = formatDate(reviewEndDate);
                        const formattedApprovalStartDate = formatDate(approvalStartDate);
                        const formattedApprovalEndDate = formatDate(approvalEndDate);

                        const FormHtml = `
                                <div class="field-row">
                                    <div class="field" style="width: 48%;">
                                        <label for="TemplateId" class="field-label">Template:</label>
                                        <select id="TemplateId" class="field-select read-only" disabled>
                                            <option value="${tempID}" selected>${tempName}</option>
                                        </select>
                                    </div>
                                    <div class="field" style="width: 48%;">
                                        <label for="AppraisalTypeId" class="field-label">Appraisal Type:</label>
                                        <select id="AppraisalTypeId" class="field-select">
                                            <option value="">Select Appraisal Type</option>
                                            ${appraisalTypeId.map((id, i) => `<option value="${id}" ${typeID === id ? 'selected' : ''}>${appraisalType[i]}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                
                                <div class="field-row">
                                    <div class="field" style="width: 100%;">
                                        <label for="TargetList" class="field-label">Target:</label>
                                        <div class="field-box read-only">
                                            <div class="search-target-container read-only">
                                                <div class="target-close-inline read-only">
                                                    <input type="text" id="TargetSearch" class="search-box read-only" placeholder="Search target..." disabled>
                                                    <span id="clearTargetSearch" class="target-clear-icon fa fa-times"></span>
                                                </div>
                                                <div class="filter-target-close-inline read-only">
                                                    <select id="FilterTargetDepartment" class="field-select-filter-target read-only" disabled>
                                                        <option value="">Filter</option>
                                                    </select>
                                                    <span id="clearTargetFilter" class="filter-target-clear-icon fa fa-times"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="selectAll_target read-only" name="selectAll_target" disabled>
                                                <label for="selectAll_target" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                            </div>
                                            <div class="target-list-container read-only">
                                                ${targetRowID.map((id, i) => `
                                                    <div class="target-list">
                                                        <input type="checkbox" id="Target_${id}" name="TargetList" value="${id}" ${targetID === id ? 'checked' : ''} disabled>
                                                        <label for="Target_${id}" class="target-name">${targetList[i]}</label>
                                                        <hr style="color: #222222;">
                                                    </div>`).join('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                
                                <div class="date-field-row">
                                    <div class="field" style="width: 48%;">
                                        <label for="StartDate" class="field-label">Start Date:</label>
                                        <input type="text" id="StartDate" class="field-select" style="width: 150px;" value="${formattedStartDate}">
                                    </div>
                                    <div class="field" style="width: 48%; color: #2f2f2f">
                                        <label for="EndDate" class="field-label">End Date:</label>
                                        <input type="text" id="EndDate" class="field-select" style="width: 150px;" value="${formattedEndDate}">
                                    </div>
                                </div>
                                
                                <div class="date-field-row">
                                    <div class="field" style="width: 48%;">
                                        <label for="ReviewStartDate" class="field-label">Review Start Date:</label>
                                        <input type="text" id="ReviewStartDate" class="field-select" style="width: 150px;" value="${formattedReviewStartDate}">
                                    </div>
                                    <div class="field" style="width: 48%; color: #2f2f2f">
                                        <label for="ReviewEndDate" class="field-label">Review End Date:</label>
                                        <input type="text" id="ReviewEndDate" class="field-select" style="width: 150px;" value="${formattedReviewEndDate}">
                                    </div>
                                </div>
                                
                                <div class="date-field-row">
                                    <div class="field" style="width: 48%;">
                                        <label for="ApprovalStartDate" class="field-label">Approval Start Date:</label>
                                        <input type="text" id="ApprovalStartDate" class="field-select" style="width: 150px;" value="${formattedApprovalStartDate}">
                                    </div>
                                    <div class="field" style="width: 48%; color: #2f2f2f">
                                        <label for="ApprovalEndDate" class="field-label">Approval End Date:</label>
                                        <input type="text" id="ApprovalEndDate" class="field-select" style="width: 150px;" value="${formattedApprovalEndDate}">
                                    </div>
                                </div>
                            `;

                        const buttonContainer = $('<div></div>').prependTo(this.element);
                        const saveButton = $('<button><i class="fa fa-save"></i> Save</button>').appendTo(buttonContainer);
                        const delButton = $('<button><i class="fa fa-trash"></i> Del</button>').appendTo(buttonContainer);

                        buttonContainer.css({
                            'display': 'inline-block'
                        });
                        saveButton.css({
                            'border': '1px solid #b1b1b1',
                            'background-color': 'white',
                            'padding': '7px 9px',
                            'border-radius': '5px',
                            'font-size': '16px',
                            'cursor': 'pointer',
                            'width': '80px',
                            'display': 'inline-block',
                            'margin-right': '5px'
                        });
                        delButton.css({
                            'border': '1px solid #b1b1b1',
                            'background-color': 'white',
                            'padding': '7px 9px',
                            'border-radius': '5px',
                            'font-size': '16px',
                            'cursor': 'pointer',
                            'width': '80px',
                            'display': 'inline-block'
                        });
                        saveButton.hover(
                            function() {
                                $(this).css({
                                    'background-color': 'gray',
                                    'color': 'black'
                                });
                            },
                            function() {
                                $(this).css({
                                    'background-color': 'white',
                                    'color': 'black'
                                });
                            }
                        );
                        delButton.hover(
                            function() {
                                $(this).css({
                                    'background-color': 'red',
                                    'color': 'white'
                                });
                            },
                            function() {
                                $(this).css({
                                    'background-color': 'white',
                                    'color': 'black'
                                });
                            }
                        );

                        saveButton.on('click', () => this.updateData());
                        delButton.on('click', () => {
                            confirm("Delete record?", () => {
                                this.delData();
                            });
                        })

                        const closeButton = $('<button><i class="fa fa-times"></i></button>').prependTo(this.element);

                        closeButton.css({
                            'position': 'absolute',
                            'top': '25px',
                            'right': '25px',
                            'border': '1px solid transparent',
                            'background-color': 'white',
                            'padding': '7px 9px',
                            'border-radius': '5px',
                            'font-size': '22px',
                            'cursor': 'pointer',
                            'width': '40px',
                            'text-align': 'center'
                        });

                        closeButton.hover(
                            function() {
                                $(this).css({
                                    'background-color': 'gray',
                                    'color': 'black'
                                });
                            },
                            function() {
                                $(this).css({
                                    'background-color': 'white',
                                    'color': 'black'
                                });
                            }
                        );

                        closeButton.on('click', () => {
                            this.dialogClose();
                        });

                        $(FormHtml).appendTo(FormContainer);

                        const departmentReviewerSelect = $('#FilterReviwerDepartment');
                        departmentReviewerSelect.empty().append('<option value="">Filter</option>');
                        departmentName.forEach(department => {
                            departmentReviewerSelect.append(`<option value="${department.toLowerCase()}">${department}</option>`);
                        });

                        const departmentTargetSelect = $('#FilterTargetDepartment');
                        departmentTargetSelect.empty().append('<option value="">Filter</option>');
                        departmentName.forEach(department => {
                            departmentTargetSelect.append(`<option value="${department.toLowerCase()}">${department}</option>`);
                        });

                        this.initializeDatePickers();
                        this.applyStyles(FormContainer);
                        this.addSelectAllFunctionality('#selectAll_target', '.target-list-container input[type="checkbox"]');
                        this.addSearchFunctionality('#TargetSearch', '#clearTargetSearch','.target-list-container input[type="checkbox"]', targetList);
                        this.addFilterFunctionality('#FilterReviwerDepartment', '#clearReviewerFilter', '.review-list-container div', departName);
                        this.addFilterFunctionality('#FilterTargetDepartment', '#clearTargetFilter', '.target-list-container div', departName);
                        this.scrollToFirstChecked('.review-list-container input[type="checkbox"]', '.target-list-container input[type="checkbox"]');


                    }
                    else {
                        // No Response Found
                        
                        const tempID = formData.TemplateId || '';
                        const typeID = formData.TypeId || '';
                        const targetID = formData.EmployeeRowId || '';
                        const startDate = formData.StartDate;
                        const endDate = formData.EndDate;
                        const reviewStartDate = formData.EvaluateStartDate;
                        const reviewEndDate = formData.EvaluateEndDate;
                        const approvalStartDate = formData.ApprovalStartDate;
                        const approvalEndDate = formData.ApprovalEndDate;

                        function formatDate(dateString) {
                            const date = new Date(dateString);
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                            const day = String(date.getDate()).padStart(2, '0');
                            const hours = String(date.getHours()).padStart(2, '0');
                            const minutes = String(date.getMinutes()).padStart(2, '0');
                            const seconds = String(date.getSeconds()).padStart(2, '0');

                            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                        }

                        const formattedStartDate = formatDate(startDate);
                        const formattedEndDate = formatDate(endDate);
                        const formattedReviewStartDate = formatDate(reviewStartDate);
                        const formattedReviewEndDate = formatDate(reviewEndDate);
                        const formattedApprovalStartDate = formatDate(approvalStartDate);
                        const formattedApprovalEndDate = formatDate(approvalEndDate);

                        const FormHtml = `
                                <div class="field-row">
                                    <div class="field" style="width: 48%;">
                                        <label for="TemplateId" class="field-label">Template:</label>
                                        <select id="TemplateId" class="field-select">
                                            <option value="">Select Template</option>
                                            ${templateId.map((id, i) => `<option value="${id}" ${tempID === id ? 'selected' : ''}>${templateName[i]}</option>`).join('')}
                                        </select>
                                    </div>
                                    <div class="field" style="width: 48%;">
                                        <label for="AppraisalTypeId" class="field-label">Appraisal Type:</label>
                                        <select id="AppraisalTypeId" class="field-select">
                                            <option value="">Select Appraisal Type</option>
                                            ${appraisalTypeId.map((id, i) => `<option value="${id}" ${typeID === id ? 'selected' : ''}>${appraisalType[i]}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                
                                <div class="field-row">
                                    <div class="field" style="width: 100%;">
                                        <label for="TargetList" class="field-label">Target:</label>
                                        <div class="field-box read-only">
                                            <div class="search-target-container read-only">
                                                <div class="target-close-inline read-only">
                                                    <input type="text" id="TargetSearch" class="search-box read-only" placeholder="Search target..." disabled>
                                                    <span id="clearTargetSearch" class="target-clear-icon read-only fa fa-times"></span>
                                                </div>
                                                <div class="filter-target-close-inline">
                                                    <select id="FilterTargetDepartment" class="field-select-filter-target read-only" disabled>
                                                        <option value="">Filter</option>
                                                    </select>
                                                    <span id="clearTargetFilter" class="filter-target-clear-icon read-only fa fa-times"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="selectAll_target" name="selectAll_target" class="selectAll_target read-only" disabled>
                                                <label for="selectAll_target" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                            </div>
                                            <div class="target-list-container read-only">
                                                ${targetRowID.map((id, i) => `
                                                    <div class="target-list">
                                                        <input type="checkbox" id="Target_${id}" name="TargetList" value="${id}" ${targetID === id ? 'checked' : ''} disabled>
                                                        <label for="Target_${id}" class="target-list">${targetList[i]}</label>
                                                        <hr style="color: #222222;">
                                                    </div>`).join('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                
                                <div class="date-field-row">
                                    <div class="field" style="width: 48%;">
                                        <label for="StartDate" class="field-label">Start Date:</label>
                                        <input type="text" id="StartDate" class="field-select" style="width: 150px;" value="${formattedStartDate}">
                                    </div>
                                    <div class="field" style="width: 48%; color: #2f2f2f">
                                        <label for="EndDate" class="field-label">End Date:</label>
                                        <input type="text" id="EndDate" class="field-select" style="width: 150px;" value="${formattedEndDate}">
                                    </div>
                                </div>
                                
                                <div class="date-field-row">
                                    <div class="field" style="width: 48%;">
                                        <label for="ReviewStartDate" class="field-label">Review Start Date:</label>
                                        <input type="text" id="ReviewStartDate" class="field-select" style="width: 150px;" value="${formattedReviewStartDate}">
                                    </div>
                                    <div class="field" style="width: 48%; color: #2f2f2f">
                                        <label for="ReviewEndDate" class="field-label">Review End Date:</label>
                                        <input type="text" id="ReviewEndDate" class="field-select" style="width: 150px;" value="${formattedReviewEndDate}">
                                    </div>
                                </div>
                                
                                <div class="date-field-row">
                                    <div class="field" style="width: 48%;">
                                        <label for="ApprovalStartDate" class="field-label">Approval Start Date:</label>
                                        <input type="text" id="ApprovalStartDate" class="field-select" style="width: 150px;" value="${formattedApprovalStartDate}">
                                    </div>
                                    <div class="field" style="width: 48%; color: #2f2f2f">
                                        <label for="ApprovalEndDate" class="field-label">Approval End Date:</label>
                                        <input type="text" id="ApprovalEndDate" class="field-select" style="width: 150px;" value="${formattedApprovalEndDate}">
                                    </div>
                                </div>
                            `;

                        const buttonContainer = $('<div></div>').prependTo(this.element);
                        const saveButton = $('<button><i class="fa fa-save"></i> Save</button>').appendTo(buttonContainer);
                        const delButton = $('<button><i class="fa fa-trash"></i> Del</button>').appendTo(buttonContainer);

                        buttonContainer.css({
                            'display': 'inline-block'
                        });
                        saveButton.css({
                            'border': '1px solid #b1b1b1',
                            'background-color': 'white',
                            'padding': '7px 9px',
                            'border-radius': '5px',
                            'font-size': '16px',
                            'cursor': 'pointer',
                            'width': '80px',
                            'display': 'inline-block',
                            'margin-right': '5px'
                        });
                        delButton.css({
                            'border': '1px solid #b1b1b1',
                            'background-color': 'white',
                            'padding': '7px 9px',
                            'border-radius': '5px',
                            'font-size': '16px',
                            'cursor': 'pointer',
                            'width': '80px',
                            'display': 'inline-block'
                        });
                        saveButton.hover(
                            function() {
                                $(this).css({
                                    'background-color': 'gray',
                                    'color': 'black'
                                });
                            },
                            function() {
                                $(this).css({
                                    'background-color': 'white',
                                    'color': 'black'
                                });
                            }
                        );
                        delButton.hover(
                            function() {
                                $(this).css({
                                    'background-color': 'red',
                                    'color': 'white'
                                });
                            },
                            function() {
                                $(this).css({
                                    'background-color': 'white',
                                    'color': 'black'
                                });
                            }
                        );

                        saveButton.on('click', () => this.updateData());
                        delButton.on('click', () => {
                            confirm("Delete record?", () => {
                                this.delData();
                            });
                        });

                        const closeButton = $('<button><i class="fa fa-times"></i></button>').prependTo(this.element);

                        closeButton.css({
                            'position': 'absolute',
                            'top': '25px',
                            'right': '25px',
                            'border': '1px solid transparent',
                            'background-color': 'white',
                            'padding': '7px 9px',
                            'border-radius': '5px',
                            'font-size': '22px',
                            'cursor': 'pointer',
                            'width': '40px',
                            'text-align': 'center'
                        });

                        closeButton.hover(
                            function() {
                                $(this).css({
                                    'background-color': 'gray',
                                    'color': 'black'
                                });
                            },
                            function() {
                                $(this).css({
                                    'background-color': 'white',
                                    'color': 'black'
                                });
                            }
                        );

                        closeButton.on('click', () => {
                            this.dialogClose();
                        });

                        $(FormHtml).appendTo(FormContainer);

                        const departmentReviewerSelect = $('#FilterReviwerDepartment');
                        departmentReviewerSelect.empty().append('<option value="">Filter</option>');
                        departmentName.forEach(department => {
                            departmentReviewerSelect.append(`<option value="${department.toLowerCase()}">${department}</option>`);
                        });

                        const departmentTargetSelect = $('#FilterTargetDepartment');
                        departmentTargetSelect.empty().append('<option value="">Filter</option>');
                        departmentName.forEach(department => {
                            departmentTargetSelect.append(`<option value="${department.toLowerCase()}">${department}</option>`);
                        });

                        this.initializeDatePickers();
                        this.applyStyles(FormContainer);
                        this.addSelectAllFunctionality('#selectAll_reviewer', '.review-list-container input[type="checkbox"]');
                        this.addSelectAllFunctionality('#selectAll_target', '.target-list-container input[type="checkbox"]');
                        this.addSearchFunctionality('#ReviewerSearch', '#clearReviewerSearch', '.review-list-container input[type="checkbox"]', reviewerList);
                        this.addSearchFunctionality('#TargetSearch', '#clearTargetSearch','.target-list-container input[type="checkbox"]', targetList);
                        this.addFilterFunctionality('#FilterReviwerDepartment', '#clearReviewerFilter', '.review-list-container div', departName);
                        this.addFilterFunctionality('#FilterTargetDepartment', '#clearTargetFilter', '.target-list-container div', departName);
                        this.scrollToFirstChecked('.review-list-container input[type="checkbox"]', '.target-list-container input[type="checkbox"]');

                    }
                })
            }
        });
    }
    
    public applyStyles(container: JQuery): void {

        container.find('.field').css({
            'border-radius': '5px',
            'box-sizing': 'border-box',
            'display': 'inline-block',
            'vertical-align': 'top'
        });
        container.find('.field-label').css({
            'font-weight': 'bold',
            'color': '#000000',
            'margin-bottom': '10px',
            'display': 'block'
        });
        container.find('.field-select').css({
            'width': '100%',
            'padding': '8px',
            'border': '1px solid #ccc',
            'border-radius': '4px',
            'font-size': '14px',
            'box-sizing': 'border-box'
        });
        container.find('.field-row').css({
            'display': 'flex',
            'justify-content': 'space-between',
            'margin-bottom': '10px',
            'width': '100%'
        });
        container.find('.date-field-row').css({
            'display': 'flex',
            'justify-content': 'space-between',
            'width': '100%'
        });
        container.find('.new-date-field-row').css({
            'display': 'flex',
            'justify-content': 'center',
            'width': '48%',  // Set the width to 48%
            'margin': '0 auto'  // Center the element within its parent container
        });
        container.find('.field-box').css({
            'border': '1px solid #ddd',
            'border-radius': '5px',
            'padding': '10px',
            'background-color': '#f9f9f9',
            'overflow-y': 'hidden',
            'display': 'flex',
            'flex-direction': 'column'
        });
        container.find('.target-close-inline').css({
            'position': 'relative',
            'display': 'inline-block',
            'width': '80%'
        });
        container.find('.search-box').css({
            'width': '100%',
            'padding': '8px',
            'border': '1px solid #ccc',
            'border-radius': '4px',
            'font-size': '14px',
            'margin-bottom': '10px',
            'flex-shrink': '0' // Prevent the search box from shrinking when the container size changes
        });
        container.find('.target-clear-icon').css({
            'position': 'absolute',
            'right': '10px', // Position to the right inside the search box
            'top': '40%',
            'transform': 'translateY(-50%)',
            'cursor': 'pointer',
            'font-size': '16px',
            'color': 'red', // Set the color to red
            'display': 'none', // Initially hidden, will be shown when there's input
            'z-index': '1' // Ensure the icon is above the search box content
        });
        container.find('.target-search-box').css({
            'width': '100%',
            'padding': '8px',
            'border': '1px solid #ccc',
            'border-radius': '4px',
            'font-size': '14px',
            'margin-bottom': '10px',
            'background-color': 'darkgray',
            'cursor': 'not-allowed',
            'flex-shrink': '0'
        });
        container.find('.filter-target-close-inline').css({
            'position': 'relative',
            'display': 'inline-block',
            'width': '18%', // Ensure the width is sufficient for both the select box and the clear icon
        });
        container.find('.field-select-filter-target').css({
            'width': '100%', // Adjust width to account for the clear icon
            'padding': '8px',
            'border': '1px solid #ccc',
            'border-radius': '4px',
            'font-size': '14px',
            'margin-bottom': '10px',
            'box-sizing': 'border-box', // Ensure padding doesn't affect the total width
        });
        container.find('.filter-target-clear-icon').css({
            'position': 'absolute',
            'right': '20px', // Position to the right inside the search box
            'top': '25%',
            // 'transform': 'translateY(-50%)',
            'cursor': 'pointer',
            'font-size': '16px',
            'color': 'red', // Set the color to red
            'z-index': '1' // Ensure the icon is above the search box content
        });

        container.find('.target-list-container').css({
            'flex-grow': '1',
            'height': '200px',
            'overflow-y': 'auto'
        });
        container.find('.target-list').css({
            'display': 'flex',
            'align-items': 'flex-start', // Ensure everything aligns at the top
            'margin-bottom': '10px',
            'width': '100%' // Ensure the review list takes the full container width
        });
        container.find('.target-list input[type="checkbox"]').css({
            'margin-right': '10px',
            'flex-shrink': '0',
            'width': '20px',
            'height': '20px'
        });
        container.find('.target-name').css({
            'flex-grow': '1', // Allow the reviewer name to take up available space
            'white-space': 'normal', // Enable text to wrap
            'word-wrap': 'break-word', // Ensure text wraps inside its container
            'margin-right': '10px'
        });
        
        container.find('input[type="checkbox"]').css({
            'margin-right': '10px',
            'flex-shrink': '0',
            'width': '20px',
            'height': '20px'
        });
        container.find('.field-box label').css({
            'display': 'inline-flex',
            'align-items': 'center',
            'font-size': '16px' 
        });
        container.find('.read-only').css({
            'background-color': 'darkgray', 
            'cursor': 'not-allowed'
        });
        container.find('.read-only input[type="checkbox"]').css({
            'cursor': 'not-allowed'
        });
        container.find('.depart-name').css({
            'display': 'None'
        })
    }

    private scrollToFirstChecked(ReviewerlistItemSelector: string, TargetlistItemSelector: string) {
        // const reviewerCheckedItems = this.element.find(`${ReviewerlistItemSelector}:checked`);
        const targetCheckedItems = this.element.find(`${TargetlistItemSelector}:checked`);
        
        // if (reviewerCheckedItems.length > 0) {
        //     reviewerCheckedItems[0].scrollIntoView({
        //         behavior: 'smooth',
        //         block: 'center'
        //     });
        // }

        if (targetCheckedItems.length > 0) {
            setTimeout(() => {
                targetCheckedItems[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 800);
        }
    }

    public addSearchFunctionality(searchBoxSelector: string, clearButtonSelector: string, listItemSelector: string, itemList: string[]): void {
        const searchBox = $(searchBoxSelector);
        const clearButton = $(clearButtonSelector);

        // Function to update the clear button visibility
        function updateClearButton() {
            if (searchBox.val()) {
                clearButton.show();
            } else {
                clearButton.hide();
            }
        }

        // Handle input event in search box
        $(searchBoxSelector).on('input', function () {
            const query = $(this).val()?.toString().toLowerCase() || '';
            let found = false;

            const regex = new RegExp('\\b' + query + '\\b', 'i');

            $(listItemSelector).each(function (index) {
                const label = itemList[index] ? itemList[index].toLowerCase() : '';
                const element = $(this).closest('div');

                if ((label.includes(query) || regex.test(label)) && query.length > 0) {
                    element.css('background-color', '#d1e7fd');

                    if (!found) {
                        // Scroll the list container to the first matching item
                        element[0].scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                        found = true;
                    }

                } else {
                    element.css('background-color', '');
                }
            });

            if (!found) {
                $(listItemSelector).closest('div').css('background-color', '');
            }
            updateClearButton();
        });

        clearButton.on('click', function () {
            searchBox.val('').trigger('input');
            clearButton.hide();
        });

        updateClearButton();
    }

    public addFilterFunctionality(filterSelector: string, filterButtonSelector: string, listItemSelector: string, departList: string[]): void {
        const filterSelect = $(filterSelector);
        const clearButton = $(filterButtonSelector);

        function updateClearButton() {
            if (filterSelect.val()) {
                clearButton.show();
            } else {
                clearButton.hide();
            }
        }

        $(filterSelect).on('change', function () {
            const selectedFilter = $(this).val()?.toString().toLowerCase() || '';

            $(listItemSelector).each(function (index) {
                const element = $(this).closest('div');
                const depart = departList[index] ? departList[index].toLowerCase() : '';

                if (selectedFilter === '' || depart === selectedFilter) {
                    element.show();
                } else {
                    element.hide();
                }
            });

            updateClearButton();
        });

        clearButton.on('click', function () {
            filterSelect.val('').trigger('change');
            $(listItemSelector).closest('div').show();
            clearButton.hide();
        });

        updateClearButton();
    }

    public addSelectAllFunctionality(selectAllSelector: string, listItemSelector: string): void {
        const selectAllCheckbox = $(selectAllSelector);

        selectAllCheckbox.on('change', function () {
            const isChecked = $(this).is(':checked');

            const visibleCheckboxes = $(listItemSelector).filter(':visible');
            visibleCheckboxes.prop('checked', isChecked);
        });

        $(listItemSelector).on('change', function () {
            const visibleCheckboxes = $(listItemSelector).filter(':visible');
            const allVisibleChecked = visibleCheckboxes.length === visibleCheckboxes.filter(':checked').length;

            selectAllCheckbox.prop('checked', allVisibleChecked);
        });

        const visibleCheckboxes = $(listItemSelector).filter(':visible');
        const allVisibleChecked = visibleCheckboxes.length === visibleCheckboxes.filter(':checked').length;

        selectAllCheckbox.prop('checked', allVisibleChecked);
    }

    public initializeDatePickers(): void {
        const self = this;

        const templateId = $('#TemplateId').val() || '';

        this.element.find('#StartDate').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function(dateText) {
                const startDate = new Date(dateText);
                startDate.setHours(0, 0, 0, 0); // Set time to midnight
                
                $('#StartDate').val($.datepicker.formatDate('yy-mm-dd', startDate));
            }
        });

        this.element.find('#EndDate').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function(dateText) {
                const endDate = new Date(dateText);
                endDate.setHours(23, 59, 59, 999);

                $('#EndDate').val($.datepicker.formatDate('yy-mm-dd', endDate) + ' 23:59:59');
            }
        });

        this.element.find('#ReviewStartDate').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function(dateText) {
                const startDate = new Date(dateText);
                startDate.setHours(0, 0, 0, 0); // Set time to midnight

                $('#ReviewStartDate').val($.datepicker.formatDate('yy-mm-dd', startDate));
            }
        });

        this.element.find('#ReviewEndDate').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function(dateText) {
                const endDate = new Date(dateText);
                endDate.setHours(23, 59, 59, 999);

                $('#ReviewEndDate').val($.datepicker.formatDate('yy-mm-dd', endDate) + ' 23:59:59');
            }
        });

        this.element.find('#ApprovalStartDate').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function(dateText) {
                const startDate = new Date(dateText);
                startDate.setHours(0, 0, 0, 0); // Set time to midnight

                $('#ApprovalStartDate').val($.datepicker.formatDate('yy-mm-dd', startDate));
            }
        });

        this.element.find('#ApprovalEndDate').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function(dateText) {
                const endDate = new Date(dateText);
                endDate.setHours(23, 59, 59, 999);

                $('#ApprovalEndDate').val($.datepicker.formatDate('yy-mm-dd', endDate) + ' 23:59:59');
            }
        });
    }

    public isEmptyOrNull(value: any): boolean {
        return value === null || value === undefined || value === '';
    }

    public saveData(): void {
        const formData = [];
        const reviewerData = [];

        const templateId = $('#TemplateId').val() || '';
        const appraisalTypeId = $('#AppraisalTypeId').val() || '';
        const startDate = $('#StartDate').val() || '';
        const submissionStatus = 1;
        const reviewStatus = 4;
        
        let templateName = "";
        
        PerformanceAppraisalTemplateService.List({
            Criteria: [[PerformanceAppraisalTemplateRow.Fields.Id], '=', templateId]
        }, tempResponse => {

            const DateStartDate = new Date(startDate);
            const durationNum = tempResponse.Entities[0].Duration;
            const days = durationNum * 7; 

            const endDate = new Date(DateStartDate);
            endDate.setDate(DateStartDate.getDate() + days);
            endDate.setHours(23, 59, 59, 999);
            const formattedEndDate = endDate.toISOString().slice(0, 10) + ' 23:59:59';

            const reviewStartDate = new Date(endDate);
            reviewStartDate.setDate(endDate.getDate() + 2);
            reviewStartDate.setHours(0, 0, 0, 0);
            const formattedReviewStartDate = reviewStartDate.toISOString().slice(0, 10) + ' 00:00:00.000';

            const reviewEndDate = new Date(reviewStartDate);
            reviewEndDate.setDate(reviewStartDate.getDate() + days - 1);
            reviewEndDate.setHours(23, 59, 59, 999);
            const formattedReviewEndDate = reviewEndDate.toISOString().slice(0, 10) + ' 23:59:59';

            const approvalStartDate = new Date(reviewEndDate);
            approvalStartDate.setDate(reviewEndDate.getDate() + 2);
            approvalStartDate.setHours(0, 0, 0, 0);
            const formattedApprovalStartDate = approvalStartDate.toISOString().slice(0, 10) + ' 00:00:00.000';

            const approvalEndDate = new Date(approvalStartDate);
            approvalEndDate.setDate(approvalStartDate.getDate() + days - 1);
            approvalEndDate.setHours(23, 59, 59, 999);
            const formattedApprovalEndDate = approvalEndDate.toISOString().slice(0, 10) + ' 23:59:59';

            for (var index in tempResponse.Entities) {
                const entity = tempResponse.Entities[index];
                templateName = entity.TemplateName;
            }

            const targetIds = [];
            $('input[name="TargetList"]:checked').each((index, checkbox) => {
                const targetId = $(checkbox).val() || '';
                targetIds.push(targetId);

                formData.push({
                    TemplateID: templateId,
                    TemplateName: templateName,
                    EmployeeRowID: targetId,
                    TypeID: appraisalTypeId,
                    StartDate: startDate,
                    EndDate: formattedEndDate,
                    EvaluateStartDate: formattedReviewStartDate,
                    EvaluateEndDate: formattedReviewEndDate,
                    ApprovalStartDate: formattedApprovalStartDate,
                    ApprovalEndDate: formattedApprovalEndDate,
                    SubmissionStatus: submissionStatus,
                    ReviewStatus: reviewStatus
                });
            });

            if (this.validateNewForm()) {
                if (this.isNew()) {
                    formData.forEach(record => {
                        PerformanceAppraisalFormService.Create({
                            Entity: record
                        }).then(response => {
                            const newFormId = response.EntityId;

                            setTimeout(() => {
                                this.dialogClose();
                                window.location.reload();
                            }, 1000);
                        }).catch(error => {
                            console.error("Error creating form record:", error);
                        });
                    });
                }
            }
        })
    }

    public updateData(): void {
        const formData = [];
        const reviewerData = [];
        
        const templateId = $('#TemplateId').val() || '';
        const appraisalTypeId = $('#AppraisalTypeId').val() || '';
        const startDate = $('#StartDate').val() || '';
        const endDate = $('#EndDate').val() || '';
        const reviewStartDate = $('#ReviewStartDate').val() || '';
        const reviewEndDate = $('#ReviewEndDate').val() || '';
        const approvalStartDate = $('#ApprovalStartDate').val() || '';
        const approvalEndDate = $('#ApprovalEndDate').val() || '';
        let submissionStatus = 1;
        let reviewStatus = 4;

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (end < start) {
                alertDialog('End date cannot be earlier than the start date.');
                return;
            }
        }
        
        if (reviewStartDate && reviewEndDate) {
            const start = new Date(reviewStartDate);
            const end = new Date(reviewEndDate);

            if (end < start) {
                alertDialog('Review End date cannot be earlier than the Review Start date.');
                return;
            }
        }
        
        if (approvalStartDate && approvalEndDate) {
            const start = new Date(approvalStartDate);
            const end = new Date(approvalEndDate);

            if (end < start) {
                alertDialog('Approval End date cannot be earlier than the Approval Start date.');
                return;
            }
        }

        let templateName = "";

        PerformanceAppraisalFormService.List({
            Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.formID]
        }, response => {
            templateName = response.Entities[0].TemplateName;
            submissionStatus = response.Entities[0].SubmissionStatus;
            reviewStatus = response.Entities[0].ReviewStatus;

            PerformanceAppraisalTemplateService.List({
                Criteria: [[PerformanceAppraisalTemplateRow.Fields.Id], '=', templateId]
            }, tempResponse => {

                if (tempResponse.Entities.length > 0){
                    for (var index in tempResponse.Entities) {
                        const entity = tempResponse.Entities[index];
                        templateName = entity.TemplateName;
                        // console.log("Template name from template db: ", templateName);
                    }
                }

                const targetIds = [];
                $('input[name="TargetList"]:checked').each((index, checkbox) => {
                    const targetId = $(checkbox).val() || '';
                    targetIds.push(targetId);
                    formData.push({
                        TemplateID: templateId,
                        TemplateName: templateName,
                        EmployeeRowID: targetId,
                        TypeID: appraisalTypeId,
                        StartDate: startDate,
                        EndDate: endDate,
                        EvaluateStartDate: reviewStartDate,
                        EvaluateEndDate: reviewEndDate,
                        ApprovalStartDate: approvalStartDate,
                        ApprovalEndDate: approvalEndDate,
                        SubmissionStatus: submissionStatus,
                        ReviewStatus: reviewStatus
                    });
                });

                console.log("Form data: ", formData);
                

                if (this.validateForm()) {
                    PerformanceAppraisalFormService.List({
                        Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.formID]
                    }).then((response: ListResponse<any>) => {

                        if (response.Entities.length > 0) {
                            formData.forEach(record => {
                                record.Id = this.formID;

                                PerformanceAppraisalFormService.Update({
                                    Entity: record
                                }).then(response => {
                                    console.log("Form updated successfully");

                                    setTimeout(() => {
                                        this.dialogClose();
                                        window.location.reload();
                                    }, 1000);

                                }).catch(error => {
                                    console.error("Error updating form record:", error);
                                });
                            });
                        } else {
                            console.log("No form found with the given ID:", this.formID);
                        }
                    }).catch(error => {
                        console.error("Error retrieving form data:", error);
                    });
                }
            });
        })
    }

    public delData(): void {
        PerformanceAppraisalFormService.List({
            Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.formID]
        }, response => {

            if (response.Entities.length > 0) {
                const formData = response.Entities[0];

                PerformanceAppraisalFormService.Delete({
                    EntityId: formData.Id
                }).then(deleteResponse => {
                    console.log('Deleted PerformanceAppraisalForm successfully:', deleteResponse);
                    
                    PerformanceAppraisalEvaluationService.List({
                        Criteria: [[PerformanceAppraisalEvaluationRow.Fields.FormId], '=', this.formID]
                    }, evaluateResponse => {
                       
                        PerformanceAppraisalEvaluationService.Delete({
                            EntityId: evaluateResponse.Entities[0].Id
                        }).then(deleteResponse => {
                            console.log(`Deleted PerformanceAppraisalEvaluation ID ${evaluateResponse.Entities[0].Id} successfully.`, deleteResponse);

                            PerformanceAppraisalResponseService.List({
                                Criteria: [[PerformanceAppraisalResponseRow.Fields.FormId], '=', this.formID]
                            }, formResponse => {

                                if (formResponse.Entities.length > 0) {
                                    const deletePromises = [];

                                    for (const responseData of formResponse.Entities) {
                                        const deletePromise = PerformanceAppraisalResponseService.Delete({
                                            EntityId: responseData.Id
                                        }).then(deleteResponse => {
                                            console.log(`Deleted PerformanceAppraisalResponse ID ${responseData.Id} successfully.`, deleteResponse);
                                        }).catch(error => {
                                            console.error(`Error deleting PerformanceAppraisalResponse ID ${responseData.Id}:`, error);
                                        });
                                        deletePromises.push(deletePromise);
                                    }

                                    Promise.all(deletePromises).then(() => {
                                        console.log('All PerformanceAppraisalResponse records have been deleted.');
                                    }).catch(error => {
                                        console.error('Error during batch deletion of PerformanceAppraisalResponse records:', error);
                                    });
                                } else {
                                    console.log('No PerformanceAppraisalResponse found with the given formID');
                                }
                            }).catch(error => {
                                console.error('Error fetching PerformanceAppraisalResponse:', error);
                            });
                        }).catch(error => {
                            console.error(`Error deleting PerformanceAppraisalEvaluation ID ${evaluateResponse.Entities[0].Id}:`, error);
                        });
                        
                        
                        
                    });
                    
                }).catch(error => {
                    console.error('Error deleting PerformanceAppraisalForm:', error);
                });
                
            } else {
                console.log('No PerformanceAppraisalForm found with the given formID');
            }
        }).catch(error => {
            console.error('Error fetching PerformanceAppraisalForm:', error);
        });

        setTimeout(() => {
            this.dialogClose();
            window.location.reload();
        }, 1000);
    }

    public validateNewForm(): boolean {
        let isValid = true;
        let hasError = false;

        const templateId = $('#TemplateId').val() || '';
        if (this.isEmptyOrNull(templateId)) {
            isValid = false;
            hasError = true;
            $('#TemplateId').addClass('error');
        } else {
            $('#TemplateId').removeClass('error');
        }

        const appraisalTypeId = $('#AppraisalTypeId').val()?.toString() || '';
        if (this.isEmptyOrNull(appraisalTypeId)) {
            isValid = false;
            hasError = true;
            $('#AppraisalTypeId').addClass('error');
        } else {
            $('#AppraisalTypeId').removeClass('error');
        }

        const selectedTargets = $('input[name="TargetList"]:checked');
        if (selectedTargets.length === 0) {
            isValid = false;
            hasError = true;
            $('.target-list-container').addClass('error');
        } else {
            $('.target-list-container').removeClass('error');
        }

        const startDate = $('#StartDate').val()?.toString() || '';
        if (this.isEmptyOrNull(startDate)) {
            isValid = false;
            hasError = true;
            $('#StartDate').addClass('error');
        } else {
            $('#StartDate').removeClass('error');
        }

        const reviewStartDate = $('#ReviewStartDate').val()?.toString() || '';
        if (this.isEmptyOrNull(startDate)) {
            isValid = false;
            hasError = true;
            $('#ReviewStartDate').addClass('error');
        } else {
            $('#ReviewStartDate').removeClass('error');
        }

        const approvalStartDate = $('#ApprovalStartDate').val()?.toString() || '';
        if (this.isEmptyOrNull(startDate)) {
            isValid = false;
            hasError = true;
            $('#ApprovalStartDate').addClass('error');
        } else {
            $('#ApprovalStartDate').removeClass('error');
        }

        if (hasError) {
            alertDialog("Please fill in all required fields.");
            return;
        }

        return isValid;
    }

    public validateForm(): boolean {
        let isValid = true;
        let hasError = false;

        const templateId = $('#TemplateId').val() || '';
        if (this.isEmptyOrNull(templateId)) {
            isValid = false;
            hasError = true;
            $('#TemplateId').addClass('error');
        } else {
            $('#TemplateId').removeClass('error');
        }

        const appraisalTypeId = $('#AppraisalTypeId').val()?.toString() || '';
        if (this.isEmptyOrNull(appraisalTypeId)) {
            isValid = false;
            hasError = true;
            $('#AppraisalTypeId').addClass('error');
        } else {
            $('#AppraisalTypeId').removeClass('error');
        }

        const selectedTargets = $('input[name="TargetList"]:checked');
        if (selectedTargets.length === 0) {
            isValid = false;
            hasError = true;
            $('.target-list-container').addClass('error');
        } else {
            $('.target-list-container').removeClass('error');
        }

        const startDate = $('#StartDate').val()?.toString() || '';
        if (this.isEmptyOrNull(startDate)) {
            isValid = false;
            hasError = true;
            $('#StartDate').addClass('error');
        } else {
            $('#StartDate').removeClass('error');
        }

        const endDate = $('#EndDate').val()?.toString() || '';
        if (this.isEmptyOrNull(endDate)) {
            isValid = false;
            hasError = true;
            $('#EndDate').addClass('error');
        } else {
            $('#EndDate').removeClass('error');
        }

        const reviewStartDate = $('#ReviewStartDate').val()?.toString() || '';
        if (this.isEmptyOrNull(startDate)) {
            isValid = false;
            hasError = true;
            $('#ReviewStartDate').addClass('error');
        } else {
            $('#ReviewStartDate').removeClass('error');
        }

        const reviewEndDate = $('#ReviewEndDate').val()?.toString() || '';
        if (this.isEmptyOrNull(endDate)) {
            isValid = false;
            hasError = true;
            $('#ReviewEndDate').addClass('error');
        } else {
            $('#ReviewEndDate').removeClass('error');
        }

        const approvalStartDate = $('#ApprovalStartDate').val()?.toString() || '';
        if (this.isEmptyOrNull(startDate)) {
            isValid = false;
            hasError = true;
            $('#ApprovalStartDate').addClass('error');
        } else {
            $('#ApprovalStartDate').removeClass('error');
        }

        const approvalEndDate = $('#ApprovalEndDate').val()?.toString() || '';
        if (this.isEmptyOrNull(endDate)) {
            isValid = false;
            hasError = true;
            $('#ApprovalEndDate').addClass('error');
        } else {
            $('#ApprovalEndDate').removeClass('error');
        }

        if (hasError) {
            alertDialog("Please fill in all required fields.");
            return;
        }

        return isValid;
    }

}