using HRMSoftware.Administration;
using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PublicHoliday.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class PublicHolidayPage : Controller
{
    [Route("PublicHoliday/PublicHoliday")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PublicHoliday/PublicHoliday/PublicHolidayPage",
            PublicHolidayRow.Fields.PageTitle());
    }
}