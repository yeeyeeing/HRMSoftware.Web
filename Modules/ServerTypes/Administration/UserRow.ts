import { TwoFactorAuthType } from "./TwoFactorAuthType";
import { getLookup, getLookupAsync, fieldsProxy } from "@serenity-is/corelib/q";

export interface UserRow {
    UserId?: number;
    EmployeeName?: string;
    Username?: string;
    Source?: string;
    PasswordHash?: string;
    PasswordSalt?: string;
    DisplayName?: string;
    Email?: string;
    MobilePhoneNumber?: string;
    MobilePhoneVerified?: boolean;
    TwoFactorAuth?: TwoFactorAuthType;
    UserImage?: string;
    LastDirectoryUpdate?: string;
    EmployeeRowID?: number;
    Password?: string;
    PasswordConfirm?: string;
    ImpersonationToken?: string;
    Roles?: number[];
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class UserRow {
    static readonly idProperty = 'UserId';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Username';
    static readonly localTextPrefix = 'Administration.User';
    static readonly lookupKey = 'User.User';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<UserRow>('User.User') }
    static async getLookupAsync() { return getLookupAsync<UserRow>('User.User') }

    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<UserRow>();
}