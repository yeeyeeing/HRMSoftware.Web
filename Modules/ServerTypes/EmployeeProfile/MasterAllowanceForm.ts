import { StringEditor, DecimalEditor, TextAreaEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterAllowanceForm {
    AllowanceCode: StringEditor;
    Amount: DecimalEditor;
    Description: TextAreaEditor;
    Recurring: BooleanEditor;
    OneTime: BooleanEditor;
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
    SubjectionSocso: BooleanEditor;
    SubjectionPcb: BooleanEditor;
    SubjectionHrdf: BooleanEditor;
    SubjectionOt: BooleanEditor;
}

export class MasterAllowanceForm extends PrefixedContext {
    static formKey = 'EmployeeProfile.MasterAllowance';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterAllowanceForm.init)  {
            MasterAllowanceForm.init = true;

            var w0 = StringEditor;
            var w1 = DecimalEditor;
            var w2 = TextAreaEditor;
            var w3 = BooleanEditor;

            initFormType(MasterAllowanceForm, [
                'AllowanceCode', w0,
                'Amount', w1,
                'Description', w2,
                'Recurring', w3,
                'OneTime', w3,
                'AllowanceSubjections', w3,
                'FullAttendance', w3,
                'NoLate', w3,
                'NoAbsence', w3,
                'NoEarlyLeaving', w3,
                'ExemptUnpaidLeave', w3,
                'ExemptHospitalisationLeave', w3,
                'ExemptSickLeave', w3,
                'ExemptAnnualLeave', w3,
                'ExemptMaternityLeave', w3,
                'ExemptPaternityLeave', w3,
                'ExemptMarriageLeave', w3,
                'ExemptCompassionateLeave', w3,
                'ExemptEmergencyLeave', w3,
                'ExemptGatepassLeave', w3,
                'SubjectionEis', w3,
                'SubjectionEpf', w3,
                'SubjectionSocso', w3,
                'SubjectionPcb', w3,
                'SubjectionHrdf', w3,
                'SubjectionOt', w3
            ]);
        }
    }
}