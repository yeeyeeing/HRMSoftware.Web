using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeProfile.Columns;

[ColumnsScript("EmployeeProfile.MasterDeduction")]
[BasedOnRow(typeof(MasterDeductionRow), CheckNames = true)]
public class MasterDeductionColumns
{

    [EditLink]
    public string DeductionCode { get; set; }
    public double Amount { get; set; }
    public string Description { get; set; }
}