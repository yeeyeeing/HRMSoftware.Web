using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.PayrollWizardRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.PayrollWizardRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollWizardSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollWizardSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollWizardSaveHandler
{
    public PayrollWizardSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}