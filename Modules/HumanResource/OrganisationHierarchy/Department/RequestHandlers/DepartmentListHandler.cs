using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OrganisationHierarchy.DepartmentRow>;
using MyRow = HRMSoftware.OrganisationHierarchy.DepartmentRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IDepartmentListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class DepartmentListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IDepartmentListHandler
{
    public DepartmentListHandler(IRequestContext context)
            : base(context)
    {
    }
}