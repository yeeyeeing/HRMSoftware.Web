using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.TrainingManagement.AttendanceListRow;

namespace HRMSoftware.TrainingManagement;

public interface IAttendanceListDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class AttendanceListDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IAttendanceListDeleteHandler
{
    public AttendanceListDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}