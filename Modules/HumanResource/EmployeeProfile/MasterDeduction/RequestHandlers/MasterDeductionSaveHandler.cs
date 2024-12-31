using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.MasterDeductionRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.MasterDeductionRow;

namespace HRMSoftware.EmployeeProfile;

public interface IMasterDeductionSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class MasterDeductionSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IMasterDeductionSaveHandler
{
    public MasterDeductionSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}