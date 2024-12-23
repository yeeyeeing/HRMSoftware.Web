import { ProgramFlowType } from "./ProgramFlowType";
import { EnumEditor, DateEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { ProgramGradeType } from "./ProgramGradeType";
import { ProgramGradeResponseEditor } from "@/HumanResource/TrainingManagement/ProgramParticipant/ProgramGradeResponseEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface ProgramFlowResponseGradeForm {
    FlowType: EnumEditor;
    GradeType: EnumEditor;
    Date: DateEditor;
    Remark: StringEditor;
    ParticipantList: ProgramGradeResponseEditor;
}

export class ProgramFlowResponseGradeForm extends PrefixedContext {
    static formKey = 'TrainingManagement.ProgramFlowResponseGradeForm';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ProgramFlowResponseGradeForm.init)  {
            ProgramFlowResponseGradeForm.init = true;

            var w0 = EnumEditor;
            var w1 = DateEditor;
            var w2 = StringEditor;
            var w3 = ProgramGradeResponseEditor;

            initFormType(ProgramFlowResponseGradeForm, [
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