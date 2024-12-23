using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.TrainingManagement.Pages;

[PageAuthorize(typeof(ProgramFlowResponseRow))]
public class ProgramFlowResponsePage : Controller
{
    [Route("TrainingManagement/ProgramFlowResponse")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/TrainingManagement/ProgramFlowResponse/ProgramFlowResponsePage",
            ProgramFlowResponseRow.Fields.PageTitle());
    }
}