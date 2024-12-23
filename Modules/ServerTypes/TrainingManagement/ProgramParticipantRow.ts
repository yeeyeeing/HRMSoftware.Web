import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface ProgramParticipantRow {
    Id?: number;
    ProgramId?: number;
    EmployeeRowId?: number;
    EmployeeId?: string;
    EmployeeName?: string;
    Trainee?: boolean;
    Staff?: boolean;
    ExtraField1?: string;
    ExtraField2?: string;
    ExtraField3?: string;
    ExtraField4?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class ProgramParticipantRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'TrainingManagement.ProgramParticipant';
    static readonly lookupKey = 'TrainingManagement.ProgramParticipant';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<ProgramParticipantRow>('TrainingManagement.ProgramParticipant') }
    static async getLookupAsync() { return getLookupAsync<ProgramParticipantRow>('TrainingManagement.ProgramParticipant') }

    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<ProgramParticipantRow>();
}