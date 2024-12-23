using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.EmployeeProfileRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeProfileRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeProfileListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeProfileListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeProfileListHandler
{
    public EmployeeProfileListHandler(IRequestContext context)
            : base(context)
    {
    }
}