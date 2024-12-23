using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OrganisationHierarchy.OccupationRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IOccupationDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class OccupationDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IOccupationDeleteHandler
{
    public OccupationDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}