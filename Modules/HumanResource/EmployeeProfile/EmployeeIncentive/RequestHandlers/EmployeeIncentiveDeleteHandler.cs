using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeIncentiveRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeIncentiveDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeIncentiveDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeIncentiveDeleteHandler
{
    public EmployeeIncentiveDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}