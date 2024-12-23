using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PerformanceAppraisal.Pages;

[PageAuthorize(typeof(PerformanceAppraisalQuestionRow))]
public class PerformanceAppraisalQuestionPage : Controller
{
    [Route("PerformanceAppraisal/PerformanceAppraisalQuestion")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PerformanceAppraisal/PerformanceAppraisalQuestion/PerformanceAppraisalQuestionPage",
            PerformanceAppraisalQuestionRow.Fields.PageTitle());
    }
}