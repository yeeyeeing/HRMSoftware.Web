using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Race.Pages;

[PageAuthorize(typeof(RaceRow))]
public class RacePage : Controller
{
    [Route("Race/Race")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Race/Race/RacePage",
            RaceRow.Fields.PageTitle());
    }
}