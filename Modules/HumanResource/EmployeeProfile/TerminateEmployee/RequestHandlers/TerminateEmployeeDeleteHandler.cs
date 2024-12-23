using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.TerminateEmployeeRow;

namespace HRMSoftware.EmployeeProfile;

public interface ITerminateEmployeeDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class TerminateEmployeeDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ITerminateEmployeeDeleteHandler
{
    public TerminateEmployeeDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}