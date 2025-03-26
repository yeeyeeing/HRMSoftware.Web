using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Columns;

[ColumnsScript("PayrollSettings.WeeklyPayroll")]
[BasedOnRow(typeof(WeeklyPayrollRow), CheckNames = true)]
public class WeeklyPayrollColumns
{
    [EditLink]
    public int Id { get; set; }
    public int WeekIndex { get; set; }
    public int EmployeeRowId { get; set; }
    public DateTime PayDate { get; set; }
    public double Deduction { get; set; }
    public double Earnings { get; set; }
    public double Nett { get; set; }
    public double EmployeeSocso { get; set; }
    public double EmployeeEpf { get; set; }
    public double EmployeeEis { get; set; }
    [EditLink]
    public string PayrollTable { get; set; }
    public string Remarks { get; set; }
    public DateTime PayPeriodStart { get; set; }
    public DateTime PayPeriodEnd { get; set; }
    public int PayMonth { get; set; }
    public int PayYear { get; set; }
    public DateTime InsertDate { get; set; }
    public int InsertUserId { get; set; }
    public DateTime UpdateDate { get; set; }
    public int UpdateUserId { get; set; }
    public DateTime DeleteDate { get; set; }
    public int DeleteUserId { get; set; }
    public short IsActive { get; set; }
    public double DaysWorked { get; set; }
    public double DailyRate { get; set; }
    public double HourlyRate { get; set; }
    public double FlatOt { get; set; }
    public double OtOne { get; set; }
    public double OtOnePointFive { get; set; }
    public double OtTwo { get; set; }
    public double OtOnePointFiveRate { get; set; }
    public double OtTwoRate { get; set; }
}