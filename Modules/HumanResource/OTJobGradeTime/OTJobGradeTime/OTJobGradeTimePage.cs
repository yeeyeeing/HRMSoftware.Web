using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.OTJobGradeTime.Pages;

[PageAuthorize(typeof(OTJobGradeTimeRow))]
public class OTJobGradeTimePage : Controller
{
    [Route("OTJobGradeTime/OTJobGradeTime")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/OTJobGradeTime/OTJobGradeTime/OTJobGradeTimePage",
            OTJobGradeTimeRow.Fields.PageTitle());
    }
}