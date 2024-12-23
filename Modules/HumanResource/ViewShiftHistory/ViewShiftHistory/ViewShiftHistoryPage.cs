using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.ViewShiftHistory.Pages;

[PageAuthorize(typeof(ViewShiftHistoryRow))]
public class ViewShiftHistoryPage : Controller
{
    [Route("ViewShiftHistory/ViewShiftHistory")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/ViewShiftHistory/ViewShiftHistory/ViewShiftHistoryPage",
            ViewShiftHistoryRow.Fields.PageTitle());
    }
}