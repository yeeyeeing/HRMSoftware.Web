using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.NoPaidLeaveRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.NoPaidLeaveRow;

namespace HRMSoftware.PayrollSettings;

public interface INoPaidLeaveSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class NoPaidLeaveSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, INoPaidLeaveSaveHandler
{
    public NoPaidLeaveSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}