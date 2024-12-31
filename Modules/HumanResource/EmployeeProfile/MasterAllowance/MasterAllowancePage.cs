using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(MasterAllowanceRow))]
public class MasterAllowancePage : Controller
{
    [Route("EmployeeProfile/MasterAllowance")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/MasterAllowance/MasterAllowancePage",
            MasterAllowanceRow.Fields.PageTitle());
    }
}