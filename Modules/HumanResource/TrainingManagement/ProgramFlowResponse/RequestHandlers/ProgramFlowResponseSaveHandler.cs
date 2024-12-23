using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.TrainingManagement.ProgramFlowResponseRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.TrainingManagement.ProgramFlowResponseRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramFlowResponseSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramFlowResponseSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IProgramFlowResponseSaveHandler
{
    public ProgramFlowResponseSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}