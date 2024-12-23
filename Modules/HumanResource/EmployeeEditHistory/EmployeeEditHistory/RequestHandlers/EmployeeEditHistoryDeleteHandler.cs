using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeEditHistory.EmployeeEditHistoryRow;

namespace HRMSoftware.EmployeeEditHistory;

public interface IEmployeeEditHistoryDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeEditHistoryDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeEditHistoryDeleteHandler
{
    public EmployeeEditHistoryDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}