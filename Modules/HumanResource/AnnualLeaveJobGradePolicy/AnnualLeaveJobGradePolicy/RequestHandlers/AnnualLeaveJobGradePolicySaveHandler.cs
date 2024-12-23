using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicyRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicyRow;

namespace HRMSoftware.AnnualLeaveJobGradePolicy;

public interface IAnnualLeaveJobGradePolicySaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnualLeaveJobGradePolicySaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnualLeaveJobGradePolicySaveHandler
{
    public AnnualLeaveJobGradePolicySaveHandler(IRequestContext context)
            : base(context)
    {
    }
}