import { IntegerEditor, EnumEditor, DateEditor, StringEditor, LookupEditor, BooleanEditor, PrefixedContext } from "@serenity-is/corelib";
import { TextClass } from "./TextClass";
import { TextFormatEisSocso } from "./TextFormatEisSocso";
import { TextFormatEpf } from "./TextFormatEpf";
import { TextFormatAutopay } from "./TextFormatAutopay";
import { TextFormatLHDN } from "./TextFormatLHDN";
import { initFormType } from "@serenity-is/corelib/q";

export interface TextDownloadingWizardForm {
    PayMonth: IntegerEditor;
    PayYear: IntegerEditor;
    TextType: EnumEditor;
    CreditingDate: DateEditor;
    OrganisationName: StringEditor;
    OrganisationCode: StringEditor;
    Email: StringEditor;
    PhoneNumber: StringEditor;
    ContactPerson: StringEditor;
    StateCodeId: LookupEditor;
    TextFormatEisSocsoId: EnumEditor;
    TextFormatEpfId: EnumEditor;
    TextFormatAutopayId: EnumEditor;
    TextFormatLhdnId: EnumEditor;
    OccupationList: LookupEditor;
    DepartmentList: LookupEditor;
    DivisionList: LookupEditor;
    JobGradeList: LookupEditor;
    SectionList: LookupEditor;
    EmployeeRowListBuffer: LookupEditor;
    EmployeeRowList: LookupEditor;
    All: BooleanEditor;
}

export class TextDownloadingWizardForm extends PrefixedContext {
    static formKey = 'PayrollSettings.TextDownloadingWizardForm';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!TextDownloadingWizardForm.init)  {
            TextDownloadingWizardForm.init = true;

            var w0 = IntegerEditor;
            var w1 = EnumEditor;
            var w2 = DateEditor;
            var w3 = StringEditor;
            var w4 = LookupEditor;
            var w5 = BooleanEditor;

            initFormType(TextDownloadingWizardForm, [
                'PayMonth', w0,
                'PayYear', w0,
                'TextType', w1,
                'CreditingDate', w2,
                'OrganisationName', w3,
                'OrganisationCode', w3,
                'Email', w3,
                'PhoneNumber', w3,
                'ContactPerson', w3,
                'StateCodeId', w4,
                'TextFormatEisSocsoId', w1,
                'TextFormatEpfId', w1,
                'TextFormatAutopayId', w1,
                'TextFormatLhdnId', w1,
                'OccupationList', w4,
                'DepartmentList', w4,
                'DivisionList', w4,
                'JobGradeList', w4,
                'SectionList', w4,
                'EmployeeRowListBuffer', w4,
                'EmployeeRowList', w4,
                'All', w5
            ]);
        }
    }
}

[TextClass, TextFormatEisSocso, TextFormatEpf, TextFormatAutopay, TextFormatLHDN]; // referenced types