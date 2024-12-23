using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PerformanceAppraisal.Pages;

[PageAuthorize(typeof(PerformanceAppraisalFileAttachRow))]
public class PerformanceAppraisalFileAttachPage : Controller
{
    [Route("PerformanceAppraisal/PerformanceAppraisalFileAttach")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PerformanceAppraisal/PerformanceAppraisalFileAttach/PerformanceAppraisalFileAttachPage",
            PerformanceAppraisalFileAttachRow.Fields.PageTitle());
    }
}