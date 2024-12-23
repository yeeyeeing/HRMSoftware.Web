using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.TrainingManagement.Pages;

// [PageAuthorize(typeof(ProgramRow))]
public class ApplyNewProgramPage : Controller
{
    [Route("TrainingManagement/ApplyNewProgram")]
    public ActionResult Index()
    {
        return this.GridPage("@/TrainingManagement/ApplyNewProgram/ApplyNewProgramPage", "Apply New Program");
    }
}