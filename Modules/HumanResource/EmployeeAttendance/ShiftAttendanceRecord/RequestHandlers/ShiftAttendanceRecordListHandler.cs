using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeAttendance.ShiftAttendanceRecordRow>;
using MyRow = HRMSoftware.EmployeeAttendance.ShiftAttendanceRecordRow;

namespace HRMSoftware.EmployeeAttendance;

public interface IShiftAttendanceRecordListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class ShiftAttendanceRecordListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IShiftAttendanceRecordListHandler
{
    public ShiftAttendanceRecordListHandler(IRequestContext context)
            : base(context)
    {
    }
}