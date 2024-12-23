using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesPayslipPaidMoneyClaiming")]
[DisplayName("Payslip Paid Money Claiming"), InstanceName("Payslip Paid Money Claiming")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class PayslipPaidMoneyClaimingRow : LoggingRow<PayslipPaidMoneyClaimingRow.RowFields>, IIdRow
{
    public double? ClaimAmount
    {
        get => fields.ClaimAmount[this];
        set => fields.ClaimAmount[this] = value;
    }

    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }
    [DisplayName("Subjection To Eis"), BooleanEditor, StatusFormatter]
    public bool? SubjectionEis
    {
        get => fields.SubjectionEis[this];
        set => fields.SubjectionEis[this] = value;
    }
    [DisplayName("Subjection To Epf"), BooleanEditor, StatusFormatter]
    public bool? SubjectionEpf
    {
        get => fields.SubjectionEpf[this];
        set => fields.SubjectionEpf[this] = value;
    }
    [DisplayName("Subjection To HRDF"), BooleanEditor, StatusFormatter]
    public bool? SubjectionHrdf
    {
        get => fields.SubjectionHrdf[this];
        set => fields.SubjectionHrdf[this] = value;
    }
    [DisplayName("Subjection To Socso"), BooleanEditor, StatusFormatter]
    public bool? SubjectionSocso
    {
        get => fields.SubjectionSocso[this];
        set => fields.SubjectionSocso[this] = value;
    }
    [DisplayName("Subjection To Pcb"), BooleanEditor, StatusFormatter]
    public bool? SubjectionPcb
    {
        get => fields.SubjectionPcb[this];
        set => fields.SubjectionPcb[this] = value;
    }

    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Payslip Id"), Column("PayslipID")]
    public int? PayslipId
    {
        get => fields.PayslipId[this];
        set => fields.PayslipId[this] = value;
    }

    [DisplayName("Money Claiming Id")]
    public int? MoneyClaimingId
    {
        get => fields.MoneyClaimingId[this];
        set => fields.MoneyClaimingId[this] = value;
    }
    public string ClaimingCategory
    {
        get => fields.ClaimingCategory[this];
        set => fields.ClaimingCategory[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public StringField ClaimingCategory;
        public DoubleField ClaimAmount;
        public StringField Description;
        public BooleanField SubjectionEis;
        public BooleanField SubjectionEpf;
        public BooleanField SubjectionHrdf;
        public BooleanField SubjectionSocso;
        public BooleanField SubjectionPcb;


        public Int32Field PayslipId;

        public Int32Field Id;
        public Int32Field MoneyClaimingId;

    }
}