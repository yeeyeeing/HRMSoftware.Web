using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.SetEmployeeShift.Columns;

[ColumnsScript("SetEmployeeShift.SetEmployeeShift")]
[BasedOnRow(typeof(SetEmployeeShiftRow), CheckNames = true)]
public class SetEmployeeShiftColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int Id { get; set; }
    [EditLink]
    public string EmployeeName { get; set; }

    public DateTime ShiftStartDate { get; set; }
    public DateTime ShiftEndDate { get; set; }
}