using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Announcement.Pages;

[PageAuthorize(typeof(AnnouncementRow))]
public class AnnouncementPage : Controller
{
    [Route("Announcement/Announcement")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Announcement/Announcement/AnnouncementPage",
            AnnouncementRow.Fields.PageTitle());
    }
}