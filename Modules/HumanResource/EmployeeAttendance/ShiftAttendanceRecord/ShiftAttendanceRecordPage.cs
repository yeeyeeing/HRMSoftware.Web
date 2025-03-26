using HRMSoftware.Administration;
using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Web;

namespace HRMSoftware.EmployeeAttendance.Pages;

//[PageAuthorize(PermissionKeys.ViewShiftAttendance)]
[PageAuthorize(typeof(ShiftAttendanceRecordRow))]
//[NavigationPermission(PermissionKeys.ViewShiftAttendance + "," + PermissionKeys.HumanResources)]

public class ShiftAttendanceRecordPage : Controller
{
    [Route("EmployeeAttendance/ShiftAttendanceRecord")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeAttendance/ShiftAttendanceRecord/ShiftAttendanceRecordPage",
            ShiftAttendanceRecordRow.Fields.PageTitle());
    }
}