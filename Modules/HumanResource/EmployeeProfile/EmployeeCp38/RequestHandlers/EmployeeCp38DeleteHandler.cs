using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeCp38Row;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeCp38DeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeCp38DeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeCp38DeleteHandler
{
    public EmployeeCp38DeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}