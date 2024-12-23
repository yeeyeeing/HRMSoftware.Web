using Serenity.ComponentModel;
using System;

namespace HRMSoftware.ViewShiftHistory.Forms;

[FormScript("ViewShiftHistory.ViewShiftHistory")]
[BasedOnRow(typeof(ViewShiftHistoryRow), CheckNames = true)]
public class ViewShiftHistoryForm
{
    
    [HalfWidth]
    public string EmployeeId { get; set; }

    [HalfWidth]
    public string EmployeeName { get; set; }
    /*
    [HalfWidth]
    public int ShiftId { get; set; }
    [HalfWidth]
    public DateTime ShiftStartDate { get; set; }
    [HalfWidth]
    public DateTime ShiftEndDate { get; set; }
   */
}