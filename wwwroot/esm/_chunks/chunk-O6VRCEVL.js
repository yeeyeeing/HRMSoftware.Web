import{a as g}from"./chunk-DNINIZJD.js";import{c as r,g as s,h as x,k as u}from"./chunk-L3ECGIWB.js";var v=class{};r(v,"EmployeeAttendanceColumns"),v.columnsKey="EmployeeAttendance.EmployeeAttendance";var I=s(u(),1);var i=class{};r(i,"EmployeeAttendanceRow"),i.idProperty="Id",i.isActiveProperty="IsActive",i.nameProperty="AuthenticationDateTime",i.localTextPrefix="EmployeeAttendance.EmployeeAttendance",i.deletePermission="Administration:HumanResources",i.insertPermission="Administration:HumanResources",i.readPermission="*",i.updatePermission="Administration:HumanResources",i.Fields=(0,I.fieldsProxy)();var A=s(u(),1),b;(t=>(t.baseUrl="EmployeeAttendance/EmployeeAttendance",t.Methods={Create:"EmployeeAttendance/EmployeeAttendance/Create",Update:"EmployeeAttendance/EmployeeAttendance/Update",Delete:"EmployeeAttendance/EmployeeAttendance/Delete",Retrieve:"EmployeeAttendance/EmployeeAttendance/Retrieve",List:"EmployeeAttendance/EmployeeAttendance/List",EmployeeAttendanceRecord:"EmployeeAttendance/EmployeeAttendance/EmployeeAttendanceRecord"},["Create","Update","Delete","Retrieve","List","EmployeeAttendanceRecord"].forEach(e=>{t[e]=function(n,l,D){return(0,A.serviceRequest)(t.baseUrl+"/"+e,n,l,D)}})))(b||(b={}));var q=s(g(),1),T=s(u(),1);var d=class{format(p){if(!(0,T.isEmptyOrNull)(p.value))return p.value.substring(0,16)}};r(d,"ShiftTimeToHours"),d=x([q.Decorators.registerFormatter("HRMSoftware.ShiftTimeToHours")],d);var E=class{};r(E,"ShiftAttendanceRecordColumns"),E.columnsKey="EmployeeAttendance.ShiftAttendanceRecord";var h=s(u(),1);var o=class{};r(o,"ShiftAttendanceRecordRow"),o.idProperty="Id",o.nameProperty="EmployeeRowId",o.localTextPrefix="EmployeeAttendance.ShiftAttendanceRecord",o.deletePermission="Administration:Employee",o.insertPermission="Administration:Employee",o.readPermission="Administration:Employee",o.updatePermission="Administration:Employee",o.Fields=(0,h.fieldsProxy)();var O=s(u(),1),L;(t=>(t.baseUrl="EmployeeAttendance/ShiftAttendanceRecord",t.Methods={Create:"EmployeeAttendance/ShiftAttendanceRecord/Create",Update:"EmployeeAttendance/ShiftAttendanceRecord/Update",Delete:"EmployeeAttendance/ShiftAttendanceRecord/Delete",Retrieve:"EmployeeAttendance/ShiftAttendanceRecord/Retrieve",List:"EmployeeAttendance/ShiftAttendanceRecord/List"},["Create","Update","Delete","Retrieve","List"].forEach(e=>{t[e]=function(n,l,D){return(0,O.serviceRequest)(t.baseUrl+"/"+e,n,l,D)}})))(L||(L={}));var a=s(g(),1),H=s(u(),1);var y=class extends a.PrefixedContext{constructor(p){if(super(p),!y.init){y.init=!0;var t=a.DateEditor,e=a.StringEditor,n=a.IntegerEditor,l=a.LookupEditor;(0,H.initFormType)(y,["AuthenticationDate",t,"AuthenticationTime",e,"AuthenticationSecond",n,"EmployeeRowID",l,"PersonName",e,"DeviceName",e,"DeviceSerial",e,"CardNo",e])}}},f=y;r(f,"EmployeeAttendanceForm"),f.formKey="EmployeeAttendance.EmployeeAttendance";var c=s(g(),1),P=s(u(),1);var R=class extends c.PrefixedContext{constructor(p){if(super(p),!R.init){R.init=!0;var t=c.LookupEditor,e=c.DateEditor,n=c.StringEditor;(0,P.initFormType)(R,["EmployeeRowId",t,"ShiftId",t,"TimeIn",e,"TimeInHour",n,"TimeOut",e,"TimeOutHour",n,"ShiftStartTime",e,"ShiftStartTimeHour",n,"ShiftEndTime",e,"ShiftEndTimeHour",n])}}},S=R;r(S,"ShiftAttendanceRecordForm"),S.formKey="EmployeeAttendance.ShiftAttendanceRecord";export{v as a,f as b,i as c,b as d,E as e,S as f,o as g,L as h};
//# sourceMappingURL=chunk-O6VRCEVL.js.map