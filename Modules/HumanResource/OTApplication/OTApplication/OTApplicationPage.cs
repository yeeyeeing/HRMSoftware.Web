using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.OTApplication.Pages;

[PageAuthorize("*")]
public class OTApplicationPage : Controller
{
    [Route("OTApplication/OTApplication")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/OTApplication/OTApplication/OTApplicationPage",
            OTApplicationRow.Fields.PageTitle());
    }
}