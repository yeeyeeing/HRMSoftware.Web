using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Columns;

[ColumnsScript("EmployeeProfile.EmployeeCp38")]
[BasedOnRow(typeof(EmployeeCp38Row), CheckNames = true)]
public class EmployeeCp38Columns
{
    [EditLink]

    public string EmployeeID { get; set; }
    public string EmployeeName { get; set; }
    [Width(200, Max = 250, Min = 200)]
    public double Cp38Amount { get; set; }
    [Width(200, Max = 250, Min = 200)]
    public DateTime EffectiveFrom { get; set; }
    [Width(200, Max = 250, Min = 200)]
    public DateTime EffectiveUntil { get; set; }
}