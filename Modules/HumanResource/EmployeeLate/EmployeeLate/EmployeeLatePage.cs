using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeLate.Pages;

[PageAuthorize(typeof(EmployeeLateRow))]
public class EmployeeLatePage : Controller
{
    [Route("EmployeeLate/EmployeeLate")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeLate/EmployeeLate/EmployeeLatePage",
            EmployeeLateRow.Fields.PageTitle());
    }
}