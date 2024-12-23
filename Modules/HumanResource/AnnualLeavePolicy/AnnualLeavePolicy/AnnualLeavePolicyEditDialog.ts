import {  Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import { AnnualLeavePolicyForm, AnnualLeavePolicyRow, AnnualLeavePolicyService } from '../../../ServerTypes/AnnualLeavePolicy';
import { GridEditorDialog } from "@serenity-is/extensions";
import { alertDialog } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.AnnualLeavePolicy.AnnualLeavePolicyEditDialog')
export class AnnualLeavePolicyEditDialog extends GridEditorDialog<AnnualLeavePolicyRow> {
    protected getFormKey() { return AnnualLeavePolicyForm.formKey; }
    protected getLocalTextPrefix() { return AnnualLeavePolicyRow.localTextPrefix; }

    protected form: AnnualLeavePolicyForm;
    public StartingRange: number[] = [];
    public EndingRange: number[] = [];

    constructor() {
        super();
        this.form = new AnnualLeavePolicyForm(this.idPrefix);

    }

    /*
    protected initDialog(dialog)
    {
        super.initDialog(dialog);
        
        AnnualLeavePolicyService.List({
        }, response => {

            for (var index in response.Entities)
            {

                console.log(this.form.idPrefix)
                console.log(this.form.byId)
                this.StartingRange.push(response.Entities[index].ServiceFromYear)
                this.EndingRange.push(response.Entities[index].ServiceUntilYear)
            }


        });
        

       // EditorUtils.setReadonly(this.form.Year.element, true);
    }
    */

    protected save_submitHandler(response):
        void {

        if (this.form.ServiceFromYear.value < 0) {
            alertDialog('Service From Year Cannot be less than 0')
            return
        }

        if (this.form.ServiceUntilYear.value < 0) {
            alertDialog('Service Until Year Cannot be less than 0')
            return
        }

        if (this.form.ServiceUntilYear.value >99) {
            alertDialog('Service Until Year must be less than 99')
            return
        }

        if (this.form.ServiceUntilYear.value - this.form.ServiceFromYear.value < 0) {
            alertDialog('Service Until Year must be greater than Service From Year')
            return
        }


       
        super.save_submitHandler(response)
        



    }






}