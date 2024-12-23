using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.TrainingManagement.Pages;

// [PageAuthorize(typeof(ProgramRow))]
public class ApplyNewSessionPage : Controller
{
    [Route("TrainingManagement/ApplyNewSession")]
    public ActionResult Index()
    {
        return this.GridPage("@/TrainingManagement/ApplyNewSession/ApplyNewSessionPage", "Apply New Session");
    }
}