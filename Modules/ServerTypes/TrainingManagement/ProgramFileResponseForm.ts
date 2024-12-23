import { IntegerEditor, ImageUploadEditor, PrefixedContext } from "@serenity-is/corelib";
import { initFormType } from "@serenity-is/corelib/q";

export interface ProgramFileResponseForm {
    Id: IntegerEditor;
    FlowId: IntegerEditor;
    EmployeeId: IntegerEditor;
    File: ImageUploadEditor;
}

export class ProgramFileResponseForm extends PrefixedContext {
    static formKey = 'TrainingManagement.ProgramFileResponse';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ProgramFileResponseForm.init)  {
            ProgramFileResponseForm.init = true;

            var w0 = IntegerEditor;
            var w1 = ImageUploadEditor;

            initFormType(ProgramFileResponseForm, [
                'Id', w0,
                'FlowId', w0,
                'EmployeeId', w0,
                'File', w1
            ]);
        }
    }
}