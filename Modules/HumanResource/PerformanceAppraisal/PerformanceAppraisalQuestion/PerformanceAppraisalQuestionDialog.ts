import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { PerformanceAppraisalQuestionForm, 
    PerformanceAppraisalQuestionRow, 
    PerformanceAppraisalQuestionService,
    PerformanceAppraisalQuestionAnswerType} from '../../../ServerTypes/PerformanceAppraisal';
import { alertDialog } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalQuestionDialog')
export class PerformanceAppraisalQuestionDialog extends EntityDialog<PerformanceAppraisalQuestionRow, any> {
    protected getFormKey() { return PerformanceAppraisalQuestionForm.formKey; }
    protected getRowDefinition() { return PerformanceAppraisalQuestionRow; }
    protected getService() { return PerformanceAppraisalQuestionService.baseUrl; }

    protected form = new PerformanceAppraisalQuestionForm(this.idPrefix);

    protected onDialogOpen() {
        super.onDialogOpen();

        this.element.closest(".ui-dialog").css("top", "10%");
    }

    protected afterLoadEntity() {
        super.afterLoadEntity();

        // Set the active tab to "Test2"
        this.element.find('.s-Dialog-Tabs').tabs('option', 'active', 2);
    }

    public list_of_question: string[] = [];
    public list_of_answerType: number[] = [];
    
    constructor() {
        super();

        PerformanceAppraisalQuestionService.List({
        }, response => {

            for (var key in response.Entities) {

                this.list_of_question.push(response.Entities[key]["Questions"].toLowerCase())
                this.list_of_answerType.push(response.Entities[key]["AnswerType"])
            }
        });
    }

    protected save_submitHandler(response): void {
        var list_of_errors: string[] = [];

        var InsertedQuestion = this.form.Questions.value.toLowerCase()
        const insertedAnswerTypeStr = this.form.AnswerType.value;
        const InsertedAnswerType = parseInt(insertedAnswerTypeStr, 10);
        
        for (let i = 0; i < this.list_of_question.length; i++) {
            if (this.list_of_question[i] === InsertedQuestion) {
                if (this.list_of_answerType[i] === InsertedAnswerType) {
                    list_of_errors.push("This question with the same answer type is already inserted.");
                    break; 
                }
            }
        }

        if (list_of_errors.length > 0) {
            const concatenatedString: string = list_of_errors.map(item => `${item}`).join('\n');
            alertDialog(concatenatedString)
        }
        else
            super.save_submitHandler(response)
    }
}