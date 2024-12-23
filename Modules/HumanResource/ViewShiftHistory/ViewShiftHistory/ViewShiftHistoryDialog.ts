import { BaseEditorFiltering, Decorators, EditorUtils, EntityDialog } from '@serenity-is/corelib';
import { ListResponse, serviceCall } from '@serenity-is/corelib/q';
import { ViewShiftHistoryForm, ViewShiftHistoryRow, ViewShiftHistoryService } from '../../../ServerTypes/ViewShiftHistory';
import * as Highcharts from "highcharts";
import Heatmap from "highcharts/modules/heatmap"
import { DateEditor, Select2Editor } from "@serenity-is/corelib";
import { SetEmployeeShiftDialog } from '../../SetEmployeeShift/SetEmployeeShift/SetEmployeeShiftDialog';
import { PublicHolidayDialog } from '../../PublicHoliday/PublicHoliday/PublicHolidayDialog';
import { getLookup } from '@serenity-is/corelib/q';
import { PublicHolidayService } from '../../../ServerTypes/PublicHoliday';
import { ShiftService } from '../../../ServerTypes/Shift';
import { LeaveApplicationService } from '../../../ServerTypes/LeaveApplication';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { EmployeeGroupService } from '../../../ServerTypes/EmployeeGroup';
import { EmployeeGroupDialog } from '../../EmployeeGroup/EmployeeGroup/EmployeeGroupDialog';
import { Authorization } from '@serenity-is/corelib/q';
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { LeaveApplicationDialog } from '../../LeaveApplication/LeaveApplication/LeaveApplicationDialog';

Heatmap(Highcharts)
@Decorators.registerClass('HRMSoftware.ViewShiftHistory.ViewShiftHistoryDialog')

export class ViewShiftHistoryDialog extends EntityDialog<ViewShiftHistoryRow, any> {
    protected getFormKey() { return ViewShiftHistoryForm.formKey; }
    protected getRowDefinition() { return ViewShiftHistoryRow; }
    protected getService() { return ViewShiftHistoryService.baseUrl; }

    protected form = new ViewShiftHistoryForm(this.idPrefix);
    public EmployeeID: string;
    public Country: string;

    public list_of_shift_text: string[] = [];
    public list_of_shift_id: number[] = [];
    public list_of_color: string[] = [];
    public list_of_public_holiday_date: string[] = [];
    public list_of_public_holiday_name: string[] = [];
    public list_of_public_holiday_id: number[] = [];
    public FromDayList: number[] = [];
    public UntilDayList: number[] = [];
    public EmployeeRowID: number;


    constructor(EmployeeID: string, EmployeeRowID: number) {


        super();
        this.EmployeeID = EmployeeID
        this.EmployeeRowID = EmployeeRowID
        /*
        console.log(this.list_of_shift_text)
        for (var index in this.list_of_shift_text)
        {
            this.list_of_shift_text[index] = this.list_of_shift_text[index].replace(/\s/g, "");
            this.list_of_shift_text[index] = this.list_of_shift_text[index].substring(0,13)
        }
        */
        this.saveAndCloseButton.hide();
        this.deleteButton.hide();
        this.localizationButton.hide();
        this.undeleteButton.hide();
        this.cloneButton.hide();
        this.applyChangesButton.hide();
       
        EmployeeProfileService.Retrieve({
            EntityId: EmployeeRowID
        }, response => {
            this.form.EmployeeId.value = response.Entity.EmployeeID;
            this.form.EmployeeName.value = response.Entity.EmployeeName;
        })
        EditorUtils.setReadonly(this.form.EmployeeId.element, true);
        EditorUtils.setReadonly(this.form.EmployeeName.element, true);

        var tabId = $(".fieldset").children().attr('id');

        var node3 = document.getElementById(tabId);
        var divNode = document.createElement('DIV');

        divNode.setAttribute("id", "time-box");
        divNode.setAttribute("class", "row");
        divNode.setAttribute("align", "right");

        var rowNode = document.createElement('DIV');
        var MonthNode = document.createElement("INPUT");
        MonthNode.setAttribute("id", "Month");
        MonthNode.setAttribute("type", "text");

        MonthNode.setAttribute("class", "monthSelect");
        rowNode.appendChild(MonthNode);
        divNode.appendChild(rowNode);
        node3.appendChild(divNode);

        var TimetableNode = document.createElement('DIV');
        TimetableNode.classList.add('category-title');
        TimetableNode.setAttribute("id", "Employee-Timetable");
        node3.appendChild(TimetableNode);
    }





