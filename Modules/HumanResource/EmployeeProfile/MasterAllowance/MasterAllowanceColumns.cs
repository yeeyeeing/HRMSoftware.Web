using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Columns;

[ColumnsScript("EmployeeProfile.MasterAllowance")]
[BasedOnRow(typeof(MasterAllowanceRow), CheckNames = true)]
public class MasterAllowanceColumns
{
  
    [EditLink]
    public string AllowanceCode { get; set; }
    [Width(100, Max = 300)]
    public double Amount { get; set; }
    public string Description { get; set; }
    [Width(100, Max = 300)]
    public int SubjectionEis { get; set; }
    [Width(100, Max = 300)]
    public int SubjectionEpf { get; set; }
    [Width(100, Max = 300)]
    public int SubjectionSocso { get; set; }
    [Width(100, Max = 300)]
    public int SubjectionPcb { get; set; }
    [Width(100, Max = 300)]
    public int SubjectionHrdf { get; set; }
    [Width(100, Max = 300)]
    public int SubjectionOt { get; set; }
}