using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.Shift.ShiftRow;

namespace HRMSoftware.Shift;

public interface IShiftDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class ShiftDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IShiftDeleteHandler
{
    public ShiftDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}