using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.PayrollDeductionsRow>;
using MyRow = HRMSoftware.PayrollSettings.PayrollDeductionsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollDeductionsRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollDeductionsRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollDeductionsRetrieveHandler
{
    public PayrollDeductionsRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}