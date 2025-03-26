using HRMSoftware.Administration;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesPayrollSettings")]
[DisplayName("Payroll Settings"), InstanceName("Payroll Settings")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class PayrollSettingsRow : LoggingRow<PayrollSettingsRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }
    public int? StateCodeId
    {
        get => fields.StateCodeId[this];
        set => fields.StateCodeId[this] = value;
    }
    public int? TextFormatId
    {
        get => fields.TextFormatId[this];
        set => fields.TextFormatId[this] = value;
    }

    [DisplayName("Effective From")]
    public DateTime? EffectiveFrom
    {
        get => fields.EffectiveFrom[this];
        set => fields.EffectiveFrom[this] = value;
    }

    [DisplayName("Effective Until")]
    public DateTime? EffectiveUntil
    {
        get => fields.EffectiveUntil[this];
        set => fields.EffectiveUntil[this] = value;
    }

    [DisplayName("Seperate Bonus")]
    [BooleanEditor]
    public bool? SeperateBonus
    {
        get => fields.SeperateBonus[this];
        set => fields.SeperateBonus[this] = value;
    }

 
  
    [DisplayName("Seperate Incentive")]
    [BooleanEditor]
    public bool? SeperateIncentive
    {
        get => fields.SeperateIncentive[this];
        set => fields.SeperateIncentive[this] = value;
    }


    [DisplayName("Annualized Bonus")]
    [BooleanEditor]
    public bool? AnnualizedBonus
    {
        get => fields.AnnualizedBonus[this];
        set => fields.AnnualizedBonus[this] = value;
    }



    [DisplayName("Annualized Incentive")]
    [BooleanEditor]
    public bool? AnnualizedIncentive
    {
        get => fields.AnnualizedIncentive[this];
        set => fields.AnnualizedIncentive[this] = value;
    }


    [DisplayName("Subject EPF")]
    [BooleanEditor]
    public bool? IncentiveSubjectEpf
    {
        get => fields.IncentiveSubjectEpf[this];
        set => fields.IncentiveSubjectEpf[this] = value;
    }

    [DisplayName("Subject SOCSO")]
    [BooleanEditor]
    public bool? IncentiveSubjectSocso
    {
        get => fields.IncentiveSubjectSocso[this];
        set => fields.IncentiveSubjectSocso[this] = value;
    }

    [DisplayName("Subject EIS")]
    [BooleanEditor]
    public bool? IncentiveSubjectEis
    {
        get => fields.IncentiveSubjectEis[this];
        set => fields.IncentiveSubjectEis[this] = value;
    }

    [DisplayName("Subject HRDF")]
    [BooleanEditor]
    public bool? IncentiveSubjectHrdf
    {
        get => fields.IncentiveSubjectHrdf[this];
        set => fields.IncentiveSubjectHrdf[this] = value;
    }

    [DisplayName("Subject PCB")]
    [BooleanEditor]
    public bool? IncentiveSubjectPcb
    {
        get => fields.IncentiveSubjectPcb[this];
        set => fields.IncentiveSubjectPcb[this] = value;
    }

    [DisplayName("Subject EPF")]
    [BooleanEditor]
    public bool? BonusSubjectEpf
    {
        get => fields.BonusSubjectEpf[this];
        set => fields.BonusSubjectEpf[this] = value;
    }

    [DisplayName("Subject SOCSO")]
    [BooleanEditor]
    public bool? BonusSubjectSocso
    {
        get => fields.BonusSubjectSocso[this];
        set => fields.BonusSubjectSocso[this] = value;
    }

    [DisplayName("Subject EIS")]
    [BooleanEditor]
    public bool? BonusSubjectEis
    {
        get => fields.BonusSubjectEis[this];
        set => fields.BonusSubjectEis[this] = value;
    }

    [DisplayName("Subject HRDF")]
    [BooleanEditor]
    public bool? BonusSubjectHrdf
    {
        get => fields.BonusSubjectHrdf[this];
        set => fields.BonusSubjectHrdf[this] = value;
    }

    [DisplayName("Subject PCB")]
    [BooleanEditor]
    public bool? BonusSubjectPcb
    {
        get => fields.BonusSubjectPcb[this];
        set => fields.BonusSubjectPcb[this] = value;
    }

    [DisplayName("Organisation Name")]
    public string OrganisationName
    {
        get => fields.OrganisationName[this];
        set => fields.OrganisationName[this] = value;
    }
    [DisplayName("Organisation Code")]
    public string OrganisationCode
    {
        get => fields.OrganisationCode[this];
        set => fields.OrganisationCode[this] = value;
    }
    [DisplayName("Crediting Day")]
    public int? CreditingDay
    {
        get => fields.CreditingDay[this];
        set => fields.CreditingDay[this] = value;
    }


    [ DisplayName("E-mail address ")]
    public string Email
    {
        get => fields.Email[this];
        set => fields.Email[this] = value;
    }
    [ DisplayName("Phone Number")]
    public string PhoneNumber
    {
        get => fields.PhoneNumber[this];
        set => fields.PhoneNumber[this] = value;
    }
    [ DisplayName("Contact Person Name")]
    public string ContactPerson
    {
        get => fields.ContactPerson[this];
        set => fields.ContactPerson[this] = value;
    }
    public int? EpfFormatId
    {
        get => fields.EpfFormatId[this];
        set => fields.EpfFormatId[this] = value;
    }
    public int? LhdnFormatId
    {
        get => fields.LhdnFormatId[this];
        set => fields.LhdnFormatId[this] = value;
    }
    public int? EisFormatId
    {
        get => fields.EisFormatId[this];
        set => fields.EisFormatId[this] = value;
    }
    public int? SocsoFormatId
    {
        get => fields.SocsoFormatId[this];
        set => fields.SocsoFormatId[this] = value;
    }
    public int? AutopayFormatId
    {
        get => fields.AutopayFormatId[this];
        set => fields.AutopayFormatId[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public Int32Field EpfFormatId;
        public Int32Field LhdnFormatId;
        public Int32Field EisFormatId;
        public Int32Field SocsoFormatId;
        public Int32Field AutopayFormatId;

        public StringField Email;
        public StringField PhoneNumber;
        public StringField ContactPerson;
        public StringField OrganisationName;
        public StringField OrganisationCode;
        public Int32Field CreditingDay;
        public Int32Field StateCodeId;
        public Int32Field TextFormatId;

        public Int32Field Id;
        public DateTimeField EffectiveFrom;
        public DateTimeField EffectiveUntil;
        public BooleanField SeperateBonus;
        public BooleanField SeperateIncentive;
 
        public BooleanField AnnualizedBonus;
        public BooleanField AnnualizedIncentive;

        public BooleanField BonusSubjectEpf;
        public BooleanField BonusSubjectSocso;
        public BooleanField BonusSubjectEis;
        public BooleanField BonusSubjectHrdf;
        public BooleanField BonusSubjectPcb;

        public BooleanField IncentiveSubjectEpf;
        public BooleanField IncentiveSubjectSocso;
        public BooleanField IncentiveSubjectEis;
        public BooleanField IncentiveSubjectHrdf;
        public BooleanField IncentiveSubjectPcb;


    }
}