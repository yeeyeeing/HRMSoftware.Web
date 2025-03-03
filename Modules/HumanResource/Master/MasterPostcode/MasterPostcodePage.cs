using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.Master.Pages;

[PageAuthorize(typeof(MasterPostcodeRow))]
public class MasterPostcodePage : Controller
{
    [Route("Master/MasterPostcode")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/Master/MasterPostcode/MasterPostcodePage",
            MasterPostcodeRow.Fields.PageTitle());
    }
}