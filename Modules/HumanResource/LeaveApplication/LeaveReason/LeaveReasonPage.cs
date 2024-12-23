using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.LeaveApplication.Pages;

[PageAuthorize(typeof(LeaveReasonRow))]
public class LeaveReasonPage : Controller
{
    [Route("LeaveApplication/LeaveReason")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/LeaveApplication/LeaveReason/LeaveReasonPage",
            LeaveReasonRow.Fields.PageTitle());
    }
}