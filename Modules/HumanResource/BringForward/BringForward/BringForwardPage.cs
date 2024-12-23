using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.BringForward.Pages;

[PageAuthorize(typeof(BringForwardRow))]
public class BringForwardPage : Controller
{
    [Route("BringForward/BringForward")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/BringForward/BringForward/BringForwardPage",
            BringForwardRow.Fields.PageTitle());
    }
}