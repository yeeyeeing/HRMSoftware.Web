using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Announcement.Pages;

[PageAuthorize(typeof(RecurringAnnouncementRow))]
public class RecurringAnnouncementPage : Controller
{
    [Route("Announcement/RecurringAnnouncement")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Announcement/RecurringAnnouncement/RecurringAnnouncementPage",
            RecurringAnnouncementRow.Fields.PageTitle());
    }
}