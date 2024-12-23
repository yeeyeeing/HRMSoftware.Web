using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Announcement.Pages;

[PageAuthorize(typeof(AnnouncementOccupationBindedRow))]
public class AnnouncementOccupationBindedPage : Controller
{
    [Route("Announcement/AnnouncementOccupationBinded")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Announcement/AnnouncementOccupationBinded/AnnouncementOccupationBindedPage",
            AnnouncementOccupationBindedRow.Fields.PageTitle());
    }
}