using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.ShiftHistory.ShiftHistoryRow>;
using MyRow = HRMSoftware.ShiftHistory.ShiftHistoryRow;

namespace HRMSoftware.ShiftHistory;

public interface IShiftHistoryRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class ShiftHistoryRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IShiftHistoryRetrieveHandler
{
    public ShiftHistoryRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}