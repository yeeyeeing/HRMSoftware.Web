using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.EmployeeResignRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeResignRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeResignListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeResignListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeResignListHandler
{
    public EmployeeResignListHandler(IRequestContext context)
            : base(context)
    {
    }
}