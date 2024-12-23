using HRMSoftware.Administration;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesPayslipPaidAllowance")]
[DisplayName("Payslip Paid One Time Allowance"), InstanceName("Payslip Paid One Time Allowance")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class PayslipPaidOneTimeAllowanceRow : LoggingRow<PayslipPaidOneTimeAllowanceRow.RowFields>, IIdRow
{
    public string code
    {
        get => fields.code[this];
        set => fields.code[this] = value;
    }
    public double? AllowanceAmount
    {
        get => fields.AllowanceAmount[this];
        set => fields.AllowanceAmount[this] = value;
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

    [DisplayName("Allowance Id")]
    public int? AllowanceId
    {
        get => fields.AllowanceId[this];
        set => fields.AllowanceId[this] = value;
    }

    [DisplayName("Payslip Id"), Column("PayslipID")]
    public int? PayslipId
    {
        get => fields.PayslipId[this];
        set => fields.PayslipId[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public StringField code;
        public DoubleField AllowanceAmount;
        public StringField Description;
        public BooleanField SubjectionEis;
        public BooleanField SubjectionEpf;
        public BooleanField SubjectionHrdf;
        public BooleanField SubjectionSocso;
        public BooleanField SubjectionPcb;

        public Int32Field Id;
        public Int32Field AllowanceId;
        public Int32Field PayslipId;

    }
}