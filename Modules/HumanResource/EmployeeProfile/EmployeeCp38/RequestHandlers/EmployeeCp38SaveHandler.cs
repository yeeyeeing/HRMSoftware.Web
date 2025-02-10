using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeProfile.EmployeeCp38Row>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeCp38Row;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeCp38SaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeCp38SaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeCp38SaveHandler
{
    public EmployeeCp38SaveHandler(IRequestContext context)
            : base(context)
    {
    }
}