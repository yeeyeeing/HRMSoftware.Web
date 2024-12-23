using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(PayrollGeneratingWizardRow))]
public class PayrollGeneratingWizardPage : Controller
{
    [Route("PayrollSettings/PayrollGeneratingWizard")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/PayrollGeneratingWizard/PayrollGeneratingWizardPage",
            PayrollGeneratingWizardRow.Fields.PageTitle());
    }
}