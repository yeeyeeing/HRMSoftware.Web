using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OrganisationHierarchy.DivisionRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IDivisionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class DivisionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IDivisionDeleteHandler
{
    public DivisionDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}