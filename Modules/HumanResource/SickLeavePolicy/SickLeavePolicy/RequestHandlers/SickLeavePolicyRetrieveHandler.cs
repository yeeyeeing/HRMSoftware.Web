using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.SickLeavePolicy.SickLeavePolicyRow>;
using MyRow = HRMSoftware.SickLeavePolicy.SickLeavePolicyRow;

namespace HRMSoftware.SickLeavePolicy;

public interface ISickLeavePolicyRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class SickLeavePolicyRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ISickLeavePolicyRetrieveHandler
{
    public SickLeavePolicyRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}