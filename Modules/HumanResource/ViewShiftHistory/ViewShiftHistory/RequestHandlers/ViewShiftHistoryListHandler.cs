using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.ViewShiftHistory.ViewShiftHistoryRow>;
using MyRow = HRMSoftware.ViewShiftHistory.ViewShiftHistoryRow;

namespace HRMSoftware.ViewShiftHistory;

public interface IViewShiftHistoryListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class ViewShiftHistoryListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IViewShiftHistoryListHandler
{
    public ViewShiftHistoryListHandler(IRequestContext context)
            : base(context)
    {
    }
}