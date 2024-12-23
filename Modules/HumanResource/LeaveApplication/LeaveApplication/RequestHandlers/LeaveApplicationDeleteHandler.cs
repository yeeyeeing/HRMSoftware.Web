using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.LeaveApplication.LeaveApplicationRow;

namespace HRMSoftware.LeaveApplication;

public interface ILeaveApplicationDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class LeaveApplicationDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ILeaveApplicationDeleteHandler
{
    public LeaveApplicationDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}