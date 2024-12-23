using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(PayslipPaidOneTimeAllowanceRow))]
public class PayslipPaidOneTimeAllowancePage : Controller
{
    [Route("PayrollSettings/PayslipPaidOneTimeAllowance")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PayrollSettings/PayslipPaidOneTimeAllowance/PayslipPaidOneTimeAllowancePage",
            PayslipPaidOneTimeAllowanceRow.Fields.PageTitle());
    }
}