using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.PayrollEarningsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollEarningsDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollEarningsDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollEarningsDeleteHandler
{
    public PayrollEarningsDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}