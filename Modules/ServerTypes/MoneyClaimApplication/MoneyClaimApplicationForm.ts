import { StringEditor, LookupEditor, DateEditor, DecimalEditor, BooleanEditor, TextAreaEditor, MultipleImageUploadEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface MoneyClaimApplicationForm {
    EmployeeUpdatedName: StringEditor;
    SuperiorRejectReason: StringEditor;
    HrUpdatedName: StringEditor;
    HrRejectReason: StringEditor;
    EmployeeUpdated: LookupEditor;
    HrUpdated: LookupEditor;
    EmployeeRowId: LookupEditor;
    EmployeeName: StringEditor;
    ClaimingDate: DateEditor;
    ClaimAmount: DecimalEditor;
    ClaimReasonId: LookupEditor;
    ClaimingCategory: StringEditor;
    SubjectionEis: BooleanEditor;
    SubjectionEpf: BooleanEditor;
    SubjectionHrdf: BooleanEditor;
    SubjectionPcb: BooleanEditor;
    SubjectionSocso: BooleanEditor;
    Description: TextAreaEditor;
    SupportingDocument: MultipleImageUploadEditor;
}

export class MoneyClaimApplicationForm extends PrefixedContext {
    static formKey = 'MoneyClaimApplication.MoneyClaimApplication';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MoneyClaimApplicationForm.init)  {
            MoneyClaimApplicationForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = DateEditor;
            var w3 = DecimalEditor;
            var w4 = BooleanEditor;
            var w5 = TextAreaEditor;
            var w6 = MultipleImageUploadEditor;

            initFormType(MoneyClaimApplicationForm, [
                'EmployeeUpdatedName', w0,
                'SuperiorRejectReason', w0,
                'HrUpdatedName', w0,
                'HrRejectReason', w0,
                'EmployeeUpdated', w1,
                'HrUpdated', w1,
                'EmployeeRowId', w1,
                'EmployeeName', w0,
                'ClaimingDate', w2,
                'ClaimAmount', w3,
                'ClaimReasonId', w1,
                'ClaimingCategory', w0,
                'SubjectionEis', w4,
                'SubjectionEpf', w4,
                'SubjectionHrdf', w4,
                'SubjectionPcb', w4,
                'SubjectionSocso', w4,
                'Description', w5,
                'SupportingDocument', w6
            ]);
        }
    }
}