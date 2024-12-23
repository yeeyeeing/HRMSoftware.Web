using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.AnnualLeavePolicy.AnnualLeavePolicyRow>;
using MyRow = HRMSoftware.AnnualLeavePolicy.AnnualLeavePolicyRow;

namespace HRMSoftware.AnnualLeavePolicy;

public interface IAnnualLeavePolicyListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class AnnualLeavePolicyListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IAnnualLeavePolicyListHandler
{
    public AnnualLeavePolicyListHandler(IRequestContext context)
            : base(context)
    {
    }
}