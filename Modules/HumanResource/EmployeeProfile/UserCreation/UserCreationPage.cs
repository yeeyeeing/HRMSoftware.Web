using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(UserCreationRow))]
public class UserCreationPage : Controller
{
    [Route("EmployeeProfile/UserCreation")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/UserCreation/UserCreationPage",
            UserCreationRow.Fields.PageTitle());
    }
}