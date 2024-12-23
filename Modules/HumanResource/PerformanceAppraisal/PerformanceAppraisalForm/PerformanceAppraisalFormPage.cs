using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PerformanceAppraisal.Pages;

[PageAuthorize(typeof(PerformanceAppraisalFormRow))]
public class PerformanceAppraisalFormPage : Controller
{
    [Route("PerformanceAppraisal/PerformanceAppraisalForm")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PerformanceAppraisal/PerformanceAppraisalForm/PerformanceAppraisalFormPage",
            PerformanceAppraisalFormRow.Fields.PageTitle());
    }
}