    public dialogOpen(asPanel?: boolean): void {

        super.dialogOpen(asPanel);
        function addLeadingZero(num: number): string {
            return num < 10 ? '0' + num : num.toString();
        }
        function generateChartData(data, ListOfShiftData, ListOfPublicHolidayData, TakenLeave) {
            const firstWeekday = new Date(data[0].date).getDay(),

                monthLength = data.length,
                emptyTilesFirst = firstWeekday,
                chartData = [];
            for (let day = 1; day <= monthLength; day++) {
                // Get date from the given data array
                var date = new Date(data[day - 1].date);
                var dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`
                // Offset by thenumber of empty tiles
                const xCoordinate = (emptyTilesFirst + day - 1) % 7; // 0 is sunday
                const yCoordinate = Math.floor((firstWeekday + day - 1) / 7);
                const id = day;
                var shift = data[day - 1].shift;
                var Group = data[day - 1].GroupID;
                var CurrentColorCode = null
                var ShiftString = null
                var detail_string = null
                for (var index in ListOfPublicHolidayData) {
                    if (ListOfPublicHolidayData[index].PublicHolidayDate.substring(0, 10) == dateString) {
                        ShiftString = detail_string = ListOfPublicHolidayData[index].PublicHolidayName
                        CurrentColorCode = '#FF0000'
                        shift = null
                        Group = null
                        break
                    }
                }
                if (shift != null) {
                    var ShiftID
                    for (var index in ListOfShiftData) {
                        if (ListOfShiftData[index].ShiftIdList == shift) {
                            ShiftID = index
                            break
                        }
                    }
                    CurrentColorCode = ListOfShiftData[ShiftID].Color
                    ShiftString = ListOfShiftData[ShiftID].ShiftName
                    if (ListOfShiftData[ShiftID].WorkingHourUntilList[xCoordinate] === undefined && ListOfShiftData[ShiftID].WorkingHourFromList[xCoordinate] == undefined) {
                        ShiftString = 'Rest Day'
                        CurrentColorCode = '#FFFFE0'
                        detail_string = 'Happy Holidays'
                    }
                    else if (ListOfShiftData[ShiftID].WorkingHourFromList[xCoordinate] != null && ListOfShiftData[ShiftID].WorkingHourUntilList[xCoordinate] != null) {
                        detail_string = ListOfShiftData[ShiftID].WorkingHourFromList[xCoordinate] + '-' + ListOfShiftData[ShiftID].WorkingHourUntilList[xCoordinate]
                    }
                }
                var LeaveReasonTable = getLookup("LeaveReason.LeaveReason")
                for (var index in TakenLeave) {
                    var StartingRange = new Date(TakenLeave[index].StartDate)
                    var EndingRange = new Date(TakenLeave[index].EndDate)
                    var currentValue = TakenLeave[index].LeaveReason
                    var key
                    for (var LookupIndex in LeaveReasonTable.items) {
                        if (LeaveReasonTable.items[LookupIndex].Id == currentValue) {
                            key = LeaveReasonTable.items[LookupIndex].LeaveReason.replace(/\s/g, "")
                            break
                        }
                    }
                    if (date >= StartingRange && date <= EndingRange) {
                        ShiftString = detail_string = key
                        CurrentColorCode = '#00FF00'
                        shift = null
                    }
                }
                chartData.push({
                    x: xCoordinate,
                    y: 5 - yCoordinate,
                    color: CurrentColorCode,
                    shiftstring: ShiftString,
                    value: shift,
                    date: dateString,
                    custom: {
                        monthDay: id,
                        details: detail_string
                    }
                });
            }
            return chartData;
        }
        function GetCurrentMonthHoliday(PublicHolidayData: any[], curr_year: number, curr_month: number): [string[], string[], number[]] {
            var CurrentMonthPublicHolidayName: string[] = [];
            var CurrentMonthPublicHolidayDate: string[] = [];
            var CurrentMonthPublicHolidayID: number[] = [];

            for (var index in PublicHolidayData) {
                var date = new Date(PublicHolidayData[index].PublicHolidayDate.substring(0, 10));
                var year = date.getFullYear();
                var month = date.getMonth() + 1; // Months are 0-based, so add 1

                if (year == curr_year && month == curr_month) {
                    CurrentMonthPublicHolidayName.push(PublicHolidayData[index].PublicHolidayName);
                    CurrentMonthPublicHolidayDate.push(PublicHolidayData[index].PublicHolidayDate.substring(0, 10));
                    CurrentMonthPublicHolidayID.push(PublicHolidayData[index].PublicHolidayId)
                }
            }



            return [CurrentMonthPublicHolidayName, CurrentMonthPublicHolidayDate, CurrentMonthPublicHolidayID];
        }
        function generateListOfDate(res, Year, Month) {
            var numberOfDays = new Date(Year, Month, 0).getDate();
            const ListOfData: Data[] = [];
            for (let day = 1; day <= numberOfDays; day++) {
                var dateString = `${Year}-${addLeadingZero(Month)}-${addLeadingZero(day)}`;
                var GroupID = null
                var date = new Date(Year, Month - 1, day)
                for (var index in res) {
                    var Start = new Date(res[index].ShiftStartDate)
                    var End = new Date(res[index].ShiftEndDate)
                    if (date >= Start && date <= End) {
                        GroupID = res[index].EmployeeGroupID
                        break
                    }
                }
                ListOfData.push({
                    date: dateString,
                    shift: null,
                    GroupID: GroupID
                });

            }

            return ListOfData
        }
        function appendShift(ListOfData, entities) {
            for (var x in entities) {
                const startDate: Date = new Date(entities[x]["ShiftStartDate"].substring(0, 10));
                const endDate: Date = new Date(entities[x]["ShiftEndDate"].substring(0, 10));
                for (var data of ListOfData) {
                    var currentDate: Date = new Date(data.date);

                    if (currentDate >= startDate && currentDate <= endDate) {
                        //if (data.GroupID == null)
                        data.shift = entities[x]["ShiftId"]
                    }
                }
            }
            return ListOfData
        }
        function generateMonthRange(year: number, month: number): string[] {
            const months: string[] = [];
            const startDate = new Date(year, month - 1, 1); // Month is zero-based
            // Generate 6 months backward
            for (let i = 6; i > 0; i--) {
                const prevMonth = new Date(startDate);
                prevMonth.setMonth(prevMonth.getMonth() - i);
                months.push(`${prevMonth.getFullYear()}-${(prevMonth.getMonth() + 1).toString().padStart(2, '0')}`);
            }
            months.push(`${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}`);
            for (let i = 1; i <= 6; i++) {
                const nextMonth = new Date(startDate);
                nextMonth.setMonth(nextMonth.getMonth() + i);
                months.push(`${nextMonth.getFullYear()}-${(nextMonth.getMonth() + 1).toString().padStart(2, '0')}`);
            }
            return months;
        }
        function sortDatesAscending(dateStrings: string[]): string[] {
            const dates = dateStrings.map(dateString => new Date(dateString));
            dates.sort((a, b) => a.getTime() - b.getTime());
            return dates.map(date => date.toISOString().substring(0, 10));
        }
        function findClosestGreaterDate(givenDateStr: string, dateListStr: string[]): string | null {
            const givenDate = new Date(givenDateStr);
            const dateList = dateListStr.map(dateStr => new Date(dateStr));
            let closestDate: Date | null = null;
            let minDifference = Infinity;
            for (const date of dateList) {
                if (date > givenDate) {
                    const difference = date.getTime() - givenDate.getTime();
                    if (difference < minDifference) {
                        minDifference = difference;
                        closestDate = date;
                    }
                }
            }
            if (closestDate) {
                // Subtract one day from the closest date
                closestDate.setDate(closestDate.getDate() - 1);
                return closestDate.toISOString().split('T')[0];
            } else {
                return null;
            }
        }
        function plot(Data, CurrentMonthPublicHolidayDate, CurrentMonthPublicHolidayID) {
            const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var DateStringList: string[] = [];
            Highcharts.chart('Employee-Timetable', {
                chart:
                {
                    type: 'heatmap'
                },
                title:
                {
                    text: '',
                    align: 'left'
                },
                accessibility: {
                    landmarkVerbosity: 'one'
                },
                tooltip: {
                    enabled: true,
                    zIndex: Number.MAX_SAFE_INTEGER,
                    headerFormat: '',
                    pointFormat: '{point.date:%A, %b %e, %Y} </br>' + '{point.custom.details:%s }',
                    nullFormat: '{point.date:%A, %b %e, %Y} </br>' + '{point.custom.details:%s }'
                },
                xAxis: {
                    categories: weekdays,
                    opposite: true,
                    lineWidth: 26,
                    offset: 13,
                    lineColor: 'rgba(27, 26, 37, 0.2)',
                    labels: {
                        rotation: 0,
                        y: 20,
                        style: {
                            textTransform: 'uppercase',
                            fontWeight: 'bold'
                        }
                    },
                    accessibility: {
                        description: 'weekdays',
                        rangeDescription: 'X Axis is showing all 7 days of the week, starting with Sunday.'
                    }
                },
                yAxis: {
                    min: 0,
                    max: 5,
                    accessibility: {
                        description: 'weeks'
                    },
                    visible: false
                },
                legend: {
                    enable: false,
                    layout: 'vertical',
                    verticalAlign: 'middle'
                },
                series: [{
                    showInLegend: false, // Hide series 1 icon in the legend
                    keys: ['x', 'y', 'value', 'date', 'color', 'id'],
                    data: Data,
                    nullColor: 'rgba(196, 196, 196, 0.2)',
                    borderWidth: 2,
                    borderColor: 'rgba(196, 196, 196, 0.2)',
                    dataLabels: [{
                        enabled: true,
                        format: '{#unless point.custom.empty}{point.shiftstring}{/unless}',
                        style: {
                            textOutline: 'none',
                            fontWeight: 'normal',
                            fontSize: '0.73rem'
                        },
                        y: 4
                    }, {
                        enabled: true,
                        align: 'left',
                        verticalAlign: 'top',
                        format: '{#unless point.custom.details}{point.custom.details}{/unless}',
                        backgroundColor: 'whitesmoke',
                        padding: 2,
                        style: {
                            textOutline: 'none',
                            color: 'rgba(70, 70, 92, 1)',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            opacity: 0.5
                        },
                        x: 1,
                        y: 1
                    }]
                }],

                plotOptions: {
                    series: {
                        point: {
                            events: {
                                click: function () {
                                    var FormID = -1
                                    var no_records = false
                                    var isPublicHoliday = 0
                                    var isLeave = 0

                                    for (var buffer in Data) {
                                        if (Data[buffer].x == this.x && Data[buffer].y == this.y) {
                                            var date = new Date(Data[buffer].date)
                                            var thisday = date.getDate();
                                            var thismonth = date.getMonth() + 1; // Month is zero-based
                                            var thisyear = date.getFullYear();
                                            var IsGroup = false
                                            // Format the date as "YYYY-MM-DD"
                                            const formattedDate = `${thisyear}-${thismonth.toString().padStart(2, '0')}-${thisday.toString().padStart(2, '0')}`;
                                            var DatetimeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
                                            /*
                                            check leave
                                            */
                                            for (var index in ListOfLeaveTakenData) {

                                                var StartDate = new Date(ListOfLeaveTakenData[index].StartDate)
                                                var EndDate = new Date(ListOfLeaveTakenData[index].EndDate)

                                                if (date >= StartDate && date <= EndDate) {
                                                    var dlg = new LeaveApplicationDialog();//open the shift 
                                                    dlg.loadByIdAndOpenDialog(ListOfLeaveTakenData[index].ID)
                                                    dlg.set_readOnly(true)
                                                    isLeave = 1
                                                    break
                                                }
                                            }
                                            if (isLeave == 1)
                                                break

                                            /*
                                            check public holiday
                                             */
                                            for (var i in CurrentMonthPublicHolidayDate) {

                                                if (CurrentMonthPublicHolidayDate[i] == formattedDate) {
                                                    var HolidayFormID = CurrentMonthPublicHolidayID[i]
                                                    isPublicHoliday = 1
                                                    var PublicHolidayDlg = new PublicHolidayDialog();
                                                    PublicHolidayDlg.loadByIdAndOpenDialog(HolidayFormID)
                                                    PublicHolidayDlg.set_readOnly(true)
                                                    break
                                                }
                                            }
                                            if (isPublicHoliday)
                                                break


                                            /*
                                            check employee shift
                                            */
                                            var IsShift = false
                                            for (var each_res in CopiedResEntity) {
                                                //if (CopiedResEntity[each_res]["EmployeeGroupID"] !== undefined)
                                                //    continue
                                                var startDate = new Date(CopiedResEntity[each_res]["ShiftStartDate"])
                                                var endDate = new Date(CopiedResEntity[each_res]["ShiftEndDate"])

                                                if (DatetimeDate >= startDate && DatetimeDate <= endDate) {
                                                    FormID = CopiedResEntity[each_res]["Id"]
                                                    IsShift = true

                                                    var SetEmployeeShiftDlg = new SetEmployeeShiftDialog(EmployeeRowID, CopiedResEntity[each_res]["ShiftStartDate"], 1, CopiedResEntity[each_res]["ShiftEndDate"]);
                                                    SetEmployeeShiftDlg.loadByIdAndOpenDialog(FormID);
                                                    SetEmployeeShiftDlg.element.on("dialogclose", function () {
                                                        serviceCall<ListResponse<any>>({
                                                            service: ViewShiftHistoryService.baseUrl + '/RetriveShiftHistory',
                                                            method: "GET",
                                                            data: {
                                                                'EmployeeID': EmployeeRowID
                                                            },
                                                            async: false,
                                                            onSuccess: (res) => {
                                                                CopiedResEntity = res.Entities;
                                                                for (var x in CopiedResEntity) {
                                                                    if (parseInt(CopiedResEntity[x]["Id"]) == 0) {
                                                                        no_records = true
                                                                        break
                                                                    }
                                                                }
                                                                ListOfData = generateListOfDate(CopiedResEntity, thisyear, thismonth);

                                                                if (no_records == false)
                                                                    ListOfData = appendShift(ListOfData, CopiedResEntity);

                                                                var [CurrentMonthPublicHolidayName, CurrentMonthPublicHolidayDate, CurrentMonthPublicHolidayID] = GetCurrentMonthHoliday(ListOfPublicHolidayData, currentYear, currentMonth)
                                                                var ListOfCurrentMonthPublicHoliday: PublicHolidayData[] = [];
                                                                for (var index in CurrentMonthPublicHolidayDate) {
                                                                    ListOfCurrentMonthPublicHoliday.push({
                                                                        PublicHolidayDate: CurrentMonthPublicHolidayDate[index],
                                                                        PublicHolidayId: CurrentMonthPublicHolidayID[index],
                                                                        PublicHolidayName: CurrentMonthPublicHolidayName[index],
                                                                    })
                                                                }
                                                                var chartData = generateChartData(ListOfData, ListOfShiftData, ListOfCurrentMonthPublicHoliday, ListOfLeaveTakenData);
                                                                plot(chartData, CurrentMonthPublicHolidayDate, CurrentMonthPublicHolidayID);

                                                            }
                                                        })
                                                    })
                                                    break
                                                }



                                                if (no_records == false) {
                                                    var startDate = new Date(CopiedResEntity[each_res].ShiftStartDate.substring(0, 10));
                                                    var endDate = new Date(CopiedResEntity[each_res].ShiftEndDate.substring(0, 10));
                                                    var startDateString = CopiedResEntity[each_res].ShiftStartDate.substring(0, 10)
                                                    DateStringList.push(startDateString)
                                                }



                                            }

                                            if (IsShift == true)
                                                break




                                            if ((FormID == -1 && isPublicHoliday == 0) || no_records == true)//if no shift on the pressed day and that day is the public holiday
                                            {

                                                DateStringList = sortDatesAscending(DateStringList);
                                                var closestDate = findClosestGreaterDate(formattedDate, DateStringList)
                                                var dlg3 = new SetEmployeeShiftDialog(EmployeeRowID, formattedDate, 0, closestDate);
                                                dlg3.dialogOpen();
                                                console.log('hereee')
                                                dlg3.element.on("dialogclose", function () {
                                                    serviceCall<ListResponse<any>>({
                                                        service: ViewShiftHistoryService.baseUrl + '/RetriveShiftHistory',
                                                        method: "GET",
                                                        data: {
                                                            'EmployeeID': EmployeeRowID
                                                        },
                                                        async: false,
                                                        onSuccess: (res) => {
                                                            CopiedResEntity = res.Entities
                                                            no_records = false
                                                            for (var x in CopiedResEntity) {
                                                                if (parseInt(CopiedResEntity[x]["Id"]) == 0) {
                                                                    no_records = true
                                                                    break
                                                                }
                                                            }
                                                            ListOfData = generateListOfDate(CopiedResEntity, thisyear, thismonth);

                                                            if (no_records == false) {
                                                                ListOfData = appendShift(ListOfData, CopiedResEntity);
                                                            }

                                                            var [CurrentMonthPublicHolidayName, CurrentMonthPublicHolidayDate, CurrentMonthPublicHolidayID] = GetCurrentMonthHoliday(ListOfPublicHolidayData, currentYear, currentMonth)
                                                            var ListOfCurrentMonthPublicHoliday: PublicHolidayData[] = [];
                                                            for (var index in CurrentMonthPublicHolidayDate) {
                                                                ListOfCurrentMonthPublicHoliday.push({
                                                                    PublicHolidayDate: CurrentMonthPublicHolidayDate[index],
                                                                    PublicHolidayId: CurrentMonthPublicHolidayID[index],
                                                                    PublicHolidayName: CurrentMonthPublicHolidayName[index],
                                                                })
                                                            }
                                                            var chartData = generateChartData(ListOfData, ListOfShiftData, ListOfCurrentMonthPublicHoliday, ListOfLeaveTakenData);
                                                            console.log(chartData)
                                                            plot(chartData, CurrentMonthPublicHolidayDate, CurrentMonthPublicHolidayID);
                                                        }
                                                    });
                                                })
                                            }


                                            break
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }


        var EmployeeRowID = this.EmployeeRowID
        //Heatmap(Highcharts)

        var CopiedResEntity;


        interface ShiftData {
            ShiftName: string;
            WorkingHourFromList: string[];
            WorkingHourUntilList: string[];
            WorkingTimeList: string[];
            Color: string;
            ShiftIdList: number;
        }

        var ListOfShiftData: ShiftData[] = [];
        var done_retrieve_shift = false

        serviceCall<ListResponse<any>>({
            service: ShiftService.baseUrl + '/ListShift',
            method: "GET",
            data: {
            },
            async: false,
            onSuccess: (response) => {
                done_retrieve_shift = true
                let ListOfDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                for (var index in response.Entities) {

                    var ListOfWorkingFrom: string[] = []
                    var ListOfWorkingUntil: string[] = []
                    var ListOfWorkingTime: string[] = []

                    for (var days in ListOfDays) {
                        ListOfWorkingFrom.push(response.Entities[index][ListOfDays[days] + 'StartingFrom'])
                        ListOfWorkingUntil.push(response.Entities[index][ListOfDays[days] + 'EndingAt'])
                        ListOfWorkingTime.push(response.Entities[index][ListOfDays[days] + 'WorkingTime'])
                    }

                    ListOfShiftData.push(
                        {
                            ShiftName: response.Entities[index].ShiftName,
                            WorkingHourFromList: ListOfWorkingFrom,
                            WorkingHourUntilList: ListOfWorkingUntil,
                            WorkingTimeList: ListOfWorkingTime,
                            Color: response.Entities[index].ShiftColor,
                            ShiftIdList: response.Entities[index].Id
                        }
                    )

                }
            },
            onError: (error) => {

            }
        });



        while (done_retrieve_shift == false) {
        };





        interface PublicHolidayData {
            PublicHolidayDate: string;
            PublicHolidayName: string;
            PublicHolidayId: number;
        }

        var ListOfPublicHolidayData: PublicHolidayData[] = [];



        var done_retrieve_public_holiday = false
        serviceCall<ListResponse<any>>({
            service: PublicHolidayService.baseUrl + '/ListPublicHoliday',
            method: "GET",
            data: {
            },
            async: false,
            onSuccess: (response) => {
                done_retrieve_public_holiday = true
                for (var index in response.Entities) {
                    ListOfPublicHolidayData.push({
                        PublicHolidayDate: response.Entities[index].Date,
                        PublicHolidayName: response.Entities[index].Name,
                        PublicHolidayId: response.Entities[index].Id
                    })
                }
                console.log(ListOfPublicHolidayData)
            },
            onError: (error) => {
            }
        });
        while (done_retrieve_public_holiday == false) { };



        /*
        interface GroupData {
            GroupName: string;
            GroupColor: string;
            GroupID: number;
        }
        var ListOfGroupData: GroupData[] = [];
        var done_retrieve_group_data = false
        serviceCall<ListResponse<any>>({
            service: EmployeeGroupService.baseUrl + '/ListGroup',
            method: "GET",
            data: {
            },
            async: false,
            onSuccess: (response) => {
                done_retrieve_group_data = true
                for (var index in response.Entities) {
                    
                        ListOfGroupData.push({
                            GroupName: response.Entities[index].Name,
                            GroupColor: response.Entities[index].ShiftColor,
                            GroupID: response.Entities[index].Id
                        })

                    
                }
            },
            onError: (error) => {
            }
        });


        while (done_retrieve_group_data == false) {

        };
        */

        interface LeaveTakenData {
            ID: number;
            StartDate: string;
            EndDate: string;
            HalfDate: number;
            LeaveReason: number;
        }
        var ListOfLeaveTakenData: LeaveTakenData[] = [];
        var done_retrieve_holiday = false

        serviceCall<ListResponse<any>>({
            service: LeaveApplicationService.baseUrl + '/ListTakenLeave',
            method: "GET",
            data: {
                'EmployeeRowID': EmployeeRowID
            },
            async: false,
            onSuccess: (response) => {
                done_retrieve_holiday = true
                for (var index in response.Entities) {
                    var half = 0
                    if (response.Entities[index].LeaveReasonId == 4 && response.Entities[index].HalfDay == 1)// if is annual leave and taken only half day
                        half = 1
                    ListOfLeaveTakenData.push({
                        ID: response.Entities[index].Id,
                        StartDate: response.Entities[index].StartDate.substring(0, 10),
                        EndDate: response.Entities[index].EndDate.substring(0, 10),
                        HalfDate: half,
                        LeaveReason: response.Entities[index].LeaveReasonId,
                    })
                }
            },
            onError: (error) => {
            }
        });


        while (done_retrieve_holiday == false) {

        };
        var ListOfData: Data[];
        var year;
        var month;
        interface Data {
            date: string;
            shift: number;
            GroupID: number;
        }
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth() + 1; // January is 0, so we add 1 to get the correct month
        var currentYear = currentDate.getFullYear();
        var dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`
        // Helper function to add leading zeros
        var done = false
        var no_records = false
        serviceCall<ListResponse<any>>({
            service: ViewShiftHistoryService.baseUrl + '/RetriveShiftHistory',
            method: "GET",
            data: {
                'EmployeeID': EmployeeRowID
            },
            async: false,
            onSuccess: (res) => {

                CopiedResEntity = res.Entities
                ListOfData = generateListOfDate(CopiedResEntity, currentYear, currentMonth);
                for (var x in res.Entities) {
                    if (parseInt(res.Entities[x]["Id"]) == 0) {
                        no_records = true
                        break
                    }
                }
                done = true
            },
            onError: (error) => {
            }
        });

        while (done == false) {
        }//wait until the stored procedure extracted all dataas

        var SetOfMonthYear = generateMonthRange(currentYear, currentMonth);
        let MonthEditor = new Select2Editor($("#Month"))

        for (var i = 0; i < SetOfMonthYear.length; i++) {
            MonthEditor.addItem({ id: (i).toString(), text: (SetOfMonthYear[i]).toString(), });
            if (SetOfMonthYear[i].toString() == dateString)
                MonthEditor.set_value((i).toString())
        }
        $("#Month").on('change', async function () {
            var index = $(this).val()
            var wanted = SetOfMonthYear[index]
            year = parseInt(wanted.split('-')[0]);
            month = parseInt(wanted.split('-')[1]);
            currentMonth = month
            currentYear = year

            var ListOfData: Data[] = generateListOfDate(CopiedResEntity, year, month);

            if (no_records == false)
                ListOfData = appendShift(ListOfData, CopiedResEntity);

            var [CurrentMonthPublicHolidayName, CurrentMonthPublicHolidayDate, CurrentMonthPublicHolidayID] = GetCurrentMonthHoliday(ListOfPublicHolidayData, currentYear, currentMonth)
            var ListOfCurrentMonthPublicHoliday: PublicHolidayData[] = [];

            for (var buffer in CurrentMonthPublicHolidayDate) {
                ListOfCurrentMonthPublicHoliday.push({
                    PublicHolidayDate: CurrentMonthPublicHolidayDate[buffer],
                    PublicHolidayId: CurrentMonthPublicHolidayID[buffer],
                    PublicHolidayName: CurrentMonthPublicHolidayName[buffer],
                })
            }

            var chartData = generateChartData(ListOfData, ListOfShiftData, ListOfCurrentMonthPublicHoliday, ListOfLeaveTakenData);
            plot(chartData, CurrentMonthPublicHolidayDate, CurrentMonthPublicHolidayID)


        });
        if (no_records == false)
            ListOfData = appendShift(ListOfData, CopiedResEntity)

        var [CurrentMonthPublicHolidayName, CurrentMonthPublicHolidayDate, CurrentMonthPublicHolidayID] = GetCurrentMonthHoliday(ListOfPublicHolidayData, currentYear, currentMonth)
        var ListOfCurrentMonthPublicHoliday: PublicHolidayData[] = [];
        for (var index in CurrentMonthPublicHolidayDate) {
            ListOfCurrentMonthPublicHoliday.push({
                PublicHolidayDate: CurrentMonthPublicHolidayDate[index],
                PublicHolidayId: CurrentMonthPublicHolidayID[index],
                PublicHolidayName: CurrentMonthPublicHolidayName[index],
            })
        }
        var chartData = generateChartData(ListOfData, ListOfShiftData, ListOfCurrentMonthPublicHoliday, ListOfLeaveTakenData);

        plot(chartData, CurrentMonthPublicHolidayDate, CurrentMonthPublicHolidayID)






    }





    protected getDialogOptions() {
        let opt = super.getDialogOptions()
        opt.height = 800
        opt.width = 1200
        return opt
    }






}