using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.LeaveApplication.LeaveDescriptionRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.LeaveApplication.LeaveDescriptionRow;

namespace HRMSoftware.LeaveApplication;

public interface ILeaveDescriptionSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class LeaveDescriptionSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ILeaveDescriptionSaveHandler
{
    public LeaveDescriptionSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}