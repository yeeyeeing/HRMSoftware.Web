using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Master.Pages;

[PageAuthorize(typeof(NationalityRow))]
public class NationalityPage : Controller
{
    [Route("Master/Nationality")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Master/Nationality/NationalityPage",
            NationalityRow.Fields.PageTitle());
    }
}