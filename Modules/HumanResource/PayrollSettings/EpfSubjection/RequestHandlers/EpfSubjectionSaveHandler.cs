using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.EpfSubjectionRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.EpfSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IEpfSubjectionSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EpfSubjectionSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEpfSubjectionSaveHandler
{
    public EpfSubjectionSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}