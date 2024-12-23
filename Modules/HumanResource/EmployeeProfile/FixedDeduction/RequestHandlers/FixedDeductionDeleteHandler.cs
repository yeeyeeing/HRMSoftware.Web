using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeProfile.FixedDeductionRow;

namespace HRMSoftware.EmployeeProfile;

public interface IFixedDeductionDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class FixedDeductionDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IFixedDeductionDeleteHandler
{
    public FixedDeductionDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}