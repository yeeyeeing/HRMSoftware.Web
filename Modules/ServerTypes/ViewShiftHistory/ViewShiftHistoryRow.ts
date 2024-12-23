import { fieldsProxy } from "@serenity-is/corelib/q";

export interface ViewShiftHistoryRow {
    Id?: number;
    EmployeeRowID?: number;
    EmployeeName?: string;
    EmployeeId?: string;
    ShiftStartDate?: string;
    ShiftEndDate?: string;
    ShiftId?: number;
    ShiftName?: string;
    EmployeeGroupID?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class ViewShiftHistoryRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'ShiftId';
    static readonly localTextPrefix = 'ViewShiftHistory.ViewShiftHistory';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<ViewShiftHistoryRow>();
}