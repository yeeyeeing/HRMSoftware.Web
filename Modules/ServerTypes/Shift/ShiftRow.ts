import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface ShiftRow {
    NightShiftBetweenStart?: string;
    NightShiftBetweenEnd?: string;
    Id?: number;
    MondayWorkingTime?: number;
    TuesdayWorkingTime?: number;
    WednesdayWorkingTime?: number;
    ThursdayWorkingTime?: number;
    FridayWorkingTime?: number;
    SaturdayWorkingTime?: number;
    SundayWorkingTime?: number;
    TypeOfShift?: number;
    ShiftName?: string;
    Description?: string;
    ShiftColor?: string;
    MondayStartingFrom?: string;
    MondayEndingAt?: string;
    MondayLunchTimeStartingFrom?: string;
    MondayLunchTimeEndingAt?: string;
    TuesdayStartingFrom?: string;
    TuesdayEndingAt?: string;
    TuesdayLunchTimeStartingFrom?: string;
    TuesdayLunchTimeEndingAt?: string;
    WednesdayStartingFrom?: string;
    WednesdayEndingAt?: string;
    WednesdayLunchTimeStartingFrom?: string;
    WednesdayLunchTimeEndingAt?: string;
    ThursdayStartingFrom?: string;
    ThursdayEndingAt?: string;
    ThursdayLunchTimeStartingFrom?: string;
    ThursdayLunchTimeEndingAt?: string;
    FridayStartingFrom?: string;
    FridayEndingAt?: string;
    FridayLunchTimeStartingFrom?: string;
    FridayLunchTimeEndingAt?: string;
    SaturdayStartingFrom?: string;
    SaturdayEndingAt?: string;
    SaturdayLunchTimeStartingFrom?: string;
    SaturdayLunchTimeEndingAt?: string;
    SundayStartingFrom?: string;
    SundayEndingAt?: string;
    SundayLunchTimeStartingFrom?: string;
    SundayLunchTimeEndingAt?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class ShiftRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'ShiftName';
    static readonly localTextPrefix = 'Shift.Shift';
    static readonly lookupKey = 'ShiftRow.ShiftRow';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<ShiftRow>('ShiftRow.ShiftRow') }
    static async getLookupAsync() { return getLookupAsync<ShiftRow>('ShiftRow.ShiftRow') }

    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<ShiftRow>();
}