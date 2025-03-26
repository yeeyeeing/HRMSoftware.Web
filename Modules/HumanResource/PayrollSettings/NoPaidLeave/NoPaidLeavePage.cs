using HRMSoftware.Administration;
using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]

public class NoPaidLeavePage : Controller
{
    [Route("PayrollSettings/NoPaidLeave")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/NoPaidLeave/NoPaidLeavePage",
            NoPaidLeaveRow.Fields.PageTitle());
    }
}