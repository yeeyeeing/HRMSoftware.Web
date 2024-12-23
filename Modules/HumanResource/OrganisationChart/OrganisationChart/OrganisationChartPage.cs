using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace HRMSoftware.OrganisationChart.Pages;

[PageAuthorize(typeof(OrganisationChartRow))]
public class OrganisationChartPage : Controller
{
    [Route("OrganisationChart/OrganisationChart")]
    public ActionResult Index()
    {
        return this.GridPage("@/HumanResource/OrganisationChart/OrganisationChart/OrganisationChartPage",
            OrganisationChartRow.Fields.PageTitle());
    }
}