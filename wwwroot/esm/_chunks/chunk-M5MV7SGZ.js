import{b as I}from"./chunk-XGDIBSP2.js";import{a as R}from"./chunk-DNINIZJD.js";import{c as s,g as d,h as v,k as g}from"./chunk-L3ECGIWB.js";var E=d(R(),1);var c=class{};s(c,"EmployeeBasicDataColumns"),c.columnsKey="EmployeeBasicData.EmployeeBasicData";var i=d(R(),1);var S=d(g(),1);var m=class extends i.PrefixedContext{constructor(f){if(super(f),!m.init){m.init=!0;var t=i.StringEditor,r=i.IntegerEditor,a=i.DateEditor,o=i.LookupEditor,n=i.EnumEditor;(0,S.initFormType)(m,["EmployeeName",t,"EmployeeId",t,"Age",r,"Birthday",a,"Address",t,"TelNumber1",t,"RaceId",o,"EmployeeType",n,"Sex",n,"CityId",o,"StateId",o,"NationalityId",o])}}},p=m;s(p,"EmployeeBasicDataForm"),p.formKey="EmployeeBasicData.EmployeeBasicData";var h=d(g(),1);var e=class{};s(e,"EmployeeBasicDataRow"),e.idProperty="Id",e.isActiveProperty="IsActive",e.nameProperty="EmployeeName",e.localTextPrefix="EmployeeBasicData.EmployeeBasicData",e.deletePermission="Administration:Employee",e.insertPermission="Administration:Employee",e.readPermission="Administration:Employee",e.updatePermission="Administration:Employee",e.Fields=(0,h.fieldsProxy)();var x=d(g(),1),u;(t=>(t.baseUrl="EmployeeBasicData/EmployeeBasicData",t.Methods={Create:"EmployeeBasicData/EmployeeBasicData/Create",Update:"EmployeeBasicData/EmployeeBasicData/Update",Delete:"EmployeeBasicData/EmployeeBasicData/Delete",Retrieve:"EmployeeBasicData/EmployeeBasicData/Retrieve",List:"EmployeeBasicData/EmployeeBasicData/List"},["Create","Update","Delete","Retrieve","List"].forEach(r=>{t[r]=function(a,o,n){return(0,x.serviceRequest)(t.baseUrl+"/"+r,a,o,n)}})))(u||(u={}));var l=class extends E.EntityDialog{constructor(t){super();this.form=new p(this.idPrefix);this.EmployeeRowID=t,this.deleteButton.hide(),this.localizationButton.hide(),this.undeleteButton.hide(),this.cloneButton.hide(),this.applyChangesButton.hide(),this.saveAndCloseButton.hide()}getFormKey(){return p.formKey}getRowDefinition(){return e}getService(){return u.baseUrl}onDialogOpen(){super.onDialogOpen(),this.readOnly=!0;var t=this.EmployeeRowID;$(this.idPrefix+"EmployeeImg").hide();var r=document.createElement("img");r.setAttribute("id","myImg"),r.width=63,r.height=112.5,I.List({},a=>{for(var o in a.Entities)if(a.Entities[o].Id==t){var n=document.getElementById(this.form.idPrefix+"PropertyGrid");r.src="/upload/"+a.Entities[o].EmployeeImg,n.firstChild.firstChild.insertBefore(r,n.firstChild.firstChild.firstChild),r.style.display="block",r.style.margin="0 auto",$(".disabled").remove();break}})}};s(l,"EmployeeBasicDataDialog"),l=v([E.Decorators.registerClass("HRMSoftware.EmployeeBasicData.EmployeeBasicDataDialog")],l);export{c as a,e as b,u as c,l as d};
//# sourceMappingURL=chunk-M5MV7SGZ.js.map