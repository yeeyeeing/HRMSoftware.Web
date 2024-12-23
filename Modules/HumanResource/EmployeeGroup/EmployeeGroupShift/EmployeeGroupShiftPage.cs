using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeGroup.Pages;

[PageAuthorize(typeof(EmployeeGroupShiftRow))]
public class EmployeeGroupShiftPage : Controller
{
    [Route("EmployeeGroup/EmployeeGroupShift")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeGroup/EmployeeGroupShift/EmployeeGroupShiftPage",
            EmployeeGroupShiftRow.Fields.PageTitle());
    }
}