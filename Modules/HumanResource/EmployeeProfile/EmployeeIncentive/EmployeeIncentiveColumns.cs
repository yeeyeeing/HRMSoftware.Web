using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Columns;

[ColumnsScript("EmployeeProfile.EmployeeIncentive")]
[BasedOnRow(typeof(EmployeeIncentiveRow), CheckNames = true)]
public class EmployeeIncentiveColumns
{
    [EditLink]

    public string EmployeeID { get; set; }
    public string EmployeeName { get; set; }

    public string IncentiveDescription { get; set; }
    [Width(200, Max = 250, Min = 200)]
    public double IncentiveAmount { get; set; }
    [Width(200, Max = 250, Min = 200)]
    public int PayMonth { get; set; }
    [Width(200, Max = 250, Min = 200)]
    public int PayYear { get; set; }
}