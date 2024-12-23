using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.PayslipPaidOneTimeAllowanceRow>;
using MyRow = HRMSoftware.PayrollSettings.PayslipPaidOneTimeAllowanceRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayslipPaidOneTimeAllowanceListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PayslipPaidOneTimeAllowanceListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPayslipPaidOneTimeAllowanceListHandler
{
    public PayslipPaidOneTimeAllowanceListHandler(IRequestContext context)
            : base(context)
    {
    }
}