using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PerformanceAppraisal.Pages;

[PageAuthorize(typeof(PerformanceAppraisalTypeRow))]
public class PerformanceAppraisalTypePage : Controller
{
    [Route("PerformanceAppraisal/PerformanceAppraisalType")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PerformanceAppraisal/PerformanceAppraisalType/PerformanceAppraisalTypePage",
            PerformanceAppraisalTypeRow.Fields.PageTitle());
    }
}