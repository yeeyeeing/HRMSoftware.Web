using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(MasterDeductionRow))]
public class MasterDeductionPage : Controller
{
    [Route("EmployeeProfile/MasterDeduction")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/MasterDeduction/MasterDeductionPage",
            MasterDeductionRow.Fields.PageTitle());
    }
}