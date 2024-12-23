using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeGroup.EmployeeGroupShiftRow>;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupShiftRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupShiftListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupShiftListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupShiftListHandler
{
    public EmployeeGroupShiftListHandler(IRequestContext context)
            : base(context)
    {
    }
}