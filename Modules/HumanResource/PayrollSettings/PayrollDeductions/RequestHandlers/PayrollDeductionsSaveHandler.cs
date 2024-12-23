using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.PayrollDeductionsRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.PayrollDeductionsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollDeductionsSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollDeductionsSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollDeductionsSaveHandler
{
    public PayrollDeductionsSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}