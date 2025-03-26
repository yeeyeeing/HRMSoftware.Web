using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.WeeklyPayrollEmployeeRow;

namespace HRMSoftware.PayrollSettings;

public interface IWeeklyPayrollEmployeeDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class WeeklyPayrollEmployeeDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IWeeklyPayrollEmployeeDeleteHandler
{
    public WeeklyPayrollEmployeeDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}