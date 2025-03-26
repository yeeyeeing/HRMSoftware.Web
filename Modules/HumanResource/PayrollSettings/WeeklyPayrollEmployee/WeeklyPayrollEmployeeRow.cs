using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.Extensions.Entities;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesWeeklyPayrollEmployees")]
[DisplayName("Weekly Payroll Employee"), InstanceName("Weekly Payroll Employee")]
[ReadPermission("Administration:HumanResources")]
[ModifyPermission("Administration:HumanResources")]
public sealed class WeeklyPayrollEmployeeRow : LoggingRow<WeeklyPayrollEmployeeRow.RowFields>, IIdRow
{
    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Weekly Payroll Setting Id")]
    public int? WeeklyPayrollSettingId
    {
        get => fields.WeeklyPayrollSettingId[this];
        set => fields.WeeklyPayrollSettingId[this] = value;
    }

    [DisplayName("Employee Row Id")]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field WeeklyPayrollSettingId;
        public Int32Field EmployeeRowId;

    }
}