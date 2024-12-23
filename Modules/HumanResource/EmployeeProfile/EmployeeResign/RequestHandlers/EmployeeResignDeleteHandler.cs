using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeResignRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeResignDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeResignDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeResignDeleteHandler
{
    public EmployeeResignDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}