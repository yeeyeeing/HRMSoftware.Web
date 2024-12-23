using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeGroup.Forms;

[FormScript("EmployeeGroup.EmployeeGroupShift")]
[BasedOnRow(typeof(EmployeeGroupShiftRow), CheckNames = true)]
public class EmployeeGroupShiftForm
{
    public int ShiftId { get; set; }
    [HalfWidth]
    public DateTime ShiftStartDate { get; set; }
    [HalfWidth]
    public DateTime ShiftEndDate { get; set; }

}