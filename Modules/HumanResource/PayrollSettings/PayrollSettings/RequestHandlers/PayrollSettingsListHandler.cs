using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.PayrollSettings.PayrollSettingsRow>;
using MyRow = HRMSoftware.PayrollSettings.PayrollSettingsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollSettingsListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollSettingsListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollSettingsListHandler
{
    public PayrollSettingsListHandler(IRequestContext context)
            : base(context)
    {
    }
}