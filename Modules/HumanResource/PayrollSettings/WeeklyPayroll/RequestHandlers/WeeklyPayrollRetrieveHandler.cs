using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.WeeklyPayrollRow>;
using MyRow = HRMSoftware.PayrollSettings.WeeklyPayrollRow;

namespace HRMSoftware.PayrollSettings;

public interface IWeeklyPayrollRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class WeeklyPayrollRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IWeeklyPayrollRetrieveHandler
{
    public WeeklyPayrollRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}