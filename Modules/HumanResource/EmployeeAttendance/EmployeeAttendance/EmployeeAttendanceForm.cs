using Serenity.ComponentModel;
using System;

namespace HRMSoftware.EmployeeAttendance.Forms;

[FormScript("EmployeeAttendance.EmployeeAttendance")]
[BasedOnRow(typeof(EmployeeAttendanceRow), CheckNames = true)]
public class EmployeeAttendanceForm
{
    [OneThirdWidth]
    public DateTime AuthenticationDate { get; set; }

    [OneThirdWidth]
    public TimeSpan AuthenticationTime { get; set; }

    [OneThirdWidth]
    public int AuthenticationSecond { get; set; }
    [HalfWidth]
    public int EmployeeRowID { get; set; }
    [HalfWidth]
    public string PersonName { get; set; }

    public string DeviceName { get; set; }
    public string DeviceSerial { get; set; }
    public string CardNo { get; set; }
   

}