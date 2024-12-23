using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.SetEmployeeShift.SetEmployeeShiftRow>;
using MyRow = HRMSoftware.SetEmployeeShift.SetEmployeeShiftRow;

namespace HRMSoftware.SetEmployeeShift;

public interface ISetEmployeeShiftRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class SetEmployeeShiftRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, ISetEmployeeShiftRetrieveHandler
{
    public SetEmployeeShiftRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}