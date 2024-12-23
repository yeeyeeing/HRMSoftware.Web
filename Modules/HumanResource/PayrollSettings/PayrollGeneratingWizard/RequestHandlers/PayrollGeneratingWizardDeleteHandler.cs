using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.PayrollSettings.PayrollGeneratingWizardRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollGeneratingWizardDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollGeneratingWizardDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollGeneratingWizardDeleteHandler
{
    public PayrollGeneratingWizardDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}