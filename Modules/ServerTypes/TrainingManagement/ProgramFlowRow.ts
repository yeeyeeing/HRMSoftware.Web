import { ProgramFlowType } from "./ProgramFlowType";
import { ProgramGradeType } from "./ProgramGradeType";
import { ProgramParticipantRow } from "./ProgramParticipantRow";
import { fieldsProxy } from "@serenity-is/corelib/q";

export interface ProgramFlowRow {
    Id?: number;
    MasterProgramId?: number;
    ProgramId?: number;
    FlowType?: ProgramFlowType;
    GradeType?: ProgramGradeType;
    Date?: string;
    Remark?: string;
    ParticipantList?: ProgramParticipantRow[];
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class ProgramFlowRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Remark';
    static readonly localTextPrefix = 'TrainingManagement.ProgramFlow';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<ProgramFlowRow>();
}