using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.LeaveApplication.LeaveApplicationRow>;
using MyRow = HRMSoftware.LeaveApplication.LeaveApplicationRow;

namespace HRMSoftware.LeaveApplication;

public interface ILeaveApplicationRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class LeaveApplicationRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ILeaveApplicationRetrieveHandler
{
    public LeaveApplicationRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}