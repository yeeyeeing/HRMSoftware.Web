using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.PayslipDeductedOneTimeDeductionsRow>;
using MyRow = HRMSoftware.PayrollSettings.PayslipDeductedOneTimeDeductionsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayslipDeductedOneTimeDeductionsListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PayslipDeductedOneTimeDeductionsListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPayslipDeductedOneTimeDeductionsListHandler
{
    public PayslipDeductedOneTimeDeductionsListHandler(IRequestContext context)
            : base(context)
    {
    }
}