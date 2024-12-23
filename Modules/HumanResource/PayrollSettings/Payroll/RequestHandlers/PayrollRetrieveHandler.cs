using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.PayrollRow>;
using MyRow = HRMSoftware.PayrollSettings.PayrollRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollRetrieveHandler
{
    public PayrollRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}