using Serenity.ComponentModel;
using System;

namespace HRMSoftware.ShiftHistory.Forms;

[FormScript("ShiftHistory.ShiftHistory")]
[BasedOnRow(typeof(ShiftHistoryRow), CheckNames = true)]
public class ShiftHistoryForm
{
    public string EmployeeId { get; set; }
    public string Shift { get; set; }
}