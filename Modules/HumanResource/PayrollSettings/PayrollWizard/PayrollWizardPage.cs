using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(PayrollWizardRow))]
public class PayrollWizardPage : Controller
{
    [Route("PayrollSettings/PayrollWizard")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/PayrollWizard/PayrollWizardPage",
            PayrollWizardRow.Fields.PageTitle());
    }
}