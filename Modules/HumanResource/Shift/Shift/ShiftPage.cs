using HRMSoftware.Administration;
using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Shift.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]

public class ShiftPage : Controller
{
    [Route("Shift/Shift")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Shift/Shift/ShiftPage",
            ShiftRow.Fields.PageTitle());
    }
}