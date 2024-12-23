using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.SetEmployeeShift.SetEmployeeShiftRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.SetEmployeeShift.SetEmployeeShiftRow;

namespace HRMSoftware.SetEmployeeShift;

public interface ISetEmployeeShiftSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class SetEmployeeShiftSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ISetEmployeeShiftSaveHandler
{
    public SetEmployeeShiftSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}