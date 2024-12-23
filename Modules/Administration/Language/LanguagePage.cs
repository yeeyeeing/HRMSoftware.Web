using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Administration.Pages
{
    [PageAuthorize(typeof(LanguageRow))]
    public class LanguagePage : Controller
    {
        [Route("Administration/Language")]
        public ActionResult Index()
        {
            return this.GridPage(ESM.Modules.Administration.Language.LanguagePage,
                LanguageRow.Fields.PageTitle());
        }
    }
}