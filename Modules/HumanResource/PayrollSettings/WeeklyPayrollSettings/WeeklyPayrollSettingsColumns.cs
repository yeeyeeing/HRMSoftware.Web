using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.PayrollSettings.Columns;

[ColumnsScript("PayrollSettings.WeeklyPayrollSettings")]
[BasedOnRow(typeof(WeeklyPayrollSettingsRow), CheckNames = true)]
public class WeeklyPayrollSettingsColumns
{
    [EditLink]
    public int Id { get; set; }
    public int GenerateFirst { get; set; }
    public int GenerateSecond { get; set; }
    public int GenerateThird { get; set; }
    public int GenerateFourth { get; set; }
}