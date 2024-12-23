using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.TrainingManagement.ProgramParticipantRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.TrainingManagement.ProgramParticipantRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramParticipantSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramParticipantSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IProgramParticipantSaveHandler
{
    public ProgramParticipantSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}