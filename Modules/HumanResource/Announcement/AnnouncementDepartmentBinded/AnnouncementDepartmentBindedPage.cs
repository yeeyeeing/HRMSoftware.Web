using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Announcement.Pages;

[PageAuthorize(typeof(AnnouncementDepartmentBindedRow))]
public class AnnouncementDepartmentBindedPage : Controller
{
    [Route("Announcement/AnnouncementDepartmentBinded")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Announcement/AnnouncementDepartmentBinded/AnnouncementDepartmentBindedPage",
            AnnouncementDepartmentBindedRow.Fields.PageTitle());
    }
}