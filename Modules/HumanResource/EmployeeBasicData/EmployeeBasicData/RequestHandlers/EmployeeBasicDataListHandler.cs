using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.EmployeeBasicData.EmployeeBasicDataRow>;
using MyRow = HRMSoftware.EmployeeBasicData.EmployeeBasicDataRow;

namespace HRMSoftware.EmployeeBasicData;

public interface IEmployeeBasicDataListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeBasicDataListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeBasicDataListHandler
{
    public EmployeeBasicDataListHandler(IRequestContext context)
            : base(context)
    {
    }
}