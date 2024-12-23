using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OrganisationChart.EmployeeRightsRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OrganisationChart.EmployeeRightsRow;

namespace HRMSoftware.OrganisationChart;

public interface IEmployeeRightsSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeRightsSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeRightsSaveHandler
{
    public EmployeeRightsSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}