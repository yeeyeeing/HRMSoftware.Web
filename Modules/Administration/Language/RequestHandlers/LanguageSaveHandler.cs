using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<HRMSoftware.Administration.LanguageRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = HRMSoftware.Administration.LanguageRow;


namespace HRMSoftware.Administration
{
    public interface ILanguageSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> { }
    public class LanguageSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ILanguageSaveHandler
    {
        public LanguageSaveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}