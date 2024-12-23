using Serenity.Services;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = HRMSoftware.TrainingManagement.ProgramDepartmentRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramDepartmentDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramDepartmentDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IProgramDepartmentDeleteHandler
{
    public ProgramDepartmentDeleteHandler(IRequestContext context)
            : base(context)
    {
    }
}