import { IntegerEditor, StringEditor, LookupEditor, BooleanEditor, DateEditor, PrefixedContext } from "@serenity-is/corelib";
import { ProgramFlowEditor } from "@/HumanResource/TrainingManagement/ProgramFlow/ProgramFlowEditor";
import { ProgramParticipantEditor } from "@/HumanResource/TrainingManagement/ProgramParticipant/ProgramParticipantEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface ReportForm {
    MasterProgramId: IntegerEditor;
    ProgramName: StringEditor;
    DepartmentList: LookupEditor;
    Detail: StringEditor;
    ExtraDocument: StringEditor;
    DateTba: BooleanEditor;
    StartDate: DateEditor;
    OneDay: BooleanEditor;
    EndDate: DateEditor;
    Status: IntegerEditor;
    Comment: StringEditor;
    FlowList: ProgramFlowEditor;
    ParticipantList: ProgramParticipantEditor;
}

export class ReportForm extends PrefixedContext {
    static formKey = 'TrainingManagement.Report';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ReportForm.init)  {
            ReportForm.init = true;

            var w0 = IntegerEditor;
            var w1 = StringEditor;
            var w2 = LookupEditor;
            var w3 = BooleanEditor;
            var w4 = DateEditor;
            var w5 = ProgramFlowEditor;
            var w6 = ProgramParticipantEditor;

            initFormType(ReportForm, [
                'MasterProgramId', w0,
                'ProgramName', w1,
                'DepartmentList', w2,
                'Detail', w1,
                'ExtraDocument', w1,
                'DateTba', w3,
                'StartDate', w4,
                'OneDay', w3,
                'EndDate', w4,
                'Status', w0,
                'Comment', w1,
                'FlowList', w5,
                'ParticipantList', w6
            ]);
        }
    }
}