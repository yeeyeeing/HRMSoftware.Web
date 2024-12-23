using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.AnnualLeaveJobGradePolicy.AnnualLeaveJobGradePolicyRow;

namespace HRMSoftware.AnnualLeaveJobGradePolicy;

public interface IAnnualLeaveJobGradePolicyDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class AnnualLeaveJobGradePolicyDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IAnnualLeaveJobGradePolicyDeleteHandler
{
    public AnnualLeaveJobGradePolicyDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}