using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeGroup.EmployeeGroupRow>;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupListHandler
{
    public EmployeeGroupListHandler(IRequestContext context)
            : base(context)
    {
    }
}