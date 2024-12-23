using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.EisSubjectionRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.EisSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IEisSubjectionSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EisSubjectionSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEisSubjectionSaveHandler
{
    public EisSubjectionSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}