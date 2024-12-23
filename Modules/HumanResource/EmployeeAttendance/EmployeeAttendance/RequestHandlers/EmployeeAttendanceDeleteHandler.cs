using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeAttendance.EmployeeAttendanceRow;

namespace HRMSoftware.EmployeeAttendance;

public interface IEmployeeAttendanceDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeAttendanceDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeAttendanceDeleteHandler
{
    public EmployeeAttendanceDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}