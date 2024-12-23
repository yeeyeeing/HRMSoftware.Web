using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.PayrollEarningsRow>;
using MyRow = HRMSoftware.PayrollSettings.PayrollEarningsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollEarningsRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollEarningsRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollEarningsRetrieveHandler
{
    public PayrollEarningsRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}