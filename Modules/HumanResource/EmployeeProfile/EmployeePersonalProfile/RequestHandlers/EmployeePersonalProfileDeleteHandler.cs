using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeePersonalProfileRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeePersonalProfileDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeePersonalProfileDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeePersonalProfileDeleteHandler
{
    public EmployeePersonalProfileDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}