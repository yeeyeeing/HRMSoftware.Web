using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(PayrollEarningsRow))]
public class PayrollEarningsPage : Controller
{
    [Route("PayrollSettings/PayrollEarnings")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/PayrollEarnings/PayrollEarningsPage",
            PayrollEarningsRow.Fields.PageTitle());
    }
}