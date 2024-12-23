using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.TrainingManagement.ProgramDepartmentRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.TrainingManagement.ProgramDepartmentRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramDepartmentSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramDepartmentSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IProgramDepartmentSaveHandler
{
    public ProgramDepartmentSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}