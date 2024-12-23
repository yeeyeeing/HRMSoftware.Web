using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeEditHistory.EmployeeEditHistoryRow>;
using MyRow = HRMSoftware.EmployeeEditHistory.EmployeeEditHistoryRow;

namespace HRMSoftware.EmployeeEditHistory;

public interface IEmployeeEditHistoryListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeEditHistoryListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeEditHistoryListHandler
{
    public EmployeeEditHistoryListHandler(IRequestContext context)
            : base(context)
    {
    }
}