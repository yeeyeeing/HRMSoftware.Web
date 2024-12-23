using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeEarlyLeaving.EmployeeEarlyLeavingRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeEarlyLeaving.EmployeeEarlyLeavingRow;

namespace HRMSoftware.EmployeeEarlyLeaving;

public interface IEmployeeEarlyLeavingSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeEarlyLeavingSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeEarlyLeavingSaveHandler
{
    public EmployeeEarlyLeavingSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}