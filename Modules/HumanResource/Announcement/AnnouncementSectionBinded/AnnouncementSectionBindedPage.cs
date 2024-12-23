using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Announcement.Pages;

[PageAuthorize(typeof(AnnouncementSectionBindedRow))]
public class AnnouncementSectionBindedPage : Controller
{
    [Route("Announcement/AnnouncementSectionBinded")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Announcement/AnnouncementSectionBinded/AnnouncementSectionBindedPage",
            AnnouncementSectionBindedRow.Fields.PageTitle());
    }
}