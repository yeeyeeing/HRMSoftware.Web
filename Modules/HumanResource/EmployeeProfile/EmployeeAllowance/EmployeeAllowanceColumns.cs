using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Columns;

[ColumnsScript("EmployeeProfile.EmployeeAllowance")]
[BasedOnRow(typeof(EmployeeAllowanceRow), CheckNames = true)]
public class EmployeeAllowanceColumns
{
    [EditLink]
    // public int MasterAllowanceId { get; set; }
    public string AllowanceCode { get; set; }

    public string Description { get; set; }
    [Width(100, Max = 300)]
    public double Amount { get; set; }
    [Width(100, Max = 300)]
    public int SubjectionEis { get; set; }
    [Width(100, Max = 300)]
    public int SubjectionEpf { get; set; }
    [Width(100, Max = 300)]
    public int SubjectionHrdf { get; set; }
    [Width(100, Max = 300)]
    public int SubjectionPcb { get; set; }
    [Width(100, Max = 300)]
    public int SubjectionSocso { get; set; }
    [Width(100, Max = 300)]
    public int SubjectionOt { get; set; }

    [Width(100, Max = 300)]
    public DateTime EffectiveFrom { get; set; }

    [Width(100, Max = 300)]
    public DateTime EffectiveUntil { get; set; }
}