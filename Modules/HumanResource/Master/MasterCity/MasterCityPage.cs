using Microsoft.AspNetCore.Mvc;
using Serenity.Web;
using HRMSoftware.Administration;

namespace HRMSoftware.Master.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class MasterCityPage : Controller
{
    [Route("Master/MasterCity")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Master/MasterCity/MasterCityPage",
            MasterCityRow.Fields.PageTitle());
    }
}