using Serenity.ComponentModel;

namespace HRMSoftware.Announcement.Forms;

[FormScript("Announcement.RecurringBindedEmployee")]
[BasedOnRow(typeof(RecurringBindedEmployeeRow), CheckNames = true)]
public class RecurringBindedEmployeeForm
{
    public int EmployeeRowId { get; set; }
    public int RecurringId { get; set; }
}