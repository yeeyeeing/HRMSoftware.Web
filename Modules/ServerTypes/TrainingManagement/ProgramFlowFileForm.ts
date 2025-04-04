﻿import { IntegerEditor, EnumEditor, DateEditor, StringEditor, PrefixedContext } from "@serenity-is/corelib";
import { ProgramFlowType } from "./ProgramFlowType";
import { ProgramGradeType } from "./ProgramGradeType";
import { ProgramFileResponseEditor } from "@/HumanResource/TrainingManagement/ProgramParticipant/ProgramFileResponseEditor";
import { initFormType } from "@serenity-is/corelib/q";

export interface ProgramFlowFileForm {
    Id: IntegerEditor;
    FlowType: EnumEditor;
    GradeType: EnumEditor;
    Date: DateEditor;
    Remark: StringEditor;
    ParticipantList: ProgramFileResponseEditor;
}

export class ProgramFlowFileForm extends PrefixedContext {
    static formKey = 'TrainingManagement.ProgramFlowFileForm';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ProgramFlowFileForm.init)  {
            ProgramFlowFileForm.init = true;

            var w0 = IntegerEditor;
            var w1 = EnumEditor;
            var w2 = DateEditor;
            var w3 = StringEditor;
            var w4 = ProgramFileResponseEditor;

            initFormType(ProgramFlowFileForm, [
                'Id', w0,
                'FlowType', w1,
                'GradeType', w1,
                'Date', w2,
                'Remark', w3,
                'ParticipantList', w4
            ]);
        }
    }
}

[ProgramFlowType, ProgramGradeType]; // referenced types