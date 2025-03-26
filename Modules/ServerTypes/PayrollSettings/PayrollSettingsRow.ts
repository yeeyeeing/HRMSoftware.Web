import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PayrollSettingsRow {
    EpfFormatId?: number;
    LhdnFormatId?: number;
    EisFormatId?: number;
    SocsoFormatId?: number;
    AutopayFormatId?: number;
    Email?: string;
    PhoneNumber?: string;
    ContactPerson?: string;
    OrganisationName?: string;
    OrganisationCode?: string;
    CreditingDay?: number;
    StateCodeId?: number;
    TextFormatId?: number;
    Id?: number;
    EffectiveFrom?: string;
    EffectiveUntil?: string;
    SeperateBonus?: boolean;
    SeperateIncentive?: boolean;
    AnnualizedBonus?: boolean;
    AnnualizedIncentive?: boolean;
    BonusSubjectEpf?: boolean;
    BonusSubjectSocso?: boolean;
    BonusSubjectEis?: boolean;
    BonusSubjectHrdf?: boolean;
    BonusSubjectPcb?: boolean;
    IncentiveSubjectEpf?: boolean;
    IncentiveSubjectSocso?: boolean;
    IncentiveSubjectEis?: boolean;
    IncentiveSubjectHrdf?: boolean;
    IncentiveSubjectPcb?: boolean;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PayrollSettingsRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'PayrollSettings.PayrollSettings';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = 'Administration:HumanResources';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PayrollSettingsRow>();
}