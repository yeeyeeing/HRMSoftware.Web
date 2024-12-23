using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(EisSubjectionRow))]
public class EisSubjectionPage : Controller
{
    [Route("PayrollSettings/EisSubjection")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/EisSubjection/EisSubjectionPage",
            EisSubjectionRow.Fields.PageTitle());
    }
}