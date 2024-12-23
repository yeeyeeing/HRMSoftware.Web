import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { PerformanceAppraisalTypeForm, PerformanceAppraisalTypeRow, PerformanceAppraisalTypeService } from '../../../ServerTypes/PerformanceAppraisal';
import {PerformanceAppraisalQuestionService} from "@/ServerTypes/PerformanceAppraisal";
import { alertDialog } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.PerformanceAppraisal.PerformanceAppraisalTypeDialog')
export class PerformanceAppraisalTypeDialog extends EntityDialog<PerformanceAppraisalTypeRow, any> {
    protected getFormKey() { return PerformanceAppraisalTypeForm.formKey; }
    protected getRowDefinition() { return PerformanceAppraisalTypeRow; }
    protected getService() { return PerformanceAppraisalTypeService.baseUrl; }

    protected form = new PerformanceAppraisalTypeForm(this.idPrefix);

    protected onDialogOpen() {
        super.onDialogOpen();

        this.element.closest(".ui-dialog").css("top", "20%");
    }

    public list_of_type: string[] = [];

    constructor() {
        super();

        PerformanceAppraisalTypeService.List({
        }, response => {

            for (var key in response.Entities) {

                this.list_of_type.push(response.Entities[key]["Type"].toLowerCase())
            }
        });
    }

    protected save_submitHandler(response): void {
        var list_of_errors: string[] = [];

        var InsertedType = this.form.Type.value.toLowerCase()

        for (let i = 0; i < this.list_of_type.length; i++) {
            if (this.list_of_type[i] === InsertedType) {
                list_of_errors.push("The name of appraisal type is already inserted.");
                break;
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