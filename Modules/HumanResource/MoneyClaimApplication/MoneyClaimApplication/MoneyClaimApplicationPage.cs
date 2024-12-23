using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.MoneyClaimApplication.Pages;

[PageAuthorize(typeof(MoneyClaimApplicationRow))]
public class MoneyClaimApplicationPage : Controller
{
    [Route("MoneyClaimApplication/MoneyClaimApplication")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/MoneyClaimApplication/MoneyClaimApplication/MoneyClaimApplicationPage",
            MoneyClaimApplicationRow.Fields.PageTitle());
    }
}