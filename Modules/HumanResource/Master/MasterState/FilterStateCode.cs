using HRMSoftware.Master;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Web;

[LookupScript("MasterState.FilterStateCode")]
public class FilterStateCode : RowLookupScript<MasterStateRow>
{
    public FilterStateCode(ISqlConnections sqlConnections) : base(sqlConnections)
    {
        IdField = "[" + MasterStateRow.Fields.Id.PropertyName + "]";
        TextField = "[" + MasterStateRow.Fields.StateCode.PropertyName + "]";

        //IdField = "[" + MasterStateRow.Fields.StateCode.PropertyName + "]";
        //TextField = "[" + MasterStateRow.Fields.Name.PropertyName + "]";
        Permission = "*";
    }

    protected override void PrepareQuery(SqlQuery query)
    {
       // base.PrepareQuery(query);
        var fld = MasterStateRow.Fields;
        // Select Id and Name from the MasterStates table
        query.Select(fld.Id, fld.Name,fld.IsActive);

        query.Where(new Criteria(fld.StateCode).IsNotNull()); // Ensures IsActive is not NULL
        System.Diagnostics.Debug.WriteLine(query.ToString());
        System.Diagnostics.Debug.WriteLine(query.ToString());
        System.Diagnostics.Debug.WriteLine(query.ToString());
        System.Diagnostics.Debug.WriteLine(query.ToString());
        System.Diagnostics.Debug.WriteLine(query.ToString());
        System.Diagnostics.Debug.WriteLine(query.ToString());
        System.Diagnostics.Debug.WriteLine(query.ToString());

    }
}
