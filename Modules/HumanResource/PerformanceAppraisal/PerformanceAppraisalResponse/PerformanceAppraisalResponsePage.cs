using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.PerformanceAppraisal.Pages;

[PageAuthorize(typeof(PerformanceAppraisalResponseRow))]
public class PerformanceAppraisalResponsePage : Controller
{
    [Route("PerformanceAppraisal/PerformanceAppraisalResponse")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/PerformanceAppraisal/PerformanceAppraisalResponse/PerformanceAppraisalResponsePage",
            PerformanceAppraisalResponseRow.Fields.PageTitle());
    }
}