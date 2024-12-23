using Microsoft.AspNetCore.Mvc;
using Serenity.Web;
using HRMSoftware.Administration;

namespace HRMSoftware.Master.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class MasterCostCentrePage : Controller
{
    [Route("Master/MasterCostCentre")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Master/MasterCostCentre/MasterCostCentrePage",
            MasterCostCentreRow.Fields.PageTitle());
    }
}