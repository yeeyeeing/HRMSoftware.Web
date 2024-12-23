import { ProgramFlowType } from "./ProgramFlowType";
import { EnumEditor, DateEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { ProgramGradeType } from "./ProgramGradeType";
import { ProgramGradeResponseEditor } from "@/HumanResource/TrainingManagement/ProgramParticipant/ProgramGradeResponseEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface ProgramFlowGradeForm {
    FlowType: EnumEditor;
    GradeType: EnumEditor;
    Date: DateEditor;
    Remark: StringEditor;
    ParticipantList: ProgramGradeResponseEditor;
}

export class ProgramFlowGradeForm extends PrefixedContext {
    static formKey = 'TrainingManagement.ProgramFlowGradeForm';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ProgramFlowGradeForm.init)  {
            ProgramFlowGradeForm.init = true;

            var w0 = EnumEditor;
            var w1 = DateEditor;
            var w2 = StringEditor;
            var w3 = ProgramGradeResponseEditor;

            initFormType(ProgramFlowGradeForm, [
                'FlowType', w0,
                'GradeType', w0,
                'Date', w1,
                'Remark', w2,
                'ParticipantList', w3
            ]);
        }
    }
}

[ProgramFlowType, ProgramGradeType]; // referenced types