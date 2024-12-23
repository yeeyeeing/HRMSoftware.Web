using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(PayslipPaidMoneyClaimingRow))]
public class PayslipPaidMoneyClaimingPage : Controller
{
    [Route("PayrollSettings/PayslipPaidMoneyClaiming")]
    public ActionResult Index()
    {
        return this.GridPage("@/PayrollSettings/PayslipPaidMoneyClaiming/PayslipPaidMoneyClaimingPage",
            PayslipPaidMoneyClaimingRow.Fields.PageTitle());
    }
}