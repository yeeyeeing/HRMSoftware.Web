using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.LeaveApplication.LeaveReasonRow>;
using MyRow = HRMSoftware.LeaveApplication.LeaveReasonRow;

namespace HRMSoftware.LeaveApplication;

public interface ILeaveReasonRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class LeaveReasonRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ILeaveReasonRetrieveHandler
{
    public LeaveReasonRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}