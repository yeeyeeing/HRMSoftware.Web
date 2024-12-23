using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OrganisationChart.OrganisationChartRow>;
using MyRow = HRMSoftware.OrganisationChart.OrganisationChartRow;

namespace HRMSoftware.OrganisationChart;

public interface IOrganisationChartRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class OrganisationChartRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IOrganisationChartRetrieveHandler
{
    public OrganisationChartRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}