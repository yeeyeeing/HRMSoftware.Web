import { StringEditor, LookupEditor, BooleanEditor, DateEditor, EnumEditor, TextAreaEditor, MultipleImageUploadEditor, PrefixedContext } from "@serenity-is/corelib";
import { ProgramSessionStatusType } from "./ProgramSessionStatusType";
import { ProgramFlowEditor } from "@/HumanResource/TrainingManagement/ProgramFlow/ProgramFlowEditor";
import { ProgramParticipantEditor } from "@/HumanResource/TrainingManagement/ProgramParticipant/ProgramParticipantEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface ProgramSessionForm {
    ProgramName: StringEditor;
    DepartmentList: LookupEditor;
    DateTba: BooleanEditor;
    OneDay: BooleanEditor;
    StartDate: DateEditor;
    EndDate: DateEditor;
    Status: EnumEditor;
    Comment: TextAreaEditor;
    Detail: TextAreaEditor;
    ExtraDocument: MultipleImageUploadEditor;
    FlowList: ProgramFlowEditor;
    ParticipantList: ProgramParticipantEditor;
}

export class ProgramSessionForm extends PrefixedContext {
    static formKey = 'TrainingManagement.ProgramSession';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ProgramSessionForm.init)  {
            ProgramSessionForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = BooleanEditor;
            var w3 = DateEditor;
            var w4 = EnumEditor;
            var w5 = TextAreaEditor;
            var w6 = MultipleImageUploadEditor;
            var w7 = ProgramFlowEditor;
            var w8 = ProgramParticipantEditor;

            initFormType(ProgramSessionForm, [
                'ProgramName', w0,
                'DepartmentList', w1,
                'DateTba', w2,
                'OneDay', w2,
                'StartDate', w3,
                'EndDate', w3,
                'Status', w4,
                'Comment', w5,
                'Detail', w5,
                'ExtraDocument', w6,
                'FlowList', w7,
                'ParticipantList', w8
            ]);
        }
    }
}

[ProgramSessionStatusType]; // referenced types