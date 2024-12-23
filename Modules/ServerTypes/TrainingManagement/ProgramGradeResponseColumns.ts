import { ProgramParticipantRoleType } from "./ProgramParticipantRoleType";
import { ProgramGradeResponsePlaceHolderFormatter } from "@/HumanResource/TrainingManagement/ProgramParticipant/ProgramGradeResponsePlaceHolderFormatter";

export class ProgramGradeResponseColumns {
    static columnsKey = 'TrainingManagement.ProgramGradeResponse';
}

[ProgramParticipantRoleType, ProgramGradeResponsePlaceHolderFormatter]; // referenced types