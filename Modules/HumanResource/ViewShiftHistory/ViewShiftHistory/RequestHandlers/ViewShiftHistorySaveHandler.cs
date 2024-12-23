using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.ViewShiftHistory.ViewShiftHistoryRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.ViewShiftHistory.ViewShiftHistoryRow;

namespace HRMSoftware.ViewShiftHistory;

public interface IViewShiftHistorySaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class ViewShiftHistorySaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IViewShiftHistorySaveHandler
{
    public ViewShiftHistorySaveHandler(IRequestContext context)
            : base(context)
    {
    }
}