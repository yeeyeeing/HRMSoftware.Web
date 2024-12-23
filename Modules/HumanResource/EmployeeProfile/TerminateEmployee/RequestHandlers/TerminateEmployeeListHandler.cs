using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.TerminateEmployeeRow>;
using MyRow = HRMSoftware.EmployeeProfile.TerminateEmployeeRow;

namespace HRMSoftware.EmployeeProfile;

public interface ITerminateEmployeeListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class TerminateEmployeeListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ITerminateEmployeeListHandler
{
    public TerminateEmployeeListHandler(IRequestContext context)
            : base(context)
    {
    }
}