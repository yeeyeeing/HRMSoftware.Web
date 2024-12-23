import {
    Decorators,
    EntityDialog, RetrieveResponse,
    SaveResponse
} from '@serenity-is/corelib';
import { confirm, alertDialog, serviceCall, ListResponse, Authorization } from "@serenity-is/corelib/q";
import {
    PerformanceAppraisalResponseForm,
    PerformanceAppraisalResponseRow,
    PerformanceAppraisalResponseService,
    PerformanceAppraisalTemplateQuestionService,
    PerformanceAppraisalTemplateQuestionRow,
    PerformanceAppraisalQuestionService,
    PerformanceAppraisalQuestionRow,
    PerformanceAppraisalFormService,
    PerformanceAppraisalFormRow,
    PerformanceAppraisalTemplateService,
    PerformanceAppraisalTemplateRow, PerformanceAppraisalEvaluationService, PerformanceAppraisalEvaluationRow,
} from "../../../ServerTypes/PerformanceAppraisal";
import {EmployeeProfileService} from "@/ServerTypes/EmployeeProfile/EmployeeProfileService";
import {EmployeeProfileRow} from "@/ServerTypes/EmployeeProfile/EmployeeProfileRow";
import {OrganisationChartService} from "@/ServerTypes/OrganisationChart/OrganisationChartService";

import { PerformanceAppraisalEvaluationDialog } from '../PerformanceAppraisalEvaluation/PerformanceAppraisalEvaluationDialog';

@Decorators.panel()
@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalResponseDialog')
export class PerformanceAppraisalResponseDialog extends EntityDialog<PerformanceAppraisalResponseRow, any> {
    protected getFormKey() { return PerformanceAppraisalResponseForm.formKey; }
    protected getRowDefinition() { return PerformanceAppraisalResponseRow; }
    protected getService() { return PerformanceAppraisalResponseService.baseUrl; }

    protected form = new PerformanceAppraisalResponseForm(this.idPrefix);

    FormId: number;
    TemplateId: number;
    TargetID: number;

    answertypelst: number[] = [];
    questionlst: string[] = [];

    public getResponseRowID(FormId: number): void {
        this.FormId = FormId;
    }

    public getTemplateID(TemplateId: number): void {
        this.TemplateId = TemplateId;
    }

    public getTargetID(TargetID: number): void {
        this.TargetID = TargetID;
    }

    protected onDialogOpen(): void {
        super.onDialogOpen();

        this.dialogTitle = "Performance Appraisal";
        this.saveAndCloseButton.hide();
        this.applyChangesButton.hide();

        const buttonContainer = $('<div></div>').appendTo(this.element);
        const targetInfoContainer = $('<div id="target-info-container"></div>').appendTo(this.element);
        const container = $('<div id="questions-container"></div>').appendTo(this.element);
        const todayDate = new Date().toISOString().slice(0, 10); 

        const questionIds: number[] = [];
        const questions: string[] = [];
        const answertypeIds: number[] = [];
        let targetname = "";
        let targetId = "";
        let department = "";
        let jobTitle = "";
        let string_startDate = "";
        let string_endDate = "";
        let submitDate = "";
        let rating = 0;

        EmployeeProfileService.List({
            Criteria: [[EmployeeProfileRow.Fields.Id], '=', this.TargetID]
        }, response => {
            for (var index in response.Entities) {
                const entity = response.Entities[index];
                targetname = entity.EmployeeName;
                targetId = entity.EmployeeID;
                department = entity.DepartmentDept;
                jobTitle = entity.Occupation;
            }

            PerformanceAppraisalFormService.List({
                Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.FormId]
            }).then(dateResponse => {

                for (const dateEntity of dateResponse.Entities) {
                    string_startDate = dateEntity.StartDate;
                    string_endDate = dateEntity.EndDate;
                }

                PerformanceAppraisalResponseService.List({
                    Criteria: [[PerformanceAppraisalResponseRow.Fields.Id], '=', this.FormId]
                }).then(dateResponse => {
                    if (dateResponse.Entities.length === 0) {
                        submitDate = todayDate;
                    } else {
                        const record = dateResponse.Entities[0];

                        if (record.UpdateDate) {
                            submitDate = record.UpdateDate.split('T')[0]; // 'YYYY-MM-DD' format
                        } else {
                            submitDate = record.InsertDate.split('T')[0];
                        }
                    }

                    function formatDate(dateString) {
                        const date = new Date(dateString);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                        const day = String(date.getDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                    }

                    const formattedStartDate = formatDate(string_startDate);
                    const formattedEndDate = new Date(string_endDate).toISOString().split('T')[0];
                    const formattedPeriodEndDate = formatDate(string_endDate);

                    this.displayEmployeeInfo(targetInfoContainer, targetname, targetId, jobTitle, 
                        department, formattedStartDate, formattedEndDate, formattedPeriodEndDate, submitDate);
                });
            });
        });
        
        PerformanceAppraisalTemplateService.List({
            Criteria: [[PerformanceAppraisalTemplateRow.Fields.Id], '=', this.TemplateId]
        }, templateResponse => {
            
            rating = templateResponse.Entities[0].RatingScale;

            PerformanceAppraisalTemplateQuestionService.List({
                Criteria: [[PerformanceAppraisalTemplateQuestionRow.Fields.TemplateId], '=', this.TemplateId]
            }, response => {
                for (var index in response.Entities) {
                    const entity = response.Entities[index];
                    questionIds.push(entity.QuestionId);
                }

                if (questionIds.length > 0) {

                    questionIds.forEach((questionId) => {

                        PerformanceAppraisalQuestionService.List({
                            Criteria: [[PerformanceAppraisalQuestionRow.Fields.Id], '=', questionId]
                        }, response1 => {

                            for (const questionEntity of response1.Entities) {
                                questions.push(questionEntity.Questions);
                                answertypeIds.push(questionEntity.AnswerType);
                            }
                            // console.log(questionIds);
                            // console.log(questions);

                            if (questions.length === questionIds.length) {

                                // console.log("check");
                                this.displayQuestionsAndAnswers(container, buttonContainer, questions, answertypeIds, rating);
                            }

                            const button = `
                                <button id="scrollToTopBtn" style="display: none; position: fixed; bottom: 20px; right: 20px; z-index: 99; background-color: #34495e; color: white; border: none; padding: 10px 15px; border-radius: 50%; cursor: pointer;">
                                    <i class="fa fa-upload"></i>
                                </button>
                            `;

                            container.append(button);

                            $(window).scroll(function () {
                                if ($(window).scrollTop() > 200) {
                                    $('#scrollToTopBtn').fadeIn();
                                } else {
                                    $('#scrollToTopBtn').fadeOut();
                                }
                            });

                            $(document).on('click', '#scrollToTopBtn', function () {
                                $('html, body').animate({ scrollTop: 0 }, 5);
                            });
                        });
                    });

                } else {
                    PerformanceAppraisalResponseService.List({
                        Criteria: [[PerformanceAppraisalResponseRow.Fields.FormId], '=', this.FormId]
                    }, response2 => {

                        if (response2.Entities.length > 0){
                            this.displayQuestionsAndAnswers(container, buttonContainer, [], [], rating);
                        }
                        else if (response2.Entities.length === 0) {
                            container.append(`
                            <div id="warning-message" class="warning-container">
                                <p class="warning-text">Template question not found or has been removed.</p>
                            </div>
                        `);
                            const button = `
                                <button id="scrollToTopBtn" style="display: none; position: fixed; bottom: 20px; right: 20px; z-index: 99; background-color: #34495e; color: white; border: none; padding: 10px 15px; border-radius: 50%; cursor: pointer;">
                                    <i class="fa fa-upload"></i>
                                </button>
                            `;

                            container.append(button);

                            $(window).scroll(function () {
                                if ($(window).scrollTop() > 200) {
                                    $('#scrollToTopBtn').fadeIn();
                                } else {
                                    $('#scrollToTopBtn').fadeOut();
                                }
                            });

                            $(document).on('click', '#scrollToTopBtn', function () {
                                $('html, body').animate({ scrollTop: 0 }, 5);
                            });
                            
                            this.applyStyles(container);
                        }
                    })
                }
            });
            
        });
    }

