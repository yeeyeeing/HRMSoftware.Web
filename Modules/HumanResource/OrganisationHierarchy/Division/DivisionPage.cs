using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.OrganisationHierarchy.Pages;

[PageAuthorize(typeof(DivisionRow))]
public class DivisionPage : Controller
{
    [Route("OrganisationHierarchy/Division")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/OrganisationHierarchy/Division/DivisionPage",
            DivisionRow.Fields.PageTitle());
    }
}