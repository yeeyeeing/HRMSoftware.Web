using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(EmployeeProfileRow))]
public class EmployeeProfilePage : Controller
{
    [Route("EmployeeProfile/EmployeeProfile")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/EmployeeProfile/EmployeeProfilePage",
            EmployeeProfileRow.Fields.PageTitle());
    }
}