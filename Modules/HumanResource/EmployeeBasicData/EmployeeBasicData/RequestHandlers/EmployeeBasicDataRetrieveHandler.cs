using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.EmployeeBasicData.EmployeeBasicDataRow>;
using MyRow = HRMSoftware.EmployeeBasicData.EmployeeBasicDataRow;

namespace HRMSoftware.EmployeeBasicData;

public interface IEmployeeBasicDataRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeBasicDataRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeBasicDataRetrieveHandler
{
    public EmployeeBasicDataRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}