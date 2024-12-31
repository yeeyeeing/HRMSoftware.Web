import { StringEditor, LookupEditor, DecimalEditor, DateEditor, TextAreaEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface EmployeeAllowanceForm {
    AllowanceCode: StringEditor;
    MasterAllowanceId: LookupEditor;
    Amount: DecimalEditor;
    EffectiveFrom: DateEditor;
    EffectiveUntil: DateEditor;
    Description: TextAreaEditor;
    Recurring: BooleanEditor;
    OneTime: BooleanEditor;
    PaidOneTime: BooleanEditor;
    AllowanceSubjections: BooleanEditor;
    FullAttendance: BooleanEditor;
    NoLate: BooleanEditor;
    NoAbsence: BooleanEditor;
    NoEarlyLeaving: BooleanEditor;
    ExemptUnpaidLeave: BooleanEditor;
    ExemptHospitalisationLeave: BooleanEditor;
    ExemptSickLeave: BooleanEditor;
    ExemptAnnualLeave: BooleanEditor;
    ExemptMaternityLeave: BooleanEditor;
    ExemptPaternityLeave: BooleanEditor;
    ExemptMarriageLeave: BooleanEditor;
    ExemptCompassionateLeave: BooleanEditor;
    ExemptEmergencyLeave: BooleanEditor;
    ExemptGatepassLeave: BooleanEditor;
    SubjectionEis: BooleanEditor;
    SubjectionEpf: BooleanEditor;
    SubjectionHrdf: BooleanEditor;
    SubjectionPcb: BooleanEditor;
    SubjectionSocso: BooleanEditor;
    SubjectionOt: BooleanEditor;
}

export class EmployeeAllowanceForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.EmployeeAllowance';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeAllowanceForm.init)  {
            EmployeeAllowanceForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = DecimalEditor;
            var w3 = DateEditor;
            var w4 = TextAreaEditor;
            var w5 = BooleanEditor;

            initFormType(EmployeeAllowanceForm, [
                'AllowanceCode', w0,
                'MasterAllowanceId', w1,
                'Amount', w2,
                'EffectiveFrom', w3,
                'EffectiveUntil', w3,
                'Description', w4,
                'Recurring', w5,
                'OneTime', w5,
                'PaidOneTime', w5,
                'AllowanceSubjections', w5,
                'FullAttendance', w5,
                'NoLate', w5,
                'NoAbsence', w5,
                'NoEarlyLeaving', w5,
                'ExemptUnpaidLeave', w5,
                'ExemptHospitalisationLeave', w5,
                'ExemptSickLeave', w5,
                'ExemptAnnualLeave', w5,
                'ExemptMaternityLeave', w5,
                'ExemptPaternityLeave', w5,
                'ExemptMarriageLeave', w5,
                'ExemptCompassionateLeave', w5,
                'ExemptEmergencyLeave', w5,
                'ExemptGatepassLeave', w5,
                'SubjectionEis', w5,
                'SubjectionEpf', w5,
                'SubjectionHrdf', w5,
                'SubjectionPcb', w5,
                'SubjectionSocso', w5,
                'SubjectionOt', w5
            ]);
        }
    }
}