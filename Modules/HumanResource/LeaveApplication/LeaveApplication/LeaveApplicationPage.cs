using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.LeaveApplication.Pages;

[PageAuthorize(typeof(LeaveApplicationRow))]
public class LeaveApplicationPage : Controller
{
    [Route("LeaveApplication/LeaveApplication")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/LeaveApplication/LeaveApplication/LeaveApplicationPage",
            LeaveApplicationRow.Fields.PageTitle());
    }
}