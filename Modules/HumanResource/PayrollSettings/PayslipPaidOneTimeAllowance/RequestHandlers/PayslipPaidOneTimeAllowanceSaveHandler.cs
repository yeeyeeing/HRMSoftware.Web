using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.PayslipPaidOneTimeAllowanceRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.PayslipPaidOneTimeAllowanceRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayslipPaidOneTimeAllowanceSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PayslipPaidOneTimeAllowanceSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPayslipPaidOneTimeAllowanceSaveHandler
{
    public PayslipPaidOneTimeAllowanceSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}