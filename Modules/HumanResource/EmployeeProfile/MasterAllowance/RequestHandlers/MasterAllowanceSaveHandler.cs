using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.MasterAllowanceRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.MasterAllowanceRow;

namespace HRMSoftware.EmployeeProfile;

public interface IMasterAllowanceSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterAllowanceSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterAllowanceSaveHandler
{
    public MasterAllowanceSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}