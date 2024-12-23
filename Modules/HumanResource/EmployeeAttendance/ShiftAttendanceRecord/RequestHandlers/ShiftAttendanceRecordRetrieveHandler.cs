using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeAttendance.ShiftAttendanceRecordRow>;
using MyRow = HRMSoftware.EmployeeAttendance.ShiftAttendanceRecordRow;

namespace HRMSoftware.EmployeeAttendance;

public interface IShiftAttendanceRecordRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class ShiftAttendanceRecordRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IShiftAttendanceRecordRetrieveHandler
{
    public ShiftAttendanceRecordRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}