using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeGroup.EmployeeGroupShiftRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupShiftRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupShiftSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupShiftSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupShiftSaveHandler
{
    public EmployeeGroupShiftSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}