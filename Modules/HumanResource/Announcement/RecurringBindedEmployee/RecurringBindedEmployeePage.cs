using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Announcement.Pages;

[PageAuthorize(typeof(RecurringBindedEmployeeRow))]
public class RecurringBindedEmployeePage : Controller
{
    [Route("Announcement/RecurringBindedEmployee")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Announcement/RecurringBindedEmployee/RecurringBindedEmployeePage",
            RecurringBindedEmployeeRow.Fields.PageTitle());
    }
}