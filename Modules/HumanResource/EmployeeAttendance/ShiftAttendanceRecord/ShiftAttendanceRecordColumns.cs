using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeAttendance.Columns;

[ColumnsScript("EmployeeAttendance.ShiftAttendanceRecord")]
[BasedOnRow(typeof(ShiftAttendanceRecordRow), CheckNames = true)]
public class ShiftAttendanceRecordColumns
{
    //[EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    //public int Id { get; set; }
    [EditLink]
    public string EmployeeName { get; set; }
    public string EmployeeID { get; set; }


    public string ShiftName { get; set; }
    [Width(200, Max = 300)]
    public string TimeIn { get; set; }
    [Width(200, Max = 300)]
    public string TimeOut { get; set; }


    [Width(200, Max = 300)]
    public string ShiftStartTime { get; set; }
    [Width(200, Max = 300)]
    public string ShiftEndTime { get; set; }


    public int LateIn { get; set; }
    public int Ot { get; set; }
    public int EarlyLeave { get; set; }
}