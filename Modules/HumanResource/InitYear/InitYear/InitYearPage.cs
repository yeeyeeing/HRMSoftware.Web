using Microsoft.AspNetCore.Mvc;
using Serenity.Web;
using HRMSoftware.Administration;

namespace HRMSoftware.InitYear.Pages;

[PageAuthorize(PermissionKeys.HumanResources)]
public class InitYearPage : Controller
{
    [Route("InitYear/InitYear")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/InitYear/InitYear/InitYearPage",
            InitYearRow.Fields.PageTitle());
    }
}