using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeGroup.EmployeeGroupingsRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeGroup.EmployeeGroupingsRow;

namespace HRMSoftware.EmployeeGroup;

public interface IEmployeeGroupingsSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeGroupingsSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeGroupingsSaveHandler
{
    public EmployeeGroupingsSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}