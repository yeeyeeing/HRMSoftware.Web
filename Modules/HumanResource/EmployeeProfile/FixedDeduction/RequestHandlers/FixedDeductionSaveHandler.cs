using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.FixedDeductionRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.FixedDeductionRow;

namespace HRMSoftware.EmployeeProfile;

public interface IFixedDeductionSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class FixedDeductionSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IFixedDeductionSaveHandler
{
    public FixedDeductionSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}