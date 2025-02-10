using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.PayrollSettings.PayrollSettingsRow>;
using MyRow = HRMSoftware.PayrollSettings.PayrollSettingsRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollSettingsRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollSettingsRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollSettingsRetrieveHandler
{
    public PayrollSettingsRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}