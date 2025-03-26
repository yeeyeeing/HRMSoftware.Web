using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.WeeklyPayrollSettingsRow>;
using MyRow = HRMSoftware.PayrollSettings.WeeklyPayrollSettingsRow;

namespace HRMSoftware.PayrollSettings;

public interface IWeeklyPayrollSettingsRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class WeeklyPayrollSettingsRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IWeeklyPayrollSettingsRetrieveHandler
{
    public WeeklyPayrollSettingsRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}