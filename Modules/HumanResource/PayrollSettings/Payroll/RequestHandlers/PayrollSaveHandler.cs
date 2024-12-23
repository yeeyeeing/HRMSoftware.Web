using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.PayrollSettings.PayrollRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.PayrollSettings.PayrollRow;

namespace HRMSoftware.PayrollSettings;

public interface IPayrollSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class PayrollSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IPayrollSaveHandler
{
    public PayrollSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}