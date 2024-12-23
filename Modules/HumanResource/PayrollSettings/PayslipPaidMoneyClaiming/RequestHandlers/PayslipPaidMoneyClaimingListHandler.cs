using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.PayslipPaidMoneyClaimingRow>;
using MyRow = HRMSoftware.PayrollSettings.PayslipPaidMoneyClaimingRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayslipPaidMoneyClaimingListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PayslipPaidMoneyClaimingListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPayslipPaidMoneyClaimingListHandler
{
    public PayslipPaidMoneyClaimingListHandler(IRequestContext context)
            : base(context)
    {
    }
}