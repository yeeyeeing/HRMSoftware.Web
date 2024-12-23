using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.PayrollWizardRow>;
using MyRow = HRMSoftware.PayrollSettings.PayrollWizardRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollWizardRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollWizardRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollWizardRetrieveHandler
{
    public PayrollWizardRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}