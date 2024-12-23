using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeAttendance.EmployeeAttendanceRow>;
using MyRow = HRMSoftware.EmployeeAttendance.EmployeeAttendanceRow;

namespace HRMSoftware.EmployeeAttendance;

public interface IEmployeeAttendanceRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeAttendanceRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeAttendanceRetrieveHandler
{
    public EmployeeAttendanceRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}