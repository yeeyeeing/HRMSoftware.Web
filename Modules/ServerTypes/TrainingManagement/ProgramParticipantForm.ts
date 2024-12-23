import { LookupEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface ProgramParticipantForm {
    EmployeeRowId: LookupEditor;
    EmployeeId: StringEditor;
    EmployeeName: StringEditor;
}

export class ProgramParticipantForm extends PrefixedContext {
    static formKey = 'TrainingManagement.ProgramParticipant';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ProgramParticipantForm.init)  {
            ProgramParticipantForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;

            initFormType(ProgramParticipantForm, [
                'EmployeeRowId', w0,
                'EmployeeId', w1,
                'EmployeeName', w1
            ]);
        }
    }
}