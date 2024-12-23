import { ProgramDepartmentListFormatter } from "@/HumanResource/TrainingManagement/ProgramDepartment/ProgramDepartmentListFormatter";
import { ProgramSessionStatusType } from "./ProgramSessionStatusType";

export class ProgramSessionColumns {
    static columnsKey = 'TrainingManagement.ProgramSession';
}

[ProgramDepartmentListFormatter, ProgramSessionStatusType]; // referenced types