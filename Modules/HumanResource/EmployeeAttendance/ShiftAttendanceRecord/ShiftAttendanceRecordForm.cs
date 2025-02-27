using Serenity.ComponentModel;
using System;
using System.ComponentModel;

namespace HRMSoftware.EmployeeAttendance.Forms;

[FormScript("EmployeeAttendance.ShiftAttendanceRecord")]
[BasedOnRow(typeof(ShiftAttendanceRecordRow), CheckNames = true)]
public class ShiftAttendanceRecordForm
{
    public int EmployeeRowId { get; set; }
    public int ShiftId { get; set; }
    [Category("Time In")]

    [HalfWidth]
    public DateTime TimeIn { get; set; }
    [HalfWidth]
    public string TimeInHour { get; set; }
    [Category("Time Out")]

    [HalfWidth]
    public DateTime TimeOut { get; set; }
    [HalfWidth]
    public string TimeOutHour { get; set; }
    [Category("Shift Start")]
    [HalfWidth]
    public DateTime ShiftStartTime { get; set; }
    [HalfWidth]
    public string ShiftStartTimeHour { get; set; }
    [Category("Shift End")]

    [HalfWidth]
    public DateTime ShiftEndTime { get; set; }
    [HalfWidth]
    public string ShiftEndTimeHour { get; set; }
    [TextAreaEditor(Rows = 3)]
    public string EmpRemark { get; set; }
    [TextAreaEditor(Rows = 3)]
    public string SupRemark { get; set; }
    [TextAreaEditor(Rows = 3)]
    public string LvPhRemark { get; set; }

    //public int ShiftId { get; set; }
    /*
    public int LateIn { get; set; }
    public int Ot { get; set; }
    public int EarlyLeave { get; set; }
    public int TimeInRowId { get; set; }
    public int TimeOutRowId { get; set; }
    */
    //public DateTime ShiftDate { get; set; }
}