import { ProgramSessionStatusType } from "./ProgramSessionStatusType";
import { ProgramFlowRow } from "./ProgramFlowRow";
import { ProgramParticipantRow } from "./ProgramParticipantRow";
import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface ProgramSessionRow {
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
    Status?: ProgramSessionStatusType;
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

export abstract class ProgramSessionRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'ProgramName';
    static readonly localTextPrefix = 'TrainingManagement.ProgramSession';
    static readonly lookupKey = 'TrainingManagement.ProgramSession';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<ProgramSessionRow>('TrainingManagement.ProgramSession') }
    static async getLookupAsync() { return getLookupAsync<ProgramSessionRow>('TrainingManagement.ProgramSession') }

    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<ProgramSessionRow>();
}