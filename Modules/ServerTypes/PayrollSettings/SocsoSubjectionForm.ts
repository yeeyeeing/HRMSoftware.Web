﻿import { BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface SocsoSubjectionForm {
    BasicSalary: BooleanEditor;
    PaymentsForUnutilisedAnnualOrMedicalLeaves: BooleanEditor;
    Bonuses: BooleanEditor;
    Allowances: BooleanEditor;
    Commisions: BooleanEditor;
    Incentives: BooleanEditor;
    ArrearsOfWages: BooleanEditor;
    WagesForMaternityLeave: BooleanEditor;
    WagesForPaternityLeave: BooleanEditor;
    WagesForStudyLeave: BooleanEditor;
    ServiceCharges: BooleanEditor;
    OvertimePayments: BooleanEditor;
    Gratuity: BooleanEditor;
    RetirementBenefits: BooleanEditor;
    TerminationBenefits: BooleanEditor;
    TravelAllowances: BooleanEditor;
    PaymentInLieuOfNoticeOfTerminationOfService: BooleanEditor;
    DirectorFee: BooleanEditor;
    Gifts: BooleanEditor;
}

export class SocsoSubjectionForm extends PrefixedContext {
    static formKey = 'PayrollSettings.SocsoSubjection';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!SocsoSubjectionForm.init)  {
            SocsoSubjectionForm.init = true;

            var w0 = BooleanEditor;

            initFormType(SocsoSubjectionForm, [
                'BasicSalary', w0,
                'PaymentsForUnutilisedAnnualOrMedicalLeaves', w0,
                'Bonuses', w0,
                'Allowances', w0,
                'Commisions', w0,
                'Incentives', w0,
                'ArrearsOfWages', w0,
                'WagesForMaternityLeave', w0,
                'WagesForPaternityLeave', w0,
                'WagesForStudyLeave', w0,
                'ServiceCharges', w0,
                'OvertimePayments', w0,
                'Gratuity', w0,
                'RetirementBenefits', w0,
                'TerminationBenefits', w0,
                'TravelAllowances', w0,
                'PaymentInLieuOfNoticeOfTerminationOfService', w0,
                'DirectorFee', w0,
                'Gifts', w0
            ]);
        }
    }
}