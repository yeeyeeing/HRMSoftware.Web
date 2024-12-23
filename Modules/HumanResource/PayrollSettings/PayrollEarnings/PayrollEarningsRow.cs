using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesPayrollEarnings")]
[DisplayName("Payroll Earnings"), InstanceName("Payroll Earnings")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class PayrollEarningsRow : LoggingRow<PayrollEarningsRow.RowFields>, IIdRow , INameRow
{
    [DisplayName("Id"), Column("ID"), IdProperty, Identity]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Payslip Id")]
    public int? PayslipId
    {
        get => fields.PayslipId[this];
        set => fields.PayslipId[this] = value;
    }

    [DisplayName("Subjection To Eis"), Column("SubjectionToEIS")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionToEis
    {
        get => fields.SubjectionToEis[this];
        set => fields.SubjectionToEis[this] = value;
    }

    [DisplayName("Subjection To Epf"), Column("SubjectionToEPF")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionToEpf
    {
        get => fields.SubjectionToEpf[this];
        set => fields.SubjectionToEpf[this] = value;
    }

    [DisplayName("Subjection To Hrdf"), Column("SubjectionToHRDF")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionToHrdf
    {
        get => fields.SubjectionToHrdf[this];
        set => fields.SubjectionToHrdf[this] = value;
    }

    [DisplayName("Subjection To Pcb"), Column("SubjectionToPCB")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionToPcb
    {
        get => fields.SubjectionToPcb[this];
        set => fields.SubjectionToPcb[this] = value;
    }

    [DisplayName("Subjection To Socso"), Column("SubjectionToSOCSO")]
    [BooleanEditor, StatusFormatter]
    public bool? SubjectionToSocso
    {
        get => fields.SubjectionToSocso[this];
        set => fields.SubjectionToSocso[this] = value;
    }
    
    [DisplayName("Amount"),NotNull]
    public double? Amount
    {
        get => fields.Amount[this];
        set => fields.Amount[this] = value;
    }

    [DisplayName("Description"),NameProperty, NotNull]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }

    [BooleanEditor, StatusFormatter,NotMapped]
    public bool? External
    {
        get => fields.External[this];
        set => fields.External[this] = value;
    }
    [DisplayName("Earning Code"),NotNull]
    public string EarningCode
    {
        get => fields.EarningCode[this];
        set => fields.EarningCode[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field PayslipId;
        public BooleanField SubjectionToEis;
        public BooleanField SubjectionToEpf;
        public BooleanField SubjectionToHrdf;
        public BooleanField SubjectionToPcb;
        public BooleanField SubjectionToSocso;
        public BooleanField External;

        public DoubleField Amount;
        public StringField Description;
        public StringField EarningCode;

    }
}