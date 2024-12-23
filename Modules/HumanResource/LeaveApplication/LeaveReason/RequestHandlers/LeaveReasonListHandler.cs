using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.LeaveApplication.LeaveReasonRow>;
using MyRow = HRMSoftware.LeaveApplication.LeaveReasonRow;

namespace HRMSoftware.LeaveApplication;

public interface ILeaveReasonListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class LeaveReasonListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ILeaveReasonListHandler
{
    public LeaveReasonListHandler(IRequestContext context)
            : base(context)
    {
    }
}