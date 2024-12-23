using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.ViewShiftHistory.Columns;

[ColumnsScript("ViewShiftHistory.ViewShiftHistory")]
[BasedOnRow(typeof(ViewShiftHistoryRow), CheckNames = true)]
public class ViewShiftHistoryColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    public DateTime InsertDate { get; set; }
    public int ShiftId { get; set; }

    public DateTime ShiftStartDate { get; set; }
    public DateTime ShiftEndDate { get; set; }
}