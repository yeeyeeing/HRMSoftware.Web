using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.PayslipPaidMoneyClaimingRow>;
using MyRow = HRMSoftware.PayrollSettings.PayslipPaidMoneyClaimingRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayslipPaidMoneyClaimingRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PayslipPaidMoneyClaimingRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPayslipPaidMoneyClaimingRetrieveHandler
{
    public PayslipPaidMoneyClaimingRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}