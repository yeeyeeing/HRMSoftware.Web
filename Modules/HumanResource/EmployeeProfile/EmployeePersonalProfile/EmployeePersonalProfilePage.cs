using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(EmployeePersonalProfileRow))]
public class EmployeePersonalProfilePage : Controller
{
    [Route("EmployeeProfile/EmployeePersonalProfile")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/EmployeePersonalProfile/EmployeePersonalProfilePage",
            EmployeePersonalProfileRow.Fields.PageTitle());
    }
}