using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.ShiftHistory.ShiftHistoryRow>;
using MyRow = HRMSoftware.ShiftHistory.ShiftHistoryRow;

namespace HRMSoftware.ShiftHistory;

public interface IShiftHistoryListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class ShiftHistoryListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IShiftHistoryListHandler
{
    public ShiftHistoryListHandler(IRequestContext context)
            : base(context)
    {
    }
}