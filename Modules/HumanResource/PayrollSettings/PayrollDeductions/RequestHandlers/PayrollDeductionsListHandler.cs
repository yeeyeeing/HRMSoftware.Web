using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.PayrollDeductionsRow>;
using MyRow = HRMSoftware.PayrollSettings.PayrollDeductionsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollDeductionsListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollDeductionsListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollDeductionsListHandler
{
    public PayrollDeductionsListHandler(IRequestContext context)
            : base(context)
    {
    }
}