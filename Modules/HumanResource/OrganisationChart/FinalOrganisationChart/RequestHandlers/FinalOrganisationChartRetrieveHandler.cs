using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OrganisationChart.FinalOrganisationChartRow>;
using MyRow = HRMSoftware.OrganisationChart.FinalOrganisationChartRow;

namespace HRMSoftware.OrganisationChart;

public interface IFinalOrganisationChartRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class FinalOrganisationChartRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IFinalOrganisationChartRetrieveHandler
{
    public FinalOrganisationChartRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}