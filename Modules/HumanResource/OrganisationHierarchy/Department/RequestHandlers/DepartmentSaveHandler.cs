using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.OrganisationHierarchy.DepartmentRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.OrganisationHierarchy.DepartmentRow;

namespace HRMSoftware.OrganisationHierarchy;

public interface IDepartmentSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class DepartmentSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IDepartmentSaveHandler
{
    public DepartmentSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}