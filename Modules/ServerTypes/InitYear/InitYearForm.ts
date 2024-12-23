import { IntegerEditor, EnumEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { LeaveCarryForward } from "./LeaveCarryForward";
import { AnnualLeavePolicyEditor } from "@/HumanResource/AnnualLeavePolicy/AnnualLeavePolicy/AnnualLeavePolicyEditor";
import { AnnualLeaveJobGradePolicyEditor } from "@/HumanResource/AnnualLeaveJobGradePolicy/AnnualLeaveJobGradePolicy/AnnualLeaveJobGradePolicyEditor";
import { SickLeavePolicyEditor } from "@/HumanResource/SickLeavePolicy/SickLeavePolicy/SickLeavePolicyEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface InitYearForm {
    Year: IntegerEditor;
    LeaveBringForwardMethod: EnumEditor;
    HospitalisationLeave: IntegerEditor;
    PaternityLeave: IntegerEditor;
    MaternityLeave: IntegerEditor;
    CompassionateLeave: IntegerEditor;
    MarriageLeave: IntegerEditor;
    MonthOfServiceToEligibleForMaternityLeave: IntegerEditor;
    MonthOfServiceToEligibleForPaternityLeave: IntegerEditor;
    BringForwardDays: IntegerEditor;
    BringForwardPercentage: IntegerEditor;
    LeaveRoundUp: BooleanEditor;
    PolicyList: AnnualLeavePolicyEditor;
    AnnulLeaveBasedOnJobGrade: AnnualLeaveJobGradePolicyEditor;
    SickLeavePolicyList: SickLeavePolicyEditor;
}

export class InitYearForm extends PrefixedContext {
    static formKey = 'HumanResource.InitYear.InitYear';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!InitYearForm.init)  {
            InitYearForm.init = true;

            var w0 = IntegerEditor;
            var w1 = EnumEditor;
            var w2 = BooleanEditor;
            var w3 = AnnualLeavePolicyEditor;
            var w4 = AnnualLeaveJobGradePolicyEditor;
            var w5 = SickLeavePolicyEditor;

            initFormType(InitYearForm, [
                'Year', w0,
                'LeaveBringForwardMethod', w1,
                'HospitalisationLeave', w0,
                'PaternityLeave', w0,
                'MaternityLeave', w0,
                'CompassionateLeave', w0,
                'MarriageLeave', w0,
                'MonthOfServiceToEligibleForMaternityLeave', w0,
                'MonthOfServiceToEligibleForPaternityLeave', w0,
                'BringForwardDays', w0,
                'BringForwardPercentage', w0,
                'LeaveRoundUp', w2,
                'PolicyList', w3,
                'AnnulLeaveBasedOnJobGrade', w4,
                'SickLeavePolicyList', w5
            ]);
        }
    }
}

[LeaveCarryForward]; // referenced types