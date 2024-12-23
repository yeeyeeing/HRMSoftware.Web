using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.PayslipPaidOneTimeAllowanceRow>;
using MyRow = HRMSoftware.PayrollSettings.PayslipPaidOneTimeAllowanceRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayslipPaidOneTimeAllowanceRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PayslipPaidOneTimeAllowanceRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPayslipPaidOneTimeAllowanceRetrieveHandler
{
    public PayslipPaidOneTimeAllowanceRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}