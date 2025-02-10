using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(EmployeeCp38Row))]
public class EmployeeCp38Page : Controller
{
    [Route("EmployeeProfile/EmployeeCp38")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/EmployeeCp38/EmployeeCp38Page",
            EmployeeCp38Row.Fields.PageTitle());
    }
}