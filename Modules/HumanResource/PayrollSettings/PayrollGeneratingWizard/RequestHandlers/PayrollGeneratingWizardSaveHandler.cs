using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.PayrollGeneratingWizardRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.PayrollGeneratingWizardRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollGeneratingWizardSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollGeneratingWizardSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollGeneratingWizardSaveHandler
{
    public PayrollGeneratingWizardSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}