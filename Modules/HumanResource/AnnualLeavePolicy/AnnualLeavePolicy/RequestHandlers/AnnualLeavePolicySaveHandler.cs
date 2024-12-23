using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.AnnualLeavePolicy.AnnualLeavePolicyRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.AnnualLeavePolicy.AnnualLeavePolicyRow;

namespace HRMSoftware.AnnualLeavePolicy;

public interface IAnnualLeavePolicySaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnualLeavePolicySaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnualLeavePolicySaveHandler
{
    public AnnualLeavePolicySaveHandler(IRequestContext context)
            : base(context)
    {
    }
}