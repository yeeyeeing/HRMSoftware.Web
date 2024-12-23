import { Decorators, EditorUtils, EntityDialog, Select2Editor } from '@serenity-is/corelib';
import { AnnualLeaveJobGradePolicyRow, AnnualLeaveJobGradePolicyForm, AnnualLeaveJobGradePolicyService } from '../../../ServerTypes/AnnualLeaveJobGradePolicy';
import { GridEditorDialog } from "@serenity-is/extensions";
import { alertDialog } from '@serenity-is/corelib/q';
import { JobGradeService } from '../../../ServerTypes/JobGrade';
@Decorators.registerClass('HRMSoftware.AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicyEditDialog')
export class AnnualLeaveJobGradePolicyEditDialog extends GridEditorDialog<AnnualLeaveJobGradePolicyRow> {
    protected getFormKey() { return AnnualLeaveJobGradePolicyForm.formKey; }
    protected getLocalTextPrefix() { return AnnualLeaveJobGradePolicyRow.localTextPrefix; }

    protected form: AnnualLeaveJobGradePolicyForm;
    public StartingRange: number[] = [];
    public EndingRange: number[] = [];

    constructor() {
        super();
        this.form = new AnnualLeaveJobGradePolicyForm(this.idPrefix);

    }

    protected onDialogOpen() {
        super.onDialogOpen()


   
    }


    protected save_submitHandler(response):
        void {
       
        super.save_submitHandler(response)




    }






}