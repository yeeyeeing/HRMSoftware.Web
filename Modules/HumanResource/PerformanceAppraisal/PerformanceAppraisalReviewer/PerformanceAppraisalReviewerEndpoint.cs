using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Data;
using System.Globalization;

namespace HRMSoftware.PerformanceAppraisal.Endpoints;

[Route("Services/PerformanceAppraisal/PerformanceAppraisalReviewer/[action]")]
[ConnectionKey(typeof(PerformanceAppraisalReviewerRow)), ServiceAuthorize(typeof(PerformanceAppraisalReviewerRow))]
public class PerformanceAppraisalReviewerEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(PerformanceAppraisalReviewerRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<PerformanceAppraisalReviewerRow> request,
        [FromServices] IPerformanceAppraisalResponderSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(PerformanceAppraisalReviewerRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<PerformanceAppraisalReviewerRow> request,
        [FromServices] IPerformanceAppraisalResponderSaveHandler handler)
    {
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(PerformanceAppraisalReviewerRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IPerformanceAppraisalResponderDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<PerformanceAppraisalReviewerRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IPerformanceAppraisalResponderRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(PerformanceAppraisalReviewerRow))]
    public ListResponse<PerformanceAppraisalReviewerRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IPerformanceAppraisalResponderListHandler handler)
    {
        return handler.List(connection, request);
    }

    // [HttpPost, AuthorizeList(typeof(MyRow))]
    // public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
    //     [FromServices] IPerformanceAppraisalResponderListHandler handler,
    //     [FromServices] IExcelExporter exporter)
    // {
    //     var data = List(connection, request, handler).Entities;
    //     var bytes = exporter.Export(data, typeof(Columns.PerformanceAppraisalResponderColumns), request.ExportColumns);
    //     return ExcelContentResult.Create(bytes, "PerformanceAppraisalResponderList_" +
    //         DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    // }
}