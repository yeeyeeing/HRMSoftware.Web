import {ProgramSessionApplyDialog} from '../ProgramSession/ProgramSessionApplyDialog';
import {ProgramSessionStatusType} from "@/ServerTypes/TrainingManagement/ProgramSessionStatusType";
import {ProgramSessionRow} from '../../ServerTypes/TrainingManagement';

export default function pageInit() {
    var dlg = new ProgramSessionApplyDialog();
    dlg.loadEntityAndOpenDialog(<ProgramSessionRow>{
        DepartmentList: [2],
        Status: ProgramSessionStatusType.WaitingApprovalHR,
    }, true);
}
