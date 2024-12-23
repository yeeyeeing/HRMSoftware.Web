using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.PayrollWizardRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollWizardDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollWizardDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollWizardDeleteHandler
{
    public PayrollWizardDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}