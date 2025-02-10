using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.PayrollSettingsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollSettingsDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollSettingsDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollSettingsDeleteHandler
{
    public PayrollSettingsDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}