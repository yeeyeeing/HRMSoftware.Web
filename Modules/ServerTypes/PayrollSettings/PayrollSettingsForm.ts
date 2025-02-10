import { BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface PayrollSettingsForm {
    SeperateBonus: BooleanEditor;
    AnnualizedBonus: BooleanEditor;
    SeperateIncentive: BooleanEditor;
    AnnualizedIncentive: BooleanEditor;
    BonusSubjectEpf: BooleanEditor;
    BonusSubjectSocso: BooleanEditor;
    BonusSubjectEis: BooleanEditor;
    BonusSubjectHrdf: BooleanEditor;
    BonusSubjectPcb: BooleanEditor;
    IncentiveSubjectEpf: BooleanEditor;
    IncentiveSubjectSocso: BooleanEditor;
    IncentiveSubjectEis: BooleanEditor;
    IncentiveSubjectHrdf: BooleanEditor;
    IncentiveSubjectPcb: BooleanEditor;
}

export class PayrollSettingsForm extends PrefixedContext {
    static formKey = 'PayrollSettings.PayrollSettings';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PayrollSettingsForm.init)  {
            PayrollSettingsForm.init = true;

            var w0 = BooleanEditor;

            initFormType(PayrollSettingsForm, [
                'SeperateBonus', w0,
                'AnnualizedBonus', w0,
                'SeperateIncentive', w0,
                'AnnualizedIncentive', w0,
                'BonusSubjectEpf', w0,
                'BonusSubjectSocso', w0,
                'BonusSubjectEis', w0,
                'BonusSubjectHrdf', w0,
                'BonusSubjectPcb', w0,
                'IncentiveSubjectEpf', w0,
                'IncentiveSubjectSocso', w0,
                'IncentiveSubjectEis', w0,
                'IncentiveSubjectHrdf', w0,
                'IncentiveSubjectPcb', w0
            ]);
        }
    }
}