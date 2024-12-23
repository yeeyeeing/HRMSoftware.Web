using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OrganisationHierarchy.DivisionRow>;
using MyRow = HRMSoftware.OrganisationHierarchy.DivisionRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IDivisionListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class DivisionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IDivisionListHandler
{
    public DivisionListHandler(IRequestContext context)
            : base(context)
    {
    }
}