using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.LeaveApplication.LeaveApplicationRow>;
using MyRow = HRMSoftware.LeaveApplication.LeaveApplicationRow;

namespace HRMSoftware.LeaveApplication;

public interface ILeaveApplicationListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class LeaveApplicationListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ILeaveApplicationListHandler
{
    public LeaveApplicationListHandler(IRequestContext context)
            : base(context)
    {
    }
}