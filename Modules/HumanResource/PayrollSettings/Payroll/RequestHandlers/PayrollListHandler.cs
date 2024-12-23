using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.PayrollRow>;
using MyRow = HRMSoftware.PayrollSettings.PayrollRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollListHandler
{
    public PayrollListHandler(IRequestContext context)
            : base(context)
    {
    }
}