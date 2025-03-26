import { StringEditor, LookupEditor, MultipleImageUploadEditor, DateEditor, EnumEditor, BooleanEditor, DecimalEditor, PrefixedContext } from "@serenity-is/corelib";
import { LeaveTypes } from "./LeaveTypes";
import { initFormType } from "@serenity-is/corelib/q";

export interface LeaveApplicationForm {
    EmployeeUpdatedName: StringEditor;
    SuperiorRejectReason: StringEditor;
    HrUpdatedName: StringEditor;
    HrRejectReason: StringEditor;
    EmployeeUpdated: LookupEditor;
    HrUpdated: LookupEditor;
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    LeaveReasonId: LookupEditor;
    LeaveDescriptionID: LookupEditor;
    LeaveDescriptions: StringEditor;
    SupportingDocument: MultipleImageUploadEditor;
    StartDate: DateEditor;
    EndDate: DateEditor;
    HalfDay: EnumEditor;
    MorningSession: BooleanEditor;
    AfternoonSession: BooleanEditor;
    EligibleDay: DecimalEditor;
    BalanceLeave: DecimalEditor;
    LeaveTaken: DecimalEditor;
}

export class LeaveApplicationForm extends PrefixedContext {
    static formKey = 'LeaveApplication.LeaveApplication';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!LeaveApplicationForm.init)  {
            LeaveApplicationForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = MultipleImageUploadEditor;
            var w3 = DateEditor;
            var w4 = EnumEditor;
            var w5 = BooleanEditor;
            var w6 = DecimalEditor;

            initFormType(LeaveApplicationForm, [
                'EmployeeUpdatedName', w0,
                'SuperiorRejectReason', w0,
                'HrUpdatedName', w0,
                'HrRejectReason', w0,
                'EmployeeUpdated', w1,
                'HrUpdated', w1,
                'EmployeeRowId', w1,
                'EmployeeName', w0,
                'LeaveReasonId', w1,
                'LeaveDescriptionID', w1,
                'LeaveDescriptions', w0,
                'SupportingDocument', w2,
                'StartDate', w3,
                'EndDate', w3,
                'HalfDay', w4,
                'MorningSession', w5,
                'AfternoonSession', w5,
                'EligibleDay', w6,
                'BalanceLeave', w6,
                'LeaveTaken', w6
            ]);
        }
    }
}

[LeaveTypes]; // referenced types