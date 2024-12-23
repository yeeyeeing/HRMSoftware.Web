using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.LeaveApplication.LeaveApplicationRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.LeaveApplication.LeaveApplicationRow;

namespace HRMSoftware.LeaveApplication;

public interface ILeaveApplicationSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class LeaveApplicationSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ILeaveApplicationSaveHandler
{
    public LeaveApplicationSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}