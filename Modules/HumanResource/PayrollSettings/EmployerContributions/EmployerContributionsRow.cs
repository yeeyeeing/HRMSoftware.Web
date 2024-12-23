using HRMSoftware.Administration;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesPayrollEmployerContributions")]
[DisplayName("Employer Contributions"), InstanceName("Employer Contributions")]
[ReadPermission(PermissionKeys.HumanResources)]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class EmployerContributionsRow : LoggingRow<EmployerContributionsRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
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

    [DisplayName("Employer Epf"), Column("Amount")]
    public double? Amount
    {
        get => fields.Amount[this];
        set => fields.Amount[this] = value;
    }
    [DisplayName("Description"), NameProperty]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field PayslipId;
        public DoubleField Amount;
        public StringField Description;

    }
}