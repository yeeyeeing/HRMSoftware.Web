using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeLate.EmployeeLateRow;

namespace HRMSoftware.EmployeeLate;

public interface IEmployeeLateDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeLateDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeLateDeleteHandler
{
    public EmployeeLateDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}