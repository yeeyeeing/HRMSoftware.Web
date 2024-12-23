using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(SocsoSubjectionRow))]
public class SocsoSubjectionPage : Controller
{
    [Route("PayrollSettings/SocsoSubjection")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/SocsoSubjection/SocsoSubjectionPage",
            SocsoSubjectionRow.Fields.PageTitle());
    }
}