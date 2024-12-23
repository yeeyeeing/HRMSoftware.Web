using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OrganisationChart.SplitOrganisationChartRow>;
using MyRow = HRMSoftware.OrganisationChart.SplitOrganisationChartRow;

namespace HRMSoftware.OrganisationChart;

public interface ISplitOrganisationChartRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class SplitOrganisationChartRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ISplitOrganisationChartRetrieveHandler
{
    public SplitOrganisationChartRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}