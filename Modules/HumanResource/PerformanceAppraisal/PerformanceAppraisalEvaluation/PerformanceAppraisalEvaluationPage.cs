using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PerformanceAppraisal.Pages;

[PageAuthorize(typeof(PerformanceAppraisalEvaluationRow))]
public class PerformanceAppraisalEvaluationPage : Controller
{
    [Route("PerformanceAppraisal/PerformanceAppraisalEvaluation")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PerformanceAppraisal/PerformanceAppraisalEvaluation/PerformanceAppraisalEvaluationPage",
            PerformanceAppraisalEvaluationRow.Fields.PageTitle());
    }
}