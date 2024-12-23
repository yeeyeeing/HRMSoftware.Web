using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PerformanceAppraisal.Pages;

[PageAuthorize(typeof(CompanyProfileRow))]
public class CompanyProfilePage : Controller
{
    [Route("PerformanceAppraisal/CompanyProfile")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PerformanceAppraisal/CompanyProfile/CompanyProfilePage",
            CompanyProfileRow.Fields.PageTitle());
    }
}