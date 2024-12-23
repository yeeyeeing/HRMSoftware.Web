using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.TrainingManagement.AttendanceListRow>;
using MyRow = HRMSoftware.TrainingManagement.AttendanceListRow;

namespace HRMSoftware.TrainingManagement;

public interface IAttendanceListRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class AttendanceListRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IAttendanceListRetrieveHandler
{
    public AttendanceListRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}