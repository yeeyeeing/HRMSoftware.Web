using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.OrganisationHierarchy.Pages;

[PageAuthorize(typeof(JobGradeRow))]
public class JobGradePage : Controller
{
    [Route("OrganisationHierarchy/JobGrade")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/OrganisationHierarchy/JobGrade/JobGradePage",
            JobGradeRow.Fields.PageTitle());
    }
}