using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.TrainingManagement.ProgramSessionRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.TrainingManagement.ProgramSessionRow;

namespace HRMSoftware.TrainingManagement;

public interface IProgramSessionSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

public class ProgramSessionSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IProgramSessionSaveHandler
{
    public ProgramSessionSaveHandler(IRequestContext context)
            : base(context)
    {
    }
}