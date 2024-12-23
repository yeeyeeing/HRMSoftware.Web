using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeGroup.Columns;

[ColumnsScript("EmployeeGroup.EmployeeGroupShift")]
[BasedOnRow(typeof(EmployeeGroupShiftRow), CheckNames = true)]
public class EmployeeGroupShiftColumns
{

    [EditLink]
    public string Shift { get; set; }
    public DateTime ShiftStartDate { get; set; }
    public DateTime ShiftEndDate { get; set; }
}