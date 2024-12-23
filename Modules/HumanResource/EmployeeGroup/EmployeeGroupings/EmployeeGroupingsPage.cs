using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeGroup.Pages;

[PageAuthorize(typeof(EmployeeGroupingsRow))]
public class EmployeeGroupingsPage : Controller
{
    [Route("EmployeeGroup/EmployeeGroupings")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeGroup/EmployeeGroupings/EmployeeGroupingsPage",
            EmployeeGroupingsRow.Fields.PageTitle());
    }
}