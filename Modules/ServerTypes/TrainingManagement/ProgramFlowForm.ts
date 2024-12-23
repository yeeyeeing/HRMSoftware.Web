import { ProgramFlowType } from "./ProgramFlowType";
import { EnumEditor, DateEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { ProgramGradeType } from "./ProgramGradeType";
import { initFormType } from "@serenity-is/corelib/q";

export interface ProgramFlowForm {
    FlowType: EnumEditor;
    GradeType: EnumEditor;
    Date: DateEditor;
    Remark: StringEditor;
}

export class ProgramFlowForm extends PrefixedContext {
    static formKey = 'TrainingManagement.ProgramFlow';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ProgramFlowForm.init)  {
            ProgramFlowForm.init = true;

            var w0 = EnumEditor;
            var w1 = DateEditor;
            var w2 = StringEditor;

            initFormType(ProgramFlowForm, [
                'FlowType', w0,
                'GradeType', w0,
                'Date', w1,
                'Remark', w2
            ]);
        }
    }
}

[ProgramFlowType, ProgramGradeType]; // referenced types