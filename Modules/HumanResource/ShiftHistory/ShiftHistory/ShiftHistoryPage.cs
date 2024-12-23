using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.ShiftHistory.Pages;

[PageAuthorize(typeof(ShiftHistoryRow))]
public class ShiftHistoryPage : Controller
{
    [Route("ShiftHistory/ShiftHistory")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/ShiftHistory/ShiftHistory/ShiftHistoryPage",
            ShiftHistoryRow.Fields.PageTitle());
    }
}