using Microsoft.AspNetCore.Mvc;
using Serenity.Web;
using HRMSoftware.Administration;

namespace HRMSoftware.Master.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class MasterCountryPage : Controller
{
    [Route("Master/MasterCountry")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Master/MasterCountry/MasterCountryPage",
            MasterCountryRow.Fields.PageTitle());
    }
}