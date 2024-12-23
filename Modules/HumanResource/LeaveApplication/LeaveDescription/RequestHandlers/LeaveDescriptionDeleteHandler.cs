using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.LeaveApplication.LeaveDescriptionRow;

namespace HRMSoftware.LeaveApplication;

public interface ILeaveDescriptionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class LeaveDescriptionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ILeaveDescriptionDeleteHandler
{
    public LeaveDescriptionDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}