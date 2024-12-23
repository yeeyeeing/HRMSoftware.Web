using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeGroup.Pages;

[PageAuthorize(typeof(EmployeeGroupShiftPatternRow))]
public class EmployeeGroupShiftPatternPage : Controller
{
    [Route("EmployeeGroup/EmployeeGroupShiftPattern")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeGroup/EmployeeGroupShiftPattern/EmployeeGroupShiftPatternPage",
            EmployeeGroupShiftPatternRow.Fields.PageTitle());
    }
}