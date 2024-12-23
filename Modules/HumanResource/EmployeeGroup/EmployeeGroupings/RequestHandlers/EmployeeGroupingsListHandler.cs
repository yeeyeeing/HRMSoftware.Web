using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeGroup.EmployeeGroupingsRow>;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupingsRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupingsListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupingsListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupingsListHandler
{
    public EmployeeGroupingsListHandler(IRequestContext context)
            : base(context)
    {
    }
}