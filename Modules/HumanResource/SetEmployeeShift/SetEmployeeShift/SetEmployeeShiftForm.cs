using Serenity.ComponentModel;
using System;

namespace HRMSoftware.SetEmployeeShift.Forms;

[FormScript("SetEmployeeShift.SetEmployeeShift")]
[BasedOnRow(typeof(SetEmployeeShiftRow), CheckNames = true)]
public class SetEmployeeShiftForm
{
    [HalfWidth]
    public int EmployeeRowId { get; set; }
    [HalfWidth]

    public string EmployeeName { get; set; }
    [HalfWidth]
    public DateTime ShiftStartDate { get; set; }
    [HalfWidth]
    public DateTime ShiftEndDate { get; set; }
    public int ShiftId { get; set; }
    public int EmployeeGroupId { get; set; }

}