using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeProfile.EmployeeIncentiveRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeIncentiveRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeIncentiveRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeIncentiveRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeIncentiveRetrieveHandler
{
    public EmployeeIncentiveRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}