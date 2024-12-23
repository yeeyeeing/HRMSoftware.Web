using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.PayslipPaidMoneyClaimingRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.PayslipPaidMoneyClaimingRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayslipPaidMoneyClaimingSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PayslipPaidMoneyClaimingSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPayslipPaidMoneyClaimingSaveHandler
{
    public PayslipPaidMoneyClaimingSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}