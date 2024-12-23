using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.AnnualLeavePolicy.AnnualLeavePolicyRow;

namespace HRMSoftware.AnnualLeavePolicy;

public interface IAnnualLeavePolicyDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class AnnualLeavePolicyDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IAnnualLeavePolicyDeleteHandler
{
    public AnnualLeavePolicyDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}