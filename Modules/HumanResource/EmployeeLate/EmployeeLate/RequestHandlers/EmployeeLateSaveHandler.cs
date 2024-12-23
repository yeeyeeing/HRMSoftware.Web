using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeLate.EmployeeLateRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeLate.EmployeeLateRow;

namespace HRMSoftware.EmployeeLate;

public interface IEmployeeLateSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeLateSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeLateSaveHandler
{
    public EmployeeLateSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}