import { fieldsProxy } from "@serenity-is/corelib/q";

export interface PcbSubjectionRow {
    Id?: number;
    BasicSalary?: boolean;
    PaymentsForUnutilisedAnnualOrMedicalLeaves?: boolean;
    Bonuses?: boolean;
    Allowances?: boolean;
    Commisions?: boolean;
    Incentives?: boolean;
    ArrearsOfWages?: boolean;
    WagesForMaternityLeave?: boolean;
    WagesForPaternityLeave?: boolean;
    WagesForStudyLeave?: boolean;
    ServiceCharges?: boolean;
    OvertimePayments?: boolean;
    Gratuity?: boolean;
    RetirementBenefits?: boolean;
    TerminationBenefits?: boolean;
    TravelAllowances?: boolean;
    PaymentInLieuOfNoticeOfTerminationOfService?: boolean;
    DirectorFee?: boolean;
    Gifts?: boolean;
    EffectiveSince?: string;
    EffectiveUntil?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    IsActive?: number;
}

export abstract class PcbSubjectionRow {
    static readonly idProperty = 'Id';
    static readonly isActiveProperty = 'IsActive';
    static readonly localTextPrefix = 'PayrollSettings.PcbSubjection';
    static readonly deletePermission = 'Administration:HumanResources';
    static readonly insertPermission = 'Administration:HumanResources';
    static readonly readPermission = '*';
    static readonly updatePermission = 'Administration:HumanResources';

    static readonly Fields = fieldsProxy<PcbSubjectionRow>();
}