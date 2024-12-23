using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupShiftPatternRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupShiftPatternDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupShiftPatternDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupShiftPatternDeleteHandler
{
    public EmployeeGroupShiftPatternDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}