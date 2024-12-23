using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OrganisationHierarchy.DivisionRow>;
using MyRow = HRMSoftware.OrganisationHierarchy.DivisionRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IDivisionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class DivisionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IDivisionRetrieveHandler
{
    public DivisionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}