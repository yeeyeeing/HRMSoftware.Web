import { ProgramParticipantRow } from "./ProgramParticipantRow";
import { fieldsProxy } from "@serenity-is/corelib/q";

export interface AttendanceListRow {
    Id?: number;
    ProgramId?: number;
    ProgramName?: string;
    FlowType?: number;
    GradeType?: number;
    StartDate?: string;
    EndDate?: string;
    Remark?: string;
    ParticipantList?: ProgramParticipantRow[];
}

export abstract class AttendanceListRow {
    static readonly idProperty = 'Id';
    static readonly nameProperty = 'Remark';
    static readonly localTextPrefix = 'TrainingManagement.AttendanceList';
    static readonly deletePermission = 'Administration:General';
    static readonly insertPermission = 'Administration:General';
    static readonly readPermission = 'Administration:General';
    static readonly updatePermission = 'Administration:General';

    static readonly Fields = fieldsProxy<AttendanceListRow>();
}