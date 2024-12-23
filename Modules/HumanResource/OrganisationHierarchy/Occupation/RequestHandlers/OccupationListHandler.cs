using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OrganisationHierarchy.OccupationRow>;
using MyRow = HRMSoftware.OrganisationHierarchy.OccupationRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IOccupationListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class OccupationListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IOccupationListHandler
{
    public OccupationListHandler(IRequestContext context)
            : base(context)
    {
    }
}