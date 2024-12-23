using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.AbsentRecord.Pages;

[PageAuthorize(typeof(AbsentRecordRow))]
public class AbsentRecordPage : Controller
{
    [Route("AbsentRecord/AbsentRecord")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/AbsentRecord/AbsentRecord/AbsentRecordPage",
            AbsentRecordRow.Fields.PageTitle());
    }
}