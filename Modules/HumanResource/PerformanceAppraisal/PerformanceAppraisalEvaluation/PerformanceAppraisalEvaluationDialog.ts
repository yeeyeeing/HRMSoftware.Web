import { Decorators, EntityDialog, SaveResponse} from '@serenity-is/corelib';
import { Authorization } from '@serenity-is/corelib/q';
import { PerformanceAppraisalEvaluationForm, 
    PerformanceAppraisalEvaluationRow, 
    PerformanceAppraisalEvaluationService,
    PerformanceAppraisalFormService,
    PerformanceAppraisalFormRow,
} from '../../../ServerTypes/PerformanceAppraisal';

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalEvaluationDialog')
export class PerformanceAppraisalEvaluationDialog extends EntityDialog<PerformanceAppraisalEvaluationRow, any> {
    protected getFormKey() { return PerformanceAppraisalEvaluationForm.formKey; }
    protected getRowDefinition() { return PerformanceAppraisalEvaluationRow; }
    protected getService() { return PerformanceAppraisalEvaluationService.baseUrl; }

    protected form = new PerformanceAppraisalEvaluationForm(this.idPrefix);

    protected onDialogOpen(): void {
        super.onDialogOpen();

        this.dialogTitle = "Evaluation Form";
        this.cloneButton.hide();
        this.undeleteButton.hide();
        this.localizationButton.hide();
        this.deleteButton.hide();

        this.element.closest(".ui-dialog").css({
            "position": "fixed",
            "left": "2%",
            "transform": "none",
            "height": "730px",
            "width": "800px"
        });
        
        PerformanceAppraisalEvaluationService.Retrieve({
            EntityId: this.entityId
        }, response => {
            console.log(response.Entity.HodSignDate);
            let a = response.Entity.HodSignDate;
            
        })

        PerformanceAppraisalEvaluationService.List({
            Criteria: [[PerformanceAppraisalEvaluationRow.Fields.Id], '=', this.entityId]
        }, async response => {
            if (response.Entities.length > 0) {
                const formId = response.Entities[0].FormId;

                await PerformanceAppraisalFormService.List({
                    Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', formId]
                }, formResponse => {

                    if (formResponse.Entities.length > 0) {

                        let today = new Date();
                        const reviewDueDateStr = formResponse.Entities[0].EvaluateEndDate;
                        const reviewDueDate = new Date(reviewDueDateStr);

                        const approvalDueDateStr = formResponse.Entities[0].ApprovalEndDate;
                        const approvalDueDate = new Date(approvalDueDateStr);
                      
                        if (today >= reviewDueDate){
                            this.form.EmployeeSignature.element.attr('readonly', 'readonly');
                            this.form.Evaluation.element.attr('readonly', 'readonly');
                            this.form.HodSignature.element.attr('readonly', 'readonly');
                            this.form.BonusRate.element.attr('readonly', 'readonly');
                            this.form.Goals.element.attr('readonly', 'readonly');
                            this.form.OverallRate.element.attr('readonly', 'readonly');
                            this.form.Summary.element.attr('readonly', 'readonly');

                            this.form.EmployeeSignature.element.find('input[type="file"]').attr('disabled', 'disabled');
                            this.form.HodSignature.element.find('input[type="file"]').attr('disabled', 'disabled');
                        }

                        if (today >= approvalDueDate){
                            this.form.EmployeeSignature.element.attr('readonly', 'readonly');
                            this.form.Evaluation.element.attr('readonly', 'readonly');
                            this.form.HodSignature.element.attr('readonly', 'readonly');
                            this.form.BonusRate.element.attr('readonly', 'readonly');
                            this.form.Goals.element.attr('readonly', 'readonly');
                            this.form.OverallRate.element.attr('readonly', 'readonly');
                            this.form.Summary.element.attr('readonly', 'readonly');
                            this.form.GeneralManagerSignature.element.attr('readonly', 'readonly');

                            this.form.EmployeeSignature.element.find('input[type="file"]').attr('disabled', 'disabled');
                            this.form.HodSignature.element.find('input[type="file"]').attr('disabled', 'disabled');
                            this.form.GeneralManagerSignature.element.find('input[type="file"]').attr('disabled', 'disabled');

                            this.form.EmployeeSignature.element.find('.tool-button.delete-button').attr('disabled', 'disabled');
                            this.form.HodSignature.element.find('.tool-button.delete-button').attr('disabled', 'disabled');
                            this.form.GeneralManagerSignature.element.find('.tool-button.delete-button').attr('disabled', 'disabled');
                        }

                    } else {
                        console.error('No form found for the given FormId:', formId);
                    }
                });
            } else {
                console.error('No evaluation found for the given Id:', this.entityId);
            }
        });
        

        PerformanceAppraisalEvaluationService.List({
            Criteria: [[PerformanceAppraisalEvaluationRow.Fields.Id], '=', this.entityId]
        }, async response => {
            if (response.Entities.length > 0) {
                const formId = response.Entities[0].FormId;

                await PerformanceAppraisalFormService.List({
                    Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', formId]
                }, formResponse => {
                    
                    if (formResponse.Entities.length > 0) {

                        let today = new Date();
                        const reviewDueDateStr = formResponse.Entities[0].EvaluateEndDate;
                        const reviewDueDate = new Date(reviewDueDateStr);

                        const approvalStartDateStr = formResponse.Entities[0].ApprovalStartDate;
                        const approvalStartDate = new Date(approvalStartDateStr);

                        const approvalDueDateStr = formResponse.Entities[0].ApprovalEndDate;
                        const approvalDueDate = new Date(approvalDueDateStr);
                        
                        for (var index of formResponse.Entities){
                            if (index.Id === formId){
                                let reviewStatus = index.ReviewStatus;

                                if (reviewStatus === 4) {
                                    $('div.field.EmployeeSignature > label[title="Employee Signature"]').parent().hide();
                                    $('div.field.GeneralManagerSignature > label[title="General Manager Signature"]').parent().hide();
                                }
                                if (reviewStatus === 5) {
                                    $('div.field.GeneralManagerSignature > label[title="General Manager Signature"]').parent().hide();
                                }
                                if (reviewStatus === 6) {
                                    
                                    if (today < approvalStartDate ){
                                        $('div.field.GeneralManagerSignature > label[title="General Manager Signature"]').parent().hide();
                                    }
                                    
                                }
                            }
                        }
                    } else {
                        console.error('No form found for the given FormId:', formId);
                    }
                });
            } else {
                console.error('No evaluation found for the given Id:', this.entityId);
            }
        });

    }

