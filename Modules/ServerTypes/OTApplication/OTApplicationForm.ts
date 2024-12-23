import { StringEditor, LookupEditor, DecimalEditor, DateEditor, TextAreaEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { OTReasonDialog } from "@/HumanResource/OTApplication/OTReason/OTReasonDialog";
import { initFormType } from "@serenity-is/corelib/q";

export interface OTApplicationForm {
    EmployeeUpdatedName: StringEditor;
    HrUpdatedName: StringEditor;
    EmployeeUpdated: LookupEditor;
    HrUpdated: LookupEditor;
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    OtRate: DecimalEditor;
    OtReasonId: LookupEditor;
    OtDate: DateEditor;
    StartingAt: StringEditor;
    EndingAt: StringEditor;
    OTDescription: TextAreaEditor;
    WeekendOt: BooleanEditor;
    PublicHolidayOt: BooleanEditor;
    WeekdayOt: BooleanEditor;
}

export class OTApplicationForm extends PrefixedContext {
    static formKey = 'OTApplication.OTApplication';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!OTApplicationForm.init)  {
            OTApplicationForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = DecimalEditor;
            var w3 = DateEditor;
            var w4 = TextAreaEditor;
            var w5 = BooleanEditor;

            initFormType(OTApplicationForm, [
                'EmployeeUpdatedName', w0,
                'HrUpdatedName', w0,
                'EmployeeUpdated', w1,
                'HrUpdated', w1,
                'EmployeeRowId', w1,
                'EmployeeName', w0,
                'OtRate', w2,
                'OtReasonId', w1,
                'OtDate', w3,
                'StartingAt', w0,
                'EndingAt', w0,
                'OTDescription', w4,
                'WeekendOt', w5,
                'PublicHolidayOt', w5,
                'WeekdayOt', w5
            ]);
        }
    }
}

[OTReasonDialog]; // referenced types