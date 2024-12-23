using HRMSoftware.Administration;
using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.SickLeavePolicy.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class SickLeavePolicyPage : Controller
{
    [Route("SickLeavePolicy/SickLeavePolicy")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/SickLeavePolicy/SickLeavePolicy/SickLeavePolicyPage",
            SickLeavePolicyRow.Fields.PageTitle());
    }
}