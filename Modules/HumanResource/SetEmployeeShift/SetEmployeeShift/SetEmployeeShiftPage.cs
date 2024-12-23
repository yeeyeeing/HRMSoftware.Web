using HRMSoftware.Administration;
using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.SetEmployeeShift.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class SetEmployeeShiftPage : Controller
{
    [Route("SetEmployeeShift/SetEmployeeShift")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/SetEmployeeShift/SetEmployeeShift/SetEmployeeShiftPage",
            SetEmployeeShiftRow.Fields.PageTitle());
    }
}