using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OrganisationHierarchy.OccupationRow>;
using MyRow = HRMSoftware.OrganisationHierarchy.OccupationRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IOccupationRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class OccupationRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IOccupationRetrieveHandler
{
    public OccupationRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}