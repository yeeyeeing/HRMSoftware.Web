using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(PcbSubjectionRow))]
public class PcbSubjectionPage : Controller
{
    [Route("PayrollSettings/PcbSubjection")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/PcbSubjection/PcbSubjectionPage",
            PcbSubjectionRow.Fields.PageTitle());
    }
}