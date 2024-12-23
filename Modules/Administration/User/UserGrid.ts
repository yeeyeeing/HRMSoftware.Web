import { RoleRow, UserColumns, UserRow, UserService } from "@/ServerTypes/Administration";
import { Decorators, EntityGrid } from "@serenity-is/corelib";
import { Lookup, resolveUrl, tryFirst } from "@serenity-is/corelib/q";
import { UserDialog } from "./UserDialog";

@Decorators.registerClass()
export class UserGrid extends EntityGrid<UserRow, any> {
    protected getColumnsKey() { return UserColumns.columnsKey; }
    protected getDialogType() { return UserDialog; }
    protected getIdProperty() { return UserRow.idProperty; }
    protected getIsActiveProperty() { return UserRow.isActiveProperty; }
    protected getLocalTextPrefix() { return UserRow.localTextPrefix; }
    protected getService() { return UserService.baseUrl; }

    constructor(container: JQuery) {
        super(container);
    }

    protected getDefaultSortBy() {
        return [UserRow.Fields.Username];
    }

    protected getColumns() {
        var columns = super.getColumns();

        var impersonate = tryFirst(columns, x => x.field == "ImpersonationToken");
        if (impersonate != null) {
            impersonate.format = ctx => {
                if (!ctx.value)
                    return "";

                return `<a target="_blank" href="${resolveUrl('~/Account/ImpersonateAs?token=')}${ctx.value}">`
                    + `<i class="fa fa-user-secret text-blue"></i></a>`;
            };
        }

        var roles = tryFirst(columns, x => x.field == UserRow.Fields.Roles);
        if (roles) {
            var rolesLookup: Lookup<RoleRow>;
            RoleRow.getLookupAsync().then(lookup => {
                rolesLookup = lookup;
                this.slickGrid.invalidate();
            });

            roles.format = ctx => {
                if (!rolesLookup)
                    return `<i class="fa fa-spinner"></i>`;

                var roleList = (ctx.value || []).map(x => (rolesLookup.itemById[x] || {}).RoleName || "");
                roleList.sort();
                return roleList.join(", ");
            };
        }

        return columns;
    }
}
