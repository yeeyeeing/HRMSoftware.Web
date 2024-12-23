using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.OTApplication.Pages;

[PageAuthorize(typeof(OTReasonRow))]
public class OTReasonPage : Controller
{
    [Route("OTApplication/OTReason")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/OTApplication/OTReason/OTReasonPage",
            OTReasonRow.Fields.PageTitle());
    }
}