using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.PayslipPaidMoneyClaimingRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayslipPaidMoneyClaimingDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PayslipPaidMoneyClaimingDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPayslipPaidMoneyClaimingDeleteHandler
{
    public PayslipPaidMoneyClaimingDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}