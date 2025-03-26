using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.WeeklyPayrollSettingsRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.WeeklyPayrollSettingsRow;

namespace HRMSoftware.PayrollSettings;

public interface IWeeklyPayrollSettingsSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class WeeklyPayrollSettingsSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IWeeklyPayrollSettingsSaveHandler
{
    public WeeklyPayrollSettingsSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}