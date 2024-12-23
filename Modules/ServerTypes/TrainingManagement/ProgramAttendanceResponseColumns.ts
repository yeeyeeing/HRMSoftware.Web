import { ProgramParticipantRoleType } from "./ProgramParticipantRoleType";
import { ProgramAttendanceResponsePlaceHolderFormatter } from "@/HumanResource/TrainingManagement/ProgramParticipant/ProgramAttendanceResponsePlaceHolderFormatter";

export class ProgramAttendanceResponseColumns {
    static columnsKey = 'TrainingManagement.ProgramAttendanceResponse';
}

[ProgramParticipantRoleType, ProgramAttendanceResponsePlaceHolderFormatter]; // referenced types