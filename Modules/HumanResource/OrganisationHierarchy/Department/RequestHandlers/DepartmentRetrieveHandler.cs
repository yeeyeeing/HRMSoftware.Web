using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OrganisationHierarchy.DepartmentRow>;
using MyRow = HRMSoftware.OrganisationHierarchy.DepartmentRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IDepartmentRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class DepartmentRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IDepartmentRetrieveHandler
{
    public DepartmentRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}