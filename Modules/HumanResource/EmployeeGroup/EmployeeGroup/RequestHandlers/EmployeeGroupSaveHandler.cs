using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeGroup.EmployeeGroupRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupSaveHandler
{
    public EmployeeGroupSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}