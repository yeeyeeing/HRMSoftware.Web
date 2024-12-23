using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.SickLeavePolicy.SickLeavePolicyRow;

namespace HRMSoftware.SickLeavePolicy;

public interface ISickLeavePolicyDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class SickLeavePolicyDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ISickLeavePolicyDeleteHandler
{
    public SickLeavePolicyDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}