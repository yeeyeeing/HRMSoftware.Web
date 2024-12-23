using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.TrainingManagement.AttendanceListRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.TrainingManagement.AttendanceListRow;

namespace HRMSoftware.TrainingManagement;

public interface IAttendanceListSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class AttendanceListSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IAttendanceListSaveHandler
{
    public AttendanceListSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}