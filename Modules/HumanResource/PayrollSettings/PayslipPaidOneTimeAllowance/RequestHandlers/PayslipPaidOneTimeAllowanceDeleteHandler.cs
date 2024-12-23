using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.PayslipPaidOneTimeAllowanceRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayslipPaidOneTimeAllowanceDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PayslipPaidOneTimeAllowanceDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPayslipPaidOneTimeAllowanceDeleteHandler
{
    public PayslipPaidOneTimeAllowanceDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}