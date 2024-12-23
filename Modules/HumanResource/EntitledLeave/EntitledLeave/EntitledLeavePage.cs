using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.EntitledLeave.Pages;

[PageAuthorize(typeof(EntitledLeaveRow))]
public class EntitledLeavePage : Controller
{
    [Route("EntitledLeave/EntitledLeave")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/EntitledLeave/EntitledLeave/EntitledLeavePage",
            EntitledLeaveRow.Fields.PageTitle());
    }
}