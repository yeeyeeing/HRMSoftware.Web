using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.TrainingManagement.Pages;

[PageAuthorize(typeof(MasterProgramRow))]
public class MasterProgramPage : Controller
{
    [Route("TrainingManagement/MasterProgram")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/TrainingManagement/MasterProgram/MasterProgramPage",
            MasterProgramRow.Fields.PageTitle());
    }
}