import { ListResponse, Select2Editor } from '@serenity-is/corelib';
import { getLookup } from '@serenity-is/corelib/q';
import { serviceCall, RetrieveResponse } from '@serenity-is/corelib/q';
import { Authorization } from '@serenity-is/corelib/q';
import { initFullHeightGridPage } from '@serenity-is/corelib/q';
import { PermissionKeys } from '../../../ServerTypes/Administration';
import { EmployeeProfileService } from '../../../ServerTypes/EmployeeProfile';
import { ViewShiftHistoryService } from '../../../ServerTypes/ViewShiftHistory';
import { EmployeeProfileGrid } from './EmployeeProfileGrid';
import * as Highcharts from "highcharts";
import Heatmap from "highcharts/modules/heatmap"
import { PublicHolidayService } from '../../../ServerTypes/PublicHoliday';
import { ShiftService } from '../../../ServerTypes/Shift';
import { CompanySettingsService } from '../../../ServerTypes/CompanySettings';
import { LeaveApplicationService } from '../../../ServerTypes/LeaveApplication';
import { InitYearService } from '../../../ServerTypes/InitYear';
import { EmployeeGroupService } from '../../../ServerTypes/EmployeeGroup';
import { EmployeeGroupDialog } from '../../EmployeeGroup/EmployeeGroup/EmployeeGroupDialog';
import { LeaveApplicationDialog } from '../../LeaveApplication/LeaveApplication/LeaveApplicationDialog';
import { SetEmployeeShiftDialog } from '../../SetEmployeeShift/SetEmployeeShift/SetEmployeeShiftDialog';
import { PublicHolidayDialog } from '../../PublicHoliday/PublicHoliday/PublicHolidayDialog';
// Function to find the object with Id = 1
function findRowById(array, idValue)
{  
    for (let i = 0; i < array.length; i++) {
        if (array[i].Id === idValue) {
            return array[i].Name;
        }
    }
    return null
};


