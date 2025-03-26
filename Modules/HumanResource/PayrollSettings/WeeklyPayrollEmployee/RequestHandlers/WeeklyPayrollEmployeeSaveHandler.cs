using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.WeeklyPayrollEmployeeRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.WeeklyPayrollEmployeeRow;

namespace HRMSoftware.PayrollSettings;

public interface IWeeklyPayrollEmployeeSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class WeeklyPayrollEmployeeSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IWeeklyPayrollEmployeeSaveHandler
{
    public WeeklyPayrollEmployeeSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}