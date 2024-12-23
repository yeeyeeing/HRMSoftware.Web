using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(HrdfSubjectionRow))]
public class HrdfSubjectionPage : Controller
{
    [Route("PayrollSettings/HrdfSubjection")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/HrdfSubjection/HrdfSubjectionPage",
            HrdfSubjectionRow.Fields.PageTitle());
    }
}