    public displayEmployeeInfo(employeeInfoContainer: JQuery, employeeName: string, employeeId: string, jobTitle: string, department: string, 
                               string_startDate: string, string_endDate: string, formattedPeriodEndDate: string, submitDate: string): void {

        const employeeInfoHtml = `
            <hr style="border: 1px solid #000000; margin-left: 10%; margin-right: 10%;">
            
            <div id="employee-info" 
            style="padding: 20px; margin-right: 10%; margin-left: 10%; color: #ffffff; border-radius: 8px; 
            border: 1px solid transparent; font-family: Arial, sans-serif;">
            
                <div style="margin-bottom: 20px; font-size: 22px; color: #000000; font-weight: bold; 
                background-color: #b1b1b1; text-align: center; border-radius: 6px; border: 1px solid #dee2e6;
                max-width: 100%;">Employee Information</div>
                
                <table style="width: 100%; border-spacing: 15px; border-collapse: separate;">
                    <tr>
                        <td style="width: 20%; color: #000000; font-weight: bold;">Name:</td>
                        <td style="width: 30%; color: #000000; border: 1px solid #dee2e6; border-radius: 4px; padding: 8px 12px; background-color: lightgrey;">${employeeName}</td>
                        <td style="width: 20%; color: #000000; font-weight: bold;">Employee ID:</td>
                        <td style="width: 30%; color: #000000; border: 1px solid #dee2e6; border-radius: 4px; padding: 8px 12px; background-color: lightgrey;">${employeeId}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #000000;">Job Title:</td>
                        <td style="border: 1px solid #dee2e6; color: #000000; border-radius: 4px; padding: 8px 12px; 
                        background-color: lightgrey;">${jobTitle}</td>
                        <td style="font-weight: bold; color: #000000;">Date:</td>
                        <td style="border: 1px solid #dee2e6; color: #000000; border-radius: 4px; padding: 8px 12px; 
                        background-color: lightgrey;">${submitDate}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #000000;">Department:</td>
                        <td style="border: 1px solid #dee2e6; color: #000000; border-radius: 4px; padding: 8px 12px; 
                        background-color: lightgrey;">${department}</td>
                        <td style="font-weight: bold; color: #000000;">Head Of Dept:</td>
                        <td style="border: 1px solid #dee2e6; color: #000000; border-radius: 4px; padding: 8px 12px; 
                        background-color: lightgrey;"></td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #000000;">Appraisal Period:</td>
                        <td colspan="3" style=" color: #000000; border: 1px solid #dee2e6; border-radius: 4px; 
                        padding: 8px 12px; background-color:lightgrey;">${string_startDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        to&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${formattedPeriodEndDate}</td>
                    </tr>
                </table>
                
                <hr style="border: 1px solid #000000;">
            </div>`;

        $(employeeInfoHtml).appendTo(employeeInfoContainer);
    }

    public isWithinDateRange(startDate: string, endDate: string, today: Date): boolean {

        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // console.log("Start: ", start);
        // console.log("End: ", end);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            console.error("Invalid date(s) provided");
            return false;
        }
        
        if (today >= start && today <= end) {console.log(start, today, end, today >= start && today <= end)}
        
