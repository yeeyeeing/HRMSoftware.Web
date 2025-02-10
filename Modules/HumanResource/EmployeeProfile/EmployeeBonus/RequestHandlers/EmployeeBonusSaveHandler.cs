using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.EmployeeBonusRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeBonusRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeBonusSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeBonusSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeBonusSaveHandler
{
    public EmployeeBonusSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}