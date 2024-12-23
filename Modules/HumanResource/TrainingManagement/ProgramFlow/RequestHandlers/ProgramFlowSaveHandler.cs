using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.TrainingManagement.ProgramFlowRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.TrainingManagement.ProgramFlowRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramFlowSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramFlowSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IProgramFlowSaveHandler
{
    public ProgramFlowSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}