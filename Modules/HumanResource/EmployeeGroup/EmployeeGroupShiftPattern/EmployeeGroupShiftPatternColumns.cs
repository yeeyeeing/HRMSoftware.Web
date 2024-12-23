using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeGroup.Columns;

[ColumnsScript("EmployeeGroup.EmployeeGroupShiftPattern")]
[BasedOnRow(typeof(EmployeeGroupShiftPatternRow), CheckNames = true)]
public class EmployeeGroupShiftPatternColumns
{
 
    public DateTime ShiftStartDate { get; set; }
    public DateTime ShiftEndDate { get; set; }
    public string ShiftName { get; set; }
}