using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.PayslipDeductedOneTimeDeductionsRow>;
using MyRow = HRMSoftware.PayrollSettings.PayslipDeductedOneTimeDeductionsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayslipDeductedOneTimeDeductionsRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PayslipDeductedOneTimeDeductionsRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPayslipDeductedOneTimeDeductionsRetrieveHandler
{
    public PayslipDeductedOneTimeDeductionsRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}