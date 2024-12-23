using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System.ComponentModel;

namespace HRMSoftware.Administration
{
    [ConnectionKey("Default"), Module("Administration"), TableName("UserRoles")]
    [DisplayName("UserRoles"), InstanceName("UserRoles")]
    [ReadPermission(PermissionKeys.Security)]
    [ModifyPermission(PermissionKeys.Security)]
    public sealed class UserRoleRow : Row<UserRoleRow.RowFields>, IIdRow
    {
        [DisplayName("User Role Id"), Identity, IdProperty]
        public long? UserRoleId
        {
            get => fields.UserRoleId[this];
            set => fields.UserRoleId[this] = value;
        }

        [DisplayName("User Id"), NotNull, ForeignKey("Users", "UserId"), LeftJoin("jUser")]
        public int? UserId
        {
            get => fields.UserId[this];
            set => fields.UserId[this] = value;
        }

        [DisplayName("Role Id"), NotNull]
        public int? RoleId
        {
            get => fields.RoleId[this];
            set => fields.RoleId[this] = value;
        }

        [DisplayName("User Username"), Expression("jUser.[Username]")]
        public string Username
        {
            get => fields.Username[this];
            set => fields.Username[this] = value;
        }

        [DisplayName("User Display Name"), Expression("jUser.[DisplayName]")]
        public string User
        {
            get => fields.User[this];
            set => fields.User[this] = value;
        }

        public UserRoleRow()
        {
        }

        public UserRoleRow(RowFields fields)
            : base(fields)
        {
        }

        public class RowFields : RowFieldsBase
        {
            public Int64Field UserRoleId;
            public Int32Field UserId;
            public Int32Field RoleId;

            public StringField Username;
            public StringField User;
        }
    }
}