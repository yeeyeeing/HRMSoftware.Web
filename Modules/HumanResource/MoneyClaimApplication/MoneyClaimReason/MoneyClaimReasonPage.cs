using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.MoneyClaimApplication.Pages;

[PageAuthorize(typeof(MoneyClaimReasonRow))]
public class MoneyClaimReasonPage : Controller
{
    [Route("MoneyClaimApplication/MoneyClaimReason")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/MoneyClaimApplication/MoneyClaimReason/MoneyClaimReasonPage",
            MoneyClaimReasonRow.Fields.PageTitle());
    }
}