using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.NoPaidLeaveRow>;
using MyRow = HRMSoftware.PayrollSettings.NoPaidLeaveRow;

namespace HRMSoftware.PayrollSettings;

public interface INoPaidLeaveListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class NoPaidLeaveListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, INoPaidLeaveListHandler
{
    public NoPaidLeaveListHandler(IRequestContext context)
            : base(context)
    {
    }
}