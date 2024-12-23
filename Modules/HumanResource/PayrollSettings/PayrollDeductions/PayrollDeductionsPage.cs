using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(PayrollDeductionsRow))]
public class PayrollDeductionsPage : Controller
{
    [Route("PayrollSettings/PayrollDeductions")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/PayrollDeductions/PayrollDeductionsPage",
            PayrollDeductionsRow.Fields.PageTitle());
    }
}