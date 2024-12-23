using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeEarlyLeaving.Pages;

[PageAuthorize(typeof(EmployeeEarlyLeavingRow))]
public class EmployeeEarlyLeavingPage : Controller
{
    [Route("EmployeeEarlyLeaving/EmployeeEarlyLeaving")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeEarlyLeaving/EmployeeEarlyLeaving/EmployeeEarlyLeavingPage",
            EmployeeEarlyLeavingRow.Fields.PageTitle());
    }
}