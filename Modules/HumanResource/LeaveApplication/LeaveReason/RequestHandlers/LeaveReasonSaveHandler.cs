using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.LeaveApplication.LeaveReasonRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.LeaveApplication.LeaveReasonRow;

namespace HRMSoftware.LeaveApplication;

public interface ILeaveReasonSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class LeaveReasonSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ILeaveReasonSaveHandler
{
    public LeaveReasonSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}