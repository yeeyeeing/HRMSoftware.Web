using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeAttendance.ShiftAttendanceRecordRow;

namespace HRMSoftware.EmployeeAttendance;

public interface IShiftAttendanceRecordDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class ShiftAttendanceRecordDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IShiftAttendanceRecordDeleteHandler
{
    public ShiftAttendanceRecordDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}