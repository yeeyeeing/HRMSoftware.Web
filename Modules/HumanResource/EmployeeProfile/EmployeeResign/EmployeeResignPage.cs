using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(EmployeeResignRow))]
public class EmployeeResignPage : Controller
{
    [Route("EmployeeProfile/EmployeeResign")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/EmployeeResign/EmployeeResignPage",
            EmployeeResignRow.Fields.PageTitle());
    }
}