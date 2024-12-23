using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.PayrollGeneratingWizardRow>;
using MyRow = HRMSoftware.PayrollSettings.PayrollGeneratingWizardRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollGeneratingWizardRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollGeneratingWizardRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollGeneratingWizardRetrieveHandler
{
    public PayrollGeneratingWizardRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}