import {MasterProgramApplyDialog} from '../MasterProgram/MasterProgramApplyDialog';
import {
    MasterProgramRow,
    MasterProgramStatusType,
    ProgramFlowType,
    ProgramGradeType,
} from "@/ServerTypes/TrainingManagement";

export default function pageInit() {
    var dlg = new MasterProgramApplyDialog();
    dlg.loadEntityAndOpenDialog(<MasterProgramRow>{
        DepartmentList: [2],
        Status: MasterProgramStatusType.WaitingApproval,
        FlowList: [{
            FlowType: ProgramFlowType.Attendance,
            GradeType: ProgramGradeType.Na,
        }]
    }, true);
}