using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeLate.EmployeeLateRow>;
using MyRow = HRMSoftware.EmployeeLate.EmployeeLateRow;

namespace HRMSoftware.EmployeeLate;

public interface IEmployeeLateListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeLateListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeLateListHandler
{
    public EmployeeLateListHandler(IRequestContext context)
            : base(context)
    {
    }
}