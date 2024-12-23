import { Decorators, Formatter, Lookup } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('HRMSoftware.ApplicationStatusFormatter')
export class ApplicationStatusFormatter implements Formatter {

    format(ctx: FormatterContext) {

        let state = ctx.value as number;
        if (state == -1)
            return `<i class="fa fa-times" style="color:red"></i>`;

        else if (state == 1)
            return `<i class="fa fa-check" style="color:green"></i>`

        else
            return `<i class= "fa fa-minus" style="color:blue"></i>`;

    }
}