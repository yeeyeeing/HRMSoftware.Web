using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.TrainingManagement.Pages;

[PageAuthorize(typeof(AttendanceListRow))]
public class AttendanceListPage : Controller
{
    [Route("TrainingManagement/AttendanceList")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/TrainingManagement/AttendanceList/AttendanceListPage",
            AttendanceListRow.Fields.PageTitle());
    }
}