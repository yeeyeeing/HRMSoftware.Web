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
    public double Amount { get; set; }
    public string Description { get; set; }

    public int SubjectionEis { get; set; }
    public int SubjectionEpf { get; set; }
    public int SubjectionSocso { get; set; }
    public int SubjectionPcb { get; set; }
    public int SubjectionHrdf { get; set; }
    public int SubjectionOt { get; set; }
}