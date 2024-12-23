using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeAllowanceRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeAllowanceDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeAllowanceDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeAllowanceDeleteHandler
{
    public EmployeeAllowanceDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}