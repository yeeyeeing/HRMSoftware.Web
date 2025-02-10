using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.PayrollSettingsRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.PayrollSettingsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollSettingsSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollSettingsSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollSettingsSaveHandler
{
    public PayrollSettingsSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}