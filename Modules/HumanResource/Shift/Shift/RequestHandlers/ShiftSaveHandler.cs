using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Shift.ShiftRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Shift.ShiftRow;

namespace HRMSoftware.Shift;

public interface IShiftSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class ShiftSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IShiftSaveHandler
{
    public ShiftSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}