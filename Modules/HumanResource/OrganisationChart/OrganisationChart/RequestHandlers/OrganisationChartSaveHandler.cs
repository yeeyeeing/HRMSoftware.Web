using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OrganisationChart.OrganisationChartRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OrganisationChart.OrganisationChartRow;

namespace HRMSoftware.OrganisationChart;

public interface IOrganisationChartSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class OrganisationChartSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IOrganisationChartSaveHandler
{
    public OrganisationChartSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}