using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeAttendance.ShiftAttendanceRecordRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeAttendance.ShiftAttendanceRecordRow;

namespace HRMSoftware.EmployeeAttendance;

public interface IShiftAttendanceRecordSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class ShiftAttendanceRecordSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IShiftAttendanceRecordSaveHandler
{
    public ShiftAttendanceRecordSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}