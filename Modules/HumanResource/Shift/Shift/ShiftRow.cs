using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using HRMSoftware.Administration;

namespace HRMSoftware.Shift;

[ConnectionKey("Default"), Module("Shift"), TableName("HumanResourcesShiftPattern")]
[DisplayName("Shift"), InstanceName("Shift")]
[ReadPermission("*")]
[ModifyPermission(PermissionKeys.HumanResources)]
[InsertPermission(PermissionKeys.HumanResources)]
[LookupScript("ShiftRow.ShiftRow", Permission = "*")]

public sealed class ShiftRow : LoggingRow<ShiftRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Id"), Column("ID"), Identity, IdProperty]
    public int? Id
    {
        get => fields.Id[this];
        set => fields.Id[this] = value;
    }

    [DisplayName("Type of Shift"), Column("TypeOfShift"),NotNull]
    public int? TypeOfShift
    {
        get => fields.TypeOfShift[this];
        set => fields.TypeOfShift[this] = value;
    }



    [DisplayName("Working Time"), Column("MondayWorkingTime")]
    public int? MondayWorkingTime
    {
        get => fields.MondayWorkingTime[this];
        set => fields.MondayWorkingTime[this] = value;
    }


    [DisplayName("Working Time"), Column("TuesdayWorkingTime")]
    public int? TuesdayWorkingTime
    {
        get => fields.TuesdayWorkingTime[this];
        set => fields.TuesdayWorkingTime[this] = value;
    }


    [DisplayName("Working Time"), Column("WednesdayWorkingTime")]
    public int? WednesdayWorkingTime
    {
        get => fields.WednesdayWorkingTime[this];
        set => fields.WednesdayWorkingTime[this] = value;
    }

    [DisplayName("Working Time"), Column("ThursdayWorkingTime")]
    public int? ThursdayWorkingTime
    {
        get => fields.ThursdayWorkingTime[this];
        set => fields.ThursdayWorkingTime[this] = value;
    }


    [DisplayName("Working Time"), Column("FridayWorkingTime")]
    public int? FridayWorkingTime
    {
        get => fields.FridayWorkingTime[this];
        set => fields.FridayWorkingTime[this] = value;
    }


    [DisplayName("Working Time"), Column("SaturdayWorkingTime")]
    public int? SaturdayWorkingTime
    {
        get => fields.SaturdayWorkingTime[this];
        set => fields.SaturdayWorkingTime[this] = value;
    }



    [DisplayName("Working Time"), Column("SundayWorkingTime")]
    public int? SundayWorkingTime
    {
        get => fields.SundayWorkingTime[this];
        set => fields.SundayWorkingTime[this] = value;
    }

    [DisplayName("Shift Name"), Size(30), QuickSearch, NameProperty, NotNull]
    public string ShiftName
    {
        get => fields.ShiftName[this];
        set => fields.ShiftName[this] = value;
    }
    






  

    [DisplayName("Description"), Size(30) ]
    public string Description
    {
        get => fields.Description[this];
        set => fields.Description[this] = value;
    }








    [DisplayName("Shift Color"), Size(30),NotNull]
    public string ShiftColor
    {
        get => fields.ShiftColor[this];
        set => fields.ShiftColor[this] = value;
    }




    [DisplayName("Starting From"), Size(30)]
    public string MondayStartingFrom
    {
        get => fields.MondayStartingFrom[this];
        set => fields.MondayStartingFrom[this] = value;
    }


    [DisplayName("Break Time Ending"), Size(30)]
    public string SundayLunchTimeEndingAt
    {
        get => fields.SundayLunchTimeEndingAt[this];
        set => fields.SundayLunchTimeEndingAt[this] = value;
    }



    [DisplayName("Break Time Starting"), Size(30)]
    public string SundayLunchTimeStartingFrom
    {
        get => fields.SundayLunchTimeStartingFrom[this];
        set => fields.SundayLunchTimeStartingFrom[this] = value;
    }


    [DisplayName("Break Time Ending"), Size(30)]
    public string MondayLunchTimeEndingAt
    {
        get => fields.MondayLunchTimeEndingAt[this];
        set => fields.MondayLunchTimeEndingAt[this] = value;
    }



    [DisplayName("Break Time Starting"), Size(30)]
    public string MondayLunchTimeStartingFrom
    {
        get => fields.MondayLunchTimeStartingFrom[this];
        set => fields.MondayLunchTimeStartingFrom[this] = value;
    }







    [DisplayName("Break Time Ending"), Size(30)]
    public string TuesdayLunchTimeEndingAt
    {
        get => fields.TuesdayLunchTimeEndingAt[this];
        set => fields.TuesdayLunchTimeEndingAt[this] = value;
    }



    [DisplayName("Break Time Starting"), Size(30)]
    public string TuesdayLunchTimeStartingFrom
    {
        get => fields.TuesdayLunchTimeStartingFrom[this];
        set => fields.TuesdayLunchTimeStartingFrom[this] = value;
    }








    [DisplayName("Break Time Ending"), Size(30)]
    public string WednesdayLunchTimeEndingAt
    {
        get => fields.WednesdayLunchTimeEndingAt[this];
        set => fields.WednesdayLunchTimeEndingAt[this] = value;
    }



    [DisplayName("Break Time Starting"), Size(30)]
    public string WednesdayLunchTimeStartingFrom
    {
        get => fields.WednesdayLunchTimeStartingFrom[this];
        set => fields.WednesdayLunchTimeStartingFrom[this] = value;
    }







    [DisplayName("Break Time Ending"), Size(30)]
    public string ThursdayLunchTimeEndingAt
    {
        get => fields.ThursdayLunchTimeEndingAt[this];
        set => fields.ThursdayLunchTimeEndingAt[this] = value;
    }



    [DisplayName("Break Time Starting"), Size(30)]
    public string ThursdayLunchTimeStartingFrom
    {
        get => fields.ThursdayLunchTimeStartingFrom[this];
        set => fields.ThursdayLunchTimeStartingFrom[this] = value;
    }









    [DisplayName("Break Time Ending"), Size(30)]
    public string FridayLunchTimeEndingAt
    {
        get => fields.FridayLunchTimeEndingAt[this];
        set => fields.FridayLunchTimeEndingAt[this] = value;
    }



    [DisplayName("Break Time Starting"), Size(30)]
    public string FridayLunchTimeStartingFrom
    {
        get => fields.FridayLunchTimeStartingFrom[this];
        set => fields.FridayLunchTimeStartingFrom[this] = value;
    }











    [DisplayName("Break Time Ending"), Size(30)]
    public string SaturdayLunchTimeEndingAt
    {
        get => fields.SaturdayLunchTimeEndingAt[this];
        set => fields.SaturdayLunchTimeEndingAt[this] = value;
    }



    [DisplayName("Break Time Starting"), Size(30)]
    public string SaturdayLunchTimeStartingFrom
    {
        get => fields.SaturdayLunchTimeStartingFrom[this];
        set => fields.SaturdayLunchTimeStartingFrom[this] = value;
    }








    [DisplayName("Ending At"), Size(30)]
    public string MondayEndingAt
    {
        get => fields.MondayEndingAt[this];
        set => fields.MondayEndingAt[this] = value;
    }




    [DisplayName("Starting From"), Size(30)]
    public string TuesdayStartingFrom
    {
        get => fields.TuesdayStartingFrom[this];
        set => fields.TuesdayStartingFrom[this] = value;
    }



   [DisplayName("Ending At"), Size(30)]
    public string TuesdayEndingAt
    {
        get => fields.TuesdayEndingAt[this];
        set => fields.TuesdayEndingAt[this] = value;
    }








    [DisplayName("Starting From"), Size(30)]
    public string WednesdayStartingFrom
    {
        get => fields.WednesdayStartingFrom[this];
        set => fields.WednesdayStartingFrom[this] = value;
    }



    [DisplayName("Ending At"), Size(30)]
    public string WednesdayEndingAt
    {
        get => fields.WednesdayEndingAt[this];
        set => fields.WednesdayEndingAt[this] = value;
    }







    [DisplayName("Starting From"), Size(30)]
    public string ThursdayStartingFrom
    {
        get => fields.ThursdayStartingFrom[this];
        set => fields.ThursdayStartingFrom[this] = value;
    }



    [DisplayName("Ending At"), Size(30)]
    public string ThursdayEndingAt
    {
        get => fields.ThursdayEndingAt[this];
        set => fields.ThursdayEndingAt[this] = value;
    }








    [DisplayName("Starting From"), Size(30)]
    public string FridayStartingFrom
    {
        get => fields.FridayStartingFrom[this];
        set => fields.FridayStartingFrom[this] = value;
    }



    [DisplayName("Ending At"), Size(30)]
    public string FridayEndingAt
    {
        get => fields.FridayEndingAt[this];
        set => fields.FridayEndingAt[this] = value;
    }





    [DisplayName("Starting From"), Size(30)]
    public string SaturdayStartingFrom
    {
        get => fields.SaturdayStartingFrom[this];
        set => fields.SaturdayStartingFrom[this] = value;
    }



    [DisplayName("Ending At"), Size(30)]
    public string SaturdayEndingAt
    {
        get => fields.SaturdayEndingAt[this];
        set => fields.SaturdayEndingAt[this] = value;
    }







    [DisplayName("Starting From"), Size(30)]
    public string SundayStartingFrom
    {
        get => fields.SundayStartingFrom[this];
        set => fields.SundayStartingFrom[this] = value;
    }

    [DisplayName("Ending At"), Size(30)]
    public string SundayEndingAt
    {
        get => fields.SundayEndingAt[this];
        set => fields.SundayEndingAt[this] = value;
    }




    [DisplayName("Starting From"), Size(30)]
    public string NightShiftBetweenStart
    {
        get => fields.NightShiftBetweenStart[this];
        set => fields.NightShiftBetweenStart[this] = value;
    }

    [DisplayName("Ending At"), Size(30)]
    public string NightShiftBetweenEnd
    {
        get => fields.NightShiftBetweenEnd[this];
        set => fields.NightShiftBetweenEnd[this] = value;
    }
    public class RowFields : LoggingRowFields
    {
        public StringField NightShiftBetweenStart;
        public StringField NightShiftBetweenEnd;
        public Int32Field Id;
        public Int32Field MondayWorkingTime;
        public Int32Field TuesdayWorkingTime;
        public Int32Field WednesdayWorkingTime;
        public Int32Field ThursdayWorkingTime;
        public Int32Field FridayWorkingTime;
        public Int32Field SaturdayWorkingTime;
        public Int32Field SundayWorkingTime;


        public Int32Field TypeOfShift;
        public StringField ShiftName;
        public StringField Description;
        public StringField ShiftColor;

        public StringField MondayStartingFrom;
        public StringField MondayEndingAt;
        public StringField MondayLunchTimeStartingFrom;
        public StringField MondayLunchTimeEndingAt;

        public StringField TuesdayStartingFrom;
        public StringField TuesdayEndingAt;
        public StringField TuesdayLunchTimeStartingFrom;
        public StringField TuesdayLunchTimeEndingAt;

        public StringField WednesdayStartingFrom;
        public StringField WednesdayEndingAt;
        public StringField WednesdayLunchTimeStartingFrom;
        public StringField WednesdayLunchTimeEndingAt;

        public StringField ThursdayStartingFrom;
        public StringField ThursdayEndingAt;
        public StringField ThursdayLunchTimeStartingFrom;
        public StringField ThursdayLunchTimeEndingAt;

        public StringField FridayStartingFrom;
        public StringField FridayEndingAt;
        public StringField FridayLunchTimeStartingFrom;
        public StringField FridayLunchTimeEndingAt;

        public StringField SaturdayStartingFrom;
        public StringField SaturdayEndingAt;
        public StringField SaturdayLunchTimeStartingFrom;
        public StringField SaturdayLunchTimeEndingAt;

        public StringField SundayStartingFrom;
        public StringField SundayEndingAt;
        public StringField SundayLunchTimeStartingFrom;
        public StringField SundayLunchTimeEndingAt;



    }
}