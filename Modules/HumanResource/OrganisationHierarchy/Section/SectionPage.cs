using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.OrganisationHierarchy.Pages;

[PageAuthorize(typeof(SectionRow))]
public class SectionPage : Controller
{
    [Route("OrganisationHierarchy/Section")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/OrganisationHierarchy/Section/SectionPage",
            SectionRow.Fields.PageTitle());
    }
}