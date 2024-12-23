import { ProgramFlowType } from "./ProgramFlowType";
import { EnumEditor, DateEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { ProgramGradeType } from "./ProgramGradeType";
import { ProgramAttendanceResponseEditor } from "@/HumanResource/TrainingManagement/ProgramParticipant/ProgramAttendanceResponseEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface ProgramFlowResponseAttendanceForm {
    FlowType: EnumEditor;
    GradeType: EnumEditor;
    Date: DateEditor;
    Remark: StringEditor;
    ParticipantList: ProgramAttendanceResponseEditor;
}

export class ProgramFlowResponseAttendanceForm extends PrefixedContext {
    static formKey = 'TrainingManagement.ProgramFlowResponseAttendanceForm';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ProgramFlowResponseAttendanceForm.init)  {
            ProgramFlowResponseAttendanceForm.init = true;

            var w0 = EnumEditor;
            var w1 = DateEditor;
            var w2 = StringEditor;
            var w3 = ProgramAttendanceResponseEditor;

            initFormType(ProgramFlowResponseAttendanceForm, [
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