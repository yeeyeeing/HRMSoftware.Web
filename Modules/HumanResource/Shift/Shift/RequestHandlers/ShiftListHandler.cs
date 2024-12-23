using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.Shift.ShiftRow>;
using MyRow = HRMSoftware.Shift.ShiftRow;

namespace HRMSoftware.Shift;

public interface IShiftListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class ShiftListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IShiftListHandler
{
    public ShiftListHandler(IRequestContext context)
            : base(context)
    {
    }
}