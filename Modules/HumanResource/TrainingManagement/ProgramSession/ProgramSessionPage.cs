using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.TrainingManagement.Pages;

[PageAuthorize(typeof(ProgramSessionRow))]
public class ProgramSessionPage : Controller
{
    [Route("TrainingManagement/ProgramSession")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/TrainingManagement/ProgramSession/ProgramSessionPage",
            ProgramSessionRow.Fields.PageTitle());
    }
}