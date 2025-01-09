using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(EmployeeCareerPathRow))]
public class EmployeeCareerPathPage : Controller
{
    [Route("EmployeeProfile/EmployeeCareerPath")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/EmployeeCareerPath/EmployeeCareerPathPage",
            EmployeeCareerPathRow.Fields.PageTitle());
    }
}