import { fieldsProxy } from "@serenity-is/corelib/q";

export interface OTJobGradeTimeRow {
    Id?: number;
    JobGradeId?: number;
    CompanySettingId?: number;
    OTMaximumMinutes?: number;
    JobGradeName?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class OTJobGradeTimeRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'OTJobGradeTime.OTJobGradeTime';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<OTJobGradeTimeRow>();
}