using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.PayrollGeneratingWizardRow>;
using MyRow = HRMSoftware.PayrollSettings.PayrollGeneratingWizardRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollGeneratingWizardListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollGeneratingWizardListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollGeneratingWizardListHandler
{
    public PayrollGeneratingWizardListHandler(IRequestContext context)
            : base(context)
    {
    }
}