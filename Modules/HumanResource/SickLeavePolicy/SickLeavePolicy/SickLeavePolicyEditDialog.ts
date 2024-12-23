import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { SickLeavePolicyForm, SickLeavePolicyRow, SickLeavePolicyService } from '../../../ServerTypes/SickLeavePolicy';
import { GridEditorDialog } from "@serenity-is/extensions";
import { alertDialog } from '@serenity-is/corelib/q';

@Decorators.registerClass('HRMSoftware.SickLeavePolicy.SickLeavePolicyEditDialog')
export class SickLeavePolicyEditDialog extends GridEditorDialog<SickLeavePolicyRow> {
    protected getFormKey() { return SickLeavePolicyForm.formKey; }
    protected getLocalTextPrefix() { return SickLeavePolicyRow.localTextPrefix; }
 
    protected form: SickLeavePolicyForm;
    public StartingRange: number[] = [];
    public EndingRange: number[] = [];

    constructor() {
        super();
        this.form = new SickLeavePolicyForm(this.idPrefix);

    }


    protected initDialog(dialog: SickLeavePolicyEditDialog) {
        super.initDialog(dialog);

       
        // EditorUtils.setReadonly(this.form.Year.element, true);
    }

    protected save_submitHandler(response: SaveResponse): void {

        if (this.form.ServiceFromYear.value < 0) {
            alertDialog('Service From Year Cannot be less than 0')
            return
        }

        if (this.form.ServiceUntilYear.value < 0) {
            alertDialog('Service Until Year Cannot be less than 0')
            return
        }

        if (this.form.ServiceUntilYear.value > 99) {
            alertDialog('Service Until Year must be less than 99')
            return
        }

        if (this.form.ServiceUntilYear.value - this.form.ServiceFromYear.value < 0) {
            alertDialog('Service Until Year must be greater than Service From Year')
            return
        }

        /*
        function generateRange(start: number, end: number): number[] {
            const range: number[] = [];
            for (let i = start; i <= end; i++) {
                range.push(i);
            }
            return range;
        }

        function checkOverlap(list1: number[], list2: number[]): boolean {
            return list1.some(num => list2.includes(num));
        }
        var FromYear = this.form.ServiceFromYear.value
        var Until = this.form.ServiceUntilYear.value
        var interval1: number[] = generateRange(FromYear, Until);

        for (var index in this.StartingRange)
        {
            var StartingNumber = this.StartingRange[index]
            var EndingNumber = this.EndingRange[index]
            var interval2: number[] = generateRange(StartingNumber, EndingNumber);

            if (checkOverlap(interval1, interval2))
            {
                alertDialog('interval overlapping')
                return
            }

        }
        */
        super.save_submitHandler(response)



        // super.save_submitHandler(response)


    }

}