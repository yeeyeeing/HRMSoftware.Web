using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.LeaveApplication.LeaveDescriptionRow>;
using MyRow = HRMSoftware.LeaveApplication.LeaveDescriptionRow;

namespace HRMSoftware.LeaveApplication;

public interface ILeaveDescriptionListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class LeaveDescriptionListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ILeaveDescriptionListHandler
{
    public LeaveDescriptionListHandler(IRequestContext context)
            : base(context)
    {
    }
}