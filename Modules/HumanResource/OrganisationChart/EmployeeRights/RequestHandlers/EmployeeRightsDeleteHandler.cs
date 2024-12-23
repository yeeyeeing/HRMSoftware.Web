using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.OrganisationChart.EmployeeRightsRow;

namespace HRMSoftware.OrganisationChart;

public interface IEmployeeRightsDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class EmployeeRightsDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IEmployeeRightsDeleteHandler
{
    public EmployeeRightsDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}