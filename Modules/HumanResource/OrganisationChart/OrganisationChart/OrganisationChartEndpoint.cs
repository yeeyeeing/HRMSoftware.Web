using HRMSoftware.Administration;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Serenity;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using MyRow = HRMSoftware.OrganisationChart.OrganisationChartRow;

namespace HRMSoftware.OrganisationChart.Endpoints;
public class Rights
{
    public string EmployeeRights { get; set; }
    public string children { get; set; }
}
[Route("Services/OrganisationChart/OrganisationChart/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class OrganisationChartEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IOrganisationChartSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
        [FromServices] IOrganisationChartSaveHandler handler)
    {
        return handler.Update(uow, request);
    }
 
    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
        [FromServices] IOrganisationChartDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    [HttpPost]
    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
        [FromServices] IOrganisationChartRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
        [FromServices] IOrganisationChartListHandler handler)
    {
        return handler.List(connection, request);
    }
    /*
    [HttpPost, AuthorizeList(typeof(MyRow))]
    public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
        [FromServices] IOrganisationChartListHandler handler,
        [FromServices] IExcelExporter exporter)
    {
        var data = List(connection, request, handler).Entities;
        var bytes = exporter.Export(data, typeof(Columns.OrganisationChartColumns), request.ExportColumns);
        return ExcelContentResult.Create(bytes, "OrganisationChartList_" +
            DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
    }
    */
    static void ProcessChildren(JToken childrenToken, List<int> numbers)
    {
        foreach (JObject child in childrenToken.Children<JObject>())
            ProcessChild(child, numbers);
    }

    static void ProcessChild(JObject child, List<int> numbers)
    {
        // Add EmployeeRowId to the list if it exists
        if (child.ContainsKey("EmployeeRowId"))
        {
         
            JToken employeeRowIdToken = child["EmployeeRowId"];
           
            if (employeeRowIdToken != null && employeeRowIdToken.Type != JTokenType.Null)
                numbers.Add(employeeRowIdToken.Value<int>());
        }
        // Check for 'children' key and process recursively
        JToken childrenToken = child["children"];
        if (childrenToken != null)
            ProcessChildren(childrenToken, numbers);

    }
    public List<int> GetEmployeeUserCanView(IDbConnection connection, int EmployeeRowID,string PermissionKey) {

        string prefix = "Administration:";
        string result = PermissionKey.Replace(prefix, "");
     

        List<int> numbers = new List<int>();
        List<Rights> right = new List<Rights>();
        right = (List<Rights>)connection.Query<Rights>("dbo.GetRights",
            param: new
            {
                @EmployeeRowId = EmployeeRowID
            },
        commandType: System.Data.CommandType.StoredProcedure);
        if (right.Count > 0)
        {
            for (int i = 0; i < right.Count; i++)
            {
                JObject obj = JObject.Parse(right[i].ToJson());
                if (obj.ContainsKey("EmployeeRights"))
                {
                    JObject RightsObj = JObject.Parse(obj["EmployeeRights"].ToString());
                    if (obj.ContainsKey("children")) {
                        JArray childrenObj = JArray.Parse(obj["children"].ToString());
                        var Right = RightsObj[result].Value<bool>();
                        if (Right == true)
                            ProcessChildren(childrenObj, numbers);
                    }
                }
            }
        }

        return numbers;
    }


    public bool PermissionToAcknowledge(IDbConnection connection, int UserEmployeeRowID, int ApplicantEmployeeRowID)
    {
        bool canView = false;
        List<int> numbers = new List<int>();
        List<Rights> right = new List<Rights>();
        right = (List<Rights>)connection.Query<Rights>("dbo.GetRights",
            param: new
            {
                @EmployeeRowId = UserEmployeeRowID
            },
        commandType: System.Data.CommandType.StoredProcedure);
        if (right.Count > 0)
        {
            for (int i = 0; i < right.Count; i++)
            {
                JObject obj = JObject.Parse(right[i].ToJson());
                if (obj.ContainsKey("children"))
                {
                    JArray childrenObj = JArray.Parse(obj["children"].ToString());
                    ProcessChildren(childrenObj, numbers);

                    canView = numbers.Contains(ApplicantEmployeeRowID);
                }
            }
        }

        return canView;
    }


}