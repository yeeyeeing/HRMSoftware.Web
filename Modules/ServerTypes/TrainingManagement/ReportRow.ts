import { ProgramFlowRow } from "./ProgramFlowRow";
import { ProgramParticipantRow } from "./ProgramParticipantRow";
import { fieldsProxy } from "@serenity-is/corelib/q";

export interface ReportRow {
    Id?: number;
    MasterProgramId?: number;
    ProgramName?: string;
    DepartmentList?: number[];
    Detail?: string;
    ExtraDocument?: string;
    DateTba?: boolean;
    StartDate?: string;
    OneDay?: boolean;
    EndDate?: string;
    Status?: number;
    Comment?: string;
    FlowList?: ProgramFlowRow[];
    ParticipantList?: ProgramParticipantRow[];
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class ReportRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'ProgramName';
    static readonly localTextPrefix = 'TrainingManagement.Report';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<ReportRow>();
}