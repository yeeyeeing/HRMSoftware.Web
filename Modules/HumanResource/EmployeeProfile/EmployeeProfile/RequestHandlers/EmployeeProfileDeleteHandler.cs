using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeProfileRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeProfileDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeProfileDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeProfileDeleteHandler
{
    public EmployeeProfileDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}