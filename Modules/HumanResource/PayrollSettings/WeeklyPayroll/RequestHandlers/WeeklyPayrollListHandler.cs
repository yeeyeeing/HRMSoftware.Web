using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.WeeklyPayrollRow>;
using MyRow = HRMSoftware.PayrollSettings.WeeklyPayrollRow;

namespace HRMSoftware.PayrollSettings;

public interface IWeeklyPayrollListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class WeeklyPayrollListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IWeeklyPayrollListHandler
{
    public WeeklyPayrollListHandler(IRequestContext context)
            : base(context)
    {
    }
}