using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.SickLeavePolicy.SickLeavePolicyRow>;
using MyRow = HRMSoftware.SickLeavePolicy.SickLeavePolicyRow;

namespace HRMSoftware.SickLeavePolicy;

public interface ISickLeavePolicyListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class SickLeavePolicyListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ISickLeavePolicyListHandler
{
    public SickLeavePolicyListHandler(IRequestContext context)
            : base(context)
    {
    }
}