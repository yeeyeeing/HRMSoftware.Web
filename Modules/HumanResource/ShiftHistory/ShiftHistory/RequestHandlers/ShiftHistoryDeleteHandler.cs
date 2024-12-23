using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.ShiftHistory.ShiftHistoryRow;

namespace HRMSoftware.ShiftHistory;

public interface IShiftHistoryDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class ShiftHistoryDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IShiftHistoryDeleteHandler
{
    public ShiftHistoryDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}