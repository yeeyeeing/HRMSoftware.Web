using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.NoPaidLeaveRow;

namespace HRMSoftware.PayrollSettings;

public interface INoPaidLeaveDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class NoPaidLeaveDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, INoPaidLeaveDeleteHandler
{
    public NoPaidLeaveDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}