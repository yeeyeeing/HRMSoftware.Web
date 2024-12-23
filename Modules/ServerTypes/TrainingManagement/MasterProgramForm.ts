import { StringEditor, BooleanEditor, LookupEditor, EnumEditor, IntegerEditor, DateEditor, TextAreaEditor, MultipleImageUploadEditor, PrefixedContext } from "@serenity-is/corelib";
import { MasterProgramRoutineType } from "./MasterProgramRoutineType";
import { MasterProgramStatusType } from "./MasterProgramStatusType";
import { MasterProgramFlowEditor } from "@/HumanResource/TrainingManagement/ProgramFlow/MasterProgramFlowEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface MasterProgramForm {
    ProgramName: StringEditor;
    AllDepartment: BooleanEditor;
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

export class MasterProgramForm extends PrefixedContext {
    static formKey = 'TrainingManagement.MasterProgram';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!MasterProgramForm.init)  {
            MasterProgramForm.init = true;

            var w0 = StringEditor;
            var w1 = BooleanEditor;
            var w2 = LookupEditor;
            var w3 = EnumEditor;
            var w4 = IntegerEditor;
            var w5 = DateEditor;
            var w6 = TextAreaEditor;
            var w7 = MultipleImageUploadEditor;
            var w8 = MasterProgramFlowEditor;

            initFormType(MasterProgramForm, [
                'ProgramName', w0,
                'AllDepartment', w1,
                'DepartmentList', w2,
                'Routine', w3,
                'RoutineInterval', w4,
                'RoutineStartDate', w5,
                'RoutineEndDate', w5,
                'Status', w3,
                'Comment', w6,
                'Detail', w6,
                'ExtraDocument', w7,
                'FlowList', w8
            ]);
        }
    }
}

[MasterProgramRoutineType, MasterProgramStatusType]; // referenced types