using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeAttendance.Pages;

[PageAuthorize(typeof(EmployeeAttendanceRow))]
public class EmployeeAttendancePage : Controller
{
    [Route("EmployeeAttendance/EmployeeAttendance")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeAttendance/EmployeeAttendance/EmployeeAttendancePage",
            EmployeeAttendanceRow.Fields.PageTitle());
    }
}