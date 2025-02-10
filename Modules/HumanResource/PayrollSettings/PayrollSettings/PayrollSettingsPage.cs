using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(PayrollSettingsRow))]
public class PayrollSettingsPage : Controller
{
    [Route("PayrollSettings/PayrollSettings")]
    public ActionResult Index()
    {
        return this.GridPage("@/PayrollSettings/PayrollSettings/PayrollSettingsPage",
            PayrollSettingsRow.Fields.PageTitle());
    }
}