using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeEditHistory.Columns;

[ColumnsScript("EmployeeEditHistory.EmployeeEditHistory")]
[BasedOnRow(typeof(EmployeeEditHistoryRow), CheckNames = true)]
public class EmployeeEditHistoryColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    [EditLink]

    public int EmployeeRowId { get; set; }
 
    public string OldValue { get; set; }
    public string NewValue { get; set; }
    public string FieldName { get; set; }
    public string Description { get; set; }
}