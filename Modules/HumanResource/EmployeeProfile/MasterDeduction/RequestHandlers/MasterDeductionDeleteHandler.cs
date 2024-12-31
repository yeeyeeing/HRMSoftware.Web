using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.MasterDeductionRow;

namespace HRMSoftware.EmployeeProfile;

public interface IMasterDeductionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class MasterDeductionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IMasterDeductionDeleteHandler
{
    public MasterDeductionDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}