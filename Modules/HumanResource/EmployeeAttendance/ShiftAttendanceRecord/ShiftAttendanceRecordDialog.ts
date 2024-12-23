import { Decorators, EntityDialog } from '@serenity-is/corelib';
import { ShiftAttendanceRecordForm, ShiftAttendanceRecordRow, ShiftAttendanceRecordService } from '../../../ServerTypes/EmployeeAttendance';

@Decorators.registerClass('HRMSoftware.EmployeeAttendance.ShiftAttendanceRecordDialog')
export class ShiftAttendanceRecordDialog extends EntityDialog<ShiftAttendanceRecordRow, any> {
    protected getFormKey() { return ShiftAttendanceRecordForm.formKey; }
    protected getRowDefinition() { return ShiftAttendanceRecordRow; }
    protected getService() { return ShiftAttendanceRecordService.baseUrl; }

    protected form = new ShiftAttendanceRecordForm(this.idPrefix);

    constructor() {
        super();
        this.editButton.remove();
        this.applyChangesButton.remove();

        // Create link element for CSS
        var linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = "https://cdn.jsdelivr.net/npm/clocklet@0.3.0/css/clocklet.min.css";
        var scriptElement = document.createElement('script');
        scriptElement.src = "https://cdn.jsdelivr.net/npm/clocklet@0.3.0";
        // Append link and script elements to the head of the document
        document.head.appendChild(linkElement);
        document.head.appendChild(scriptElement);
        var tabId = $(".fieldset").children().attr('id');
        const searchString = "PropertyGrid";
        const TimeInString = "TimeInHour";
        const TimeOutString = "TimeOutHour";
        const ShiftStartTimeString = "ShiftStartTimeHour";
        const ShiftEndTimeString = "ShiftEndTimeHour";
        const lastIndex = tabId.lastIndexOf(searchString);
        if (lastIndex !== -1) {
            var starting_time_element_id = tabId.substring(0, lastIndex) + TimeInString;
            var ending_time_element_id = tabId.substring(0, lastIndex) + TimeOutString;
            var ShiftStartTime_element_id = tabId.substring(0, lastIndex) + ShiftStartTimeString;
            var ShiftEndTime_element_id = tabId.substring(0, lastIndex) + ShiftEndTimeString;
        }
        var StartClocklet = document.getElementById(starting_time_element_id)
        StartClocklet.setAttribute('data-clocklet', '');
        StartClocklet.setAttribute("id", "time-start-clocklet");
        StartClocklet.addEventListener("clocklet.opening", function (event) {
            const myClocklet = document.getElementById("time-start-clocklet") as HTMLElement;
            if (myClocklet) 
                myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
        });
        StartClocklet.addEventListener("clocklet.closed", function (event) {
        });
        
        var EndClocklet = document.getElementById(ending_time_element_id)
        EndClocklet.setAttribute('data-clocklet', '');
        EndClocklet.setAttribute("id", "time-end-clocklet");
        EndClocklet.addEventListener("clocklet.opening", function (event) {
            const myClocklet = document.getElementById("time-end-clocklet") as HTMLElement;
            if (myClocklet) 
                myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
        });
        EndClocklet.addEventListener("clocklet.closed", function (event) {
        });
        var ShiftStartClocklet = document.getElementById(ShiftStartTime_element_id)
        ShiftStartClocklet.setAttribute('data-clocklet', '');
        ShiftStartClocklet.setAttribute("id", "shift-start-clocklet");
        ShiftStartClocklet.addEventListener("clocklet.opening", function (event) {
            const myClocklet = document.getElementById("shift-start-clocklet") as HTMLElement;
            if (myClocklet) 
                myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
        });
        ShiftStartClocklet.addEventListener("clocklet.closed", function (event) {
        });
        var ShiftEndClocklet = document.getElementById(ShiftEndTime_element_id)
        ShiftEndClocklet.setAttribute('data-clocklet', '');
        ShiftEndClocklet.setAttribute("id", "shift-end-clocklet");
        ShiftEndClocklet.addEventListener("clocklet.opening", function (event) {
            const myClocklet = document.getElementById("shift-end-clocklet") as HTMLElement;
            if (myClocklet) 
                myClocklet.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
        });
        ShiftEndClocklet.addEventListener("clocklet.closed", function (event) {
        });
        
    }

    protected onDialogOpen() {
        super.onDialogOpen()
   
        if (!this.isNew())
        ShiftAttendanceRecordService.Retrieve({
            EntityId: this.entityId
        }, response => {
            var ShiftStartTime = new Date(response.Entity.ShiftStartTime)
            var hours = ShiftStartTime.getHours().toString().padStart(2, '0'); // Ensure two digits
            var minutes = ShiftStartTime.getMinutes().toString().padStart(2, '0'); // Ensure two digits
            var formattedTime = `${hours}:${minutes}`;
            var ShiftStartElement = document.getElementById('shift-start-clocklet') as HTMLInputElement;
            ShiftStartElement.value = formattedTime;


            var ShiftEndTime = new Date(response.Entity.ShiftEndTime)
            hours = ShiftEndTime.getHours().toString().padStart(2, '0'); // Ensure two digits
            minutes = ShiftEndTime.getMinutes().toString().padStart(2, '0'); // Ensure two digits
            formattedTime = `${hours}:${minutes}`;
            var ShiftEndElement = document.getElementById('shift-end-clocklet') as HTMLInputElement;
            ShiftEndElement.value = formattedTime;



            var TimeIn = new Date(response.Entity.TimeIn)
            hours = TimeIn.getHours().toString().padStart(2, '0'); // Ensure two digits
            minutes = TimeIn.getMinutes().toString().padStart(2, '0'); // Ensure two digits
            formattedTime = `${hours}:${minutes}`;
            var TimeInElement = document.getElementById('time-start-clocklet') as HTMLInputElement;
            TimeInElement.value = formattedTime;
        
            var TimeOut = new Date(response.Entity.TimeOut)
            hours = TimeOut.getHours().toString().padStart(2, '0'); // Ensure two digits
            minutes = TimeOut.getMinutes().toString().padStart(2, '0'); // Ensure two digits
            formattedTime = `${hours}:${minutes}`;
            var TimeOutElement = document.getElementById('time-end-clocklet') as HTMLInputElement;
            TimeOutElement.value = formattedTime;
        })

    }
}