using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeProfile.Pages;

[PageAuthorize(typeof(FixedDeductionRow))]
public class FixedDeductionPage : Controller
{
    [Route("EmployeeProfile/FixedDeduction")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeProfile/FixedDeduction/FixedDeductionPage",
            FixedDeductionRow.Fields.PageTitle());
    }
}