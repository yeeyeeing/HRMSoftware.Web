using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.PayrollRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollDeleteHandler
{
    public PayrollDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}