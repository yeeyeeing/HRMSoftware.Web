using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.EmployeeBonusRow>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeBonusRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeBonusListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeBonusListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeBonusListHandler
{
    public EmployeeBonusListHandler(IRequestContext context)
            : base(context)
    {
    }
}