using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.SocsoSubjectionRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.SocsoSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface ISocsoSubjectionSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class SocsoSubjectionSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ISocsoSubjectionSaveHandler
{
    public SocsoSubjectionSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}