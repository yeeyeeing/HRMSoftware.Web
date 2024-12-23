using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.Extensions.Entities;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesPaymentSubjectionToHRDF")]
[DisplayName("Hrdf Subjection"), InstanceName("Hrdf Subjection")]
[ReadPermission("*")]
[ModifyPermission("Administration:HumanResources")]
public sealed class HrdfSubjectionRow : LoggingRow<HrdfSubjectionRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }
    [DisplayName("Basic Salary")]
    [BooleanEditor]
    public bool? BasicSalary
    {
        get => fields.BasicSalary[this];
        set => fields.BasicSalary[this] = value;
    }

    [DisplayName("Payments For Unutilised Annual Or Medical Leaves")]
    [BooleanEditor]
    public bool? PaymentsForUnutilisedAnnualOrMedicalLeaves
    {
        get => fields.PaymentsForUnutilisedAnnualOrMedicalLeaves[this];
        set => fields.PaymentsForUnutilisedAnnualOrMedicalLeaves[this] = value;
    }

    [DisplayName("Bonuses")]
    [BooleanEditor]
    public bool? Bonuses
    {
        get => fields.Bonuses[this];
        set => fields.Bonuses[this] = value;
    }

    [DisplayName("Allowances")]
    [BooleanEditor]
    public bool? Allowances
    {
        get => fields.Allowances[this];
        set => fields.Allowances[this] = value;
    }

    [DisplayName("Commisions")]
    [BooleanEditor]
    public bool? Commisions
    {
        get => fields.Commisions[this];
        set => fields.Commisions[this] = value;
    }

    [DisplayName("Incentives")]
    [BooleanEditor]
    public bool? Incentives
    {
        get => fields.Incentives[this];
        set => fields.Incentives[this] = value;
    }

    [DisplayName("Arrears Of Wages")]
    [BooleanEditor]
    public bool? ArrearsOfWages
    {
        get => fields.ArrearsOfWages[this];
        set => fields.ArrearsOfWages[this] = value;
    }

    [DisplayName("Wages For Maternity Leave")]
    [BooleanEditor]
    public bool? WagesForMaternityLeave
    {
        get => fields.WagesForMaternityLeave[this];
        set => fields.WagesForMaternityLeave[this] = value;
    }

    [DisplayName("Wages For Paternity Leave")]
    [BooleanEditor]
    public bool? WagesForPaternityLeave
    {
        get => fields.WagesForPaternityLeave[this];
        set => fields.WagesForPaternityLeave[this] = value;
    }

    [DisplayName("Wages For Study Leave")]
    [BooleanEditor]
    public bool? WagesForStudyLeave
    {
        get => fields.WagesForStudyLeave[this];
        set => fields.WagesForStudyLeave[this] = value;
    }

    [DisplayName("Service Charges")]
    [BooleanEditor]
    public bool? ServiceCharges
    {
        get => fields.ServiceCharges[this];
        set => fields.ServiceCharges[this] = value;
    }

    [DisplayName("Overtime Payments")]
    [BooleanEditor]
    public bool? OvertimePayments
    {
        get => fields.OvertimePayments[this];
        set => fields.OvertimePayments[this] = value;
    }

    [DisplayName("Gratuity")]
    [BooleanEditor]
    public bool? Gratuity
    {
        get => fields.Gratuity[this];
        set => fields.Gratuity[this] = value;
    }

    [DisplayName("Retirement Benefits")]
    [BooleanEditor]
    public bool? RetirementBenefits
    {
        get => fields.RetirementBenefits[this];
        set => fields.RetirementBenefits[this] = value;
    }

    [DisplayName("Termination Benefits")]
    [BooleanEditor]
    public bool? TerminationBenefits
    {
        get => fields.TerminationBenefits[this];
        set => fields.TerminationBenefits[this] = value;
    }

    [DisplayName("Travel Allowances")]
    [BooleanEditor]
    public bool? TravelAllowances
    {
        get => fields.TravelAllowances[this];
        set => fields.TravelAllowances[this] = value;
    }

    [DisplayName("Payment In Lieu Of Notice Of Termination Of Service")]
    [BooleanEditor]
    public bool? PaymentInLieuOfNoticeOfTerminationOfService
    {
        get => fields.PaymentInLieuOfNoticeOfTerminationOfService[this];
        set => fields.PaymentInLieuOfNoticeOfTerminationOfService[this] = value;
    }

    [DisplayName("Director Fee")]
    [BooleanEditor]
    public bool? DirectorFee
    {
        get => fields.DirectorFee[this];
        set => fields.DirectorFee[this] = value;
    }

    [DisplayName("Gifts")]
    [BooleanEditor]
    public bool? Gifts
    {
        get => fields.Gifts[this];
        set => fields.Gifts[this] = value;
    }

    [DisplayName("Effective From")]
    public DateTime? EffectiveSince
    {
        get => fields.EffectiveSince[this];
        set => fields.EffectiveSince[this] = value;
    }
    [DisplayName("Effective Until")]
    public DateTime? EffectiveUntil
    {
        get => fields.EffectiveUntil[this];
        set => fields.EffectiveUntil[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;

        public BooleanField BasicSalary;
        public BooleanField PaymentsForUnutilisedAnnualOrMedicalLeaves;
        public BooleanField Bonuses;
        public BooleanField Allowances;
        public BooleanField Commisions;
        public BooleanField Incentives;
        public BooleanField ArrearsOfWages;
        public BooleanField WagesForMaternityLeave;
        public BooleanField WagesForPaternityLeave;
        public BooleanField WagesForStudyLeave;
        public BooleanField ServiceCharges;
        public BooleanField OvertimePayments;
        public BooleanField Gratuity;
        public BooleanField RetirementBenefits;
        public BooleanField TerminationBenefits;
        public BooleanField TravelAllowances;
        public BooleanField PaymentInLieuOfNoticeOfTerminationOfService;
        public BooleanField DirectorFee;
        public BooleanField Gifts;
        public DateTimeField EffectiveSince;
        public DateTimeField EffectiveUntil;

    }
}