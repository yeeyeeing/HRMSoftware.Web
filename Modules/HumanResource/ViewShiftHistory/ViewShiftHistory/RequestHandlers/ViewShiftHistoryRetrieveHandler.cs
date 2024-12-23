using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.ViewShiftHistory.ViewShiftHistoryRow>;
using MyRow = HRMSoftware.ViewShiftHistory.ViewShiftHistoryRow;

namespace HRMSoftware.ViewShiftHistory;

public interface IViewShiftHistoryRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class ViewShiftHistoryRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IViewShiftHistoryRetrieveHandler
{
    public ViewShiftHistoryRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}