using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.AnnualLeavePolicy.AnnualLeavePolicyRow>;
using MyRow = HRMSoftware.AnnualLeavePolicy.AnnualLeavePolicyRow;

namespace HRMSoftware.AnnualLeavePolicy;

public interface IAnnualLeavePolicyRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class AnnualLeavePolicyRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IAnnualLeavePolicyRetrieveHandler
{
    public AnnualLeavePolicyRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}