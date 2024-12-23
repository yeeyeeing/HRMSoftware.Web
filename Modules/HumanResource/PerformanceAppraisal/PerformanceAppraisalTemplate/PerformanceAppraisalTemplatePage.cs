using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PerformanceAppraisal.Pages;

[PageAuthorize(typeof(PerformanceAppraisalTemplateRow))]
public class PerformanceAppraisalTemplatePage : Controller
{
    [Route("PerformanceAppraisal/PerformanceAppraisalTemplate")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PerformanceAppraisal/PerformanceAppraisalTemplate/PerformanceAppraisalTemplatePage",
            PerformanceAppraisalTemplateRow.Fields.PageTitle());
    }
}