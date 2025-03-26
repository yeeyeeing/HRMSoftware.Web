using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.WeeklyPayrollRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.WeeklyPayrollRow;

namespace HRMSoftware.PayrollSettings;

public interface IWeeklyPayrollSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class WeeklyPayrollSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IWeeklyPayrollSaveHandler
{
    public WeeklyPayrollSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}