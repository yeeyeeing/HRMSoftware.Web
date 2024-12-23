using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.OrganisationHierarchy.Pages;

[PageAuthorize(typeof(DepartmentRow))]
public class DepartmentPage : Controller
{
    [Route("OrganisationHierarchy/Department")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/OrganisationHierarchy/Department/DepartmentPage",
            DepartmentRow.Fields.PageTitle());
    }
}