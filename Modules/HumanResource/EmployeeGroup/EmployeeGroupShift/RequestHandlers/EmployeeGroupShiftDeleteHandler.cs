using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupShiftRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupShiftDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupShiftDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupShiftDeleteHandler
{
    public EmployeeGroupShiftDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}