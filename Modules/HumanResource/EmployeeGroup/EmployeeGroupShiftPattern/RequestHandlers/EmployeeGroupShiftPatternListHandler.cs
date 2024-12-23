using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeGroup.EmployeeGroupShiftPatternRow>;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupShiftPatternRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupShiftPatternListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupShiftPatternListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupShiftPatternListHandler
{
    public EmployeeGroupShiftPatternListHandler(IRequestContext context)
            : base(context)
    {
    }
}