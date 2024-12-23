using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeGroup.EmployeeGroupShiftPatternRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupShiftPatternRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupShiftPatternSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupShiftPatternSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupShiftPatternSaveHandler
{
    public EmployeeGroupShiftPatternSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}