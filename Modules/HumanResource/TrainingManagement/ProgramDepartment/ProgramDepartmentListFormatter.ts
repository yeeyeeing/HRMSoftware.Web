import { Decorators, Formatter, Lookup } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";
import { DepartmentRow } from "@/ServerTypes/OrganisationHierarchy/DepartmentRow";

let lookup: Lookup<DepartmentRow>;
let promise: Promise<Lookup<DepartmentRow>>;

@Decorators.registerFormatter('HRMSoftware.TrainingManagement.ProgramDepartmentListFormatter')
export class ProgramDepartmentListFormatter implements Formatter {

    format(ctx: FormatterContext) {
        if(ctx.item.AllDepartment){
            return "All Department";
        }
        
        let idList = ctx.value as number[];
        if (!idList || !idList.length)
            return "";

        let byId = lookup?.itemById;
        if (byId) {
            return idList.map(x => {
                var z = byId[x];
                return ctx.escape(z == null ? x : z.Name);
            }).join(", ");
        }

        promise ??= DepartmentRow.getLookupAsync().then(l => {
            lookup = l;
            try {
                ctx.grid?.invalidate();
            }
            finally {
                lookup = null;
                promise = null;
            }
        }).catch(() => promise = null);

        return `<i class="fa fa-spinner"></i>`;
    }
}