using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(PayslipDeductedOneTimeDeductionsRow))]
public class PayslipDeductedOneTimeDeductionsPage : Controller
{
    [Route("PayrollSettings/PayslipDeductedOneTimeDeductions")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/PayslipDeductedOneTimeDeductions/PayslipDeductedOneTimeDeductionsPage",
            PayslipDeductedOneTimeDeductionsRow.Fields.PageTitle());
    }
}