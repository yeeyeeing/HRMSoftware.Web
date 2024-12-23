using Microsoft.AspNetCore.Mvc;
using Serenity.Web;
using HRMSoftware.Administration;

namespace HRMSoftware.Master.Pages;


[PageAuthorize(PermissionKeys.HumanResources)]
public class MasterBankPage : Controller
{
    [Route("Master/MasterBank")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Master/MasterBank/MasterBankPage",
            MasterBankRow.Fields.PageTitle());
    }
}