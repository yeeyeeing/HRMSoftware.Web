using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.EmployeeIncentiveRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeIncentiveRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeIncentiveSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeIncentiveSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeIncentiveSaveHandler
{
    public EmployeeIncentiveSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}