using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.WeeklyPayrollSettingsRow>;
using MyRow = HRMSoftware.PayrollSettings.WeeklyPayrollSettingsRow;

namespace HRMSoftware.PayrollSettings;

public interface IWeeklyPayrollSettingsListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class WeeklyPayrollSettingsListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IWeeklyPayrollSettingsListHandler
{
    public WeeklyPayrollSettingsListHandler(IRequestContext context)
            : base(context)
    {
    }
}