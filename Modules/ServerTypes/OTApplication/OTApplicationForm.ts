import { StringEditor, LookupEditor, DateEditor, DecimalEditor, TextAreaEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface OTApplicationForm {
    EmployeeUpdatedName: StringEditor;
    SuperiorRejectReason: StringEditor;
    HrUpdatedName: StringEditor;
    HrRejectReason: StringEditor;
    EmployeeUpdated: LookupEditor;
    HrUpdated: LookupEditor;
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    OtReasonId: LookupEditor;
    OtDate: DateEditor;
    OtRate: DecimalEditor;
    StartingAt: StringEditor;
    EndingAt: StringEditor;
    OtHourBuffer: DecimalEditor;
    OtPayBuffer: DecimalEditor;
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
            var w2 = DateEditor;
            var w3 = DecimalEditor;
            var w4 = TextAreaEditor;
            var w5 = BooleanEditor;

            initFormType(OTApplicationForm, [
                'EmployeeUpdatedName', w0,
                'SuperiorRejectReason', w0,
                'HrUpdatedName', w0,
                'HrRejectReason', w0,
                'EmployeeUpdated', w1,
                'HrUpdated', w1,
                'EmployeeRowId', w1,
                'EmployeeName', w0,
                'OtReasonId', w1,
                'OtDate', w2,
                'OtRate', w3,
                'StartingAt', w0,
                'EndingAt', w0,
                'OtHourBuffer', w3,
                'OtPayBuffer', w3,
                'OTDescription', w4,
                'WeekendOt', w5,
                'PublicHolidayOt', w5,
                'WeekdayOt', w5
            ]);
        }
    }
}