import { StringEditor, LookupEditor, EnumEditor, IntegerEditor, DateEditor, TextAreaEditor, MultipleImageUploadEditor, PrefixedContext } from "@serenity-is/corelib";
import { MasterProgramRoutineType } from "./MasterProgramRoutineType";
import { MasterProgramStatusType } from "./MasterProgramStatusType";
import { MasterProgramFlowEditor } from "@/HumanResource/TrainingManagement/ProgramFlow/MasterProgramFlowEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterProgramApplyForm {
    ProgramName: StringEditor;
    DepartmentList: LookupEditor;
    Routine: EnumEditor;
    RoutineInterval: IntegerEditor;
    RoutineStartDate: DateEditor;
    RoutineEndDate: DateEditor;
    Status: EnumEditor;
    Comment: TextAreaEditor;
    Detail: TextAreaEditor;
    ExtraDocument: MultipleImageUploadEditor;
    FlowList: MasterProgramFlowEditor;
}

export class MasterProgramApplyForm extends PrefixedContext {
    static formKey = 'TrainingManagement.MasterProgramApply';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterProgramApplyForm.init)  {
            MasterProgramApplyForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = EnumEditor;
            var w3 = IntegerEditor;
            var w4 = DateEditor;
            var w5 = TextAreaEditor;
            var w6 = MultipleImageUploadEditor;
            var w7 = MasterProgramFlowEditor;

            initFormType(MasterProgramApplyForm, [
                'ProgramName', w0,
                'DepartmentList', w1,
                'Routine', w2,
                'RoutineInterval', w3,
                'RoutineStartDate', w4,
                'RoutineEndDate', w4,
                'Status', w2,
                'Comment', w5,
                'Detail', w5,
                'ExtraDocument', w6,
                'FlowList', w7
            ]);
        }
    }
}

[MasterProgramRoutineType, MasterProgramStatusType]; // referenced types