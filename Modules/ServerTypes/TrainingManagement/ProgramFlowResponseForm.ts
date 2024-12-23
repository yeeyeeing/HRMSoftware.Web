import { IntegerEditor, BooleanEditor, ImageUploadEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface ProgramFlowResponseForm {
    FlowId: IntegerEditor;
    EmployeeId: IntegerEditor;
    Attendance: BooleanEditor;
    GradeValue: IntegerEditor;
    File: ImageUploadEditor;
    Remark: StringEditor;
}

export class ProgramFlowResponseForm extends PrefixedContext {
    static formKey = 'TrainingManagement.ProgramFlowResponse';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ProgramFlowResponseForm.init)  {
            ProgramFlowResponseForm.init = true;

            var w0 = IntegerEditor;
            var w1 = BooleanEditor;
            var w2 = ImageUploadEditor;
            var w3 = StringEditor;

            initFormType(ProgramFlowResponseForm, [
                'FlowId', w0,
                'EmployeeId', w0,
                'Attendance', w1,
                'GradeValue', w0,
                'File', w2,
                'Remark', w3
            ]);
        }
    }
}