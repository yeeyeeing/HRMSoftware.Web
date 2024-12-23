using HRMSoftware.Administration;
using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Master.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class MasterStatePage : Controller
{
    [Route("Master/MasterState")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Master/MasterState/MasterStatePage",
            MasterStateRow.Fields.PageTitle());
    }
}