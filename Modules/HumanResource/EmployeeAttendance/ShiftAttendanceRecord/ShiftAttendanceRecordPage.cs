using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeAttendance.Pages;

[PageAuthorize(typeof(ShiftAttendanceRecordRow))]
public class ShiftAttendanceRecordPage : Controller
{
    [Route("EmployeeAttendance/ShiftAttendanceRecord")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeAttendance/ShiftAttendanceRecord/ShiftAttendanceRecordPage",
            ShiftAttendanceRecordRow.Fields.PageTitle());
    }
}