using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.ShiftHistory.Columns;

[ColumnsScript("ShiftHistory.ShiftHistory")]
[BasedOnRow(typeof(ShiftHistoryRow), CheckNames = true)]
public class ShiftHistoryColumns
{
  //  [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    //public int Id { get; set; }
    [EditLink]
    public string EmployeeId { get; set; }
    public DateTime ShiftStartDate { get; set; }
    public DateTime ShiftEndDate { get; set; }
    public string Shift { get; set; }
}