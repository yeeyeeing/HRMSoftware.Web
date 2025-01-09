using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeCareerPathRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeCareerPathDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeCareerPathDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeCareerPathDeleteHandler
{
    public EmployeeCareerPathDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}