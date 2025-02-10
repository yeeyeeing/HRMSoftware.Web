using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.EmployeeBonusRow;

namespace HRMSoftware.EmployeeProfile;

public interface IEmployeeBonusDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeBonusDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeBonusDeleteHandler
{
    public EmployeeBonusDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}