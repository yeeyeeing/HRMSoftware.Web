using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.PayslipDeductedOneTimeDeductionsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayslipDeductedOneTimeDeductionsDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PayslipDeductedOneTimeDeductionsDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPayslipDeductedOneTimeDeductionsDeleteHandler
{
    public PayslipDeductedOneTimeDeductionsDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}