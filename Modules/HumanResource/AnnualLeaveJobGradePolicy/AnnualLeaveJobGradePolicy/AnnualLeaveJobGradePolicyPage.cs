using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.AnnualLeaveJobGradePolicy.Pages;

[PageAuthorize(typeof(AnnualLeaveJobGradePolicyRow))]
public class AnnualLeaveJobGradePolicyPage : Controller
{
    [Route("AnnualLeaveJobGradePolicy/AnnualLeaveJobGradePolicy")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/AnnualLeaveJobGradePolicy/AnnualLeaveJobGradePolicy/AnnualLeaveJobGradePolicyPage",
            AnnualLeaveJobGradePolicyRow.Fields.PageTitle());
    }
}