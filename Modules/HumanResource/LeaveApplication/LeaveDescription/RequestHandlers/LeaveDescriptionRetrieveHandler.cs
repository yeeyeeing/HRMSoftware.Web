using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.LeaveApplication.LeaveDescriptionRow>;
using MyRow = HRMSoftware.LeaveApplication.LeaveDescriptionRow;

namespace HRMSoftware.LeaveApplication;

public interface ILeaveDescriptionRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class LeaveDescriptionRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ILeaveDescriptionRetrieveHandler
{
    public LeaveDescriptionRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}