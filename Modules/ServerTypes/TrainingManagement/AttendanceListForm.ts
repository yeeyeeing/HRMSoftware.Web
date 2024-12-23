import { StringEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { ProgramAttendanceResponseEditor } from "@/HumanResource/TrainingManagement/ProgramParticipant/ProgramAttendanceResponseEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface AttendanceListForm {
    ProgramName: StringEditor;
    StartDate: DateEditor;
    EndDate: DateEditor;
    Remark: StringEditor;
    ParticipantList: ProgramAttendanceResponseEditor;
}

export class AttendanceListForm extends PrefixedContext {
    static formKey = 'TrainingManagement.AttendanceList';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AttendanceListForm.init)  {
            AttendanceListForm.init = true;

            var w0 = StringEditor;
            var w1 = DateEditor;
            var w2 = ProgramAttendanceResponseEditor;

            initFormType(AttendanceListForm, [
                'ProgramName', w0,
                'StartDate', w1,
                'EndDate', w1,
                'Remark', w0,
                'ParticipantList', w2
            ]);
        }
    }
}