using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupDeleteHandler
{
    public EmployeeGroupDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}