using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.WeeklyPayrollEmployeeRow>;
using MyRow = HRMSoftware.PayrollSettings.WeeklyPayrollEmployeeRow;

namespace HRMSoftware.PayrollSettings;

public interface IWeeklyPayrollEmployeeListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class WeeklyPayrollEmployeeListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IWeeklyPayrollEmployeeListHandler
{
    public WeeklyPayrollEmployeeListHandler(IRequestContext context)
            : base(context)
    {
    }
}