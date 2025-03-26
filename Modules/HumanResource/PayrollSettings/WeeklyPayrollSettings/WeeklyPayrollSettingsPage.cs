using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(WeeklyPayrollSettingsRow))]
public class WeeklyPayrollSettingsPage : Controller
{
    [Route("PayrollSettings/WeeklyPayrollSettings")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/WeeklyPayrollSettings/WeeklyPayrollSettingsPage",
            WeeklyPayrollSettingsRow.Fields.PageTitle());
    }
}