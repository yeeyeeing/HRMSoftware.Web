using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.MasterAllowanceRow;

namespace HRMSoftware.EmployeeProfile;

public interface IMasterAllowanceDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MasterAllowanceDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMasterAllowanceDeleteHandler
{
    public MasterAllowanceDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}