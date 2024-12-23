using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(EmployerContributionsRow))]
public class EmployerContributionsPage : Controller
{
    [Route("PayrollSettings/EmployerContributions")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/EmployerContributions/EmployerContributionsPage",
            EmployerContributionsRow.Fields.PageTitle());
    }
}