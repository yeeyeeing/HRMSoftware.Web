using HRMSoftware.Administration;
using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeGroup.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class EmployeeGroupPage : Controller
{
    [Route("EmployeeGroup/EmployeeGroup")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeGroup/EmployeeGroup/EmployeeGroupPage",
            EmployeeGroupRow.Fields.PageTitle());
    }
}