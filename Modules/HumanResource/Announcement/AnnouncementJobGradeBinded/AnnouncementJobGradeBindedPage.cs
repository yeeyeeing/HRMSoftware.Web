using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Announcement.Pages;

[PageAuthorize(typeof(AnnouncementJobGradeBindedRow))]
public class AnnouncementJobGradeBindedPage : Controller
{
    [Route("Announcement/AnnouncementJobGradeBinded")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Announcement/AnnouncementJobGradeBinded/AnnouncementJobGradeBindedPage",
            AnnouncementJobGradeBindedRow.Fields.PageTitle());
    }
}