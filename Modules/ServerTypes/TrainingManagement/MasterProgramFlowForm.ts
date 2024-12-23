import { ProgramFlowType } from "./ProgramFlowType";
import { EnumEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { ProgramGradeType } from "./ProgramGradeType";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterProgramFlowForm {
    FlowType: EnumEditor;
    GradeType: EnumEditor;
    Remark: StringEditor;
}

export class MasterProgramFlowForm extends PrefixedContext {
    static formKey = 'TrainingManagement.MasterProgramFlow';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterProgramFlowForm.init)  {
            MasterProgramFlowForm.init = true;

            var w0 = EnumEditor;
            var w1 = StringEditor;

            initFormType(MasterProgramFlowForm, [
                'FlowType', w0,
                'GradeType', w0,
                'Remark', w1
            ]);
        }
    }
}

[ProgramFlowType, ProgramGradeType]; // referenced types