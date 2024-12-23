using Serenity.ComponentModel;
using System.ComponentModel;

namespace HRMSoftware.Administration.Forms
{
    [ColumnsScript("Administration.Role")]
    [BasedOnRow(typeof(RoleRow), CheckNames = true)]
    public class RoleColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
        public int RoleId { get; set; }
        [EditLink, Width(300)]
        public string RoleName { get; set; }
        [EditLink, Width(200)]
        public string RoleKey { get; set; }
    }
}