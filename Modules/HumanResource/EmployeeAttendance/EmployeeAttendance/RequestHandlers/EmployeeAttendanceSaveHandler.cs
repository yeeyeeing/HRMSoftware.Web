using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeAttendance.EmployeeAttendanceRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeAttendance.EmployeeAttendanceRow;

namespace HRMSoftware.EmployeeAttendance;

public interface IEmployeeAttendanceSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeAttendanceSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeAttendanceSaveHandler
{
    public EmployeeAttendanceSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}