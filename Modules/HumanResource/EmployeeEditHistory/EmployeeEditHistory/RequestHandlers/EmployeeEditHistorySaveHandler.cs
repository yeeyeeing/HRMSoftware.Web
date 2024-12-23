using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeEditHistory.EmployeeEditHistoryRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeEditHistory.EmployeeEditHistoryRow;

namespace HRMSoftware.EmployeeEditHistory;

public interface IEmployeeEditHistorySaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeEditHistorySaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeEditHistorySaveHandler
{
    public EmployeeEditHistorySaveHandler(IRequestContext context)
            : base(context)
    {
    }
}