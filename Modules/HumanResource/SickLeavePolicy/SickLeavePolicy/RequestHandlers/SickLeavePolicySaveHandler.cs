using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.SickLeavePolicy.SickLeavePolicyRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.SickLeavePolicy.SickLeavePolicyRow;

namespace HRMSoftware.SickLeavePolicy;

public interface ISickLeavePolicySaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class SickLeavePolicySaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ISickLeavePolicySaveHandler
{
    public SickLeavePolicySaveHandler(IRequestContext context)
            : base(context)
    {
    }
}