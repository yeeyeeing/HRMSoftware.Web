using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Announcement.Pages;

[PageAuthorize(typeof(AnnouncementDivisionBindedRow))]
public class AnnouncementDivisionBindedPage : Controller
{
    [Route("Announcement/AnnouncementDivisionBinded")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Announcement/AnnouncementDivisionBinded/AnnouncementDivisionBindedPage",
            AnnouncementDivisionBindedRow.Fields.PageTitle());
    }
}