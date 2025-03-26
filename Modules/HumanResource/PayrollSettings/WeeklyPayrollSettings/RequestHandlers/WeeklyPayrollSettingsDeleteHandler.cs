using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.WeeklyPayrollSettingsRow;

namespace HRMSoftware.PayrollSettings;

public interface IWeeklyPayrollSettingsDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class WeeklyPayrollSettingsDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IWeeklyPayrollSettingsDeleteHandler
{
    public WeeklyPayrollSettingsDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}