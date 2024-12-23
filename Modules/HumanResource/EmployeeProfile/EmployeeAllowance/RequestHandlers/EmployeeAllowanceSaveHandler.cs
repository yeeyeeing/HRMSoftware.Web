using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.EmployeeAllowanceRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeAllowanceRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeAllowanceSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeAllowanceSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeAllowanceSaveHandler
{
    public EmployeeAllowanceSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}