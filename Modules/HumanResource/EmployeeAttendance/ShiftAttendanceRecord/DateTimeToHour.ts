import { Decorators, Formatter, Lookup } from "@serenity-is/corelib";
import { FormatterContext } from "@serenity-is/sleekgrid";
import { Authorization, isEmptyOrNull } from '@serenity-is/corelib/q';

@Decorators.registerFormatter('HRMSoftware.DateTimeToHour')
export class DateTimeToHour implements Formatter {

    format(ctx: FormatterContext) {

        if (!isEmptyOrNull(ctx.value))
            return ctx.value.substring(7, 19)

        return
    }
}