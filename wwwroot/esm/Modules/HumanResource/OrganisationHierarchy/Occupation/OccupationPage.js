import{k as d,l as m,m as a,n as i}from"../../../../_chunks/chunk-HERT6KZV.js";import"../../../../_chunks/chunk-TIB4BNCY.js";import"../../../../_chunks/chunk-DMDSRNFC.js";import{a as l}from"../../../../_chunks/chunk-DNINIZJD.js";import{c as r,g as u,h as s,k as R}from"../../../../_chunks/chunk-L3ECGIWB.js";var g=u(R(),1);var p=u(l(),1);var c=u(l(),1);var t=class extends c.EntityDialog{constructor(){super();this.form=new m(this.idPrefix);this.list_of_occupation=[];i.List({},n=>{for(var o in n.Entities)this.list_of_occupation.push(n.Entities[o].Name.toLowerCase())})}getFormKey(){return m.formKey}getRowDefinition(){return a}getService(){return i.baseUrl}save_submitHandler(n){var o=[],h=this.form.Name.value.toLowerCase();for(var w in this.list_of_occupation)this.list_of_occupation[w]===h&&o.push("This Occupation is inserted.");if(o.length>0){let y=o.map(_=>`- ${_}`).join(`
`);alertDialog(y)}else super.save_submitHandler(n)}};r(t,"OccupationDialog"),t=s([c.Decorators.registerClass("HRMSoftware.OrganisationHierarchy.OccupationDialog")],t);var e=class extends p.EntityGrid{getColumnsKey(){return d.columnsKey}getDialogType(){return t}getRowDefinition(){return a}getService(){return i.baseUrl}constructor(f){super(f)}};r(e,"OccupationGrid"),e=s([p.Decorators.registerClass("HRMSoftware.OrganisationHierarchy.OccupationGrid")],e);function H(){(0,g.initFullHeightGridPage)(new e($("#GridDiv")).element)}r(H,"pageInit");export{H as default};
//# sourceMappingURL=OccupationPage.js.map