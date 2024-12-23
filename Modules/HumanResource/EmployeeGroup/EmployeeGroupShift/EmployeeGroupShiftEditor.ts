import { Decorators } from '@serenity-is/corelib';
import { GridEditorBase } from "@serenity-is/extensions";
import { EmployeeGroupShiftEditDialog } from './EmployeeGroupShiftEditDialog';
import { EmployeeGroupShiftColumns,EmployeeGroupShiftRow } from '../../../ServerTypes/EmployeeGroup';
import { getLookupAsync } from '@serenity-is/corelib/q';
import {  alertDialog } from '@serenity-is/corelib/q';

@Decorators.registerEditor('HRMSoftware.EmployeeGroup.EmployeeGroupShiftEditor')
export class EmployeeGroupShiftEditor extends GridEditorBase<EmployeeGroupShiftRow> {
    protected getColumnsKey() { return EmployeeGroupShiftColumns.columnsKey; }
    protected getDialogType() { return EmployeeGroupShiftEditDialog; }
    protected getLocalTextPrefix() { return EmployeeGroupShiftRow.localTextPrefix; }



    protected getAddButtonCaption() {
        return "Add Shift";
    }



    validateEntity(row, id) {
        function parseDate(dateStr: string): Date {
            return new Date(dateStr);
        }
        function areShiftsOverlapping(
            start1: Date, end1: Date,
            start2: Date, end2: Date
        ): boolean {
            // Check if one shift starts before the other shift ends and ends after the other shift starts
            return start1 < end2 && end1 >= start2;
        }
        function areAnyShiftsOverlapping(shifts): boolean {
            var result = false
            for (let i = 0; i < shifts.length; i++) {

                var start1 = parseDate(shifts[i].ShiftStartDate);
                var end1 = parseDate(shifts[i].ShiftEndDate);
                for (let j = 0; j < shifts.length; j++) {
                    if (i == j)
                        continue
                    var start2 = parseDate(shifts[j].ShiftStartDate);
                    var end2 = parseDate(shifts[j].ShiftEndDate);
                    if (areShiftsOverlapping(start1, end1, start2, end2)) {
                        var concatenatedString = 'There is a clash between '
                            + shifts[i].Shift + ' and ' + shifts[j].Shift;
                        alertDialog(concatenatedString)
                        result = true
                        break;
                    }
                }
                if (result == true)
                    break
            }
            return result; // No overlaps
        }
      
       if (!super.validateEntity(row, id))
           return false;


        var itemId = id ?? row[this.getIdProperty()];
        console.log(this.value)
          getLookupAsync("ShiftRow.ShiftRow").then(x => {
              var item = this.view?.getItemById(itemId);

              let str = row.ShiftId.toString()
              let intVal = parseInt(str)
              row.ShiftId = intVal
              console.log(row)
              console.log(item)
              console.log(itemId)
              if (item) {
                  item.Shift = x.itemById[row.ShiftId].ShiftName;

                  if (areAnyShiftsOverlapping(this.value) == true) {
                      this.value= this.value.slice(0, -1);
                      console.log(this.value)
                      this.view.refresh()

                  }


                this.value = this.value.sort((a, b) => new Date(a.ShiftStartDate).getTime() - new Date(b.ShiftStartDate).getTime());
                
                //this.view.updateItem(itemId, item);
            }
        });

        return true;
    }
}