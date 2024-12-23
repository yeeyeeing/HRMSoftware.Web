using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.PayrollEarningsRow>;
using MyRow = HRMSoftware.PayrollSettings.PayrollEarningsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollEarningsListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollEarningsListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollEarningsListHandler
{
    public PayrollEarningsListHandler(IRequestContext context)
            : base(context)
    {
    }
}