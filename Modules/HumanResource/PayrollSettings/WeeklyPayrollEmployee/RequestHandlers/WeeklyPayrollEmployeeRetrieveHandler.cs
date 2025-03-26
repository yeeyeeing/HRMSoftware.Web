using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.WeeklyPayrollEmployeeRow>;
using MyRow = HRMSoftware.PayrollSettings.WeeklyPayrollEmployeeRow;

namespace HRMSoftware.PayrollSettings;

public interface IWeeklyPayrollEmployeeRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class WeeklyPayrollEmployeeRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IWeeklyPayrollEmployeeRetrieveHandler
{
    public WeeklyPayrollEmployeeRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}