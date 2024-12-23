using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Announcement.Pages;

[PageAuthorize(typeof(AnnouncementWizardRow))]
public class AnnouncementWizardPage : Controller
{
    [Route("Announcement/AnnouncementWizard")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Announcement/AnnouncementWizard/AnnouncementWizardPage",
            AnnouncementWizardRow.Fields.PageTitle());
    }
}