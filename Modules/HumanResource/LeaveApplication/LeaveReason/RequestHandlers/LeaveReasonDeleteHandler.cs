using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.LeaveApplication.LeaveReasonRow;

namespace HRMSoftware.LeaveApplication;

public interface ILeaveReasonDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class LeaveReasonDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ILeaveReasonDeleteHandler
{
    public LeaveReasonDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}