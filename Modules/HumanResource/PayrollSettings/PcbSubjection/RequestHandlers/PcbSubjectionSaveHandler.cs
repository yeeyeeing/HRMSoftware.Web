using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.PcbSubjectionRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.PcbSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IPcbSubjectionSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PcbSubjectionSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPcbSubjectionSaveHandler
{
    public PcbSubjectionSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}