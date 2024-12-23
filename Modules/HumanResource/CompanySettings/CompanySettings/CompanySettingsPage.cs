using HRMSoftware.Administration;
using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.CompanySettings.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class CompanySettingsPage : Controller
{
    [Route("CompanySettings/CompanySettings")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/CompanySettings/CompanySettings/CompanySettingsPage",
            CompanySettingsRow.Fields.PageTitle());
    }
}