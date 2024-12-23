using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.HrdfSubjectionRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.HrdfSubjectionRow;

namespace HRMSoftware.PayrollSettings;

public interface IHrdfSubjectionSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class HrdfSubjectionSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IHrdfSubjectionSaveHandler
{
    public HrdfSubjectionSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}