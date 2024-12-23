using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.NoPaidLeaveRow>;
using MyRow = HRMSoftware.PayrollSettings.NoPaidLeaveRow;

namespace HRMSoftware.PayrollSettings;

public interface INoPaidLeaveRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class NoPaidLeaveRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, INoPaidLeaveRetrieveHandler
{
    public NoPaidLeaveRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}