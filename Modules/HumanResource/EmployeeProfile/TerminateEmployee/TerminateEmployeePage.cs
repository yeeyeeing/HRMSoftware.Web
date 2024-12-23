using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(TerminateEmployeeRow))]
public class TerminateEmployeePage : Controller
{
    [Route("EmployeeProfile/TerminateEmployee")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/TerminateEmployee/TerminateEmployeePage",
            TerminateEmployeeRow.Fields.PageTitle());
    }
}