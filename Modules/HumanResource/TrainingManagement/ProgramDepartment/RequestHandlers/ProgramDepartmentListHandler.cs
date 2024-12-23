using Serenity.Services;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<HRMSoftware.TrainingManagement.ProgramDepartmentRow>;
using MyRow = HRMSoftware.TrainingManagement.ProgramDepartmentRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramDepartmentListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramDepartmentListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IProgramDepartmentListHandler
{
    public ProgramDepartmentListHandler(IRequestContext context)
            : base(context)
    {
    }
}