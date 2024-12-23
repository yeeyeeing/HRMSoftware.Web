using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Administration.Pages
{
    [PageAuthorize(typeof(RoleRow))]
    public class RolePage : Controller
    {
        [Route("Administration/Role")]
        public ActionResult Index()
        {
            return this.GridPage(ESM.Modules.Administration.Role.RolePage,
                RoleRow.Fields.PageTitle());
        }
    }
}