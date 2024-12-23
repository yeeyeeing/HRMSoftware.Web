using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.OrganisationChart.EmployeeRightsRow>;
using MyRow = HRMSoftware.OrganisationChart.EmployeeRightsRow;

namespace HRMSoftware.OrganisationChart;

public interface IEmployeeRightsListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeRightsListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeRightsListHandler
{
    public EmployeeRightsListHandler(IRequestContext context)
            : base(context)
    {
    }
}