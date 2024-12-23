using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OrganisationChart.SplitOrganisationStructureRow>;
using MyRow = HRMSoftware.OrganisationChart.SplitOrganisationStructureRow;

namespace HRMSoftware.OrganisationChart;

public interface ISplitOrganisationStructureRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class SplitOrganisationStructureRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ISplitOrganisationStructureRetrieveHandler
{
    public SplitOrganisationStructureRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}