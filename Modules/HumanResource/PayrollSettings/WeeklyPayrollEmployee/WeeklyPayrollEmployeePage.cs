using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PayrollSettings.Pages;

[PageAuthorize(typeof(WeeklyPayrollEmployeeRow))]
public class WeeklyPayrollEmployeePage : Controller
{
    [Route("PayrollSettings/WeeklyPayrollEmployee")]
    public ActionResult Index()
    {
        return this.GridPage("@/PayrollSettings/WeeklyPayrollEmployee/WeeklyPayrollEmployeePage",
            WeeklyPayrollEmployeeRow.Fields.PageTitle());
    }
}