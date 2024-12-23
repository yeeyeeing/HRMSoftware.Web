import { Decorators, Formatter, Lookup } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('HRMSoftware.AnnouncementGeneratedFormatter')
export class AnnouncementGeneratedFormatter implements Formatter {

    format(ctx: FormatterContext) {

        let state = ctx.value as number;
        if (state == 0)//not yet opened
            return `<i class="fa fa-solid fa-envelope"></i>`;

        else if (state == 1)
            return `<i class="fas fa-envelope-open"></i>`


    }
}