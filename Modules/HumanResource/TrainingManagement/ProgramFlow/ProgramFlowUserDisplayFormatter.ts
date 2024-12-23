import {Decorators, Formatter} from "@serenity-is/corelib";
import {Authorization} from '@serenity-is/corelib/q';
import {
    ProgramFlowResponseRow,
    ProgramFlowResponseService,
    ProgramFlowType,
    ProgramGradeType
} from '../../../ServerTypes/TrainingManagement';
import {PermissionKeys} from '../../../ServerTypes/Administration';
import {FormatterContext} from "@serenity-is/sleekgrid";

let promise: JQueryPromise<ProgramFlowResponseRow>;

@Decorators.registerFormatter('HRMSoftware.TrainingManagement.ProgramFlowUserDisplayFormatter')
export class ProgramFlowUserDisplayFormatter implements Formatter {

    format(ctx: FormatterContext) {
        let value = 'No Record found';

        if (!Authorization.hasPermission(PermissionKeys.HumanResources)) {
            ProgramFlowResponseService.List({
                "Criteria": [
                    [["FlowId"], "=", ctx.item.Id],
                    'and',
                    [["EmployeeId"], "=", Authorization.userDefinition.EmployeeRowID],
                ]
            }, response => {
                for (var key in response.Entities) {
                    console.log(ctx.item.FlowType);
                    console.log(response.Entities[key]);
                    if (ctx.item.FlowType == ProgramFlowType.Attendance) {
                        value = response.Entities[key].Attendance ? 'True' : 'False';
                    } else if (ctx.item.FlowType == ProgramFlowType.Assessment) {
                        console.log("B");
                        console.log(ctx.item.GradeType);
                        if (ctx.item.GradeType == ProgramGradeType.Grade) {
                            console.log('B');
                            switch (response.Entities[key].GradeValue) {
                                case 1:
                                    value = 'A';
                                    break;
                                case 2:
                                    value = 'B';
                                    break;
                                case 3:
                                    value = 'C';
                                    break;
                                case 4:
                                    value = 'D';
                                    break;
                                case -1:
                                    value = 'N/A';
                                    break;
                                default:
                                    value = '-';
                                    break;
                            }
                        } else if (ctx.item.GradeType == ProgramGradeType.Score) {
                            console.log('C');
                            if (response.Entities[key].GradeValue) {
                                value = response.Entities[key].GradeValue.toString();
                            }
                        } else if (ctx.item.GradeType == ProgramGradeType.PassFail) {
                            console.log('D');
                            switch (response.Entities[key].GradeValue) {
                                case 1:
                                    value = 'Pass';
                                    break;
                                case 2:
                                    value = 'Fail';
                                    break;
                                case 3:
                                    value = 'N/A';
                                    break;
                                default:
                                    value = '-';
                                    break;
                            }
                        }
                    }
                    // let target = $(`#result_${ctx.item.Id}`);
                    // target.children().remove();
                    // target.text(value);
                }
                let target = $(`#result_${ctx.item.Id}`);
                target.children().remove();
                target.text(value);
                // $(`#result_${ctx.item.Id}`).children().remove();
                // return value;
                // console.log($("span#result_"+ctx.item.Id));
                // $(`#result_${ctx.item.Id}`).children().remove().text("A");
            });
        }

        return `<span id="result_${ctx.item.Id}"><i class="fa fa-spinner "></i></span>`;
    }
}