export default function pageInit()
{
    var Country
    CompanySettingsService.List({
    }, response => {
        for (var index in response.Entities) {
            if (response.Entities[index].IsActive == 1) {
                Country = response.Entities[index].BasedCountry
                break
            }

        }
    });


  
    if (Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is HR guy 
    {

        CompanySettingsService.List({
        }, response => {

            if (response.Entities.length == 0)//if havent done company setings
            {
                const mainElement = document.createElement("main");;
                mainElement.id = "main-content";
                mainElement.className = "main-container";
                mainElement.innerHTML = "<h1>This page is used to create Employee Profiles and new users</h1><p>Please initialise company settings to start using this feature.</p>";
                $('#GridDiv').append(mainElement)
                return
            }
            else
                initFullHeightGridPage(new EmployeeProfileGrid($('#GridDiv')).element);
                /*
            InitYearService.List({
            }, response => {
                var Today = new Date()
                var nextYearFirstDate = new Date(Today.getFullYear() + 1, 0, 1);
                var NextYear = nextYearFirstDate.getFullYear()
                var ThisYear = Today.getFullYear()
                var PrevYear = ThisYear - 1
                var FoundThisYear = false
                var FoundPrevYear = false
                var difference = (nextYearFirstDate.getTime() - Today.getTime()) / (1000 * 3600 * 24); // in days

                var NearNextYear = difference < 60 ? true : false

                for (var index in response.Entities)
                {
                    if (response.Entities[index].Year == PrevYear)
                        FoundPrevYear = true 

                    else if (response.Entities[index].Year == ThisYear)
                        FoundThisYear = true 
                }

                if (FoundPrevYear == true && FoundThisYear == true && NearNextYear == false)
                    initFullHeightGridPage(new EmployeeProfileGrid($('#GridDiv')).element);

                else
                {
                    var mainElement = document.createElement("main");;
                    mainElement.id = "main-content";
                    mainElement.className = "main";

                    var HeaderClass = document.createElement("h1");;
                    HeaderClass.className = "mt-5"

                    if (FoundPrevYear == false || FoundThisYear == false)
                        HeaderClass.innerHTML = "<h1>This page is used to create Employee Profiles and new users</h1> <p>Please complete company policy for " + PrevYear + " and " + ThisYear+ " to start using this feature. </p>";

                    else if (NearNextYear == true)
                        HeaderClass.innerHTML = "<h1>This page is used to create Employee Profiles and new users</h1> <p>Please complete company policy for " + NextYear +". </p>";


                    var AClass = document.createElement("a");
                    AClass.className = "btn btn-lg btn-primary"
                    AClass.setAttribute("href", "../../InitYear/InitYear/");
                    AClass.setAttribute("role", "button");
                    // Set inner text
                    AClass.innerText = "Click to initiate the new year";



                    mainElement.append(HeaderClass)
                    mainElement.append(AClass)

                    $('#GridDiv').append(mainElement)
                    return
                }


            });
            */
        });
        return
    }


    Heatmap(Highcharts)

    var CopiedResEntity;
    var ShiftNameList: string[] = [];
    var Color: string[] = [];
    var ShiftIdList: number[] = [];
 
    var WorkingHourFromList: string[][] = [];
    var WorkingHourUntilList: string[][] = [];
    var WorkingTimeList: string[][] = [];

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
            let ListOfDays: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

            for (var index in response.Entities)
            {

                var ListOfWorkingFrom: string[] = []
                var ListOfWorkingUntil: string[] = []
                var ListOfWorkingTime: string[] = []

                for (var days in ListOfDays)
                {
                    ListOfWorkingFrom.push(response.Entities[index][ListOfDays[days]+'StartingFrom'])
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

                WorkingHourFromList.push(ListOfWorkingFrom);
                WorkingHourUntilList.push(ListOfWorkingUntil);
                WorkingTimeList.push(ListOfWorkingTime)
                ShiftNameList.push(response.Entities[index].ShiftName)
                Color.push(response.Entities[index].ShiftColor)
                ShiftIdList.push(response.Entities[index].Id)
            }
        },
        onError: (error) => {

            console.log(error)
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
                if (response.Entities[index].IsActive == 1) {
                    ListOfPublicHolidayData.push({
                        PublicHolidayDate: response.Entities[index].Date,
                        PublicHolidayName: response.Entities[index].Name,
                        PublicHolidayId: response.Entities[index].Id,

                    })
                }
            }
        },
        onError: (error) => {
            console.log(error)
        }
    });
  

    
    while (done_retrieve_public_holiday == false) {

    };

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
            console.log(error)
        }
    });


    while (done_retrieve_group_data == false) {

    };


    interface LeaveTakenData {
        StartDate: string;
        EndDate: string;
        HalfDate: number;
        LeaveReason: number;
        ID: number;

    }
    var ListOfLeaveTakenData: LeaveTakenData[] = [];
    var done_retrieve_holiday = false

    serviceCall<ListResponse<any>>({
        service: LeaveApplicationService.baseUrl + '/ListTakenLeaveFromID',
        method: "GET",
        data: {
            "EmployeeRowID": Authorization.userDefinition.EmployeeRowID
        },
        async: false,
        onSuccess: (response) => {
            done_retrieve_holiday = true
            for (var index in response.Entities) {
                var half = 0

                if (response.Entities[index].LeaveReasonId == 4 && response.Entities[index].HalfDay == 1)// if is annual leave and taken only half day
                    half = 1

                ListOfLeaveTakenData.push({
                    StartDate: response.Entities[index].StartDate.substring(0, 10),
                    EndDate: response.Entities[index].EndDate.substring(0, 10),
                    HalfDate: half,
                    LeaveReason: response.Entities[index].LeaveReasonId,
                    ID: response.Entities[index].Id
                })

            }
        },
        onError: (error) => {
            console.log(error)
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


    function isInRange(num: number, min: number, max: number): boolean {


        if (min > max) {
            var buffer = max
            max = min
            min = buffer
        }


        return num >= min && num <= max;
    }

    // Helper function to add leading zeros
    function addLeadingZero(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }
    /*
    function generateChartData(data, ListOfShiftData, ListOfPublicHoliayData, TakenLeave) {
     
        // Calculate the starting weekday index (0-6 of the first date in the given
        // array)
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
            var CurrentColorCode = null
            var ShiftString = null

            if (shift != null) {
                var ShiftID
                for (var index in ListOfShiftData) {
                    if (ListOfShiftData[index].ShiftIdList == shift)
                        ShiftID = index
                }
                CurrentColorCode = ListOfShiftData[ShiftID].Color
                ShiftString = ListOfShiftData[ShiftID].ShiftName

                if (ListOfShiftData[ShiftID].WorkingHourUntilList[xCoordinate].replace(/\s/g, "") == '' && ListOfShiftData[ShiftID].WorkingHourFromList[xCoordinate].replace(/\s/g, "") == '') {
                    ShiftString = 'Rest Day'
                    CurrentColorCode = '#FFFFE0'
                }
                else if (ListOfShiftData[ShiftID].WorkingHourFromList[xCoordinate] != null && ListOfShiftData[ShiftID].WorkingHourUntilList[xCoordinate] != null)
                {
                    ShiftString = ShiftString + ' : ' + ListOfShiftData[ShiftID].WorkingHourFromList[xCoordinate] + '-' + ListOfShiftData[ShiftID].WorkingHourUntilList[xCoordinate]
                    if (ListOfShiftData[ShiftID].WorkingTimeList[xCoordinate] != null)
                        ShiftString = ShiftString + ' : ' + ListOfShiftData[ShiftID].WorkingTimeList[xCoordinate] + 'hours'
                }
            }

            

            for (var index in ListOfPublicHolidayData) {
                if (ListOfPublicHolidayData[index].PublicHolidayDate.substring(0, 10) == dateString) {
                    ShiftString = ListOfPublicHolidayData[index].PublicHolidayName
                    CurrentColorCode = '#FF0000'
                    shift = null
                    break
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
                    ShiftString = key
                    CurrentColorCode = '#00FF00'
                    shift = null
                    console.log(key)
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
                    monthDay: id
                }
            });

        }


        return chartData;
    }
    */
    
    function GetCurrentMonthHoliday(ListOfPublicHolidayData: any[], curr_year: number, curr_month: number): [string[], string[], number[]] {
        var CurrentMonthPublicHolidayName: string[] = [];
        var CurrentMonthPublicHolidayDate: string[] = [];
        var CurrentMonthPublicHolidayID: number[] = [];
        for (var index in ListOfPublicHolidayData) {
            var date = new Date(ListOfPublicHolidayData[index].PublicHolidayDate.substring(0, 10));
            var year = date.getFullYear();
            var month = date.getMonth() + 1; // Months are 0-based, so add 1

            if (year == curr_year && month == curr_month) {
                CurrentMonthPublicHolidayName.push(ListOfPublicHolidayData[index].PublicHolidayName);
                CurrentMonthPublicHolidayDate.push(ListOfPublicHolidayData[index].PublicHolidayDate.substring(0, 10));
                CurrentMonthPublicHolidayID.push(ListOfPublicHolidayData[index].PublicHolidayId)
            }
        }

        return [CurrentMonthPublicHolidayName, CurrentMonthPublicHolidayDate, CurrentMonthPublicHolidayID];
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
        // Add the current month
        months.push(`${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}`);
        // Generate 6 months forward
        for (let i = 1; i <= 6; i++) {
            const nextMonth = new Date(startDate);
            nextMonth.setMonth(nextMonth.getMonth() + i);
            months.push(`${nextMonth.getFullYear()}-${(nextMonth.getMonth() + 1).toString().padStart(2, '0')}`);
        }
        return months;
    }





    function generateListOfDate(res, Year, Month) {
        var numberOfDays = new Date(Year, Month, 0).getDate();
        const ListOfData: Data[] = [];
        for (let day = 1; day <= numberOfDays; day++) {
            // Construct the date string in the format "YYYY-MM-DD"
            var dateString = `${Year}-${addLeadingZero(Month)}-${addLeadingZero(day)}`;
            var GroupID = null
            var date = new Date(dateString)
            for (var index in res)
            {
                var Start = new Date(res[index].ShiftStartDate)
                var End = new Date(res[index].ShiftEndDate)
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                if (typeof res[index].EmployeeGroupID !== undefined)//not group
                {
                    if (date >= Start && date <= End)
                    {
                        GroupID = res[index].EmployeeGroupID
                        break
                    }
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
        console.log(entities)
        for (var x in entities) {
            const startDate: Date = new Date(entities[x]["ShiftStartDate"].substring(0, 10));
            const endDate: Date = new Date(entities[x]["ShiftEndDate"].substring(0, 10));
            for (var data of ListOfData) {
                var currentDate: Date = new Date(data.date);

                if (currentDate >= startDate && currentDate <= endDate)
                {
                    if (data.GroupID == null)
                        data.shift = entities[x]["ShiftId"]
                }
            }
        }

        return ListOfData
    }


    function generateChartData(data, ListOfGroupData, ListOfShiftData, ListOfPublicHolidayData, TakenLeave) {
        console.log(data)
        // Calculate the starting weekday index (0-6 of the first date in the given
        // array)
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
            if (shift != null)
            {
                var ShiftID

                for (var index in ListOfShiftData) {
                    if (ListOfShiftData[index].ShiftIdList == shift)
                    {
                        ShiftID = index
                        break
                    }
                }
                CurrentColorCode = ListOfShiftData[ShiftID].Color
                ShiftString = ListOfShiftData[ShiftID].ShiftName

                if (ListOfShiftData[ShiftID].WorkingHourUntilList[xCoordinate] === undefined && ListOfShiftData[ShiftID].WorkingHourFromList[xCoordinate] == undefined)
                {
                    ShiftString = 'Rest Day'
                    CurrentColorCode = '#FFFFE0'
                    detail_string = 'Happy Holidays'

                }

                else if (ListOfShiftData[ShiftID].WorkingHourFromList[xCoordinate] != null && ListOfShiftData[ShiftID].WorkingHourUntilList[xCoordinate] != null) {
                    detail_string =  ListOfShiftData[ShiftID].WorkingHourFromList[xCoordinate] + '-' + ListOfShiftData[ShiftID].WorkingHourUntilList[xCoordinate]
                   // if (ListOfShiftData[ShiftID].WorkingTimeList[xCoordinate] != null)
                   //     detail_string = detail_string + ' : ' + ListOfShiftData[ShiftID].WorkingTimeList[xCoordinate] + 'hours'
                }
            }


            else if (Group != null) {

                for (var index in ListOfGroupData) {
                    if (ListOfGroupData[index].GroupID == Group) {
                        ShiftString = detail_string = ListOfGroupData[index].GroupName
                        CurrentColorCode = ListOfGroupData[index].GroupColor
                        break
                    }
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
        console.log(chartData)
        return chartData;
    }





    function isDateBetween(date: Date, startDate: Date, endDate: Date): boolean {
        if (startDate === undefined || endDate === undefined)
            return false
        return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime();
    }




    function plot(Data, ListOfCurrentMonthPublicHoliday): [number, number] {
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var chart = Highcharts.chart('Employee-Timetable', {
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
                outside: true,
                zIndex: 20,
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
                                var isLeave = 0

                                for (var buffer in Data) {
                                    if (Data[buffer].x == this.x && Data[buffer].y == this.y)
                                    {
                                        var date = new Date(Data[buffer].date)
                                        var thisday = date.getDate();
                                        var thismonth = date.getMonth() + 1; // Month is zero-based
                                        var thisyear = date.getFullYear();
                                        var IsGroup = false
                                        // Format the date as "YYYY-MM-DD"
                                        const formattedDate = `${thisyear}-${thismonth.toString().padStart(2, '0')}-${thisday.toString().padStart(2, '0')}`;
                                        var DatetimeDate = new Date(formattedDate)

                                        var IsGroup = false
                                        // Format the date as "YYYY-MM-DD"
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
                                        var isPublicHoliday = false
                                        for (var i in ListOfCurrentMonthPublicHoliday) {
                                            if (ListOfCurrentMonthPublicHoliday[i].PublicHolidayDate == formattedDate) {
                                                var HolidayFormID = ListOfCurrentMonthPublicHoliday[i].Id
                                                isPublicHoliday = true
                                                break
                                            }
                                        }
                                        if (isPublicHoliday = true)
                                            break
                                                              
                                        for (var each_res in CopiedResEntity)
                                        {
                                            var shift_start = new Date(CopiedResEntity[each_res]["ShiftStartDate"])
                                            var shift_end= new Date(CopiedResEntity[each_res]["ShiftEndDate"])
                                            var endDateString = CopiedResEntity[each_res]["ShiftEndDate"]
                                            if (CopiedResEntity[each_res]["EmployeeGroupID"] !== undefined)
                                            {
                                                
                                                if (date >= shift_start && date <= shift_end)
                                                {
                                                    FormID = CopiedResEntity[each_res]["EmployeeGroupID"]
                                                    IsGroup = true
                                                    break
                                                }
                                            }
                                            if (isDateBetween(DatetimeDate, shift_start, shift_end)) {
                                                FormID = CopiedResEntity[each_res].Id
                                                var dlg2 = new SetEmployeeShiftDialog(Authorization.userDefinition.EmployeeRowID, formattedDate, 1, endDateString);//open the shift 
                                                dlg2.loadByIdAndOpenDialog(FormID)
                                                dlg2.set_readOnly(true)
                                            }
                                        }

                                        if (IsGroup)
                                        {
                                            var EmployeeGroupDlg = new EmployeeGroupDialog();
                                            EmployeeGroupDlg.loadByIdAndOpenDialog(FormID);
                                            EmployeeGroupDlg.set_readOnly(true)
                                        }
                                        if (isPublicHoliday) {
                                            var PublicHolidayDlg = new PublicHolidayDialog();
                                            PublicHolidayDlg.loadByIdAndOpenDialog(HolidayFormID);
                                            PublicHolidayDlg.set_readOnly(true)
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
        var chartWidth = chart.chartWidth;
        var chartHeight = chart.chartHeight;
        return [chartWidth, chartHeight]
    }






    if (!Authorization.hasPermission(PermissionKeys.HumanResources)) //if he is not HR guy generate another page
    {
        var styleElement = document.createElement('style');
        styleElement.setAttribute("type", "text/css")

        styleElement.innerHTML = 
           ` body {margin-top:20px;}

            .card-style1 {
                box-shadow: 0px 0px 10px 0px rgb(89 75 128 / 9 %);
            }
            .border - 0 {
                border: 0!important;
            }
            .card {
                position: relative;
                display: flex;
                flex-direction: column;
                min-width: 0;
                word-wrap: break-word;
                background-color: #fff;
                background-clip: border-box;
                border: 1px solid rgba(0, 0, 0, .125);
                border-radius: 0.25rem;
            }
            section {
                padding: 120px 0;
                overflow: hidden;
                background: #fff;
            }
            .mb-2-3,.my-2-3 {
                margin-bottom: 2.3rem;
            }

            .section-title {
                font-weight: 600;
                letter-spacing: 2px;
                text-transform: uppercase;
                margin-bottom: 10px;
                position: relative;
                display: inline-block;
            }

            .text-primary {
                    color: #ceaa4d!important;
                }

            .text-secondary {
                    color: #15395A!important;
                }

            .font-weight-600 {
                    font-weight: 600;
                }

            .display-26 {
                    font-size: 1.3rem;
                }

        @media screen and(min-width: 992px) {
        .p-lg-7 {
                padding: 4rem;
            }
        }

        @media screen and(min-width: 768px) {
        .p-md-6 {
                padding: 3.5rem;
            }
        }

        @media screen and(min-width: 576px) {
        .p-sm-2-3 {
                padding: 2.3rem;
            }
        }

    .p-1-9 {
            padding: 1.9rem;
        }

    .bg-secondary {
            background: #15395A!important;
        }

        @media screen and(min - width: 576px) {
        .pe-sm-6,.px-sm-6{
                padding-right: 3.5rem;
            }
        }

        @media screen and(min-width: 576px) {
        .ps-sm-6,.px-sm-6 {
                padding-left: 3.5rem;
            }
        }

    .pe-1-9,.px-1-9{
            padding-right: 1.9rem;
        }

    .ps-1-9,.px-1-9 {
            padding-left: 1.9rem;
        }

    .pb-1-9,.py-1-9 {
            padding-bottom: 1.9rem;
        }

    .pt-1-9,.py-1-9{
            padding-top: 1.9rem;
        }
    .mb-1-9,.my-1-9 {
            margin-bottom: 1.9rem;
        }

        @media(min-width: 992px) {
        .d-lg-inline-block {
                display: inline - block!important;
            }
        }
    .rounded {
            border-radius: 0.25rem!important;
        }
        .tab {
          overflow: hidden;
          border: 1px solid #ccc;
          background-color: #f1f1f1;
        }

        .tab button {
          background-color: inherit;
          float: left;
          border: none;
          outline: none;
          cursor: pointer;
          padding: 14px 16px;
          transition: 0.3s;
        }

        .tab button:hover {
          background-color: #ddd;
        }

        .tab button.active {
          background-color: #ccc;
        }


        .tabcontent {
          display: none;
          padding: 6px 12px;
          border: 1px solid #ccc;
          border-top: none;
        animation: fadeEffect 1s; /* Fading effect takes 1 second */

        }

        @keyframes fadeEffect {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        `;



        var finalRowEle = document.createElement("div")
        finalRowEle.setAttribute("class", "row")

        var finalRowEle2 = document.createElement("div")
        finalRowEle2.setAttribute("class", "container")

        var finalSecEle = document.createElement("section")
        finalSecEle.setAttribute("class", "bg-light")

        var cover1 = document.createElement("DIV")
        cover1.setAttribute("class","col-lg-12 mb-4 mb-sm-5")
        var cover2 = document.createElement("DIV")
        cover2.setAttribute("class", "card card-style1 border-0")
        var cover3 = document.createElement("DIV")
        cover3.setAttribute("class", "card-body")

        var mainrow = document.createElement("div");
        mainrow.setAttribute("class","row align-items-center")
        var fragment = document.createElement("img");
        fragment.setAttribute("id", "myImg");
        fragment.width = 63;
        fragment.height = 112.5;



        var timetable_cover1 = document.createElement("DIV")
        timetable_cover1.setAttribute("class", "col-lg-12 mb-4 mb-sm-5")
        var TimetableNode = document.createElement('DIV')
        TimetableNode.classList.add('category-title')
        TimetableNode.setAttribute("id", "Employee-Timetable")
        var no_records = false
       

        var DepartmentTable = getLookup("Department.Department")
        var DivisionTable = getLookup("Division.Division")
        var SectionTable = getLookup("Section.Section")
        var JobGradeTable = getLookup("JobGrade.JobGrade")
        var OccupationTable = getLookup("Occupation.Occupation")
        var done = false
        
        serviceCall<ListResponse<any>>({
            service: ViewShiftHistoryService.baseUrl + '/RetriveShiftHistory',
            method: "GET",
            data: {
                'EmployeeID': Authorization.userDefinition.EmployeeRowID
            },
            async: false,
            onSuccess: (res) => {
                CopiedResEntity = res.Entities
            
                ListOfData = generateListOfDate(CopiedResEntity, currentYear, currentMonth);
                for (var x in res.Entities)
                {
                    
                    if (parseInt(res.Entities[x]["Id"]) == 0 )
                    {
                        no_records = true
                        break
                    }
                }
                done = true
            },
            onError: (error) => {
                console.log(error)
            }
        });

        while (done == false) {
        }//wait until the stored procedure extracted all dataas
        console.log(no_records)
        serviceCall<ListResponse<any>>({
            service: EmployeeProfileService.baseUrl + '/EmployeeProfileBasedOnID',
            data: {
                'EmployeeID': Authorization.userDefinition.EmployeeRowID
            },
            method: "GET",
            async: false,
            onSuccess: (response) =>
            {
                if (response.Entities[0].EmployeeImg) {
                    fragment.src = '/upload/' + response.Entities[0].EmployeeImg;
                } else {
                    // Set default Facebook profile picture URL
                    if (response.Entities[0].Sex == 1)//is male
                        fragment.src = 'https://i.stack.imgur.com/l60Hf.png';

                    else if (response.Entities[0].Sex == 0)//is female
                        fragment.src = 'https://st.depositphotos.com/2218212/2938/i/950/depositphotos_29388097-stock-illustration-facebook-profile.jpg';

                }
                var Div1 = document.createElement('div');
                Div1.appendChild(fragment)
                Div1.setAttribute("class", "col-lg-2 mb-4 mb-lg-0");

                var Div2 = document.createElement('div');
                Div2.setAttribute("class", "col-lg-5 px-xl-10");
                var Div3 = document.createElement('div');
                Div3.setAttribute("class", "col-lg-5 px-xl-10");
               
                var Div2_Ul1 = document.createElement('ul');
                Div2_Ul1.setAttribute("class", "list-unstyled ")

                var Div3_Ul1 = document.createElement('ul');
                Div3_Ul1.setAttribute("class", "list-unstyled ")




                var Div2_li6 = document.createElement('li');
                //Div2_li6.setAttribute("class", "mb-2 mb-xl-3 display-28")
                var Div2_li6_span1 = document.createElement('span');
                 Div2_li6_span1.setAttribute("class", "text-secondary me-1 font-weight-600")
                Div2_li6_span1.innerText = 'Name'
                Div2_li6.appendChild(Div2_li6_span1)
                Div2_li6.insertAdjacentText('beforeend', response.Entities[0].EmployeeName as string);
                Div2_Ul1.appendChild(Div2_li6)

                
                var Div2_li7 = document.createElement('li');
               // Div2_li7.setAttribute("class", "mb-2 mb-xl-3 display-28")
                var Div2_li7_span1 = document.createElement('span');
                Div2_li7_span1.setAttribute("class", "text-secondary me-1 font-weight-600")
                Div2_li7_span1.innerText = 'Employee ID'
                Div2_li7.appendChild(Div2_li7_span1)
                Div2_li7.insertAdjacentText('beforeend', response.Entities[0].EmployeeID as string);
                Div2_Ul1.appendChild(Div2_li7)

                console.log(response.Entities[0])

                var Div2_li8 = document.createElement('li');
                // Div2_li7.setAttribute("class", "mb-2 mb-xl-3 display-28")
                var Div2_li8_span1 = document.createElement('span');
                Div2_li8_span1.setAttribute("class", "text-secondary me-1 font-weight-600")
                Div2_li8_span1.innerText = 'Age'
                Div2_li8.appendChild(Div2_li8_span1)
                Div2_li8.insertAdjacentText('beforeend', response.Entities[0].Age as string);
                Div2_Ul1.appendChild(Div2_li8)

                const RecruitmentDate = new Date(response.Entities[0].RecruitmentDate);
                const today = new Date();
                // Calculate the difference in months and years
                const yearDiff = today.getFullYear() - RecruitmentDate.getFullYear();
                const monthDiff = today.getMonth() - RecruitmentDate.getMonth();
                var Div2_li9 = document.createElement('li');
                // Div2_li7.setAttribute("class", "mb-2 mb-xl-3 display-28")
                var Div2_li9_span1 = document.createElement('span');
                Div2_li9_span1.setAttribute("class", "text-secondary me-1 font-weight-600")
                var Service

                if (yearDiff == 0) {
                    Div2_li9_span1.innerText = 'Month of service'
                    Service = monthDiff.toString()
                }
                else {
                    Div2_li9_span1.innerText = 'Year of service'
                    Service = yearDiff.toString()

                }

                 Div2_li9.appendChild(Div2_li9_span1)

                Div2_li9.insertAdjacentText('beforeend',Service as string);
                Div2_Ul1.appendChild(Div2_li9)




                if (findRowById(DepartmentTable.items, response.Entities[0].DepartmentId) != null) {
                    var Div3_li1 = document.createElement('li');
                   // Div2_li1.setAttribute("class", "mb-2 mb-xl-3 display-28")
                    var Div3_li1_span1 = document.createElement('span');
                    Div3_li1_span1.setAttribute("class", "text-secondary me-1 font-weight-600")
                    Div3_li1_span1.innerText = 'Department'
                    Div3_li1.appendChild(Div3_li1_span1)
                    Div3_li1.insertAdjacentText('beforeend', findRowById(DepartmentTable.items, response.Entities[0].DepartmentId));
                    Div3_Ul1.appendChild(Div3_li1)
                }

                if (findRowById(DivisionTable.items, response.Entities[0].DivisionId) != null) {
                    var Div3_li2 = document.createElement('li');
                   // Div2_li2.setAttribute("class", "mb-2 mb-xl-3 display-28")
                    var Div3_li2_span1 = document.createElement('span');
                    Div3_li2_span1.setAttribute("class", "text-secondary me-1 font-weight-600")
                   Div3_li2_span1.innerText = 'Division'
                    Div3_li2.appendChild(Div3_li2_span1)
                    Div3_li2.insertAdjacentText('beforeend', findRowById(DivisionTable.items, response.Entities[0].DivisionId));
                    Div3_Ul1.appendChild(Div3_li2)
                }


                if (findRowById(SectionTable.items, response.Entities[0].SectionId) != null) {
                    var Div3_li3 = document.createElement('li');
                   // Div2_li3.setAttribute("class", "mb-2 mb-xl-3 display-28")
                    var Div3_li3_span1 = document.createElement('span');
                    Div3_li3_span1.setAttribute("class", "text-secondary me-1 font-weight-600")
                    Div3_li3_span1.innerText = 'Section'
                    Div3_li3.appendChild(Div3_li3_span1)
                    Div3_li3.insertAdjacentText('beforeend', findRowById(SectionTable.items, response.Entities[0].SectionId));
                    Div3_Ul1.appendChild(Div3_li3)
                }

                if (findRowById(OccupationTable.items, response.Entities[0].OccupationId) != null) {
                    var Div3_li5 = document.createElement('li');
                   // Div2_li5.setAttribute("class", "mb-2 mb-xl-3 display-28")
                    var Div3_li5_span1 = document.createElement('span');
                    Div3_li5_span1.setAttribute("class", "text-secondary me-1 font-weight-600")
                   Div3_li5_span1.innerText = 'Occupation'
                    Div3_li5.appendChild(Div3_li5_span1)
                    Div3_li5.insertAdjacentText('beforeend', findRowById(OccupationTable.items, response.Entities[0].OccupationId));
                    Div3_Ul1.appendChild(Div3_li5)
                }



                if (findRowById(JobGradeTable.items, response.Entities[0].JobGradeId) != null) {
                    var Div3_li4 = document.createElement('li');
                   // Div2_li4.setAttribute("class", "mb-2 mb-xl-3 display-28")
                    var Div3_li4_span1 = document.createElement('span');
                     Div3_li4_span1.setAttribute("class", " text-secondary me-1 font-weight-600")
                   Div3_li4_span1.innerText = 'JobGrade'
                    Div3_li4.appendChild(Div3_li4_span1)
                    Div3_li4.insertAdjacentText('beforeend', findRowById(JobGradeTable.items, response.Entities[0].JobGradeId));
                    Div3_Ul1.appendChild(Div3_li4)
                }


                

                
                //Div2.appendChild(Div2_Div1)
                Div2.appendChild(Div2_Ul1)
                Div3.appendChild(Div3_Ul1)

                mainrow.appendChild(Div1)
                mainrow.appendChild(Div2)
                mainrow.appendChild(Div3)

                cover3.appendChild(mainrow)

                cover2.appendChild(cover3)
                cover1.appendChild(cover2)
                finalRowEle.append(cover1)
                finalRowEle2.append(finalRowEle)

                finalSecEle.append(finalRowEle2)

                $('#GridDiv').append(finalSecEle)
                $('#GridDiv').append(styleElement)

          
                var TimeNode = document.createElement('DIV');

                TimeNode.setAttribute("id", "time-box");
                TimeNode.setAttribute("class", "row");
                TimeNode.setAttribute("align", "right");

                var rowNode = document.createElement('DIV');
                var MonthNode = document.createElement("INPUT");
                MonthNode.setAttribute("id", "Month");
                MonthNode.setAttribute("type", "text");
                MonthNode.setAttribute("class", "monthSelect");
                rowNode.appendChild(MonthNode);
                TimeNode.appendChild(rowNode);



                function open(evt, id) {
                    // Declare all variables
                    var i, tabcontent, tablinks;

                    // Get all elements with class="tabcontent" and hide them
                    tabcontent = document.getElementsByClassName("tabcontent");
                    for (i = 0; i < tabcontent.length; i++) {
                        tabcontent[i].style.display = "none";
                    }

                    // Get all elements with class="tablinks" and remove the class "active"
                    tablinks = document.getElementsByClassName("tablinks");
                    for (i = 0; i < tablinks.length; i++) {
                        tablinks[i].className = tablinks[i].className.replace(" active", "");
                    }

                    // Show the current tab, and add an "active" class to the button that opened the tab
                    if (document.getElementById(id)!=null)
                        document.getElementById(id).style.display = "block";
                    evt.currentTarget.className += " active";
                }

                var TabRowNode = document.createElement('div');
                TabRowNode.setAttribute("class", "tab");

                var ShiftTableButton = document.createElement('button');
                ShiftTableButton.addEventListener('click', function () { open(event,'shifttab'); }, false);
                ShiftTableButton.setAttribute("class", "tablinks");
                ShiftTableButton.innerText = 'Shift'
                ShiftTableButton.setAttribute("id", "defaultOpen");

                //var Tab2Button = document.createElement('button');
               // Tab2Button.addEventListener('click', function () { open(event, 'tab2'); }, false);
               // Tab2Button.setAttribute("class", "tablinks");
               // Tab2Button.innerText = 'tab2'



                TabRowNode.appendChild(ShiftTableButton)
               // TabRowNode.appendChild(Tab2Button)


                var ShiftTabNode = document.createElement('DIV');
                ShiftTabNode.setAttribute("class", "tabcontent");
                ShiftTabNode.setAttribute("id", "shifttab");
                ShiftTabNode.appendChild(TimeNode)
                ShiftTabNode.appendChild(TimetableNode)


                var Tab2Node = document.createElement('DIV');
                Tab2Node.setAttribute("class", "tabcontent");
                Tab2Node.setAttribute("id", "tab2");

                var Tab2ContentH3 = document.createElement('h3')
                Tab2ContentH3.textContent = 'Tab 2'

                var Tab2ContentP = document.createElement('p')
                Tab2ContentP.textContent = 'This is the content of Tab 2'

                Tab2Node.appendChild(Tab2ContentH3)
                Tab2Node.appendChild(Tab2ContentP)




                finalRowEle.appendChild(TabRowNode)
                finalRowEle.appendChild(ShiftTabNode)
                finalRowEle.appendChild(Tab2Node)

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

                    var ListOfData: Data[] = generateListOfDate(CopiedResEntity,year, month);

                    if (no_records == false)
                        ListOfData = appendShift(ListOfData, CopiedResEntity);

                    var [CurrentMonthPublicHolidayName, CurrentMonthPublicHolidayDate, CurrentMonthPublicHolidayID] = GetCurrentMonthHoliday(ListOfPublicHolidayData, currentYear, currentMonth)
                    var ListOfCurrentMonthPublicHoliday: PublicHolidayData[] = [];
                    for (var index2 in CurrentMonthPublicHolidayDate)
                    {
                        ListOfCurrentMonthPublicHoliday.push({
                            PublicHolidayDate: CurrentMonthPublicHolidayDate[index2],
                            PublicHolidayId: CurrentMonthPublicHolidayID[index2],
                            PublicHolidayName: CurrentMonthPublicHolidayName[index2],
                        })
                    }

                    var chartData = generateChartData(ListOfData, ListOfGroupData, ListOfShiftData, ListOfCurrentMonthPublicHoliday, ListOfLeaveTakenData);
                    var chartwidth, chartheight
                    [chartwidth, chartheight] = plot(chartData, ListOfCurrentMonthPublicHoliday)

                    Tab2Node.style.width = String(chartwidth) + 'px'
                    Tab2Node.style.height = String(chartheight) + 'px'

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
                var chartData = generateChartData(ListOfData, ListOfGroupData, ListOfShiftData, ListOfCurrentMonthPublicHoliday, ListOfLeaveTakenData);

                var chartwidth, chartheight
                [chartwidth, chartheight] = plot(chartData, ListOfCurrentMonthPublicHoliday)
             
                Tab2Node.style.width = String(chartwidth)+'px'
                Tab2Node.style.height = String(chartheight) + 'px'


            ShiftTableButton.click();//open shift tab on default

            },
            onError: (error) => {
                console.log(error.Error);
            }
        });
        
        


    }

}