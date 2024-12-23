using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OrganisationChart.SplitOrganisationStructureRow;

namespace HRMSoftware.OrganisationChart;

public interface ISplitOrganisationStructureDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class SplitOrganisationStructureDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ISplitOrganisationStructureDeleteHandler
{
    public SplitOrganisationStructureDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}