using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OrganisationChart.SplitOrganisationStructureRow>;
using MyRow = HRMSoftware.OrganisationChart.SplitOrganisationStructureRow;

namespace HRMSoftware.OrganisationChart;

public interface ISplitOrganisationStructureListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class SplitOrganisationStructureListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ISplitOrganisationStructureListHandler
{
    public SplitOrganisationStructureListHandler(IRequestContext context)
            : base(context)
    {
    }
}