using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.ShiftHistory.ShiftHistoryRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.ShiftHistory.ShiftHistoryRow;

namespace HRMSoftware.ShiftHistory;

public interface IShiftHistorySaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class ShiftHistorySaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IShiftHistorySaveHandler
{
    public ShiftHistorySaveHandler(IRequestContext context)
            : base(context)
    {
    }
}