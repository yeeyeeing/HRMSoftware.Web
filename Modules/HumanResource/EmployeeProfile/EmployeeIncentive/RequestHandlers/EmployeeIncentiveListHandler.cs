using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.EmployeeIncentiveRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeIncentiveRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeIncentiveListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeIncentiveListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeIncentiveListHandler
{
    public EmployeeIncentiveListHandler(IRequestContext context)
            : base(context)
    {
    }
}