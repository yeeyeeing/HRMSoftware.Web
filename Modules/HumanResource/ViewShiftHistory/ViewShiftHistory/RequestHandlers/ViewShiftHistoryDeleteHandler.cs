using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.ViewShiftHistory.ViewShiftHistoryRow;

namespace HRMSoftware.ViewShiftHistory;

public interface IViewShiftHistoryDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class ViewShiftHistoryDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IViewShiftHistoryDeleteHandler
{
    public ViewShiftHistoryDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}