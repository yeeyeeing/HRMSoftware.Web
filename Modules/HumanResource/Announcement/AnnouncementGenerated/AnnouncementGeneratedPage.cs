using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Announcement.Pages;

[PageAuthorize(typeof(AnnouncementGeneratedRow))]
public class AnnouncementGeneratedPage : Controller
{
    [Route("Announcement/AnnouncementGenerated")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Announcement/AnnouncementGenerated/AnnouncementGeneratedPage",
            AnnouncementGeneratedRow.Fields.PageTitle());
    }
}