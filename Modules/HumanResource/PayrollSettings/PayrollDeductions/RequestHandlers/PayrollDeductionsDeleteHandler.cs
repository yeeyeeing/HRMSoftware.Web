using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.PayrollDeductionsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollDeductionsDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollDeductionsDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollDeductionsDeleteHandler
{
    public PayrollDeductionsDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}