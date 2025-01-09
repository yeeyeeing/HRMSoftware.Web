using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(MasterCareerPathRow))]
public class MasterCareerPathPage : Controller
{
    [Route("EmployeeProfile/MasterCareerPath")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/MasterCareerPath/MasterCareerPathPage",
            MasterCareerPathRow.Fields.PageTitle());
    }
}