using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(WeeklyPayrollRow))]
public class WeeklyPayrollPage : Controller
{
    [Route("PayrollSettings/WeeklyPayroll")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/WeeklyPayroll/WeeklyPayrollPage",
            WeeklyPayrollRow.Fields.PageTitle());
    }
}