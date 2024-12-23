import { DateEditor, IntegerEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface OTReasonForm {
    InsertDate: DateEditor;
    UpdateDate: DateEditor;
    DeleteDate: DateEditor;
    IsActive: IntegerEditor;
    InsertUserId: IntegerEditor;
    DeleteUserId: IntegerEditor;
    UpdateUserId: IntegerEditor;
    OtReason: StringEditor;
    Description: StringEditor;
}

export class OTReasonForm extends PrefixedContext {
    static formKey = 'OTApplication.OTReason';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!OTReasonForm.init)  {
            OTReasonForm.init = true;

            var w0 = DateEditor;
            var w1 = IntegerEditor;
            var w2 = StringEditor;

            initFormType(OTReasonForm, [
                'InsertDate', w0,
                'UpdateDate', w0,
                'DeleteDate', w0,
                'IsActive', w1,
                'InsertUserId', w1,
                'DeleteUserId', w1,
                'UpdateUserId', w1,
                'OtReason', w2,
                'Description', w2
            ]);
        }
    }
}