using Microsoft.AspNetCore.Mvc;
using Serenity.Web;
using HRMSoftware.Administration;

namespace HRMSoftware.AnnualLeavePolicy.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class AnnualLeavePolicyPage : Controller
{
    [Route("AnnualLeavePolicy/AnnualLeavePolicy")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/AnnualLeavePolicy/AnnualLeavePolicy/AnnualLeavePolicyPage",
            AnnualLeavePolicyRow.Fields.PageTitle());
    }
}