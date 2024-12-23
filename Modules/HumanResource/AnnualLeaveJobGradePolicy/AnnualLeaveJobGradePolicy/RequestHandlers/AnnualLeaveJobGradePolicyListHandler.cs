using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicyRow>;
using MyRow = HRMSoftware.AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicyRow;

namespace HRMSoftware.AnnualLeaveJobGradePolicy;

public interface IAnnualLeaveJobGradePolicyListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class AnnualLeaveJobGradePolicyListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IAnnualLeaveJobGradePolicyListHandler
{
    public AnnualLeaveJobGradePolicyListHandler(IRequestContext context)
            : base(context)
    {
    }
}