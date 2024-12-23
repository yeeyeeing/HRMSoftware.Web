using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.EmployeeBasicData.EmployeeBasicDataRow;

namespace HRMSoftware.EmployeeBasicData;

public interface IEmployeeBasicDataDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeBasicDataDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeBasicDataDeleteHandler
{
    public EmployeeBasicDataDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}