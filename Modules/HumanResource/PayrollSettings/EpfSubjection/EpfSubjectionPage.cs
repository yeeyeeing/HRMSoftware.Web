using HRMSoftware.Administration;
using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class EpfSubjectionPage : Controller
{
    [Route("PayrollSettings/EpfSubjection")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/EpfSubjection/EpfSubjectionPage",
            EpfSubjectionRow.Fields.PageTitle());
    }
}