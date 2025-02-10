using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(EmployeeBonusRow))]
public class EmployeeBonusPage : Controller
{
    [Route("EmployeeProfile/EmployeeBonus")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/EmployeeBonus/EmployeeBonusPage",
            EmployeeBonusRow.Fields.PageTitle());
    }
}