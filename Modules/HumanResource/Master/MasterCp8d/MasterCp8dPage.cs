using Microsoft.AspNetCore.Mvc;
using Serenity.Web;
using HRMSoftware.Administration;

namespace HRMSoftware.Master.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class MasterCp8dPage : Controller
{
    [Route("Master/MasterCp8d")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Master/MasterCp8d/MasterCp8dPage",
            MasterCp8dRow.Fields.PageTitle());
    }
}