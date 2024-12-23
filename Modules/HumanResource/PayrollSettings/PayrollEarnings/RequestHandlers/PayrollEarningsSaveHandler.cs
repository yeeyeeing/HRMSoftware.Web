using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.PayrollEarningsRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.PayrollEarningsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollEarningsSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollEarningsSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollEarningsSaveHandler
{
    public PayrollEarningsSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}