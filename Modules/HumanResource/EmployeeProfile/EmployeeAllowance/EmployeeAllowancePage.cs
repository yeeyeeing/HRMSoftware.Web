using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(EmployeeAllowanceRow))]
public class EmployeeAllowancePage : Controller
{
    [Route("EmployeeProfile/EmployeeAllowance")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/EmployeeAllowance/EmployeeAllowancePage",
            EmployeeAllowanceRow.Fields.PageTitle());
    }
}