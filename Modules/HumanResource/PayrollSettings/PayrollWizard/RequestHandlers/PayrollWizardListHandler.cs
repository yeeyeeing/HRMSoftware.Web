using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.PayrollWizardRow>;
using MyRow = HRMSoftware.PayrollSettings.PayrollWizardRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollWizardListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollWizardListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollWizardListHandler
{
    public PayrollWizardListHandler(IRequestContext context)
            : base(context)
    {
    }
}