using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OrganisationChart.FullProfileRow>;
using MyRow = HRMSoftware.OrganisationChart.FullProfileRow;

namespace HRMSoftware.OrganisationChart;

public interface IFullProfileRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class FullProfileRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IFullProfileRetrieveHandler
{
    public FullProfileRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}