using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.LeaveApplication.Pages;

[PageAuthorize(typeof(LeaveDescriptionRow))]
public class LeaveDescriptionPage : Controller
{
    [Route("LeaveApplication/LeaveDescription")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/LeaveApplication/LeaveDescription/LeaveDescriptionPage",
            LeaveDescriptionRow.Fields.PageTitle());
    }
}