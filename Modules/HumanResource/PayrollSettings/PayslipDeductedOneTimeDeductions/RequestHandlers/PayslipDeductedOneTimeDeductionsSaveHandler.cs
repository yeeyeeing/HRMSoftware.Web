using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.PayslipDeductedOneTimeDeductionsRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.PayslipDeductedOneTimeDeductionsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayslipDeductedOneTimeDeductionsSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PayslipDeductedOneTimeDeductionsSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPayslipDeductedOneTimeDeductionsSaveHandler
{
    public PayslipDeductedOneTimeDeductionsSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}