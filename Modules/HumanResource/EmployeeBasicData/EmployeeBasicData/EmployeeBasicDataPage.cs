using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EmployeeBasicData.Pages;

[PageAuthorize(typeof(EmployeeBasicDataRow))]
public class EmployeeBasicDataPage : Controller
{
    [Route("EmployeeBasicData/EmployeeBasicData")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EmployeeBasicData/EmployeeBasicData/EmployeeBasicDataPage",
            EmployeeBasicDataRow.Fields.PageTitle());
    }
}