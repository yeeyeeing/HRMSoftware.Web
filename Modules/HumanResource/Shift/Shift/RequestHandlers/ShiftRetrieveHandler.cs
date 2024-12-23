using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.Shift.ShiftRow>;
using MyRow = HRMSoftware.Shift.ShiftRow;

namespace HRMSoftware.Shift;

public interface IShiftRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class ShiftRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IShiftRetrieveHandler
{
    public ShiftRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}