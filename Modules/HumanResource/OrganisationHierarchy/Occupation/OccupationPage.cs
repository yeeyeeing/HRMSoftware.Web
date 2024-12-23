using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.OrganisationHierarchy.Pages;

[PageAuthorize(typeof(OccupationRow))]
public class OccupationPage : Controller
{
    [Route("OrganisationHierarchy/Occupation")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/OrganisationHierarchy/Occupation/OccupationPage",
            OccupationRow.Fields.PageTitle());
    }
}