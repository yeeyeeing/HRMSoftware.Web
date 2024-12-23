using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupingsRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupingsDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupingsDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupingsDeleteHandler
{
    public EmployeeGroupingsDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}