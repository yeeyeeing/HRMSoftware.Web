using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.MasterCareerPathRow;

namespace HRMSoftware.EmployeeProfile;

public interface IMasterCareerPathDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MasterCareerPathDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMasterCareerPathDeleteHandler
{
    public MasterCareerPathDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}