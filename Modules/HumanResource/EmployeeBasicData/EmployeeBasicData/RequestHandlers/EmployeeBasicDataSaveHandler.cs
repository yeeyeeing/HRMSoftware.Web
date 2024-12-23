using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.EmployeeBasicData.EmployeeBasicDataRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.EmployeeBasicData.EmployeeBasicDataRow;

namespace HRMSoftware.EmployeeBasicData;

public interface IEmployeeBasicDataSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeBasicDataSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeBasicDataSaveHandler
{
    public EmployeeBasicDataSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}