    protected onSaveSuccess(response: SaveResponse): void {
        super.onSaveSuccess(response);

        PerformanceAppraisalEvaluationService.List({
            Criteria: [[PerformanceAppraisalEvaluationRow.Fields.Id], '=', this.entityId]
        }, response => {

            let today = new Date();
            let klTime = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }));

            let year = klTime.getFullYear();
            let month = String(klTime.getMonth() + 1).padStart(2, '0');
            let day = String(klTime.getDate()).padStart(2, '0');
            let hours = String(klTime.getHours()).padStart(2, '0');
            let minutes = String(klTime.getMinutes()).padStart(2, '0');
            let seconds = String(klTime.getSeconds()).padStart(2, '0');

            let currentTodayDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            PerformanceAppraisalFormService.List({
                Criteria: [[PerformanceAppraisalFormRow.Fields.Id], '=', response.Entities[0].FormId]
            }, formresponse1 => {

                if (response.Entities[0].HodSignature && response.Entities[0].HodSignature.length > 0 && formresponse1.Entities[0].ReviewStatus === 4) {
                    PerformanceAppraisalFormService.Update({
                        EntityId: response.Entities[0].FormId,
                        Entity: {
                            ReviewStatus: 5
                        }
                    }).then(
                        (response: SaveResponse) => {
                           
                            PerformanceAppraisalEvaluationService.Update({
                                EntityId: this.entityId,
                                Entity: {
                                    HodSignDate: currentTodayDateTime,
                                    HodSignID: Authorization.userDefinition.UserId
                                }
                            })
                        }
                    ).catch(
                        (error: any) => {
                            console.error('Error updating ReviewStatus:', error);
                        }
                    );
                    
                }

                if (response.Entities[0].EmployeeSignature && response.Entities[0].EmployeeSignature.length > 0 && formresponse1.Entities[0].ReviewStatus === 5) {
                    PerformanceAppraisalFormService.Update({
                        EntityId: response.Entities[0].FormId,
                        Entity: {
                            ReviewStatus: 6
                        }
                    }).then(
                        (response: SaveResponse) => {
                            PerformanceAppraisalEvaluationService.Update({
                                EntityId: this.entityId,
                                Entity: {
                                    EmployeeSignDate: currentTodayDateTime,
                                    EmployeeSignID: Authorization.userDefinition.UserId
                                }
                            })
                        }
                    ).catch(
                        (error: any) => {
                            console.error('Error updating ReviewStatus:', error);
                        }
                    );
                }

                if (response.Entities[0].GeneralManagerSignature && response.Entities[0].GeneralManagerSignature.length > 0 && formresponse1.Entities[0].ReviewStatus === 6) {
                    PerformanceAppraisalFormService.Update({
                        EntityId: response.Entities[0].FormId,
                        Entity: {
                            ReviewStatus: 7
                        }
                    }).then(
                        (response: SaveResponse) => {
                            PerformanceAppraisalEvaluationService.Update({
                                EntityId: this.entityId,
                                Entity: {
                                    GeneralManagerSignDate: currentTodayDateTime,
                                    GeneralManagerSignID: Authorization.userDefinition.UserId
                                }
                            })
                        }
                    ).catch(
                        (error: any) => {
                            console.error('Error updating ReviewStatus:', error);
                        }
                    );
                }
                
            })
            
        });

    }
}