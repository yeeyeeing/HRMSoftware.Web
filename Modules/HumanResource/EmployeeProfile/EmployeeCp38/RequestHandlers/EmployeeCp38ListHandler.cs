using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeProfile.EmployeeCp38Row>;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeCp38Row;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeCp38ListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeCp38ListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeCp38ListHandler
{
    public EmployeeCp38ListHandler(IRequestContext context)
            : base(context)
    {
    }
}