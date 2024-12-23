using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeEditHistory.Pages;

[PageAuthorize(typeof(EmployeeEditHistoryRow))]
public class EmployeeEditHistoryPage : Controller
{
    [Route("EmployeeEditHistory/EmployeeEditHistory")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeEditHistory/EmployeeEditHistory/EmployeeEditHistoryPage",
            EmployeeEditHistoryRow.Fields.PageTitle());
    }
}