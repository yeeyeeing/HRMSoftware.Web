using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.TrainingManagement.Pages;

[PageAuthorize(typeof(ReportRow))]
public class ReportPage : Controller
{
    [Route("TrainingManagement/Report")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/TrainingManagement/Report/ReportPage",
            ReportRow.Fields.PageTitle());
    }
}