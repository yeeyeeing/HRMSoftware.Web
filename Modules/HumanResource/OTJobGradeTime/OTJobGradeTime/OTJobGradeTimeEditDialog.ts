import { Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import { GridEditorDialog } from "@serenity-is/extensions";
import { alertDialog } from '@serenity-is/corelib/q';
import { OTJobGradeTimeForm, OTJobGradeTimeRow } from '../../../ServerTypes/OTJobGradeTime';

@Decorators.registerClass('HRMSoftware.OTJobGradeTime.OTJobGradeTimeEditDialog')
export class OTJobGradeTimeEditDialog extends GridEditorDialog<OTJobGradeTimeRow> {
    protected getFormKey() { return OTJobGradeTimeForm.formKey; }
    protected getLocalTextPrefix() { return OTJobGradeTimeRow.localTextPrefix; }

    protected form: OTJobGradeTimeForm;
    public StartingRange: number[] = [];
    public EndingRange: number[] = [];

    constructor() {
        super();
        this.form = new OTJobGradeTimeForm(this.idPrefix);

    }

    protected save_submitHandler(response: SaveResponse):
        void {
       
        super.save_submitHandler(response)




    }






}