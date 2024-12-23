using Serenity.Services;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<HRMSoftware.OrganisationChart.EmployeeRightsRow>;
using MyRow = HRMSoftware.OrganisationChart.EmployeeRightsRow;

namespace HRMSoftware.OrganisationChart;

public interface IEmployeeRightsRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeRightsRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeRightsRetrieveHandler
{
    public EmployeeRightsRetrieveHandler(IRequestContext context)
            : base(context)
    {
    }
}