using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.WeeklyPayrollRow;

namespace HRMSoftware.PayrollSettings;

public interface IWeeklyPayrollDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class WeeklyPayrollDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IWeeklyPayrollDeleteHandler
{
    public WeeklyPayrollDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}