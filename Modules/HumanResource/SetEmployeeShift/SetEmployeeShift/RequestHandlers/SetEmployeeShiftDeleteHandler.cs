using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.SetEmployeeShift.SetEmployeeShiftRow;

namespace HRMSoftware.SetEmployeeShift;

public interface ISetEmployeeShiftDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class SetEmployeeShiftDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, ISetEmployeeShiftDeleteHandler
{
    public SetEmployeeShiftDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}