        return today >= start && today <= end;
    }
    
    public displayQuestionsAndAnswers(container: JQuery, buttonContainer: JQuery, questions: string[], answertypeIds: number[], rating: number): void {
        container.empty();

        const sortedQuestions = questions.map((question, index) => ({
            question: question,
            answertypeId: answertypeIds[index]
        }));

        sortedQuestions.sort((a, b) => a.answertypeId - b.answertypeId);

        this.answertypelst = sortedQuestions.map(q => q.answertypeId);
        this.questionlst = sortedQuestions.map(q => q.question);

        let textTypeAdded = false;
        let radioTypeAdded = false;
        let isEditable = false;

        const today = new Date();
        const stringToday = String(today);
        let startDate = "";
        let endDate = "";

        let ratingSum = 0;
        let totalQuestions = 0;
        let percentage = 0;

        function formatDate(dateString: string): string {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        const formattedTodayDate = formatDate(stringToday);

        PerformanceAppraisalFormService.List({
            Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.FormId]
        }).then((formResponse: ListResponse<any>) => {

            const dueDateStr = formResponse.Entities[0].EndDate;
            const dueDate = new Date(dueDateStr);
            
            // console.log(dueDate);

            if (today >= dueDate) {
                
                let warningMSG: string;
                warningMSG =`
                    <div id="warning-message" class="warning-container">
                        <p class="warning-text">The deadline has passed. The following is the last saved record.</p>
                    </div>
                `;
                container.append(warningMSG);
            
                PerformanceAppraisalResponseService.List({
                    Criteria: [[PerformanceAppraisalResponseRow.Fields.FormId], '=', this.FormId]
                }).then((response: ListResponse<any>) => {
                    
                    if (response.Entities.length > 0)
                    {
                        PerformanceAppraisalFormService.List({
                            Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.FormId]
                        }).then(dateResponse => {

                            for (const dateEntity of dateResponse.Entities) {
                                startDate = dateEntity.StartDate;
                                endDate = dateEntity.EndDate;
                            }

                            const textQuestions: { question: string, answer: string }[] = [];
                            const ratingQuestions: { question: string, answer: string }[] = [];

                            response.Entities.forEach((entity) => {
                                const question = entity.Question;
                                const answer = entity.Answer;
                                const answerType = entity.AnswerType;

                                if (answerType === 'text') {
                                    textQuestions.push({ question, answer });
                                } else if (answerType === 'rating') {
                                    ratingQuestions.push({ question, answer });
                                }
                            });

                            function formatDate(dateString: string): string {
                                const date = new Date(dateString);
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                                const day = String(date.getDate()).padStart(2, '0');
                                return `${year}-${month}-${day}`;
                            }

                            textQuestions.forEach(({ question, answer }, index) => {
                                let inputHtml: string;

                                if (!textTypeAdded) {
                                    const formattedStartDate = formatDate(startDate);
                                    const formattedEndDate = formatDate(endDate);

                                    container.append(`
                                        <p class="reminder-text">
                                            Please complete the form between <span class="date-text">${formattedStartDate}</span> and <span class="date-text">${formattedEndDate}</span>.
                                            During this period, you can edit and resubmit the form as needed. After the deadline, no further submissions or edits will be allowed.
                                        </p>
                                        <p class="instruction-text">Appraisee to complete and return to the appraiser prior to the interview.</p>
                                    `);
                                    textTypeAdded = true;
                                }

                                inputHtml = `
                                    <div class="text-answer">
                                        <textarea name="answer-${index}" placeholder="Enter your answer here..." 
                                                  style="width: 100%; height: 100px; background-color: ${isEditable ? 'white' : '#D3D3D3'};" 
                                                  ${isEditable ? '' : 'readonly'} required>${answer}</textarea>
                                    </div>
                                `;

                                const questionHtml = `
                                    <div class="question-item">
                                        <p style="font-weight: bold; text-align: justify;">${question}</p>
                                        ${inputHtml}
                                    </div>
                                `;

                                container.append(questionHtml);
                            });

                            ratingQuestions.forEach(({ question, answer }, index) => {

                                totalQuestions = totalQuestions + 1;
                                ratingSum = ratingSum + parseInt(answer);
                                
                                let inputHtml: string;

                                if (!radioTypeAdded) {
                                    container.append(`
                                        <p class="instruction-radio">Rate your capability or knowledge in the following areas based on your current 
                                        role requirements. Use the rating scale provided, where lower scores represent less capability and higher 
                                        scores represent greater capability, from left to right.</p>
                                    `);
                                        radioTypeAdded = true;
                                }

                                const ratingArray = Array.from({ length: rating }, (_, i) => i + 1);
                                
                                inputHtml = `
                                    <div class="rating-container">
                                        <div class="rating" style="background-color: ${isEditable ? 'transparent' : '#D3D3D3'};">
                                            ${ratingArray.map(i => `
                                                <div class="radio-item">
                                                    <input type="radio" name="answer-${index}" value="${i}" id="rating-${index}-${i}" ${i == answer ? 'checked' : ''} ${isEditable ? '' : 'disabled'} required />
                                                    <label for="rating-${index}-${i}" class="radio-label">${i}</label>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                `;

                                const questionHtml = `
                                    <div class="question-item">
                                        <p style="font-weight: bold; text-align: justify;">${question}</p>
                                        ${inputHtml}
                                    </div>
                                `;

                                container.append(questionHtml);
                            });

                            percentage = (ratingSum / (totalQuestions * rating)) * 100;
                            if (isNaN(percentage) || percentage === 0) {
                                percentage = 0.00;
                            }

                            let overallRatingContainer = `
                                <div class="overallRating">
                                    <label>Overall Rating (average the rating numbers above by percentage): </label>
                                    <input class="percentage" id="percentage" style="justify-content: flex-end;" value="${percentage.toFixed(2)}%" />
                                </div>
                            `;
                            
                            container.append(overallRatingContainer);

                            // const endline = '<hr style="border: 1px solid #000000; margin-left: 10%; margin-right: 10%; margin-top: 8%;">';
                            // container.append(endline);

                            this.applyStyles(container);

                            /*const evaluationHtml = `

                                <hr style="border: 1px solid #000000; margin-left: 10%; margin-right: 10%; margin-top: 5%;">
                                
                                <div id="evaluation-section" style="padding: 0 12%; color: #444; font-family: 'Arial', sans-serif;">
                
                                    <div style="margin-bottom: 20px; font-size: 20px; color: #222; font-weight: 700; 
                                    background-color: #f7f7f7; text-align: center; border-radius: 8px; padding: 8px;">Evaluation</div>
                                    
                                    <!-- Instruction Text -->
                                    <div style="margin-bottom: 10px; font-size: 15px; color: #555; font-weight: 400; 
                                    background-color: #f4f4f4; padding: 25px; border-radius: 6px;">
                                        <p><strong>To be completed during the appraisal by the appraiser:</strong> Where appropriate and safe to do so, certain items can be completed by the appraiser before the appraisal, and then discussed and validated or amended in discussion with the appraisee during the appraisal.</p>
                                        <p><strong>Evaluation:</strong> Describe the purpose of the appraiser’s job function. Review and discuss self-appraisal entries; appraiser’s career direction options and wishes. Appraiser may like to discuss specific objectives that will enable the appraisee to reach competence and to meet required performance in the current job, or achieve readiness for the next job level/type, or if no particular next role is identified or sought, to achieve the desired personal growth or experience. These objectives must adhere to the SMARTER rules - specific, measurable, agreed, realistic, time-bound, ethical, recorded. Training and development support may be discussed to help the appraisee meet the agreed objectives above. Other issues may be covered (if any).</p>
                                    </div>
                                
                                    <!-- Evaluation Table -->
                                    <table style="width: 100%; border-spacing: 20px; border-collapse: separate;">
                                        <tr>
                                            <td style="font-weight: 600; color: #333; width: 22%;">Evaluation:</td>
                                            <td colspan="3" style="color: #444; padding: 5px; background-color: #ffffff;">
                                                <textarea rows="5" style="width: 100%; border: 1px solid #cccccc; font-family: 'Arial', sans-serif; 
                                                background-color: transparent; border-radius: 6px;" placeholder="Describe the purpose of the appraiser’s job function, review self-appraisal entries, etc."></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: 600; color: #333;">Goals:</td>
                                            <td colspan="3" style="color: #444; padding: 5px; background-color: #ffffff;">
                                                <textarea rows="3" style="width: 100%; border: 1px solid #cccccc; border-radius: 6px; padding: 10px;" placeholder="Enter goals agreed upon by employee and Head Of Dept."></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: 600; color: #333;">Grade / Recommendation / Summary as applicable:</td>
                                            <td colspan="3" style="color: #444; padding: 5px; background-color: #ffffff;">
                                                <textarea rows="3" style="width: 100%; border: 1px solid #cccccc; border-radius: 6px; padding: 10px;" placeholder="Enter grade/recommendation/summary here."></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: 600; color: #333;">Bonus Rate:</td>
                                            <td colspan="3" style="color: #444; padding: 5px; background-color: #ffffff;">
                                                <select style="width: 100%; border: 1px solid #cccccc; border-radius: 6px; padding: 10px;">
                                                    ${Array.from({ length: 51 }, (_, i) => (i * 0.1).toFixed(1)).map(rate => `
                                                        <option value="${rate}">${rate}</option>
                                                    `).join('')}
                                                </select>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <div style="margin-bottom: 20px; font-size: 20px; color: #222; font-weight: 700; 
                                    background-color: #f7f7f7; text-align: center; border-radius: 8px; padding: 8px;">Verification of Review</div>
                                
                                    <table style="width: 100%; border-spacing: 20px; border-collapse: separate;">
                                        <tr>
                                            <td style="font-weight: 600; color: #333; width: 200px;">Employee Signature:</td>
                                            <td style="border: 1px solid #cccccc; color: #444; border-radius: 6px; padding: 15px; background-color: #ffffff; width: 300px; height: 80px; cursor: pointer;" onclick="document.getElementById('employeeSignatureInput').click();">
                                                <img id="employeeSignaturePreview" style="max-width: 100%; max-height: 100%;" />
                                                <input type="file" id="employeeSignatureInput" style="display: none;" accept="image/*" onchange="previewSignature('employeeSignatureInput', 'employeeSignaturePreview');" />
                                            </td>
                                            <td style="font-weight: 600; color: #333; width: 100px;">Date:</td>
                                            <td style="border: 1px solid #cccccc; color: #444; border-radius: 6px; padding: 15px; background-color: #ffffff; width: 120px;">${formattedTodayDate}</td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: 600; color: #333;">Head Of Dept. Signature:</td>
                                            <td style="border: 1px solid #cccccc; color: #444; border-radius: 6px; padding: 15px; background-color: #ffffff; cursor: pointer;" onclick="document.getElementById('hodSignatureInput').click();">
                                                <img id="hodSignaturePreview" style="max-width: 100%; max-height: 100%;" />
                                                <input type="file" id="hodSignatureInput" style="display: none;" accept="image/*" onchange="previewSignature('hodSignatureInput', 'hodSignaturePreview');" />
                                            </td>
                                            <td style="font-weight: 600; color: #333;">Date:</td>
                                            <td style="border: 1px solid #cccccc; color: #444; border-radius: 6px; padding: 15px; background-color: #ffffff;">${formattedTodayDate}</td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: 600; color: #333;">General Manager Signature:</td>
                                            <td style="border: 1px solid #cccccc; color: #444; border-radius: 6px; padding: 15px; background-color: #ffffff; cursor: pointer;" onclick="document.getElementById('gmSignatureInput').click();">
                                                <img id="gmSignaturePreview" style="max-width: 100%; max-height: 100%;" />
                                                <input type="file" id="gmSignatureInput" style="display: none;" accept="image/*" onchange="previewSignature('gmSignatureInput', 'gmSignaturePreview');" />
                                            </td>
                                            <td style="font-weight: 600; color: #333;">Date:</td>
                                            <td style="border: 1px solid #cccccc; color: #444; border-radius: 6px; padding: 15px; background-color: #ffffff;">${formattedTodayDate}</td>
                                        </tr>
                                    </table>

                                    <script>
                                        function previewSignature(inputId, previewId) {
                                            const input = document.getElementById(inputId);
                                            const preview = document.getElementById(previewId);
                                    
                                            if (input.files && input.files[0]) {
                                                const reader = new FileReader();
                                                reader.onload = function (e) {
                                                    preview.src = e.target.result;
                                                }
                                                reader.readAsDataURL(input.files[0]);
                                            }
                                        }
                                    </script>

                                </div>
                             
                                <hr style="border: 1px solid #000000; margin-left: 10%; margin-right: 10%;">
                            `;

                            PerformanceAppraisalResponseService.List({
                                Criteria: [[PerformanceAppraisalResponseRow.Fields.FormId], '=', this.FormId]
                            }).then((response: ListResponse<any>) => {

                                if (response.Entities && response.Entities.length > 0) {
                                    container.append(evaluationHtml);
                                }
                                else {
                                    const endline = '<hr style="border: 1px solid #000000; margin-left: 10%; margin-right: 10%; margin-top: 8%;">';
                                    container.append(endline);
                                }
                            });*/

                        });
                    }else {
                        console.log("Pass deadline but incomplete...");
                        
                        PerformanceAppraisalFormService.List({
                            Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.FormId]
                        }).then(dateResponse => {

                            for (const dateEntity of dateResponse.Entities) {
                                startDate = dateEntity.StartDate;
                                endDate = dateEntity.EndDate;
                            }

                            isEditable = this.isWithinDateRange(startDate, endDate, today);

                            sortedQuestions.forEach(({ question, answertypeId }, index) => {
                                let inputHtml: string;
                                const existingAnswers = response.Entities.reduce((map, item) => {
                                    map[item.Question] = item.Answer; // Map question text to answer
                                    return map;
                                }, {} as { [key: string]: string });
                                const existingAnswer = existingAnswers[question] || '';

                                function formatDate(dateString) {
                                    const date = new Date(dateString);
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                                    const day = String(date.getDate()).padStart(2, '0');
                                    return `${year}-${month}-${day}`;
                                }

                                if (answertypeId===2){
                                    if (!textTypeAdded) {
                                        const formattedStartDate = formatDate(startDate);
                                        const formattedEndDate = formatDate(endDate);

                                        container.append(`
                                        <p class="reminder-text">
                                            Please complete the form between <span class="date-text">${formattedStartDate}</span> and <span class="date-text">${formattedEndDate}</span>.
                                            During this period, you can edit and resubmit the form as needed. After the deadline, no further submissions or edits will be allowed.
                                        </p>
                                        <p class="instruction-text">Appraisee to complete and return to the appraiser prior to the interview.</p>
                                    `);
                                        textTypeAdded = true;
                                    }

                                    inputHtml = `
                                        <div class="text-answer">
                                            <textarea name="answer-${index}" placeholder="Enter your answer here..." 
                                                      style="width: 100%; height: 100px; background-color: ${isEditable ? 'white' : '#D3D3D3'};" 
                                                      ${isEditable ? '' : 'readonly'} required>${existingAnswer}</textarea>
                                        </div>
                                    `;
                                }else if (answertypeId===3) {

                                    totalQuestions = totalQuestions + 1;
                                    ratingSum = ratingSum + parseInt(existingAnswer);
                                    
                                    if (!radioTypeAdded) {
                                        container.append('' +
                                            '<p class="instruction-radio">Rate your capability or knowledge in the following areas based on your current role requirements. ' +
                                            'Use the rating scale provided, where lower scores represent less capability and higher scores represent greater capability, from ' +
                                            'left to right.</p>');
                                        radioTypeAdded = true;
                                    }

                                    const ratingArray = Array.from({ length: rating }, (_, i) => i + 1);

                                    inputHtml = `
                                        <div class="rating-container">
                                            <div class="rating" style="background-color: ${isEditable ? 'transparent' : '#D3D3D3'};">
                                                ${ratingArray.map(i => `
                                                    <div class="radio-item">
                                                        <input type="radio" name="answer-${index}" value="${i}" id="rating-${index}-${i}" ${i == existingAnswer ? 'checked' : ''} ${isEditable ? '' : 'disabled'} required />
                                                        <label for="rating-${index}-${i}" class="radio-label">${i}</label>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    `;
                                }
                                
                                const questionHtml = `
                                    <div class="question-item">
                                        <p style="font-weight: bold; text-align: justify;">${question}</p>
                                        ${inputHtml}
                                    </div>
                                `;

                                container.append(questionHtml);
                            });

                            percentage = (ratingSum / (totalQuestions * rating)) * 100;
                            if (isNaN(percentage) || percentage === 0) {
                                percentage = 0.00;
                            }

                            let overallRatingContainer = `
                                <div class="overallRating">
                                    <label>Overall Rating (average the rating numbers above by percentage): </label>
                                    <input class="percentage" id="percentage" style="justify-content: flex-end;" value="${percentage.toFixed(2)}%" />
                                </div>
                            `;

                            container.append(overallRatingContainer);

                            const endline = '<hr style="border: 1px solid #000000; margin-left: 10%; margin-right: 10%; margin-top: 8%;">';
                            container.append(endline);

                            this.applyStyles(container);

                        });
                    }
                }).catch(error => console.error('Error fetching existing answers:', error));
                
            } else {
                if (questions.length === 0){
                    PerformanceAppraisalResponseService.List({
                        Criteria: [[PerformanceAppraisalResponseRow.Fields.FormId], '=', this.FormId]
                    }).then((response: ListResponse<any>) => {

                        PerformanceAppraisalFormService.List({
                            Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.FormId]
                        }).then(dateResponse => {

                            for (const dateEntity of dateResponse.Entities) {
                                startDate = dateEntity.StartDate;
                                endDate = dateEntity.EndDate;
                            }

                            const textQuestions: { question: string, answer: string }[] = [];
                            const ratingQuestions: { question: string, answer: string }[] = [];

                            response.Entities.forEach((entity) => {
                                const question = entity.Question;
                                const answer = entity.Answer;
                                const answerType = entity.AnswerType;

                                if (answerType === 'text') {
                                    textQuestions.push({ question, answer });
                                } else if (answerType === 'rating') {
                                    ratingQuestions.push({ question, answer });
                                }
                            });

                            function formatDate(dateString: string): string {
                                const date = new Date(dateString);
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                                const day = String(date.getDate()).padStart(2, '0');
                                return `${year}-${month}-${day}`;
                            }
                            
                            let warningMSG: string;
                            warningMSG =`
                                <div id="warning-message" class="warning-container">
                                    <input class="warning-text">Template question not found or has been removed. The following is the last saved record.</input>
                                </div>
                            `;
                            container.append(warningMSG);
                           
                            textQuestions.forEach(({ question, answer }, index) => {
                                let inputHtml: string;

                                if (!textTypeAdded) {
                                    const formattedStartDate = formatDate(startDate);
                                    const formattedEndDate = formatDate(endDate);

                                    container.append(`
                                        <p class="reminder-text">
                                            Please complete the form between <span class="date-text">${formattedStartDate}</span> and <span class="date-text">${formattedEndDate}</span>.
                                            During this period, you can edit and resubmit the form as needed. After the deadline, no further submissions or edits will be allowed.
                                        </p>
                                        <p class="instruction-text">Appraisee to complete and return to the appraiser prior to the interview.</p>
                                    `);
                                    textTypeAdded = true;
                                }

                                inputHtml = `
                                    <div class="text-answer">
                                        <textarea name="answer-${index}" placeholder="Enter your answer here..." 
                                                  style="width: 100%; height: 100px; background-color: ${isEditable ? 'white' : '#D3D3D3'};" 
                                                  ${isEditable ? '' : 'readonly'} required>${answer}</textarea>
                                    </div>
                                `;

                                const questionHtml = `
                                    <div class="question-item">
                                        <p style="font-weight: bold; text-align: justify;">${question}</p>
                                        ${inputHtml}
                                    </div>
                                `;
                                container.append(questionHtml);
                            });

                            ratingQuestions.forEach(({ question, answer }, index) => {

                                totalQuestions = totalQuestions + 1;
                                ratingSum = ratingSum + parseInt(answer);
                                
                                let inputHtml: string;

                                if (!radioTypeAdded) {
                                    container.append(`
                                    <p class="instruction-radio">Rate your capability or knowledge in the following areas based on your current role requirements. 
                                    Use the rating scale provided, where lower scores represent less capability and higher scores represent greater capability, 
                                    from left to right.</p>
                                    
                                `);
                                    radioTypeAdded = true;
                                }

                                const ratingArray = Array.from({ length: rating }, (_, i) => i + 1);

                                inputHtml = `
                                    <div class="rating-container">
                                        <div class="rating" style="background-color: ${isEditable ? 'transparent' : '#D3D3D3'};">
                                            ${ratingArray.map(i => `
                                                <div class="radio-item">
                                                    <input type="radio" name="answer-${index}" value="${i}" id="rating-${index}-${i}" ${i == answer ? 'checked' : ''} ${isEditable ? '' : 'disabled'} required />
                                                    <label for="rating-${index}-${i}" class="radio-label">${i}</label>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                `;

                                const questionHtml = `
                                    <div class="question-item">
                                        <p style="font-weight: bold; text-align: justify;">${question}</p>
                                        ${inputHtml}
                                    </div>
                                `;
                                container.append(questionHtml);
                            });

                            percentage = (ratingSum / (totalQuestions * rating)) * 100;
                            if (isNaN(percentage) || percentage === 0) {
                                percentage = 0.00;
                            }

                            let overallRatingContainer = `
                                <div class="overallRating">
                                    <label>Overall Rating (average the rating numbers above by percentage): </label>
                                    <input class="percentage" id="percentage" style="justify-content: flex-end;" value="${percentage.toFixed(2)}%" />
                                </div>
                            `;

                            container.append(overallRatingContainer);
                            
                            const endline = '<hr style="border: 1px solid #000000; margin-left: 10%; margin-right: 10%; margin-top: 5%;">';
                            container.append(endline);
                            
                            this.applyStyles(container);

                        });
                    }).catch(error => console.error('Error fetching existing answers:', error));
                }
                else {
                    
                    PerformanceAppraisalResponseService.List({
                        Criteria: [[PerformanceAppraisalResponseRow.Fields.FormId], '=', this.FormId]
                    }).then((response: ListResponse<any>) => {

                        PerformanceAppraisalFormService.List({
                            Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.FormId]
                        }).then(dateResponse => {

                            for (const dateEntity of dateResponse.Entities) {
                                startDate = dateEntity.StartDate;
                                endDate = dateEntity.EndDate;
                            }

                            isEditable = this.isWithinDateRange(startDate, endDate, today);

                            sortedQuestions.forEach(({ question, answertypeId }, index) => {
                                let inputHtml: string;
                                const existingAnswers = response.Entities.reduce((map, item) => {
                                    map[item.Question] = item.Answer; // Map question text to answer
                                    return map;
                                }, {} as { [key: string]: string });
                                const existingAnswer = existingAnswers[question] || '';

                                function formatDate(dateString) {
                                    const date = new Date(dateString);
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                                    const day = String(date.getDate()).padStart(2, '0');
                                    return `${year}-${month}-${day}`;
                                }

                                if (answertypeId===2){
                                    if (!textTypeAdded) {
                                        const formattedStartDate = formatDate(startDate);
                                        const formattedEndDate = formatDate(endDate);

                                        container.append(`
                                            <p class="reminder-text">
                                                Please complete the form between <span class="date-text">${formattedStartDate}</span> and <span class="date-text">${formattedEndDate}</span>.
                                                During this period, you can edit and resubmit the form as needed. After the deadline, no further submissions or edits will be allowed.
                                            </p>
                                            <p class="instruction-text">Appraisee to complete and return to the appraiser prior to the interview.</p>
                                        `);
                                        textTypeAdded = true;
                                    }

                                    inputHtml = `
                                        <div class="text-answer">
                                            <textarea name="answer-${index}" placeholder="Enter your answer here..." 
                                                      style="width: 100%; height: 100px; background-color: ${isEditable ? 'white' : '#D3D3D3'};" 
                                                      ${isEditable ? '' : 'readonly'} required>${existingAnswer}</textarea>
                                        </div>
                                    `;
                                }else if (answertypeId===3) {
                                    
                                    totalQuestions = totalQuestions + 1;
                                    ratingSum = ratingSum + parseInt(existingAnswer);
                                    
                                    if (!radioTypeAdded) {
                                        container.append('' +
                                            '<p class="instruction-radio">Rate your capability or knowledge in the following areas based on your current role requirements. ' +
                                            'Use the rating scale provided, where lower scores represent less capability and higher scores represent greater capability, from ' +
                                            'left to right.</p>');
                                        radioTypeAdded = true;
                                    }

                                    const ratingArray = Array.from({ length: rating }, (_, i) => i + 1);

                                    inputHtml = `
                                        <div class="rating-container">
                                            <div class="rating" style="background-color: ${isEditable ? 'transparent' : '#D3D3D3'};">
                                                ${ratingArray.map(i => `
                                                    <div class="radio-item">
                                                        <input type="radio" name="answer-${index}" value="${i}" id="rating-${index}-${i}" ${i == existingAnswer ? 'checked' : ''} ${isEditable ? '' : 'disabled'} required />
                                                        <label for="rating-${index}-${i}" class="radio-label">${i}</label>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    `;
                                }

                                const questionHtml = `
                                    <div class="question-item">
                                        <p style="font-weight: bold; text-align: justify;">${question}</p>
                                        ${inputHtml}
                                    </div>
                                `;
                                
                                container.append(questionHtml);
                            });

                            percentage = (ratingSum / (totalQuestions * rating)) * 100;
                            if (isNaN(percentage) || percentage === 0) {
                                percentage = 0.00;
                            }

                            let overallRatingContainer = `
                                <div class="overallRating">
                                    <label>Overall Rating (average the rating numbers above by percentage): </label>
                                    <input class="percentage" id="percentage" style="justify-content: flex-end;" value="${percentage.toFixed(2)}%" />
                                </div>
                            `;

                            container.append(overallRatingContainer);

                            const endline = '<hr style="border: 1px solid #000000; margin-left: 10%; margin-right: 10%; margin-top: 5%;">';
                            container.append(endline);
                            
                            const saveButton = $('<button><i class="fa fa-save"></i> Save</button>').appendTo(buttonContainer);
                            const submitButton = $('<button><i class="fa fa-paper-plane"></i> Submit</button>').appendTo(buttonContainer);
                            
                            buttonContainer.css({
                                'position': 'relative',
                                'z-index': 1000,
                                'margin-bottom': '1%'
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
                            submitButton.css({
                                'border': '1px solid #b1b1b1',
                                'background-color': 'white',
                                'padding': '7px 9px',
                                'border-radius': '5px',
                                'font-size': '16px',
                                'cursor': 'pointer',
                                'width': '100px',
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
                            submitButton.hover(
                                function() {
                                    $(this).css({
                                        'background-color': 'darkblue',
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
                            
                            saveButton.on('click', () => {
                                confirm("Save the answer as draft?", () => {
                                    this.saveData();
                                });
                            });

                            submitButton.on('click', () => {
                                confirm("Submit appraisal form?", () => {
                                    this.submitData();
                                });
                            });

                            this.applyStyles(container);

                        });
                    }).catch(error => console.error('Error fetching existing answers:', error));
                }
            }
        })

        this.evaluation(buttonContainer);
    }
    
    public evaluation(buttonContainer: JQuery){
        PerformanceAppraisalFormService.List({
            Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.FormId]
        }, response => {
            
            let today = new Date();
            const dueDateStr = response.Entities[0].EvaluateStartDate;
            const startDate = new Date(dueDateStr);
            
            if (response.Entities[0].SubmissionStatus === 2 && (today >= startDate)){
                
                const evaluateButton = $('<button><i class="fa fa-file-signature"></i> Evaluation</button>').appendTo(buttonContainer);

                buttonContainer.css({
                    'position': 'relative',
                    'z-index': 1000,
                    'margin-bottom': '1%'
                });
                evaluateButton.css({
                    'border': '1px solid #b1b1b1',
                    'background-color': 'white',
                    'padding': '7px 9px',
                    'border-radius': '5px',
                    'font-size': '16px',
                    'cursor': 'pointer',
                    'width': '125px',
                    'display': 'inline-block',
                    'margin-right': '5px'
                });
                evaluateButton.hover(
                    function() {
                        $(this).css({
                            'background-color': 'darkred',
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
                evaluateButton.on('click', () => {
                    
                    PerformanceAppraisalEvaluationService.List({
                        Criteria: [[PerformanceAppraisalEvaluationRow.Fields.FormId], '=', this.FormId]
                    }, formResponse => {
                       
                        if (formResponse.Entities.length > 0){
                            
                            const evaluationID = formResponse.Entities[0].Id;

                            confirm("Evaluate this appraisal form?", () => {
                                var dialog = new PerformanceAppraisalEvaluationDialog();

                                dialog.loadByIdAndOpenDialog(evaluationID);
                            });
                            
                        }
                        
                    });
                });
            }

            console.log("check1");
            
        });
    }

    public applyStyles(container: JQuery): void {
        
        container.find('.warning-container').css({
            'border': '1px solid #ffcc00',
            'background-color': '#fff3cd',
            'color': '#856404',
            'padding': '15px',
            'margin': '5px 0',
            'margin-bottom': '40px',
            'border-radius': '5px',
            'font-family': 'Arial, sans-serif',
            'font-size': '16px',
            'text-align': 'center',
            'margin-left': '10%',
            'margin-right': '10%'
        });
        container.find('.question-item').css({
            'margin-bottom': '25px',
            'padding': '10px',
            'border': '1px solid #ddd',
            'border-radius': '5px',
            'margin-right': '12%',
            'margin-left': '12%'
        });
        container.find('.text-answer').css({
            'margin-bottom': '10px'
        });
        container.find('.text-answer input[type="text"]').css({
            'width': '100%',
            'height': '80px',
            'padding': '8px',
            'border': '1px solid #ccc',
            'border-radius': '4px',
            'font-size': '14px'
        });
        container.find('.rating-container').css({
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'flex-end'
        });
        container.find('.rating').css({
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'space-between'
        });
        container.find('.overallRating').css({
            'margin-bottom': '25px',
            'padding': '10px',
            'border': '1px solid #000000',
            'border-radius': '5px',
            'margin-right': '12%',
            'margin-left': '12%',
            'font-weight': 'bold',
            'background-color': '#b1b1b1',
            'display': 'flex',           // Use Flexbox
            'justify-content': 'space-between', // Space between the label and percentage
            'align-items': 'center'      // Vertically align elements
        });
        container.find('.percentage').css({
            'font-weight': 'bold',      // Make the percentage stand out
            'text-align': 'right',       // Align text to the right
            'margin-right': '5%',
            'margin-top': '1%'
        });
        container.find('.rating input[type="radio"]').css({
            'margin-left': '30px',
            'margin-right': '30px',
            'width': '20px',
            'height': '20px'
        });
        container.find('.instruction-text').css({
            'font-weight': 'bold',
            'margin-bottom': '25px',
            'margin-left': '12%',
            'color': 'darkblue',
            'font-size': '17px'
        });
        container.find('.reminder-text').css({
            'font-weight': 'bold',
            'margin-bottom': '25px',
            'margin-left': '12%',
            'margin-right': '12%',
            'color': 'darkred',
            'font-size': '17px',
            'text-align': 'justify'
        });
        container.find('.reminder-text .date-text').css({
            'color': 'orange', 
            'font-weight': 'bold',
            'font-size': '18px'
        });
        container.find('.instruction-radio-label').css({
            'font-weight': 'bold',
            'margin-bottom': '5px',
            'margin-right': '13%',
            'text-align': 'right',
            'color': 'darkred',
            'font-size': '16px'
        });
        container.find('.instruction-radio').css({
            'font-weight': 'bold',
            'margin-top': '3%',
            'margin-bottom': '15px',
            'margin-left': '12%',
            'margin-right': '13%',
            'color': 'darkblue',
            'font-size': '17px',
            'text-align': 'justify'
        });
        container.find('.radio-item').css({
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
            'margin-right': '10px'
        });
        container.find('.radio-label').css({
            'margin-top': '5px',
            'font-size': '10px',
            'font-weight': 'bold'
        });
    }

    public isEmptyOrNull(value: any): boolean {
        return value === null || value === undefined || value === '';
    }

    public saveData(): void {
        const answers = [];
        let percentage = 0;
        let ratingSum = 0;
        let totalQuestions = 0;

        PerformanceAppraisalFormService.List({
            Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.FormId]
        }, async formResponse => {

            await PerformanceAppraisalTemplateService.List({
                Criteria: [[PerformanceAppraisalTemplateRow.Fields.Id], '=', formResponse.Entities[0].TemplateId]
            }, async tempResponse => {

                let rating = tempResponse.Entities[0].RatingScale;

                $('#questions-container .question-item').each((index, element) => {
                    let answerValue: string;
        
                    if (this.answertypelst[index] === 2) {
                        answerValue = $(element).find('textarea[name^="answer-"]').val()?.toString() || '';
                    } else if (this.answertypelst[index] === 3) {
                        answerValue = $(element).find('input[name^="answer-"]:checked').val()?.toString() || '';

                        if (isNaN(parseInt(answerValue)) || parseInt(answerValue) === 0)
                        {
                            answerValue = '0';
                        }
                        ratingSum = ratingSum + parseInt(answerValue);
                        totalQuestions = totalQuestions + 1;
                        
                    } else {
                        answerValue = $(element).find('input[name^="answer-"]').val()?.toString() || '';
                    }
        
                    const question = this.questionlst[index];
                    const answerType = this.answertypelst[index] === 2 ? 'text' : this.answertypelst[index] === 3 ? 'rating' : this.answertypelst[index];
                    
                    answers.push({
                        Question: question,
                        Answer: answerValue,
                        AnswerType: answerType,
                        FormID: this.FormId
                    });
                });

                percentage = (ratingSum / (totalQuestions * rating)) * 100;
                if (isNaN(percentage) || percentage === 0) {
                    percentage = 0.00;
                } else {
                    percentage = parseFloat(percentage.toFixed(2));
                }
                
                PerformanceAppraisalResponseService.List({
                    Criteria: [[PerformanceAppraisalResponseRow.Fields.FormId], '=', this.FormId]
                }).then((response: ListResponse<any>) => {
                    const existingAnswers = response.Entities;
        
                    const createAnswers = [];
                    const updateAnswers = [];
        
                    answers.forEach(answer => {
                        const existingAnswer = existingAnswers.find(e => e.Question === answer.Question);
        
                        if (existingAnswer) {
                            updateAnswers.push({
                                ...answer,
                                Id: existingAnswer.Id
                            });
                        } else {
                            createAnswers.push(answer);
                        }
                    });
        
                    createAnswers.forEach(answer => {
                        PerformanceAppraisalResponseService.Create({
                            Entity: answer
                        }).then(
                            (response: SaveResponse) => {
                                // console.log('Create successfully:', response);
                                alertDialog("Answer have been saved.");
                            }
                        ).catch(
                            (error: any) => {
                                console.error('Error:', error);
                            }
                        );
                    });
        
                    updateAnswers.forEach(answer => {
                        PerformanceAppraisalResponseService.Update({
                            Entity: answer
                        }).then(
                            (response: SaveResponse) => {
                                // console.log('Update successfully:', response);
                                alertDialog("Answer have been saved.");
                            }
                        ).catch(
                            (error: any) => {
                                console.error('Error:', error);
                            }
                        );
                    });
        
                    PerformanceAppraisalFormService.Update({
                        EntityId: this.FormId,
                        Entity: {
                            SubmissionStatus: 3
                        }
                    }).then(
                        (response: SaveResponse) => {
                            // console.log('Form SubmissionStatus updated to 2:', response);
                        }
                    ).catch(
                        (error: any) => {
                            console.error('Error updating SubmissionStatus:', error);
                        }
                    );

                    PerformanceAppraisalEvaluationService.List({
                        Criteria: [[PerformanceAppraisalEvaluationRow.Fields.FormId], '=', this.FormId]
                    }, evaResponse => {

                        if (evaResponse.Entities.length > 0){
                            PerformanceAppraisalEvaluationService.Update({

                                EntityId: evaResponse.Entities[0].Id,
                                Entity: {
                                    OverallRate: percentage
                                }
                            });
                        } else {
                            PerformanceAppraisalEvaluationService.Create({

                                EntityId: this.FormId,
                                Entity: {
                                    FormId: this.FormId,
                                    OverallRate: percentage
                                }
                            });
                        }

                    });
        
                }).catch((error: any) => {
                    console.error('Error checking FormID:', error);
                });
        
                setTimeout(() => {
                    this.dialogClose();
                    window.location.reload();
                }, 1000);
            });

        });
    }

    public submitData(): void {
        const answers = [];
        let percentage = 0;
        let ratingSum = 0;
        let totalQuestions = 0;
        
        PerformanceAppraisalFormService.List({
            Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', this.FormId]
        }, async formResponse => {
            
            await PerformanceAppraisalTemplateService.List({
                Criteria: [[PerformanceAppraisalTemplateRow.Fields.Id], '=', formResponse.Entities[0].TemplateId]
            }, async tempResponse => {

                let rating = tempResponse.Entities[0].RatingScale;

                $('#questions-container .question-item').each((index, element) => {
                    let answerValue: string;

                    if (this.answertypelst[index] === 2) {
                        answerValue = $(element).find('textarea[name^="answer-"]').val()?.toString() || '';
                    } else if (this.answertypelst[index] === 3) {
                        answerValue = $(element).find('input[name^="answer-"]:checked').val()?.toString() || '';

                        ratingSum = ratingSum + parseInt(answerValue);
                        totalQuestions = totalQuestions + 1;

                    } else {
                        answerValue = $(element).find('input[name^="answer-"]').val()?.toString() || '';
                    }

                    if (this.isEmptyOrNull(answerValue)) {
                        // Q.notifyWarning("Please fill in all required fields.");
                        return false;
                    }

                    const question = this.questionlst[index];
                    const answerType = this.answertypelst[index] === 2 ? 'text' : this.answertypelst[index] === 3 ? 'rating' : this.answertypelst[index];

                    answers.push({
                        Question: question,
                        Answer: answerValue,
                        AnswerType: answerType,
                        FormID: this.FormId
                    });
                });

                percentage = (ratingSum / (totalQuestions * rating)) * 100;
                if (isNaN(percentage) || percentage === 0) {
                    percentage = 0.00;
                }else {
                    percentage = parseFloat(percentage.toFixed(2));
                }

                if (this.validateForm()) {
                    PerformanceAppraisalResponseService.List({
                        Criteria: [[PerformanceAppraisalResponseRow.Fields.FormId], '=', this.FormId]
                    }).then((response: ListResponse<any>) => {
                        const existingAnswers = response.Entities;
    
                        const createAnswers = [];
                        const updateAnswers = [];
    
                        answers.forEach(answer => {
                            const existingAnswer = existingAnswers.find(e => e.Question === answer.Question);
    
                            if (existingAnswer) {
                                updateAnswers.push({
                                    ...answer,
                                    Id: existingAnswer.Id
                                });
                            } else {
                                createAnswers.push(answer);
                            }
                        });
    
                        createAnswers.forEach(answer => {
                            PerformanceAppraisalResponseService.Create({
                                Entity: answer
                            }).then(
                                (response: SaveResponse) => {
                                    // console.log('Create successfully:', response);
                                }
                            ).catch(
                                (error: any) => {
                                    console.error('Error:', error);
                                }
                            );
                        });
    
                        updateAnswers.forEach(answer => {
                            PerformanceAppraisalResponseService.Update({
                                Entity: answer
                            }).then(
                                (response: SaveResponse) => {
                                    // console.log('Update successfully:', response);
                                }
                            ).catch(
                                (error: any) => {
                                    console.error('Error:', error);
                                }
                            );
                        });
    
                        PerformanceAppraisalFormService.Update({
                            EntityId: this.FormId,
                            Entity: {
                                SubmissionStatus: 2
                            }
                        }).then(
                            (response: SaveResponse) => {
                                // console.log('Form SubmissionStatus updated to 2:', response);
                                this.onSaveSuccess({ EntityId: this.FormId });
                            }
                        ).catch(
                            (error: any) => {
                                console.error('Error updating SubmissionStatus:', error);
                            }
                        );
                        
                        PerformanceAppraisalEvaluationService.List({
                            Criteria: [[PerformanceAppraisalEvaluationRow.Fields.FormId], '=', this.FormId]
                        }, evaResponse => {
                            
                            if (evaResponse.Entities.length > 0){
                                PerformanceAppraisalEvaluationService.Update({

                                    EntityId: evaResponse.Entities[0].Id,
                                    Entity: {
                                        OverallRate: percentage
                                    }
                                });
                            } else {
                                PerformanceAppraisalEvaluationService.Create({
                                    Entity: {
                                        FormId: this.FormId,
                                        OverallRate: percentage
                                    }
                                });
                            }
                            
                        });
    
                    }).catch((error: any) => {
                        console.error('Error checking FormID:', error);
                        // Optionally handle errors related to FormID checking
                    });
                }

            });
            
        });
    }

    protected onSaveSuccess(response: SaveResponse): void {
        super.onSaveSuccess(response);
        alertDialog("Your appraisal form have been submitted.");
        
        setTimeout(() => {
            this.dialogClose();
            window.location.reload();
        }, 1000);
    }

    public validateForm(): boolean {
        let isValid = true;
        let hasError = false;

        $('#questions-container .question-item').each((index, element) => {
            let answerValue: string;

            if (this.answertypelst[index] === 2) {
                answerValue = $(element).find('textarea[name^="answer-"]').val()?.toString() || '';
            } else if (this.answertypelst[index] === 3) {
                answerValue = $(element).find('input[name^="answer-"]:checked').val()?.toString() || '';
            } else {
                answerValue = $(element).find('input[name^="answer-"]').val()?.toString() || '';
            }

            if (this.isEmptyOrNull(answerValue)) {
                isValid = false;
                hasError = true;
                $(element).find('input, .rating').addClass('error');

                // remove old error message
                $(element).find('.error-message').remove();
            } else {
                $(element).find('input, .rating').removeClass('error');
                $(element).find('.error-message').remove();
            }
        });

        if (hasError) {
            alertDialog("Please fill in all required fields.");
        }

        return isValid;
    }

}
