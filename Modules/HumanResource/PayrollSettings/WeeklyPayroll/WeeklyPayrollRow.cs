using HRMSoftware.Administration;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.Extensions.Entities;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings;

[ConnectionKey("Default"), Module("PayrollSettings"), TableName("HumanResourcesWeeklyPayroll")]
[DisplayName("Weekly Payroll"), InstanceName("Weekly Payroll")]
[ReadPermission(PermissionKeys.Employee)]
[ModifyPermission(PermissionKeys.HumanResources)]
public sealed class WeeklyPayrollRow : LoggingRow<WeeklyPayrollRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Week Index")]
    public int? WeekIndex
    {
        get => fields.WeekIndex[this];
        set => fields.WeekIndex[this] = value;
    }

    [DisplayName("Employee Row Id"), Column("EmployeeRowID")]
    public int? EmployeeRowId
    {
        get => fields.EmployeeRowId[this];
        set => fields.EmployeeRowId[this] = value;
    }

    [DisplayName("Pay Date")]
    public DateTime? PayDate
    {
        get => fields.PayDate[this];
        set => fields.PayDate[this] = value;
    }

    [DisplayName("Deduction")]
    public double? Deduction
    {
        get => fields.Deduction[this];
        set => fields.Deduction[this] = value;
    }

    [DisplayName("Earnings")]
    public double? Earnings
    {
        get => fields.Earnings[this];
        set => fields.Earnings[this] = value;
    }

    [DisplayName("Nett")]
    public double? Nett
    {
        get => fields.Nett[this];
        set => fields.Nett[this] = value;
    }

    [DisplayName("Employee Socso"), Column("EmployeeSOCSO")]
    public double? EmployeeSocso
    {
        get => fields.EmployeeSocso[this];
        set => fields.EmployeeSocso[this] = value;
    }

    [DisplayName("Employee Epf"), Column("EmployeeEPF")]
    public double? EmployeeEpf
    {
        get => fields.EmployeeEpf[this];
        set => fields.EmployeeEpf[this] = value;
    }

    [DisplayName("Employee Eis"), Column("EmployeeEIS")]
    public double? EmployeeEis
    {
        get => fields.EmployeeEis[this];
        set => fields.EmployeeEis[this] = value;
    }

    [DisplayName("Payroll Table"), QuickSearch, NameProperty]
    public string PayrollTable
    {
        get => fields.PayrollTable[this];
        set => fields.PayrollTable[this] = value;
    }

    [DisplayName("Remarks")]
    public string Remarks
    {
        get => fields.Remarks[this];
        set => fields.Remarks[this] = value;
    }

    [DisplayName("Pay Period Start")]
    public DateTime? PayPeriodStart
    {
        get => fields.PayPeriodStart[this];
        set => fields.PayPeriodStart[this] = value;
    }

    [DisplayName("Pay Period End")]
    public DateTime? PayPeriodEnd
    {
        get => fields.PayPeriodEnd[this];
        set => fields.PayPeriodEnd[this] = value;
    }

    [DisplayName("Pay Month")]
    public int? PayMonth
    {
        get => fields.PayMonth[this];
        set => fields.PayMonth[this] = value;
    }

    [DisplayName("Pay Year")]
    public int? PayYear
    {
        get => fields.PayYear[this];
        set => fields.PayYear[this] = value;
    }


    [DisplayName("Days Worked")]
    public double? DaysWorked
    {
        get => fields.DaysWorked[this];
        set => fields.DaysWorked[this] = value;
    }

    [DisplayName("Daily Rate")]
    public double? DailyRate
    {
        get => fields.DailyRate[this];
        set => fields.DailyRate[this] = value;
    }

    [DisplayName("Hourly Rate")]
    public double? HourlyRate
    {
        get => fields.HourlyRate[this];
        set => fields.HourlyRate[this] = value;
    }

    [DisplayName("Flat Ot")]
    public double? FlatOt
    {
        get => fields.FlatOt[this];
        set => fields.FlatOt[this] = value;
    }

    [DisplayName("Ot One")]
    public double? OtOne
    {
        get => fields.OtOne[this];
        set => fields.OtOne[this] = value;
    }

    [DisplayName("Ot One Point Five")]
    public double? OtOnePointFive
    {
        get => fields.OtOnePointFive[this];
        set => fields.OtOnePointFive[this] = value;
    }

    [DisplayName("Ot Two")]
    public double? OtTwo
    {
        get => fields.OtTwo[this];
        set => fields.OtTwo[this] = value;
    }

    [DisplayName("Ot One Point Five Rate")]
    public double? OtOnePointFiveRate
    {
        get => fields.OtOnePointFiveRate[this];
        set => fields.OtOnePointFiveRate[this] = value;
    }

    [DisplayName("Ot Two Rate")]
    public double? OtTwoRate
    {
        get => fields.OtTwoRate[this];
        set => fields.OtTwoRate[this] = value;
    }

    public class RowFields : LoggingRowFields
    {
        public Int32Field Id;
        public Int32Field WeekIndex;
        public Int32Field EmployeeRowId;
        public DateTimeField PayDate;
        public DoubleField Deduction;
        public DoubleField Earnings;
        public DoubleField Nett;
        public DoubleField EmployeeSocso;
        public DoubleField EmployeeEpf;
        public DoubleField EmployeeEis;
        public StringField PayrollTable;
        public StringField Remarks;
        public DateTimeField PayPeriodStart;
        public DateTimeField PayPeriodEnd;
        public Int32Field PayMonth;
        public Int32Field PayYear;
        public DoubleField DaysWorked;
        public DoubleField DailyRate;
        public DoubleField HourlyRate;
        public DoubleField FlatOt;
        public DoubleField OtOne;
        public DoubleField OtOnePointFive;
        public DoubleField OtTwo;
        public DoubleField OtOnePointFiveRate;
        public DoubleField OtTwoRate;

    }
}