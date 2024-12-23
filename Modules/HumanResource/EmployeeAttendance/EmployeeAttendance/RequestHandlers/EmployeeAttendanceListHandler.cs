using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeAttendance.EmployeeAttendanceRow>;
using MyRow = HRMSoftware.EmployeeAttendance.EmployeeAttendanceRow;

namespace HRMSoftware.EmployeeAttendance;

public interface IEmployeeAttendanceListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeAttendanceListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeAttendanceListHandler
{
    public EmployeeAttendanceListHandler(IRequestContext context)
            : base(context)
    {
    }
}