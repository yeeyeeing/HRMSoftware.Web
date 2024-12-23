import {Decorators, EntityDialog, ListResponse} from '@serenity-is/corelib';
import {
    PerformanceAppraisalTemplateForm,
    PerformanceAppraisalTemplateRow,
    PerformanceAppraisalTemplateService,
    PerformanceAppraisalQuestionService,
    PerformanceAppraisalFormRow,
    PerformanceAppraisalTemplateQuestionService,
    PerformanceAppraisalTemplateQuestionRow,
    PerformanceAppraisalFormService,
    PerformanceAppraisalTemplateDepartmentService,
    PerformanceAppraisalTemplateDepartmentRow
} from '../../../ServerTypes/PerformanceAppraisal';
import { DepartmentService } from "@/ServerTypes/OrganisationHierarchy/DepartmentService";
import { DepartmentRow } from "@/ServerTypes/OrganisationHierarchy/DepartmentRow";
import { confirm, alertDialog } from '@serenity-is/corelib/q';

// @Decorators.panel()
@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTemplateDialog')
export class PerformanceAppraisalTemplateDialog extends EntityDialog<PerformanceAppraisalTemplateRow, any> {
    protected getFormKey() { return PerformanceAppraisalTemplateForm.formKey; }
    protected getRowDefinition() { return PerformanceAppraisalTemplateRow; }
    protected getService() { return PerformanceAppraisalTemplateService.baseUrl; }

    protected form = new PerformanceAppraisalTemplateForm(this.idPrefix);

    templateID: number;

    public getID(templateID: number): void {
        this.templateID = templateID;
    }

    protected onDialogOpen() {
        super.onDialogOpen();

        // this.element.closest('.ui-dialog').find('.ui-dialog-titlebar').remove();
        this.element.closest(".ui-dialog").css("top", "1%");

        const container = $('<div id="form-container"></div>').appendTo(this.element);

        const departmentId: number[] = [];
        const departmentName: string[] = [];
        const questionId: number[] = [];
        const questionText: string[] = [];
        const answerTypeId: number[] = [];
        const answerType: string[] = [];

        DepartmentService.List({}, departmentResponse => {
            for (let index in departmentResponse.Entities) {
                const depart = departmentResponse.Entities[index];

                departmentId.push(depart.Id);
                departmentName.push(depart.Name);
            }

            PerformanceAppraisalQuestionService.List({}, questionResponse => {
                for (let index in questionResponse.Entities) {
                    const quest = questionResponse.Entities[index];

                    questionId.push(quest.Id);
                    questionText.push(quest.Questions);
                    answerTypeId.push(quest.AnswerType);
                    if (quest.AnswerType === 2){
                        answerType.push("text");
                    }else if (quest.AnswerType === 3){
                        answerType.push("rating");
                    }
                }
                this.displayTemplateForm(container, departmentId, departmentName, questionId, questionText, answerTypeId, answerType);
            })
        })
        this.applyChangesButton.remove();
        this.saveAndCloseButton.remove();
        this.deleteButton.remove();
    }

