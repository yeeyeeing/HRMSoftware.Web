using Serenity.ComponentModel;
using System.ComponentModel;

namespace HRMSoftware.Announcement.Columns;

[ColumnsScript("Announcement.RecurringBindedEmployee")]
[BasedOnRow(typeof(RecurringBindedEmployeeRow), CheckNames = true)]
public class RecurringBindedEmployeeColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    public int EmployeeRowId { get; set; }
    public int RecurringId { get; set; }
}