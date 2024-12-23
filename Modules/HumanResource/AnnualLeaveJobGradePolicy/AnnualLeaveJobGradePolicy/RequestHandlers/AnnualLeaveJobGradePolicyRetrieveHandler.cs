using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicyRow>;
using MyRow = HRMSoftware.AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicyRow;

namespace HRMSoftware.AnnualLeaveJobGradePolicy;

public interface IAnnualLeaveJobGradePolicyRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnualLeaveJobGradePolicyRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnualLeaveJobGradePolicyRetrieveHandler
{
    public AnnualLeaveJobGradePolicyRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}