    public displayTemplateForm(TemplateFormContainer: JQuery, departmentId: number[], departmentName: string[],
                               questionId: number[], questionText: string[], answerTypeId: number[], answerType: string[]){

        TemplateFormContainer.empty();

        if (questionId.length > 0 && questionText.length > 0) {
            PerformanceAppraisalTemplateService.List({
                Criteria: [[PerformanceAppraisalTemplateRow.Fields.Id], '=', this.templateID]
            }, response => {

                if (response.Entities.length === 0) {
                    // console.log("New template...");
                    const TemplateHtml = `
                        <div class="field-row" style="display: flex;">
                            <div class="field-column" style="display: flex; flex-direction: column; width: 30%;">
                                <div class="field">
                                    <label class="field-label">Duration (week):</label>
                                    <select id="DurationSelect" class="field-input">
                                        <option value="" disabled selected>Select duration...</option>
                                        <!-- Options from 1 to 10 -->
                                        <option value="1" style="text-align: center;">1</option>
                                        <option value="2" style="text-align: center;">2</option>
                                        <option value="3" style="text-align: center;">3</option>
                                        <option value="4" style="text-align: center;">4</option>
                                        <option value="5" style="text-align: center;">5</option>
                                        <option value="6" style="text-align: center;">6</option>
                                        <option value="7" style="text-align: center;">7</option>
                                        <option value="8" style="text-align: center;">8</option>
                                        <option value="9" style="text-align: center;">9</option>
                                        <option value="10" style="text-align: center;">10</option>
                                    </select>
                                </div>
                                <div class="field">
                                    <label class="field-label">Department:</label>
                                    <div class="field-box">
                                        <div class="search-depart-container">
                                            <div class="close-depart-inline">
                                                <input type="text" id="DepartSearch" class="search-depart-box" placeholder="Search department...">
                                                <span id="clearDepartSearch" class="clear-depart-icon fa fa-times"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="selectAll_depart" name="selectAll_depart" checked>
                                            <label for="selectAll_depart" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                        </div>
                                        <div class="depart-list-container">
                                            ${departmentId.map((id, i) => `
                                                <div class="depart-checkbox-group">
                                                    <input type="checkbox" id="department_${id}" name="departments" value="${id}">
                                                    <label for="department_${id}">${departmentName[i]}</label>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                   
                            <div class="field-column" style="display: flex; flex-direction: column; width: 70%">
                                <div class="field">
                                    <label class="field-label">Rating Customize:</label>
                                    <select id="RatingCustomize" class="Rating-customize">
                                        <option value="" disabled selected>Select number of scale...</option>
                                        <!-- Options from 1 to 10 -->
                                        <option value="1" style="text-align: center;">1</option>
                                        <option value="2" style="text-align: center;">2</option>
                                        <option value="3" style="text-align: center;">3</option>
                                        <option value="4" style="text-align: center;">4</option>
                                        <option value="5" style="text-align: center;">5</option>
                                        <option value="6" style="text-align: center;">6</option>
                                    </select>
                                </div>
                                <div class="field">
                                    <label for="QuestionList" class="field-label">Questions:</label>
                                    <div class="field-box">
                                        <div class="search-container">
                                            <div class="close-inline">
                                                <input type="text" id="QuestionSearch" class="search-box" placeholder="Search question...">
                                                <span id="clearQuestionSearch" class="clear-icon fa fa-times"></span>
                                            </div>
                                            <div class="filter-close-inline">
                                                <select id="FilterAnswerType" class="field-select-filter">
                                                    <option value="">Filter</option>
                                                    <option value="text">text</option>
                                                    <option value="rating">rating</option>
                                                </select>
                                                <span id="clearFilter" class="filter-clear-icon fa fa-times"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="selectAll" name="selectAll" checked>
                                            <label for="selectAll" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                        </div>
                                        <div class="question-list-container">
                                            ${questionId.map((id, i) => `
                                                <div class="question-list">
                                                    <input type="checkbox" id="Question_${id}" name="QuestionList" value="${id}" checked>
                                                    <label for="Question_${id}">${questionText[i]}</label>
                                                    <label class="answer-type">${answerType[i]}</label>
                                                    <hr style="color: #222222;">
                                                </div>`).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    const buttonContainer = $('<div></div>').prependTo(this.element);
                    const saveButton = $('<button><i class="fa fa-save"></i> Save</button>').appendTo(buttonContainer);

                    buttonContainer.css({
                        'display': 'inline-block'
                    });
                    saveButton.css({
                        'position': 'relative',
                        'border': '1px solid #b1b1b1',
                        'background-color': 'white',
                        'padding': '5px 9px',
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

                    $(TemplateHtml).appendTo(TemplateFormContainer);

                    this.applyStyles(TemplateFormContainer);
                    this.addSelectAllFunctionality('#selectAll', '.question-list-container input[type="checkbox"]');
                    this.addSelectAllFunctionality('#selectAll_depart', '.depart-list-container input[type="checkbox"]');
                    this.addSearchFunctionality('#QuestionSearch','#clearQuestionSearch', '.question-list-container input[type="checkbox"]', questionText);
                    this.addSearchFunctionality('#DepartSearch','#clearDepartSearch', '.depart-list-container input[type="checkbox"]', departmentName);
                    this.addFilterFunctionality('#FilterAnswerType', '.question-list-container div', answerType);
                }else {
                    // console.log("Update Template...");
                    const templateData = response.Entities[0];
                    
                    PerformanceAppraisalTemplateDepartmentService.List({
                        Criteria:[[PerformanceAppraisalTemplateDepartmentRow.Fields.TemplateId], '=', this.templateID]
                    }, tempDepartResponse => {

                        PerformanceAppraisalTemplateQuestionService.List({
                            Criteria: [[PerformanceAppraisalTemplateQuestionRow.Fields.TemplateId], '=', this.templateID]
                        }, templateQuestResponse => {

                            const templateDepart: number[] = [];
                            for (const depart of tempDepartResponse.Entities) {
                                templateDepart.push(depart.DepartmentId);
                            }

                            const templateQuest: number[] = [];
                            for (const quests of templateQuestResponse.Entities) {
                                templateQuest.push(quests.QuestionId);
                            }

                            const departID = templateDepart || [];
                            const questID = templateQuest || [];
                            const durationData = templateData.Duration || '';
                            const ratingData = templateData.RatingScale || '';

                            const TemplateHtml = `
                                <div class="field-row" style="display: flex;">
                                    <div class="field-column" style="display: flex; flex-direction: column; width: 30%">
                                        <div class="field">
                                            <label class="field-label">Duration (week):</label>
                                            <select id="DurationSelect" class="field-input">
                                                <option value="" disabled ${durationData === '' ? 'selected' : ''}>Select duration...</option>
                                                <!-- Options from 1 to 10 -->
                                                <option value="1" style="text-align: center;" ${durationData === 1 ? 'selected' : ''}>1</option>
                                                <option value="2" style="text-align: center;" ${durationData === 2 ? 'selected' : ''}>2</option>
                                                <option value="3" style="text-align: center;" ${durationData === 3 ? 'selected' : ''}>3</option>
                                                <option value="4" style="text-align: center;" ${durationData === 4 ? 'selected' : ''}>4</option>
                                                <option value="5" style="text-align: center;" ${durationData === 5 ? 'selected' : ''}>5</option>
                                                <option value="6" style="text-align: center;" ${durationData === 6 ? 'selected' : ''}>6</option>
                                                <option value="7" style="text-align: center;" ${durationData === 7 ? 'selected' : ''}>7</option>
                                                <option value="8" style="text-align: center;" ${durationData === 8 ? 'selected' : ''}>8</option>
                                                <option value="9" style="text-align: center;" ${durationData === 9 ? 'selected' : ''}>9</option>
                                                <option value="10" style="text-align: center;" ${durationData === 10 ? 'selected' : ''}>10</option>
                                            </select>
                                        </div>
                                        <div class="field">
                                            <label class="field-label">Department:</label>
                                            <div class="field-box">
                                                <div class="search-depart-container">
                                                    <div class="close-depart-inline">
                                                        <input type="text" id="DepartSearch" class="search-depart-box" placeholder="Search department...">
                                                        <span id="clearDepartSearch" class="clear-depart-icon fa fa-times"></span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <input type="checkbox" id="selectAll_depart" name="selectAll_depart" checked>
                                                    <label for="selectAll_depart" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                                </div>
                                                <div class="depart-list-container">
                                                    ${departmentId.map((id, i) => `
                                                        <div class="depart-checkbox-group">
                                                            <input type="checkbox" id="department_${id}" name="departments" value="${id}" ${departID.includes(id) ? 'checked' : ''}>
                                                            <label for="department_${id}">${departmentName[i]}</label>
                                                        </div>
                                                    `).join('')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        
                                    <div class="field-column" style="display: flex; flex-direction: column; width: 70%;">
                                        <div class="field" style="width: 100%;">
                                            <div class="field-column-row-content" style="width: 35%; margin-right: 5px;">
                                                <label class="field-label">Rating Customize:</label>
                                                <select id="RatingCustomize" class="Rating-customize-row-content">
                                                    <option value="" disabled ${ratingData === '' ? 'selected' : ''}>Select number of scale...</option>
                                                    <option value="1" style="text-align: center;" ${ratingData === 1 ? 'selected' : ''}>1</option>
                                                    <option value="2" style="text-align: center;" ${ratingData === 2 ? 'selected' : ''}>2</option>
                                                    <option value="3" style="text-align: center;" ${ratingData === 3 ? 'selected' : ''}>3</option>
                                                    <option value="4" style="text-align: center;" ${ratingData === 4 ? 'selected' : ''}>4</option>
                                                    <option value="5" style="text-align: center;" ${ratingData === 5 ? 'selected' : ''}>5</option>
                                                    <option value="6" style="text-align: center;" ${ratingData === 6 ? 'selected' : ''}>6</option>
                                                </select>
                                            </div>
                                            <div class="field-column-row-content"style="width: 63%;">
                                                <label class="field-label">Template Name:</label>
                                                <input type="text" id="TemplateName" class="template-name" value="${templateData.TemplateName}">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label for="QuestionList" class="field-label">Questions:</label>
                                            <div class="field-box">
                                                <div class="search-container">
                                                    <div class="close-inline">
                                                        <input type="text" id="QuestionSearch" class="search-box" placeholder="Search question...">
                                                        <span id="clearQuestionSearch" class="clear-icon fa fa-times"></span>
                                                    </div>
                                                    <div class="filter-close-inline">
                                                        <select id="FilterAnswerType" class="field-select-filter">
                                                            <option value="">Filter</option>
                                                            <option value="text">text</option>
                                                            <option value="rating">rating</option>
                                                        </select>
                                                        <span id="clearFilter" class="filter-clear-icon fa fa-times"></span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <input type="checkbox" id="selectAll" name="selectAll" checked>
                                                    <label for="selectAll" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                                </div>
                                                <div class="question-list-container">
                                                    ${questionId.map((id, i) => `
                                                        <div class="question-list">
                                                            <input type="checkbox" id="Question_${id}" name="QuestionList" value="${id}" ${questID.includes(id) ? 'checked' : ''}>
                                                            <label for="Question_${id}">${questionText[i]}</label>
                                                            <label class="answer-type">${answerType[i]}</label>
                                                            <hr style="color: #222222;">
                                                        </div>`).join('')}
                                                </div>
                                            </div>
                                        </div>
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

                            $(TemplateHtml).appendTo(TemplateFormContainer);
                            // const answerTypeArray = ['text', 'rating'];

                            this.applyStyles(TemplateFormContainer);
                            this.addSelectAllFunctionality('#selectAll', '.question-list-container input[type="checkbox"]');
                            this.addSelectAllFunctionality('#selectAll_depart', '.depart-list-container input[type="checkbox"]');
                            this.addSearchFunctionality('#QuestionSearch','#clearQuestionSearch', '.question-list-container input[type="checkbox"]', questionText);
                            this.addSearchFunctionality('#DepartSearch','#clearDepartSearch', '.depart-list-container input[type="checkbox"]', departmentName);
                            this.addFilterFunctionality('#FilterAnswerType', '.question-list-container div', answerType);
                            this.scrollToFirstChecked('.question-list-container input[type="checkbox"]', '.depart-list-container input[type="checkbox"]');
                        })
                    })
                }
            })
        } else if (questionId.length === 0 && questionText.length === 0) {

            PerformanceAppraisalTemplateService.List({
                Criteria: [[PerformanceAppraisalTemplateRow.Fields.Id], '=', this.templateID]
            }, response => {

                const templateData = response.Entities[0];

                if (response.Entities.length > 0){
                    PerformanceAppraisalTemplateDepartmentService.List({
                        Criteria:[[PerformanceAppraisalTemplateDepartmentRow.Fields.TemplateId], '=', this.templateID]
                    }, tempDepartResponse => {

                        const templateDepart: number[] = [];
                        for (const depart of tempDepartResponse.Entities) {
                            templateDepart.push(depart.DepartmentId);
                        }

                        const departID = templateDepart || [];
                        const durationData = response.Entities[0].Duration || '';
                        const ratingData = response[0].RatingScale || '';

                        const TemplateHtml = `
                            <div class="field-row" style="display: flex;">
                                <div class="field-column" style="display: flex; flex-direction: column;">
                                    <div class="field">
                                        <label class="field-label">Duration (week):</label>
                                        <select id="DurationSelect" class="field-input">
                                            <option value="" disabled ${durationData === '' ? 'selected' : ''}>Select duration...</option>
                                            <!-- Options from 1 to 10 -->
                                            <option value="1" style="text-align: center;" ${durationData === 1 ? 'selected' : ''}>1</option>
                                            <option value="2" style="text-align: center;" ${durationData === 2 ? 'selected' : ''}>2</option>
                                            <option value="3" style="text-align: center;" ${durationData === 3 ? 'selected' : ''}>3</option>
                                            <option value="4" style="text-align: center;" ${durationData === 4 ? 'selected' : ''}>4</option>
                                            <option value="5" style="text-align: center;" ${durationData === 5 ? 'selected' : ''}>5</option>
                                            <option value="6" style="text-align: center;" ${durationData === 6 ? 'selected' : ''}>6</option>
                                            <option value="7" style="text-align: center;" ${durationData === 7 ? 'selected' : ''}>7</option>
                                            <option value="8" style="text-align: center;" ${durationData === 8 ? 'selected' : ''}>8</option>
                                            <option value="9" style="text-align: center;" ${durationData === 9 ? 'selected' : ''}>9</option>
                                            <option value="10" style="text-align: center;" ${durationData === 10 ? 'selected' : ''}>10</option>
                                        </select>
                                    </div>
                                    <div class="field">
                                        <label class="field-label">Department:</label>
                                        <div class="field-box">
                                            <div class="search-depart-container">
                                                <div class="close-depart-inline">
                                                    <input type="text" id="DepartSearch" class="search-depart-box" placeholder="Search department...">
                                                    <span id="clearDepartSearch" class="clear-depart-icon fa fa-times"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="selectAll_depart" name="selectAll_depart" checked>
                                                <label for="selectAll_depart" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                            </div>
                                            <div class="depart-list-container">
                                                ${departmentId.map((id, i) => `
                                                    <div class="depart-checkbox-group">
                                                        <input type="checkbox" id="department_${id}" name="departments" value="${id}" ${departID.includes(id) ? 'checked' : ''}>
                                                        <label for="department_${id}">${departmentName[i]}</label>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="field-column" style="display: flex; flex-direction: column; width: 70%;">
                                    <div class="field" style="width: 100%;">
                                        <div class="field-column-row-content" style="width: 40%; margin-right: 5px;">
                                            <label class="field-label">Rating Customize:</label>
                                            <select id="RatingCustomize" class="Rating-customize-row-content">
                                                <select id="RatingCustomize" class="Rating-customize-row-content">
                                                    <option value="" disabled ${ratingData === '' ? 'selected' : ''}>Select number of scale...</option>
                                                    <option value="1" style="text-align: center;" ${ratingData === 1 ? 'selected' : ''}>1</option>
                                                    <option value="2" style="text-align: center;" ${ratingData === 2 ? 'selected' : ''}>2</option>
                                                    <option value="3" style="text-align: center;" ${ratingData === 3 ? 'selected' : ''}>3</option>
                                                    <option value="4" style="text-align: center;" ${ratingData === 4 ? 'selected' : ''}>4</option>
                                                    <option value="5" style="text-align: center;" ${ratingData === 5 ? 'selected' : ''}>5</option>
                                                    <option value="6" style="text-align: center;" ${ratingData === 6 ? 'selected' : ''}>6</option>
                                                </select>
                                        </div>
                                        <div class="field-column-row-content"style="width: 58%;">
                                            <label class="field-label">Template Name:</label>
                                            <input type="text" id="TemplateName" class="template-name" value="${templateData.TemplateName}">
                                        </div>
                                    </div>
                                    <div class="field" >
                                        <label for="QuestionList" class="field-label">Questions:</label>
                                        <div class="field-box">
                                            <div class="search-container">
                                                <div class="close-inline">
                                                    <input type="text" id="QuestionSearch" class="search-box" placeholder="Search question...">
                                                    <span id="clearQuestionSearch" class="clear-icon fa fa-times"></span>
                                                </div>
                                                <div class="filter-close-inline">
                                                    <select id="FilterAnswerType" class="field-select-filter">
                                                        <option value="">Filter</option>
                                                        <option value="text">text</option>
                                                        <option value="rating">rating</option>
                                                    </select>
                                                    <span id="clearFilter" class="filter-clear-icon fa fa-times"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="selectAll" name="selectAll" checked>
                                                <label for="selectAll" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                            </div>
                                            <div class="question-list-container">
                                                <div id="warning-message" class="warning-container">
                                                    <p class="warning-text">No questions found or has been removed.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

                        $(TemplateHtml).appendTo(TemplateFormContainer);

                        this.applyStyles(TemplateFormContainer);
                        this.addSelectAllFunctionality('#selectAll', '.question-list-container input[type="checkbox"]');
                        this.addSelectAllFunctionality('#selectAll_depart', '.depart-list-container input[type="checkbox"]');
                        this.addSearchFunctionality('#QuestionSearch','#clearQuestionSearch', '.question-list-container input[type="checkbox"]', questionText);
                        this.addSearchFunctionality('#DepartSearch','#clearDepartSearch', '.depart-list-container input[type="checkbox"]', departmentName);
                        this.addFilterFunctionality('#FilterAnswerType', '.question-list-container div', answerType);
                        this.scrollToFirstChecked('.question-list-container input[type="checkbox"]', '.depart-list-container input[type="checkbox"]');

                    });

                } else {

                    const templateData = response.Entities[0];

                    PerformanceAppraisalTemplateDepartmentService.List({
                        Criteria:[[PerformanceAppraisalTemplateDepartmentRow.Fields.TemplateId], '=', this.templateID]
                    }, tempDepartResponse => {
                        const templateDepart: number[] = [];
                        for (const depart of tempDepartResponse.Entities) {
                            templateDepart.push(depart.DepartmentId);
                        }

                        const departID = templateDepart || [];
                        const ratingData = templateData.RatingScale || [];

                        const TemplateHtml = `
                            <div class="field-row" style="display: flex;">
                                <div class="field-column" style="display: flex; flex-direction: column;">
                                    <div class="field">
                                        <label class="field-label">Duration (week):</label>
                                        <select id="DurationSelect" class="field-input">
                                            <option value="" disabled selected>Select duration...</option>
                                            <!-- Options from 1 to 10 -->
                                            <option value="1" style="text-align: center;">1</option>
                                            <option value="2" style="text-align: center;">2</option>
                                            <option value="3" style="text-align: center;">3</option>
                                            <option value="4" style="text-align: center;">4</option>
                                            <option value="5" style="text-align: center;">5</option>
                                            <option value="6" style="text-align: center;">6</option>
                                            <option value="7" style="text-align: center;">7</option>
                                            <option value="8" style="text-align: center;">8</option>
                                            <option value="9" style="text-align: center;">9</option>
                                            <option value="10" style="text-align: center;">10</option>
                                        </select>
                                    </div>
                                    <div class="field">
                                        <label class="field-label">Department:</label>
                                        <div class="field-box">
                                            <div class="search-depart-container">
                                                <div class="close-depart-inline">
                                                    <input type="text" id="DepartSearch" class="search-depart-box" placeholder="Search department...">
                                                    <span id="clearDepartSearch" class="clear-depart-icon fa fa-times"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="selectAll_depart" name="selectAll_depart" checked>
                                                <label for="selectAll_depart" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                            </div>
                                            <div class="depart-list-container">
                                                ${departmentId.map((id, i) => `
                                                    <div class="depart-checkbox-group">
                                                        <input type="checkbox" id="department_${id}" name="departments" value="${id}" ${departID.includes(id) ? 'checked' : ''}>
                                                        <label for="department_${id}">${departmentName[i]}</label>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="field-column" style="display: flex; flex-direction: column; width: 70%">
                                    <div class="field">
                                        <label class="field-label">Rating Customize:</label>
                                        <select id="RatingCustomize" class="Rating-customize">
                                            <select id="RatingCustomize" class="Rating-customize-row-content">
                                                <option value="" disabled ${ratingData === '' ? 'selected' : ''}>Select number of scale...</option>
                                                <!-- Options from 1 to 10 -->
                                                <option value="1" style="text-align: center;" ${ratingData === 1 ? 'selected' : ''}>1</option>
                                                <option value="2" style="text-align: center;" ${ratingData === 2 ? 'selected' : ''}>2</option>
                                                <option value="3" style="text-align: center;" ${ratingData === 3 ? 'selected' : ''}>3</option>
                                                <option value="4" style="text-align: center;" ${ratingData === 4 ? 'selected' : ''}>4</option>
                                                <option value="5" style="text-align: center;" ${ratingData === 5 ? 'selected' : ''}>5</option>
                                                <option value="6" style="text-align: center;" ${ratingData === 6 ? 'selected' : ''}>6</option>
                                            </select>
                                        </select>
                                    </div>
                                    <div class="field">
                                        <label for="QuestionList" class="field-label">Questions:</label>
                                        <div class="field-box">
                                            <div class="search-container">
                                                <div class="close-inline">
                                                    <input type="text" id="QuestionSearch" class="search-box" placeholder="Search question...">
                                                    <span id="clearQuestionSearch" class="clear-icon fa fa-times"></span>
                                                </div>
                                                <div class="filter-close-inline">
                                                    <select id="FilterAnswerType" class="field-select-filter">
                                                        <option value="">Filter</option>
                                                        <option value="text">text</option>
                                                        <option value="rating">rating</option>
                                                    </select>
                                                    <span id="clearFilter" class="filter-clear-icon fa fa-times"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <input type="checkbox" id="selectAll" name="selectAll" checked>
                                                <label for="selectAll" style="font-weight: bold; padding-bottom: 20px;">Select All</label>
                                            </div>
                                            <div class="question-list-container">
                                                <div id="warning-message" class="warning-container">
                                                    <p class="warning-text">No questions found or has been removed.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                       `;

                        const buttonContainer = $('<div></div>').prependTo(this.element);
                        const saveButton = $('<button><i class="fa fa-save"></i> Save</button>').appendTo(buttonContainer);

                        buttonContainer.css({
                            'display': 'inline-block'
                        });
                        saveButton.css({
                            'position': 'relative',
                            'border': '1px solid #b1b1b1',
                            'background-color': 'white',
                            'padding': '5px 9px',
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

                        $(TemplateHtml).appendTo(TemplateFormContainer);

                        this.applyStyles(TemplateFormContainer);
                        this.addSelectAllFunctionality('#selectAll', '.question-list-container input[type="checkbox"]');
                        this.addSelectAllFunctionality('#selectAll_depart', '.depart-list-container input[type="checkbox"]');
                        this.addSearchFunctionality('#QuestionSearch','#clearQuestionSearch', '.question-list-container input[type="checkbox"]', questionText);
                        this.addSearchFunctionality('#DepartSearch','#clearDepartSearch', '.depart-list-container input[type="checkbox"]', departmentName);
                        this.addFilterFunctionality('#FilterAnswerType', '.question-list-container div', answerType);
                        this.scrollToFirstChecked('.question-list-container input[type="checkbox"]', '.depart-list-container input[type="checkbox"]');
                    });
                }
            });
        }
    }

    public applyStyles(container: JQuery): void {
        container.find('.warning-container').css({
            'border': '1px solid #ffcc00',
            'background-color': '#fff3cd',
            'color': '#856404',
            'padding': '15px',
            'margin': '5px auto',
            'margin-bottom': '40px',
            'border-radius': '5px',
            'font-family': 'Arial, sans-serif',
            'font-size': '16px',
            'text-align': 'center',
            'width': '60%',
            'box-sizing': 'border-box'
        });
        container.find('.warning-text').css({
            'text-align': 'center',
            'margin': '5px auto'
        });
        container.find('.field').css({
            'border-radius': '5px',
            'box-sizing': 'border-box',
            'display': 'inline-block',
            'vertical-align': 'top'
        });
        container.find('.field-column-row').css({
            'display': 'flex',
            'justify-content': 'space-between',
            'margin-bottom': '10px',
            'width': '100%',
            'margin-top': '1%',
            'margin-left': '2%'
        });
        container.find('.field-column-row-content').css({
            'border-radius': '5px',
            'box-sizing': 'border-box',
            'display': 'inline-block',
            'vertical-align': 'top'
        });
        container.find('.Rating-customize-row-content').css({
            'height': '40px',
            'width': '95%'
        });
        container.find('.field-label').css({
            'font-weight': 'bold',
            'color': '#000000',
            'margin-bottom': '10px',
            'display': 'block'
        });
        container.find('.field-select').css({
            'width': '30%',
            'padding': '8px',
            'border': '1px solid #ccc',
            'border-radius': '4px',
            'font-size': '14px',
            'box-sizing': 'border-box'
        });
        container.find('.field-row').css({
            'display': 'flex',
            'justify-content': 'space-between',
            'margin-bottom': '20px',
            'width': '100%'
        });
        container.find('.column-field-row').css({
            'display': 'flex',
            'flex-direction': 'row',
            'justify-content': 'space-between',
            'width': '100%'
        });
        container.find('.date-field-row').css({
            'display': 'flex',
            'justify-content': 'space-between',
            'padding-bottom': '70px',
            'width': '100%'
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
        container.find('.template-name').css({
            'width': '100%', // Full width of the parent container
            'padding': '8px 8px 8px 8px', // Add padding-right to make room for the clear icon inside the search box
            'border': '1px solid #ccc',
            'border-radius': '4px',
            'font-size': '14px',
            'box-sizing': 'border-box',
            'height': '40px',
        });
        container.find('.close-inline').css({
            'position': 'relative',
            'display': 'inline-block',
            'width': '80%', // Adjust width to allow the search box and icon to fit properly
        });
        container.find('.close-depart-inline').css({
            'position': 'relative',
            'display': 'inline-block',
            'width': '100%'
        });
        container.find('.field-input').css({
            'height': '40px',
            'width': '100%'
        });
        container.find('.Rating-customize').css({
            'height': '40px',
            'width': '40%'
        });
        container.find('.search-box').css({
            'width': '100%', // Full width of the parent container
            'padding': '8px 30px 8px 8px', // Add padding-right to make room for the clear icon inside the search box
            'border': '1px solid #ccc',
            'border-radius': '4px',
            'font-size': '14px',
            'margin-bottom': '10px',
            'box-sizing': 'border-box'
        });
        container.find('.search-depart-box').css({
            'width': '100%', // Full width of the parent container
            'padding': '8px 30px 8px 8px', // Add padding-right to make room for the clear icon inside the search box
            'border': '1px solid #ccc',
            'border-radius': '4px',
            'font-size': '14px',
            'margin-bottom': '10px',
            'box-sizing': 'border-box'
        });
        container.find('.clear-icon').css({
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
        container.find('.clear-depart-icon').css({
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
        container.find('.filter-close-inline').css({
            'position': 'relative',
            'display': 'inline-block',
            'width': '18%', // Ensure the width is sufficient for both the select box and the clear icon
        });
        container.find('.field-select-filter').css({
            'width': '100%', // Adjust width to account for the clear icon
            'padding': '8px',
            'border': '1px solid #ccc',
            'border-radius': '4px',
            'font-size': '14px',
            'margin-bottom': '10px',
            'box-sizing': 'border-box', // Ensure padding doesn't affect the total width
        });
        container.find('.filter-clear-icon').css({
            'position': 'absolute',
            'right': '20px', // Position to the right inside the search box
            'top': '25%',
            // 'transform': 'translateY(-50%)',
            'cursor': 'pointer',
            'font-size': '16px',
            'color': 'red', // Set the color to red
            'z-index': '1' // Ensure the icon is above the search box content
        });
        container.find('.question-list-container').css({
            'flex-grow': '1', // Allow the list container to take up the remaining space
            'height': '300px',
            'overflow-y': 'auto' // Allow scrolling only within the list container
        });
        container.find('.answer-type').css({
            'width': '100px',
            'text-align': 'right',
            'flex-shrink': '0',
            'margin-right': '10px'
        });
        container.find('.column-header').css({
            'width': '100px', // Adjust width as needed
            'text-align': 'right',
            'flex-shrink': '0',
            'margin-right': '10px'
        })
        container.find('.question-list-container div').css({
            'display': 'flex',
            'align-items': 'flex-start',
            'margin-bottom': '10px'
        });
        container.find('input[type="checkbox"]').css({
            'margin-right': '10px',
            'flex-shrink': '0',
            'align-self': 'flex-start', // Align the checkbox to the top
            'width': '20px',
            'height': '20px'
        });
        container.find('.field-box label').css({
            'word-wrap': 'break-word', // Allow text to wrap within the label
            'white-space': 'normal', // Ensure that text wraps normally
            'flex-grow': '1' // Allow label to take up remaining space
        });
        container.find('.depart-list-container').css({
            'flex-grow': '1',
            'height': '300px', // Set height for scrolling
            'overflow-y': 'auto'
        });
        container.find('.checkbox-group').css({
            'display': 'flex',
            'align-items': 'center',
            'box-sizing': 'border-box'
        });
        container.find('.depart-checkbox-group').css({
            'display': 'flex',
            'align-items': 'center',
            'box-sizing': 'border-box'
        });
        container.find('.checkbox-group input[type="checkbox"]').css({
            'margin-right': '8px',
            'width': '20px',
            'height': '20px'
        });
        container.find('.depart-checkbox-group input[type="checkbox"]').css({
            'margin-right': '8px',
            'margin-bottom': '20px',
            'width': '20px',
            'height': '20px'
        });
        container.find('.checkbox-group label').css({
            'font-size': '14px',
            'color': '#333'
        });

    }

    private scrollToFirstChecked(QuestionlistItemSelector: string, DepartlistItemSelector: string) {
        const questCheckedItems = this.element.find(`${QuestionlistItemSelector}:checked`);
        const departCheckedItems = this.element.find(`${DepartlistItemSelector}:checked`);

        if (departCheckedItems.length > 0) {
            departCheckedItems[0].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }

        if (questCheckedItems.length > 0) {
            setTimeout(() => {
                questCheckedItems[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 800);
        }
    }

    public addSearchFunctionality(searchBoxSelector: string, clearButtonSelector: string, listItemSelector: string, itemList: string[]): void {
        const searchBox = $(searchBoxSelector);
        const clearButton = $(clearButtonSelector);

        function updateClearButton() {
            if (searchBox.val()) {
                clearButton.show();
            } else {
                clearButton.hide();
            }
        }

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

    public addFilterFunctionality(filterSelector: string, listItemSelector: string, answerTypeList: string[]): void {
        const filterSelect = $(filterSelector);
        const clearButton = $('#clearFilter');

        // Function to show or hide the clear button
        function updateClearButton() {
            if (filterSelect.val()) {
                clearButton.show();
            } else {
                clearButton.hide();
            }
        }

        // Handle filter change event
        $(filterSelect).on('change', function () {
            const selectedFilter = $(this).val()?.toString().toLowerCase() || '';

            $(listItemSelector).each(function (index) {
                const element = $(this).closest('div');
                const answerType = answerTypeList[index] ? answerTypeList[index].toLowerCase() : '';

                if (selectedFilter === '' || answerType === selectedFilter) {
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

    private fetchDepartmentNames(departIds: string[]): Promise<string[]> {

        const promises = departIds.map(id =>
            DepartmentService.List({
                Criteria: [[DepartmentRow.Fields.Id], '=', id]
            }).then(departResponse => {
                if (departResponse.Entities.length > 0) {
                    return departResponse.Entities[0].Name;
                } else {
                    return '';
                }
            }).catch(error => {
                console.error("Error fetching department:", error);
                return '';
            })
        );

        return Promise.all(promises);
    }

    public isEmptyOrNull(value: any): boolean {
        return value === null || value === undefined || value === '';
    }

    public saveData(): void {
        const templateData = [];

        if (this.validateForm()) {

            const duration = $('#DurationSelect').val() || '';
            const rating = $('#RatingCustomize').val() || '';

            const departIds = [];
            $('input[name="departments"]:checked').each((index, checkbox) => {
                const departId = $(checkbox).val() || '';
                departIds.push(departId);
            });

            const questIds = [];
            $('input[name="QuestionList"]:checked').each((index, checkbox) => {
                const questId = $(checkbox).val() || '';
                questIds.push(questId);
            });

            function formatDate(dateString: string): string {
                const date = new Date(dateString);
                const day = String(date.getDate()).padStart(2, '0');
                const monthNames = [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ];
                const month = monthNames[date.getMonth()];
                const year = date.getFullYear();
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
            }

            const currentDateTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' });
            const formattedDateTime = formatDate(currentDateTime);

            this.fetchDepartmentNames(departIds).then(departmentNamesList => {
                const departmentNamesString = departmentNamesList.filter(name => name).join(' '); // Join with '_' and filter out empty names
                const templateName = `Template (${departmentNamesString}) ${formattedDateTime}`;

                templateData.push({
                    TemplateName: templateName,
                    Duration: duration,
                    RatingScale: rating
                });

                if (this.isNew()) {
                    PerformanceAppraisalTemplateService.Create({
                        Entity: templateData[0]
                    }).then(templateResponse => {
                        const newTemplateId = templateResponse.EntityId;
                        departIds.forEach(departId => {
                            PerformanceAppraisalTemplateDepartmentService.Create({
                                Entity: {
                                    TemplateId: newTemplateId,
                                    DepartmentId: departId
                                }
                            }).then(tempDepartResponse => {
                                console.log("Template Department saved...");
                            }).catch(error => {
                                console.error("Error saving template department:", error);
                            });
                        });
                        questIds.forEach(questId => {
                            PerformanceAppraisalTemplateQuestionService.Create({
                                Entity: {
                                    TemplateId: newTemplateId,
                                    QuestionId: questId
                                }
                            }).then(tempQuestResponse => {
                                console.log("Template Question saved...");

                                setTimeout(() => {
                                    this.dialogClose();
                                    window.location.reload();
                                }, 1000);
                            }).catch(error => {
                                console.error("Error saving template question:", error);
                            });
                        });
                    })
                }
            });
        }
    }

    public updateData(): void {
        const templateData = [];

        if (this.validateForm()) {
            const duration = $('#DurationSelect').val() || '';
            const templateName = $('#TemplateName').val() || '';
            const rating = $('#RatingCustomize').val() || '';

            const departIds = [];
            $('input[name="departments"]:checked').each((index, checkbox) => {
                const departId = $(checkbox).val() || '';
                departIds.push(departId);
            });

            const questIds = [];
            $('input[name="QuestionList"]:checked').each((index, checkbox) => {
                const questId = $(checkbox).val() || '';
                questIds.push(questId);
            });

            templateData.push({
                TemplateName: templateName,
                Duration: duration,
                RatingScale: rating
            });

            PerformanceAppraisalTemplateService.List({
                Criteria: [[PerformanceAppraisalTemplateRow.Fields.Id], '=', this.templateID]
            }).then((response: ListResponse<any>) => {

                if (response.Entities.length > 0) {
                    templateData[0].Id = this.templateID;

                    PerformanceAppraisalTemplateService.Update({
                        Entity: templateData[0]
                    }).then(templateResponse => {
                        
                        PerformanceAppraisalTemplateDepartmentService.List({
                            Criteria: [[PerformanceAppraisalTemplateDepartmentRow.Fields.TemplateId], '=', this.templateID]
                        }).then((tempDepartResponse: ListResponse<any>) => {

                            tempDepartResponse.Entities.forEach((existingTempDepart, index) => {
                                const tempDepartment = departIds[index];

                                if (tempDepartment) {
                                    PerformanceAppraisalTemplateDepartmentService.Update({
                                        Entity: {
                                            Id: existingTempDepart.Id,
                                            TemplateId: this.templateID,
                                            DepartmentId: tempDepartment
                                        }
                                    }).then(templateDepartmentUpdateResponse => {
                                        console.log("Template Department updated ...", templateDepartmentUpdateResponse);
                                    }).catch(error => {
                                        console.error("Error updating template department:", error);
                                    });

                                } else {
                                    PerformanceAppraisalTemplateDepartmentService.Delete({
                                        EntityId: existingTempDepart.Id
                                    }).then(() => {
                                        console.log("Template Department deleted ...");
                                    }).catch(error => {
                                        console.error("Error deleting template department:", error);
                                    });
                                }
                            })

                            for (let i = tempDepartResponse.Entities.length; i < departIds.length; i++) {
                                const templateDepart = departIds[i];
                                PerformanceAppraisalTemplateDepartmentService.Create({
                                    Entity: {
                                        TemplateId: this.templateID,
                                        DepartmentId: templateDepart
                                    }
                                }).then(templateDepartmentCreateResponse => {
                                    console.log("New template department ...", templateDepartmentCreateResponse);
                                }).catch(error => {
                                    console.error("Error creating new template department:", error);
                                });
                            }
                        }).catch(error => {
                            console.error("Error retrieving template department data:", error);
                        });

                        PerformanceAppraisalTemplateQuestionService.List({
                            Criteria: [[PerformanceAppraisalTemplateQuestionRow.Fields.TemplateId], '=', this.templateID]
                        }).then((tempQuestResponse: ListResponse<any>) => {

                            tempQuestResponse.Entities.forEach((existingTempQuest, index) => {
                                const tempQuestion = questIds[index];

                                if (tempQuestion) {
                                    PerformanceAppraisalTemplateQuestionService.Update({
                                        Entity: {
                                            Id: existingTempQuest.Id,
                                            TemplateId: this.templateID,
                                            QuestionId: tempQuestion
                                        }
                                    }).then(templateQuestionUpdateResponse => {
                                        console.log("Template Question updated ...", templateQuestionUpdateResponse);
                                    }).catch(error => {
                                        console.error("Error updating template question:", error);
                                    });
                                } else {
                                    PerformanceAppraisalTemplateQuestionService.Delete({
                                        EntityId: existingTempQuest.Id
                                    }).then(() => {
                                        console.log("Template Question deleted ...");
                                    }).catch(error => {
                                        console.error("Error deleting template question:", error);
                                    });
                                }
                            });

                            for (let i = tempQuestResponse.Entities.length; i < questIds.length; i++) {
                                const templateQuest = questIds[i];
                                PerformanceAppraisalTemplateQuestionService.Create({
                                    Entity: {
                                        TemplateId: this.templateID,
                                        QuestionId: templateQuest
                                    }
                                }).then(templateQuestionCreateResponse => {
                                    console.log("New template question ...", templateQuestionCreateResponse);

                                }).catch(error => {
                                    console.error("Error creating new template question:", error);
                                });
                            }

                        }).catch(error => {
                            console.error("Error retrieving template question data:", error);
                        });

                    })

                    setTimeout(() => {
                        this.dialogClose();
                        window.location.reload();
                    }, 1000);
                }
            });
        }
    }

    public delData(): void {

        PerformanceAppraisalTemplateService.List({
            Criteria: [[PerformanceAppraisalTemplateRow.Fields.Id], '=', this.templateID]
        }, response => {

            if (response.Entities.length > 0) {

                PerformanceAppraisalFormService.List({
                    Criteria: [[PerformanceAppraisalFormRow.Fields.TemplateId], '=', this.templateID]
                }, resResponse => {

                    if (resResponse.Entities.length === 0){
                        const templateData = response.Entities[0];

                        PerformanceAppraisalTemplateService.Delete({
                            EntityId: templateData.Id
                        }).then(deleteResponse => {
                            console.log('Deleted PerformanceAppraisalTemplate successfully:', deleteResponse);

                            PerformanceAppraisalTemplateQuestionService.List({
                                Criteria: [[PerformanceAppraisalTemplateQuestionRow.Fields.TemplateId], '=', this.templateID]
                            }, tempQuestResponse => {

                                if (tempQuestResponse.Entities.length > 0) {
                                    const deletePromises = [];

                                    for (const tempQuestData of tempQuestResponse.Entities) {
                                        const deletePromise = PerformanceAppraisalTemplateQuestionService.Delete({
                                            EntityId: tempQuestData.Id
                                        }).then(deleteResponse => {
                                            console.log(`Deleted PerformanceAppraisalTemplateQuestion ID ${tempQuestData.Id} successfully.`, deleteResponse);
                                        }).catch(error => {
                                            console.error(`Error deleting PerformanceAppraisalTemplateQuestion ID ${tempQuestData.Id}:`, error);
                                        });
                                        deletePromises.push(deletePromise);
                                    }
                                } else {
                                    console.log('No PerformanceAppraisalTemplateQuestion found with the given formID');
                                }
                            }).catch(error => {
                                console.error('Error fetching PerformanceAppraisalTemplateQuestion:', error);
                            });
                        }).catch(error => {
                            console.error('Error deleting PerformanceAppraisalTemplate:', error);
                        });
                    } else{
                        alertDialog("This template is currently in use and cannot be deleted.");
                    }
                })

            } else {
                console.log('No PerformanceAppraisalTemplate found with the given formID');
            }
        }).catch(error => {
            console.error('Error fetching PerformanceAppraisalTemplate:', error);
        });

        setTimeout(() => {
            this.dialogClose();
            window.location.reload();
        }, 2000);
    }

    public validateForm(): boolean {
        let isValid = true;
        let hasError = false;

        const ratingField = $('#RatingCustomize').val() || '';
        if (this.isEmptyOrNull(ratingField)) {
            isValid = false;
            hasError = true;
            $('#RatingCustomize').addClass('error');
        } else {
            $('#RatingCustomize').removeClass('error');
        }

        const durationNum = $('#DurationSelect').val() || '';
        if (this.isEmptyOrNull(durationNum)) {
            isValid = false;
            hasError = true;
            $('#DurationSelect').addClass('error');
        } else {
            $('#DurationSelect').removeClass('error');
        }

        const selectedDepartments = $('input[name="departments"]:checked');
        if (selectedDepartments.length === 0) {
            isValid = false;
            hasError = true;
            console.log("No departments selected.");
            $('.DepartmentContainer').addClass('error');
        } else {
            $('.DepartmentContainer').removeClass('error');
        }

        const selectedQuestions = $('input[name="QuestionList"]:checked');
        if (selectedQuestions.length === 0) {
            isValid = false;
            hasError = true;
            $('.question-list-container').addClass('error');
        } else {
            $('.question-list-container').removeClass('error');
        }

        if (hasError) {
            alertDialog("Please fill in all required fields.");
        }

        return isValid;
    }

}