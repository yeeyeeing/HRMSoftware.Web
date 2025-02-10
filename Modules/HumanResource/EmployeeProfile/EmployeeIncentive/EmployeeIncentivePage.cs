using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(EmployeeIncentiveRow))]
public class EmployeeIncentivePage : Controller
{
    [Route("EmployeeProfile/EmployeeIncentive")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/EmployeeIncentive/EmployeeIncentivePage",
            EmployeeIncentiveRow.Fields.PageTitle());
    }
}