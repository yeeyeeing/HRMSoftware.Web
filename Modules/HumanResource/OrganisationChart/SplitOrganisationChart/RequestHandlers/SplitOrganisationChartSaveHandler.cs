using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OrganisationChart.SplitOrganisationChartRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OrganisationChart.SplitOrganisationChartRow;

namespace HRMSoftware.OrganisationChart;

public interface ISplitOrganisationChartSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class SplitOrganisationChartSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ISplitOrganisationChartSaveHandler
{
    public SplitOrganisationChartSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}