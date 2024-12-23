using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.SetEmployeeShift.SetEmployeeShiftRow>;
using MyRow = HRMSoftware.SetEmployeeShift.SetEmployeeShiftRow;

namespace HRMSoftware.SetEmployeeShift;

public interface ISetEmployeeShiftListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class SetEmployeeShiftListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, ISetEmployeeShiftListHandler
{
    public SetEmployeeShiftListHandler(IRequestContext context)
            : base(context)
    {
    }
}