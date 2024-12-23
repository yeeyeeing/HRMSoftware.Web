import { ProgramParticipantRoleType } from "./ProgramParticipantRoleType";
import { ProgramFileResponsePlaceHolderFormatter } from "@/HumanResource/TrainingManagement/ProgramParticipant/ProgramFileResponsePlaceHolderFormatter";
import { ProgramGradeResponsePlaceHolderFormatter } from "@/HumanResource/TrainingManagement/ProgramParticipant/ProgramGradeResponsePlaceHolderFormatter";

export class ProgramFileResponseColumns {
    static columnsKey = 'TrainingManagement.ProgramFileResponse';
}

[ProgramParticipantRoleType, ProgramFileResponsePlaceHolderFormatter, ProgramGradeResponsePlaceHolderFormatter]; // referenced types