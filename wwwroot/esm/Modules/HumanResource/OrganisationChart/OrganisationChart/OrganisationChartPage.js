import{a as Qt}from"../../../../_chunks/chunk-NBAF4Y7U.js";import{a as Ze,b as bt,c as Pt}from"../../../../_chunks/chunk-BFH3N3PU.js";import{d as zt}from"../../../../_chunks/chunk-6ZNY3LBE.js";import"../../../../_chunks/chunk-DA7Z2NN7.js";import{a as oe}from"../../../../_chunks/chunk-27W64ILM.js";import"../../../../_chunks/chunk-XMVX6RS3.js";import{f as Bt,r as Dt}from"../../../../_chunks/chunk-HERT6KZV.js";import"../../../../_chunks/chunk-DMDSRNFC.js";import{a as qt}from"../../../../_chunks/chunk-TIB4BNCY.js";import{b as $t}from"../../../../_chunks/chunk-BA2LGLQM.js";import"../../../../_chunks/chunk-K2UT2MVJ.js";import{a as Kt}from"../../../../_chunks/chunk-DNINIZJD.js";import{a as Ot,c as x,g as Re,j as Xe,k as Ue}from"../../../../_chunks/chunk-L3ECGIWB.js";var xe=class{constructor(e){this._name="OrgChart",Promise.prototype.finally=function(o){let h=this.constructor;return this.then(b=>h.resolve(o()).then(()=>b),b=>h.resolve(o()).then(()=>{throw b}))};let t=this,r={nodeTitle:"name",nodeId:"id",toggleSiblingsResp:!1,depth:999,chartClass:"",exportButton:!1,exportFilename:"OrgChart",parentNodeSymbol:"fa-users",draggable:!1,direction:"t2b",pan:!1,zoom:!1},i=Object.assign(r,e),a=i.data,l=document.createElement("div"),s=document.querySelector(i.chartContainer);if(this.options=i,delete this.options.data,this.chart=l,this.chartContainer=s,l.dataset.options=JSON.stringify(i),l.setAttribute("class","orgchart"+(i.chartClass!==""?" "+i.chartClass:"")+(i.direction!=="t2b"?" "+i.direction:"")),typeof a=="object")this.buildHierarchy(l,i.ajaxURL?a:this._attachRel(a,"00"),0);else if(typeof a=="string"&&a.startsWith("#"))this.buildHierarchy(l,this._buildJsonDS(document.querySelector(a).children[0]),0);else{let o=document.createElement("i");o.setAttribute("class","fa fa-circle-o-notch fa-spin spinner"),l.appendChild(o),this._getJSON(a).then(function(h){t.buildHierarchy(l,i.ajaxURL?h:t._attachRel(h,"00"),0)}).catch(function(h){console.error("failed to fetch datasource for orgchart",h)}).finally(function(){let h=l.querySelector(".spinner");h.parentNode.removeChild(h)})}if(l.addEventListener("click",this._clickChart.bind(this)),i.exportButton&&!s.querySelector(".oc-export-btn")){let o=document.createElement("button"),h=document.createElement("a");o.setAttribute("class","oc-export-btn"+(i.chartClass!==""?" "+i.chartClass:"")),o.innerHTML="Export",o.addEventListener("click",this._clickExportButton.bind(this)),h.setAttribute("class","oc-download-btn"+(i.chartClass!==""?" "+i.chartClass:"")),h.setAttribute("download",i.exportFilename+".png"),s.appendChild(o),s.appendChild(h)}i.pan&&(s.style.overflow="hidden",l.addEventListener("mousedown",this._onPanStart.bind(this)),l.addEventListener("touchstart",this._onPanStart.bind(this)),document.body.addEventListener("mouseup",this._onPanEnd.bind(this)),document.body.addEventListener("touchend",this._onPanEnd.bind(this))),i.zoom&&(s.addEventListener("wheel",this._onWheeling.bind(this)),s.addEventListener("touchstart",this._onTouchStart.bind(this)),document.body.addEventListener("touchmove",this._onTouchMove.bind(this)),document.body.addEventListener("touchend",this._onTouchEnd.bind(this))),s.appendChild(l)}get name(){return this._name}_closest(e,t){return e&&(t(e)&&e!==this.chart?e:this._closest(e.parentNode,t))}_siblings(e,t){return Array.from(e.parentNode.children).filter(r=>r!==e?t?e.matches(t):!0:!1)}_prevAll(e,t){let r=[],i=e.previousElementSibling;for(;i;)(!t||i.matches(t))&&r.push(i),i=i.previousElementSibling;return r}_nextAll(e,t){let r=[],i=e.nextElementSibling;for(;i;)(!t||i.matches(t))&&r.push(i),i=i.nextElementSibling;return r}_isVisible(e){return e.offsetParent!==null}_addClass(e,t){e.forEach(r=>{t.indexOf(" ")>0?t.split(" ").forEach(i=>r.classList.add(i)):r.classList.add(t)})}_removeClass(e,t){e.forEach(r=>{t.indexOf(" ")>0?t.split(" ").forEach(i=>r.classList.remove(i)):r.classList.remove(t)})}_css(e,t,r){e.forEach(i=>{i.style[t]=r})}_removeAttr(e,t){e.forEach(r=>{r.removeAttribute(t)})}_one(e,t,r,i){let a=x(function(l){try{r.call(i,l)}finally{e.removeEventListener(t,a)}},"one");e.addEventListener(t,a)}_getDescElements(e,t){let r=[];return e.forEach(i=>r.push(...i.querySelectorAll(t))),r}_getJSON(e){return new Promise(function(t,r){let i=new XMLHttpRequest;function a(){this.readyState===4&&(this.status===200?t(JSON.parse(this.response)):r(new Error(this.statusText)))}x(a,"handler"),i.open("GET",e),i.onreadystatechange=a,i.responseType="json",i.setRequestHeader("Content-Type","application/json"),i.send()})}_buildJsonDS(e){let t={name:e.firstChild.textContent.trim(),relationship:(e.parentNode.parentNode.nodeName==="LI"?"1":"0")+(e.parentNode.children.length>1?1:0)+(e.children.length?1:0)};return e.id&&(t.id=e.id),e.querySelector("ul")&&Array.from(e.querySelector("ul").children).forEach(r=>{t.children||(t.children=[]),t.children.push(this._buildJsonDS(r))}),t}_attachRel(e,t){if(e.relationship=t+(e.children&&e.children.length>0?1:0),e.children)for(let r of e.children)this._attachRel(r,"1"+(e.children.length>1?1:0));return e}_repaint(e){e&&(e.style.offsetWidth=e.offsetWidth)}_isInAction(e){return e.querySelector(":scope > .edge").className.indexOf("fa-")>-1}_getNodeState(e,t){let r,i={exist:!1,visible:!1};return t==="parent"?(r=this._closest(e,a=>a.classList&&a.classList.contains("nodes")),r&&(i.exist=!0),i.exist&&this._isVisible(r.parentNode.children[0])&&(i.visible=!0)):t==="children"?(r=this._closest(e,a=>a.nodeName==="TR").nextElementSibling,r&&(i.exist=!0),i.exist&&this._isVisible(r)&&(i.visible=!0)):t==="siblings"&&(r=this._siblings(this._closest(e,a=>a.nodeName==="TABLE").parentNode),r.length&&(i.exist=!0),i.exist&&r.some(a=>this._isVisible(a))&&(i.visible=!0)),i}getRelatedNodes(e,t){return t==="parent"?this._closest(e,r=>r.classList.contains("nodes")).parentNode.children[0].querySelector(".node"):t==="children"?Array.from(this._closest(e,r=>r.nodeName==="TABLE").lastChild.children).map(r=>r.querySelector(".node")):t==="siblings"?this._siblings(this._closest(e,r=>r.nodeName==="TABLE").parentNode).map(r=>r.querySelector(".node")):[]}_switchHorizontalArrow(e){let t=this.options,r=e.querySelector(".leftEdge"),i=e.querySelector(".rightEdge"),a=this._closest(e,l=>l.nodeName==="TABLE").parentNode;if(t.toggleSiblingsResp&&(typeof t.ajaxURL=="undefined"||this._closest(e,l=>l.classList.contains(".nodes")).dataset.siblingsLoaded)){let l=a.previousElementSibling,s=a.nextElementSibling;l&&(l.classList.contains("hidden")?(r.classList.add("fa-chevron-left"),r.classList.remove("fa-chevron-right")):(r.classList.add("fa-chevron-right"),r.classList.remove("fa-chevron-left"))),s&&(s.classList.contains("hidden")?(i.classList.add("fa-chevron-right"),i.classList.remove("fa-chevron-left")):(i.classList.add("fa-chevron-left"),i.classList.remove("fa-chevron-right")))}else{let l=this._siblings(a),s=l.length?!l.some(o=>o.classList.contains("hidden")):!1;r.classList.toggle("fa-chevron-right",s),r.classList.toggle("fa-chevron-left",!s),i.classList.toggle("fa-chevron-left",s),i.classList.toggle("fa-chevron-right",!s)}}_hoverNode(e){let t=e.target,r=!1,i=t.querySelector(":scope > .topEdge"),a=t.querySelector(":scope > .bottomEdge"),l=t.querySelector(":scope > .leftEdge");e.type==="mouseenter"?(i&&(r=this._getNodeState(t,"parent").visible,i.classList.toggle("fa-chevron-up",!r),i.classList.toggle("fa-chevron-down",r)),a&&(r=this._getNodeState(t,"children").visible,a.classList.toggle("fa-chevron-down",!r),a.classList.toggle("fa-chevron-up",r)),l&&this._switchHorizontalArrow(t)):Array.from(t.querySelectorAll(":scope > .edge")).forEach(s=>{s.classList.remove("fa-chevron-up","fa-chevron-down","fa-chevron-right","fa-chevron-left")})}_clickNode(e){let t=e.currentTarget,r=this.chart.querySelector(".focused");r&&r.classList.remove("focused"),t.classList.add("focused")}_buildParentNode(e,t,r){let i=this,a=document.createElement("table");t.relationship=t.relationship||"001",this._createNode(t,0).then(function(l){let s=i.chart;l.classList.remove("slide-up"),l.classList.add("slide-down");let o=document.createElement("tr"),h=document.createElement("tr"),b=document.createElement("tr"),u=document.createElement("tr");o.setAttribute("class","hidden"),o.innerHTML='<td colspan="2"></td>',a.appendChild(o),h.setAttribute("class","lines hidden"),h.innerHTML='<td colspan="2"><div class="downLine"></div></td>',a.appendChild(h),b.setAttribute("class","lines hidden"),b.innerHTML='<td class="rightLine">&nbsp;</td><td class="leftLine">&nbsp;</td>',a.appendChild(b),u.setAttribute("class","nodes"),u.innerHTML='<td colspan="2"></td>',a.appendChild(u),a.querySelector("td").appendChild(l),s.insertBefore(a,s.children[0]),a.children[3].children[0].appendChild(s.lastChild),r()}).catch(function(l){console.error("Failed to create parent node",l)})}_switchVerticalArrow(e){e.classList.toggle("fa-chevron-up"),e.classList.toggle("fa-chevron-down")}showParent(e){let t=this._prevAll(this._closest(e,i=>i.classList.contains("nodes")));this._removeClass(t,"hidden"),this._addClass(Array(t[0].children).slice(1,-1),"hidden");let r=t[2].querySelector(".node");this._one(r,"transitionend",function(){r.classList.remove("slide"),this._isInAction(e)&&this._switchVerticalArrow(e.querySelector(":scope > .topEdge"))},this),this._repaint(r),r.classList.add("slide"),r.classList.remove("slide-down")}showSiblings(e,t){let r=[],i=this._closest(e,l=>l.nodeName==="TABLE").parentNode;t?r=t==="left"?this._prevAll(i):this._nextAll(i):r=this._siblings(i),this._removeClass(r,"hidden");let a=this._prevAll(this._closest(e,l=>l.classList.contains("nodes")));if(i=Array.from(a[0].querySelectorAll(":scope > .hidden")),t?this._removeClass(i.slice(0,r.length*2),"hidden"):this._removeClass(i,"hidden"),!this._getNodeState(e,"parent").visible){this._removeClass(a,"hidden");let l=a[2].querySelector(".node");this._one(l,"transitionend",function(s){s.target.classList.remove("slide")},this),this._repaint(l),l.classList.add("slide"),l.classList.remove("slide-down")}r.forEach(l=>{Array.from(l.querySelectorAll(".node")).forEach(s=>{this._isVisible(s)&&(s.classList.add("slide"),s.classList.remove("slide-left","slide-right"))})}),this._one(r[0].querySelector(".slide"),"transitionend",function(){r.forEach(l=>{this._removeClass(Array.from(l.querySelectorAll(".slide")),"slide")}),this._isInAction(e)&&(this._switchHorizontalArrow(e),e.querySelector(".topEdge").classList.remove("fa-chevron-up"),e.querySelector(".topEdge").classList.add("fa-chevron-down"))},this)}hideSiblings(e,t){let r=this._closest(e,s=>s.nodeName==="TABLE").parentNode;this._siblings(r).forEach(s=>{s.querySelector(".spinner")&&(this.chart.dataset.inAjax=!1)}),(!t||t&&t==="left")&&this._prevAll(r).forEach(o=>{Array.from(o.querySelectorAll(".node")).forEach(h=>{this._isVisible(h)&&h.classList.add("slide","slide-right")})}),(!t||t&&t!=="left")&&this._nextAll(r).forEach(o=>{Array.from(o.querySelectorAll(".node")).forEach(h=>{this._isVisible(h)&&h.classList.add("slide","slide-left")})});let a=[];this._siblings(r).forEach(s=>{Array.prototype.push.apply(a,Array.from(s.querySelectorAll(".slide")))});let l=[];for(let s of a){let o=this._closest(s,function(h){return h.classList.contains("nodes")}).previousElementSibling;l.push(o),l.push(o.previousElementSibling)}l=[...new Set(l)],l.forEach(function(s){s.style.visibility="hidden"}),this._one(a[0],"transitionend",function(s){l.forEach(function(u){u.removeAttribute("style")});let o=[];t?t==="left"?o=this._prevAll(r,":not(.hidden)"):o=this._nextAll(r,":not(.hidden)"):o=this._siblings(r);let b=Array.from(this._closest(r,function(u){return u.classList.contains("nodes")}).previousElementSibling.querySelectorAll(":scope > :not(.hidden)")).slice(1,t?o.length*2+1:-1);this._addClass(b,"hidden"),this._removeClass(a,"slide"),o.forEach(u=>{Array.from(u.querySelectorAll(".node")).slice(1).forEach(k=>{this._isVisible(k)&&(k.classList.remove("slide-left","slide-right"),k.classList.add("slide-up"))})}),o.forEach(u=>{this._addClass(Array.from(u.querySelectorAll(".lines")),"hidden"),this._addClass(Array.from(u.querySelectorAll(".nodes")),"hidden"),this._addClass(Array.from(u.querySelectorAll(".verticalNodes")),"hidden")}),this._addClass(o,"hidden"),this._isInAction(e)&&this._switchHorizontalArrow(e)},this)}hideParent(e){let t=Array.from(this._closest(e,function(l){return l.classList.contains("nodes")}).parentNode.children).slice(0,3);t[0].querySelector(".spinner")&&(this.chart.dataset.inAjax=!1),this._getNodeState(e,"siblings").visible&&this.hideSiblings(e);let r=t.slice(1);this._css(r,"visibility","hidden");let i=t[0].querySelector(".node"),a=this._getNodeState(i,"parent").visible;i&&this._isVisible(i)&&(i.classList.add("slide","slide-down"),this._one(i,"transitionend",function(){i.classList.remove("slide"),this._removeAttr(r,"style"),this._addClass(t,"hidden")},this)),i&&a&&this.hideParent(i)}addParent(e,t){let r=this;this._buildParentNode(e,t,function(){if(!e.querySelector(":scope > .topEdge")){let i=document.createElement("i");i.setAttribute("class","edge verticalEdge topEdge fa"),e.appendChild(i)}r.showParent(e)})}_startLoading(e,t){let r=this.options,i=this.chart;if(typeof i.dataset.inAjax!="undefined"&&i.dataset.inAjax==="true")return!1;e.classList.add("hidden");let a=document.createElement("i");a.setAttribute("class","fa fa-circle-o-notch fa-spin spinner"),t.appendChild(a),this._addClass(Array.from(t.querySelectorAll(":scope > *:not(.spinner)")),"hazy"),i.dataset.inAjax=!0;let l=this.chartContainer.querySelector(".oc-export-btn"+(r.chartClass!==""?"."+r.chartClass:""));return l&&(l.disabled=!0),!0}_endLoading(e,t){let r=this.options;e.classList.remove("hidden"),t.querySelector(":scope > .spinner").remove(),this._removeClass(Array.from(t.querySelectorAll(":scope > .hazy")),"hazy"),this.chart.dataset.inAjax=!1;let i=this.chartContainer.querySelector(".oc-export-btn"+(r.chartClass!==""?"."+r.chartClass:""));i&&(i.disabled=!1)}_clickTopEdge(e){e.stopPropagation();let t=this,r=e.target,i=r.parentNode,a=this._getNodeState(i,"parent"),l=this.options;if(a.exist){let o=this._closest(i,function(h){return h.classList.contains("nodes")}).parentNode.firstChild.querySelector(".node");if(o.classList.contains("slide"))return;a.visible?(this.hideParent(i),this._one(o,"transitionend",function(){this._isInAction(i)&&(this._switchVerticalArrow(r),this._switchHorizontalArrow(i))},this)):this.showParent(i)}else{let s=r.parentNode.id;this._startLoading(r,i)&&this._getJSON(typeof l.ajaxURL.parent=="function"?l.ajaxURL.parent(i.dataset.source):l.ajaxURL.parent+s).then(function(o){t.chart.dataset.inAjax==="true"&&Object.keys(o).length&&t.addParent(i,o)}).catch(function(o){console.error("Failed to get parent node data.",o)}).finally(function(){t._endLoading(r,i)})}}hideChildren(e){let t=this,r=this._nextAll(e.parentNode.parentNode),i=r[r.length-1],a=[];i.querySelector(".spinner")&&(this.chart.dataset.inAjax=!1);let l=Array.from(i.querySelectorAll(".node")).filter(o=>t._isVisible(o)),s=i.classList.contains("verticalNodes");s||(l.forEach(o=>{Array.prototype.push.apply(a,t._prevAll(t._closest(o,h=>h.classList.contains("nodes")),".lines"))}),a=[...new Set(a)],this._css(a,"visibility","hidden")),this._one(l[0],"transitionend",function(o){this._removeClass(l,"slide"),s?t._addClass(r,"hidden"):(a.forEach(h=>{h.removeAttribute("style"),h.classList.add("hidden"),h.parentNode.lastChild.classList.add("hidden")}),this._addClass(Array.from(i.querySelectorAll(".verticalNodes")),"hidden")),this._isInAction(e)&&this._switchVerticalArrow(e.querySelector(".bottomEdge"))},this),this._addClass(l,"slide slide-up")}showChildren(e){let t=this,r=this._nextAll(e.parentNode.parentNode),i=[];this._removeClass(r,"hidden"),r.some(a=>a.classList.contains("verticalNodes"))?r.forEach(a=>{Array.prototype.push.apply(i,Array.from(a.querySelectorAll(".node")).filter(l=>t._isVisible(l)))}):Array.from(r[2].children).forEach(a=>{Array.prototype.push.apply(i,Array.from(a.querySelector("tr").querySelectorAll(".node")).filter(l=>t._isVisible(l)))}),this._repaint(i[0]),this._one(i[0],"transitionend",a=>{this._removeClass(i,"slide"),this._isInAction(e)&&this._switchVerticalArrow(e.querySelector(".bottomEdge"))},this),this._addClass(i,"slide"),this._removeClass(i,"slide-up")}_buildChildNode(e,t,r){let i=t.children||t.siblings;e.querySelector("td").setAttribute("colSpan",i.length*2),this.buildHierarchy(e,{children:i},0,r)}addChildren(e,t){let r=this,i=this.options,a=0;this.chart.dataset.inEdit="addChildren",this._buildChildNode.call(this,this._closest(e,l=>l.nodeName==="TABLE"),t,function(){if(++a===t.children.length){if(!e.querySelector(".bottomEdge")){let l=document.createElement("i");l.setAttribute("class","edge verticalEdge bottomEdge fa"),e.appendChild(l)}if(!e.querySelector(".symbol")){let l=document.createElement("i");l.setAttribute("class","fa "+i.parentNodeSymbol+" symbol"),e.querySelector(":scope > .title").appendChild(l)}r.showChildren(e),r.chart.dataset.inEdit=""}})}_clickBottomEdge(e){e.stopPropagation();let t=this,r=this.options,i=e.target,a=i.parentNode,l=this._getNodeState(a,"children");if(l.exist){let s=this._closest(a,function(o){return o.nodeName==="TR"}).parentNode.lastChild;if(Array.from(s.querySelectorAll(".node")).some(o=>this._isVisible(o)&&o.classList.contains("slide")))return;l.visible?this.hideChildren(a):this.showChildren(a)}else{let s=i.parentNode.id;this._startLoading(i,a)&&this._getJSON(typeof r.ajaxURL.children=="function"?r.ajaxURL.children(a.dataset.source):r.ajaxURL.children+s).then(function(o){t.chart.dataset.inAjax==="true"&&o.children.length&&t.addChildren(a,o)}).catch(function(o){console.error("Failed to get children nodes data",o)}).finally(function(){t._endLoading(i,a)})}}_complementLine(e,t,r){let i=e.parentNode.parentNode.children;i[0].children[0].setAttribute("colspan",t*2),i[1].children[0].setAttribute("colspan",t*2);for(let a=0;a<r;a++){let l=document.createElement("td"),s=document.createElement("td");l.setAttribute("class","rightLine topLine"),l.innerHTML="&nbsp;",i[2].insertBefore(l,i[2].children[1]),s.setAttribute("class","leftLine topLine"),s.innerHTML="&nbsp;",i[2].insertBefore(s,i[2].children[1])}}_buildSiblingNode(e,t,r){let i=this,a=t.siblings?t.siblings.length:t.children.length,l=e.parentNode.nodeName==="TD"?this._closest(e,h=>h.nodeName==="TR").children.length:1,s=l+a,o=s>1?Math.floor(s/2-1):0;if(e.parentNode.nodeName==="TD"){let h=this._prevAll(e.parentNode.parentNode);h[0].remove(),h[1].remove();let b=0;i._buildChildNode.call(i,i._closest(e.parentNode,u=>u.nodeName==="TABLE"),t,()=>{if(++b===a){let u=Array.from(i._closest(e.parentNode,k=>k.nodeName==="TABLE").lastChild.children);if(l>1){let k=e.parentNode.parentNode;Array.from(k.children).forEach(R=>{u[0].parentNode.insertBefore(R,u[0])}),k.remove(),i._complementLine(u[0],s,l),i._addClass(u,"hidden"),u.forEach(R=>{i._addClass(R.querySelectorAll(".node"),"slide-left")})}else{let k=e.parentNode.parentNode;u[o].parentNode.insertBefore(e.parentNode,u[o+1]),k.remove(),i._complementLine(u[o],s,1),i._addClass(u,"hidden"),i._addClass(i._getDescElements(u.slice(0,o+1),".node"),"slide-right"),i._addClass(i._getDescElements(u.slice(o+1),".node"),"slide-left")}r()}})}else{let h=0;i.buildHierarchy.call(i,i.chart,t,0,()=>{if(++h===s){let b=e.nextElementSibling.children[3].children[o],u=document.createElement("td");u.setAttribute("colspan",2),u.appendChild(e),b.parentNode.insertBefore(u,b.nextElementSibling),i._complementLine(b,s,1);let k=i._closest(e,Y=>Y.classList&&Y.classList.contains("nodes")).parentNode.children[0];k.classList.add("hidden"),i._addClass(Array.from(k.querySelectorAll(".node")),"slide-down");let R=this._siblings(e.parentNode);i._addClass(R,"hidden"),i._addClass(i._getDescElements(R.slice(0,o),".node"),"slide-right"),i._addClass(i._getDescElements(R.slice(o),".node"),"slide-left"),r()}})}}addSiblings(e,t){let r=this;this.chart.dataset.inEdit="addSiblings",this._buildSiblingNode.call(this,this._closest(e,i=>i.nodeName==="TABLE"),t,()=>{if(r._closest(e,i=>i.classList&&i.classList.contains("nodes")).dataset.siblingsLoaded=!0,!e.querySelector(".leftEdge")){let i=document.createElement("i"),a=document.createElement("i");i.setAttribute("class","edge horizontalEdge rightEdge fa"),e.appendChild(i),a.setAttribute("class","edge horizontalEdge leftEdge fa"),e.appendChild(a)}r.showSiblings(e),r.chart.dataset.inEdit=""})}removeNodes(e){let t=this._closest(e,i=>i.nodeName==="TABLE").parentNode,r=this._siblings(t.parentNode);t.nodeName==="TD"?this._getNodeState(e,"siblings").exist?(r[2].querySelector(".topLine").nextElementSibling.remove(),r[2].querySelector(".topLine").remove(),r[0].children[0].setAttribute("colspan",r[2].children.length),r[1].children[0].setAttribute("colspan",r[2].children.length),t.remove()):(r[0].children[0].removeAttribute("colspan"),r[0].querySelector(".bottomEdge").remove(),this._siblings(r[0]).forEach(i=>i.remove())):Array.from(t.parentNode.children).forEach(i=>i.remove())}_clickHorizontalEdge(e){e.stopPropagation();let t=this,r=this.options,i=e.target,a=i.parentNode,l=this._getNodeState(a,"siblings");if(l.exist){let s=this._closest(a,function(h){return h.nodeName==="TABLE"}).parentNode;if(this._siblings(s).some(h=>{let b=h.querySelector(".node");return this._isVisible(b)&&b.classList.contains("slide")}))return;if(r.toggleSiblingsResp){let h=this._closest(a,u=>u.nodeName==="TABLE").parentNode.previousElementSibling,b=this._closest(a,u=>u.nodeName==="TABLE").parentNode.nextElementSibling;i.classList.contains("leftEdge")?h.classList.contains("hidden")?this.showSiblings(a,"left"):this.hideSiblings(a,"left"):b.classList.contains("hidden")?this.showSiblings(a,"right"):this.hideSiblings(a,"right")}else l.visible?this.hideSiblings(a):this.showSiblings(a)}else{let s=i.parentNode.id,o=this._getNodeState(a,"parent").exist?typeof r.ajaxURL.siblings=="function"?r.ajaxURL.siblings(JSON.parse(a.dataset.source)):r.ajaxURL.siblings+s:typeof r.ajaxURL.families=="function"?r.ajaxURL.families(JSON.parse(a.dataset.source)):r.ajaxURL.families+s;this._startLoading(i,a)&&this._getJSON(o).then(function(h){t.chart.dataset.inAjax==="true"&&(h.siblings||h.children)&&t.addSiblings(a,h)}).catch(function(h){console.error("Failed to get sibling nodes data",h)}).finally(function(){t._endLoading(i,a)})}}_clickToggleButton(e){let t=this,r=e.target,i=r.parentNode.nextElementSibling,a=Array.from(i.querySelectorAll(".node")),l=Array.from(i.children).map(s=>s.querySelector(".node"));l.some(s=>s.classList.contains("slide"))||(r.classList.toggle("fa-plus-square"),r.classList.toggle("fa-minus-square"),a[0].classList.contains("slide-up")?(i.classList.remove("hidden"),this._repaint(l[0]),this._addClass(l,"slide"),this._removeClass(l,"slide-up"),this._one(l[0],"transitionend",()=>{t._removeClass(l,"slide")})):(this._addClass(a,"slide slide-up"),this._one(a[0],"transitionend",()=>{t._removeClass(a,"slide"),a.forEach(s=>{t._closest(s,function(h){return h.nodeName==="UL"}).classList.add("hidden")})}),a.forEach(s=>{let o=Array.from(s.querySelectorAll(".toggleBtn"));t._removeClass(o,"fa-minus-square"),t._addClass(o,"fa-plus-square")})))}_dispatchClickEvent(e){let t=e.target.classList;t.contains("topEdge")?this._clickTopEdge(e):t.contains("rightEdge")||t.contains("leftEdge")?this._clickHorizontalEdge(e):t.contains("bottomEdge")?this._clickBottomEdge(e):t.contains("toggleBtn")?this._clickToggleButton(e):this._clickNode(e)}_onDragStart(e){let t=e.target,r=this.options,i=/firefox/.test(window.navigator.userAgent.toLowerCase());if(i&&e.dataTransfer.setData("text/html","hack for firefox"),this.chart.style.transform){let o,h;document.querySelector(".ghost-node")?(o=this.chart.querySelector(":scope > .ghost-node"),h=o.children[0]):(o=document.createElementNS("http://www.w3.org/2000/svg","svg"),o.classList.add("ghost-node"),h=document.createElementNS("http://www.w3.org/2000/svg","rect"),o.appendChild(h),this.chart.appendChild(o));let b=this.chart.style.transform.split(","),u=Math.abs(window.parseFloat(r.direction==="t2b"||r.direction==="b2t"?b[0].slice(b[0].indexOf("(")+1):b[1]));o.setAttribute("width",t.offsetWidth),o.setAttribute("height",t.offsetHeight),h.setAttribute("x",5*u),h.setAttribute("y",5*u),h.setAttribute("width",120*u),h.setAttribute("height",40*u),h.setAttribute("rx",4*u),h.setAttribute("ry",4*u),h.setAttribute("stroke-width",1*u);let k=e.offsetX*u,R=e.offsetY*u;if(r.direction==="l2r"?(k=e.offsetY*u,R=e.offsetX*u):r.direction==="r2l"?(k=t.offsetWidth-e.offsetY*u,R=e.offsetX*u):r.direction==="b2t"&&(k=t.offsetWidth-e.offsetX*u,R=t.offsetHeight-e.offsetY*u),i){let Y=document.createElement("img");Y.src="data:image/svg+xml;utf8,"+new XMLSerializer().serializeToString(o),e.dataTransfer.setDragImage(Y,k,R),h.setAttribute("fill","rgb(255, 255, 255)"),h.setAttribute("stroke","rgb(191, 0, 0)")}else e.dataTransfer.setDragImage(o,k,R)}let a=e.target,l=this._closest(a,o=>o.classList&&o.classList.contains("nodes")).parentNode.children[0].querySelector(".node"),s=Array.from(this._closest(a,o=>o.nodeName==="TABLE").querySelectorAll(".node"));this.dragged=a,Array.from(this.chart.querySelectorAll(".node")).forEach(function(o){s.includes(o)||(r.dropCriteria?r.dropCriteria(a,l,o)&&o.classList.add("allowedDrop"):o.classList.add("allowedDrop"))})}_onDragOver(e){e.preventDefault(),e.currentTarget.classList.contains("allowedDrop")||(e.dataTransfer.dropEffect="none")}_onDragEnd(e){Array.from(this.chart.querySelectorAll(".allowedDrop")).forEach(function(t){t.classList.remove("allowedDrop")})}_onDrop(e){let t=e.currentTarget,r=this.chart,i=this.dragged,a=this._closest(i,function(o){return o.classList&&o.classList.contains("nodes")}).parentNode.children[0].children[0];if(this._removeClass(Array.from(r.querySelectorAll(".allowedDrop")),"allowedDrop"),t.parentNode.parentNode.nextElementSibling){let o=window.parseInt(t.parentNode.colSpan)+2;if(t.parentNode.setAttribute("colspan",o),t.parentNode.parentNode.nextElementSibling.children[0].setAttribute("colspan",o),!i.querySelector(".horizontalEdge")){let R=document.createElement("i"),Y=document.createElement("i");R.setAttribute("class","edge horizontalEdge rightEdge fa"),i.appendChild(R),Y.setAttribute("class","edge horizontalEdge leftEdge fa"),i.appendChild(Y)}let h=t.parentNode.parentNode.nextElementSibling.nextElementSibling,b=document.createElement("td"),u=document.createElement("td");b.setAttribute("class","leftLine topLine"),b.innerHTML="&nbsp;",h.insertBefore(b,h.children[1]),u.setAttribute("class","rightLine topLine"),u.innerHTML="&nbsp;",h.insertBefore(u,h.children[2]),h.nextElementSibling.appendChild(this._closest(i,function(R){return R.nodeName==="TABLE"}).parentNode);let k=this._siblings(this._closest(i,function(R){return R.nodeName==="TABLE"}).parentNode).map(R=>R.querySelector(".node"));if(k.length===1){let R=document.createElement("i"),Y=document.createElement("i");R.setAttribute("class","edge horizontalEdge rightEdge fa"),k[0].appendChild(R),Y.setAttribute("class","edge horizontalEdge leftEdge fa"),k[0].appendChild(Y)}}else{let o=document.createElement("i");o.setAttribute("class","edge verticalEdge bottomEdge fa"),t.appendChild(o),t.parentNode.setAttribute("colspan",2);let h=this._closest(t,function(Y){return Y.nodeName==="TABLE"}),b=document.createElement("tr"),u=document.createElement("tr"),k=document.createElement("tr");b.setAttribute("class","lines"),b.innerHTML='<td colspan="2"><div class="downLine"></div></td>',h.appendChild(b),u.setAttribute("class","lines"),u.innerHTML='<td class="rightLine">&nbsp;</td><td class="leftLine">&nbsp;</td>',h.appendChild(u),k.setAttribute("class","nodes"),h.appendChild(k),Array.from(i.querySelectorAll(".horizontalEdge")).forEach(Y=>{i.removeChild(Y)});let R=this._closest(i,Y=>Y.nodeName==="TABLE").parentNode;k.appendChild(R)}let l=window.parseInt(a.colSpan);if(l>2){a.setAttribute("colspan",l-2),a.parentNode.nextElementSibling.children[0].setAttribute("colspan",l-2);let o=a.parentNode.nextElementSibling.nextElementSibling;o.children[1].remove(),o.children[1].remove();let h=Array.from(a.parentNode.parentNode.children[3].children).map(function(b){return b.querySelector(".node")});h.length===1&&(h[0].querySelector(".leftEdge").remove(),h[0].querySelector(".rightEdge").remove())}else a.removeAttribute("colspan"),a.querySelector(".node").removeChild(a.querySelector(".bottomEdge")),Array.from(a.parentNode.parentNode.children).slice(1).forEach(o=>o.remove());let s=new CustomEvent("nodedropped.orgchart",{detail:{draggedNode:i,dragZone:a.children[0],dropZone:t}});r.dispatchEvent(s)}_createNode(e,t){let r=this,i=this.options;return new Promise(function(a,l){if(e.children)for(let u of e.children)u.parentId=e.id;let s=document.createElement("div");delete e.children,s.dataset.source=JSON.stringify(e),e[i.nodeId]&&(s.id=e[i.nodeId]);let o=r.chart.dataset.inEdit,h;o?h=o==="addChildren"?" slide-up":"":h=t>=i.depth?" slide-up":"",s.setAttribute("class","node "+(e.className||"")+h),i.draggable&&s.setAttribute("draggable",!0),e.parentId&&s.setAttribute("data-parent",e.parentId),s.innerHTML=`
        <div class="title">${e[i.nodeTitle]}</div>
        ${i.nodeContent?`<div class="content">${e[i.nodeContent]}</div>`:""}
      `;let b=e.relationship||"";if(i.verticalDepth&&t+2>i.verticalDepth){if(t+1>=i.verticalDepth&&Number(b.substr(2,1))){let u=document.createElement("i"),k=t+1>=i.depth?"plus":"minus";u.setAttribute("class","toggleBtn fa fa-"+k+"-square"),s.appendChild(u)}}else{if(Number(b.substr(0,1))){let u=document.createElement("i");u.setAttribute("class","edge verticalEdge topEdge fa"),s.appendChild(u)}if(Number(b.substr(1,1))){let u=document.createElement("i"),k=document.createElement("i");u.setAttribute("class","edge horizontalEdge rightEdge fa"),s.appendChild(u),k.setAttribute("class","edge horizontalEdge leftEdge fa"),s.appendChild(k)}if(Number(b.substr(2,1))){let u=document.createElement("i"),k=document.createElement("i"),R=s.querySelector(":scope > .title");u.setAttribute("class","edge verticalEdge bottomEdge fa"),s.appendChild(u),k.setAttribute("class","fa "+i.parentNodeSymbol+" symbol"),R.insertBefore(k,R.children[0])}}s.addEventListener("mouseenter",r._hoverNode.bind(r)),s.addEventListener("mouseleave",r._hoverNode.bind(r)),s.addEventListener("click",r._dispatchClickEvent.bind(r)),i.draggable&&(s.addEventListener("dragstart",r._onDragStart.bind(r)),s.addEventListener("dragover",r._onDragOver.bind(r)),s.addEventListener("dragend",r._onDragEnd.bind(r)),s.addEventListener("drop",r._onDrop.bind(r))),i.createNode&&i.createNode(s,e),a(s)})}buildHierarchy(e,t,r,i){let a=this,l=this.options,s,o=t.children,h=l.verticalDepth&&r+1>=l.verticalDepth;if(Object.keys(t).length>1&&(s=h?e:document.createElement("table"),h||e.appendChild(s),this._createNode(t,r).then(function(b){if(h)s.insertBefore(b,s.firstChild);else{let u=document.createElement("tr");u.innerHTML=`
            <td ${o?`colspan="${o.length*2}"`:""}>
            </td>
          `,u.children[0].appendChild(b),s.insertBefore(u,s.children[0]?s.children[0]:null)}i&&i()}).catch(function(b){console.error("Failed to creat node",b)})),o){Object.keys(t).length===1&&(s=e);let b,u=l.verticalDepth&&r+2>=l.verticalDepth,k=a.chart.dataset.inEdit;if(k?b=k==="addSiblings"?"":" hidden":b=r+1>=l.depth?" hidden":"",!u){let pe=document.createElement("tr");pe.setAttribute("class","lines"+b),pe.innerHTML=`
          <td colspan="${o.length*2}">
            <div class="downLine"></div>
          </td>
        `,s.appendChild(pe)}let R=document.createElement("tr");R.setAttribute("class","lines"+b),R.innerHTML=`
        <td class="rightLine">&nbsp;</td>
        ${o.slice(1).map(()=>`
          <td class="leftLine topLine">&nbsp;</td>
          <td class="rightLine topLine">&nbsp;</td>
          `).join("")}
        <td class="leftLine">&nbsp;</td>
      `;let Y;if(u)if(Y=document.createElement("ul"),b&&Y.classList.add(b.trim()),r+2===l.verticalDepth){let pe=document.createElement("tr");pe.setAttribute("class","verticalNodes"+b),pe.innerHTML="<td></td>",pe.firstChild.appendChild(Y),s.appendChild(pe)}else s.appendChild(Y);else Y=document.createElement("tr"),Y.setAttribute("class","nodes"+b),s.appendChild(R),s.appendChild(Y);o.forEach(pe=>{let Se;u?Se=document.createElement("li"):(Se=document.createElement("td"),Se.setAttribute("colspan",2)),Y.appendChild(Se),a.buildHierarchy(Se,pe,r+1,i)})}}_clickChart(e){!this._closest(e.target,function(r){return r.classList&&r.classList.contains("node")})&&this.chart.querySelector(".node.focused")&&this.chart.querySelector(".node.focused").classList.remove("focused")}_clickExportButton(){let e=this.options,t=this.chartContainer,r=t.querySelector(":scope > .mask"),i=t.querySelector(".orgchart:not(.hidden)"),a=e.direction==="l2r"||e.direction==="r2l";r?r.classList.remove("hidden"):(r=document.createElement("div"),r.setAttribute("class","mask"),r.innerHTML='<i class="fa fa-circle-o-notch fa-spin spinner"></i>',t.appendChild(r)),t.classList.add("canvasContainer"),window.html2canvas(i,{width:a?i.clientHeight:i.clientWidth,height:a?i.clientWidth:i.clientHeight,onclone:function(l){let s=l.querySelector(".canvasContainer");s.style.overflow="visible",s.querySelector(".orgchart:not(.hidden)").transform=""}}).then(l=>{let s=t.querySelector(".oc-download-btn");t.querySelector(".mask").classList.add("hidden"),s.setAttribute("href",l.toDataURL()),s.click()}).catch(l=>{console.error("Failed to export the curent orgchart!",l)}).finally(()=>{t.classList.remove("canvasContainer")})}_loopChart(e){let t={id:e.querySelector(".node").id};return e.children[3]&&Array.from(e.children[3].children).forEach(r=>{t.children||(t.children=[]),t.children.push(this._loopChart(r.firstChild))}),t}getHierarchy(){return this.chart.querySelector(".node").id?this._loopChart(this.chart.querySelector("table")):"Error: Nodes of orghcart to be exported must have id attribute!"}_onPanStart(e){let t=e.currentTarget;if(this._closest(e.target,o=>o.classList&&o.classList.contains("node"))||e.touches&&e.touches.length>1){t.dataset.panning=!1;return}t.style.cursor="move",t.dataset.panning=!0;let r=0,i=0,a=window.getComputedStyle(t).transform;if(a!=="none"){let o=a.split(",");a.includes("3d")?(r=Number.parseInt(o[12],10),i=Number.parseInt(o[13],10)):(r=Number.parseInt(o[4],10),i=Number.parseInt(o[5],10))}let l=0,s=0;if(!e.targetTouches)l=e.pageX-r,s=e.pageY-i;else if(e.targetTouches.length===1)l=e.targetTouches[0].pageX-r,s=e.targetTouches[0].pageY-i;else if(e.targetTouches.length>1)return;t.dataset.panStart=JSON.stringify({startX:l,startY:s}),t.addEventListener("mousemove",this._onPanning.bind(this)),t.addEventListener("touchmove",this._onPanning.bind(this))}_onPanning(e){let t=e.currentTarget;if(t.dataset.panning==="false")return;let r=0,i=0,a=JSON.parse(t.dataset.panStart),l=a.startX,s=a.startY;if(!e.targetTouches)r=e.pageX-l,i=e.pageY-s;else if(e.targetTouches.length===1)r=e.targetTouches[0].pageX-l,i=e.targetTouches[0].pageY-s;else if(e.targetTouches.length>1)return;let o=window.getComputedStyle(t).transform;if(o==="none")o.includes("3d")?t.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, "+r+", "+i+", 0, 1)":t.style.transform="matrix(1, 0, 0, 1, "+r+", "+i+")";else{let h=o.split(",");o.includes("3d")?(h[12]=r,h[13]=i):(h[4]=r,h[5]=i+")"),t.style.transform=h.join(",")}}_onPanEnd(e){let t=this.chart;t.dataset.panning==="true"&&(t.dataset.panning=!1,t.style.cursor="default",document.body.removeEventListener("mousemove",this._onPanning),document.body.removeEventListener("touchmove",this._onPanning))}_setChartScale(e,t){let r=window.getComputedStyle(e).transform;if(r==="none")e.style.transform="scale("+t+","+t+")";else{let i=r.split(",");r.includes("3d")?e.style.transform=r+" scale3d("+t+","+t+", 1)":(i[0]="matrix("+t,i[3]=t,e.style.transform=r+" scale("+t+","+t+")")}e.dataset.scale=t}_onWheeling(e){e.preventDefault();let t=e.deltaY>0?.8:1.2;this._setChartScale(this.chart,t)}_getPinchDist(e){return Math.sqrt((e.touches[0].clientX-e.touches[1].clientX)*(e.touches[0].clientX-e.touches[1].clientX)+(e.touches[0].clientY-e.touches[1].clientY)*(e.touches[0].clientY-e.touches[1].clientY))}_onTouchStart(e){let t=this.chart;if(e.touches&&e.touches.length===2){let r=this._getPinchDist(e);t.dataset.pinching=!0,t.dataset.pinchDistStart=r}}_onTouchMove(e){let t=this.chart;if(t.dataset.pinching){let r=this._getPinchDist(e);t.dataset.pinchDistEnd=r}}_onTouchEnd(e){let t=this.chart;if(t.dataset.pinching){t.dataset.pinching=!1;let r=t.dataset.pinchDistEnd-t.dataset.pinchDistStart;r>0?this._setChartScale(t,1):r<0&&this._setChartScale(t,-1)}}};x(xe,"OrgChart");function vt(){var le=document.createElement("style");return le.textContent=`
    .icon {
    position: fixed; /* Fix the position relative to the viewport */
    bottom: 20px;    /* Distance from the bottom */
    right: 20px;     /* Distance from the right */
    width: 50px;     /* Width of the icon */
    height: 50px;    /* Height of the icon */
    z-index: 1000;   /* Ensure it is above other content */
}

.flex-container {
  display: flex;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box; /* Includes padding and border in width/height */
}

     .CardContent {
            background-color: lightblue;
            padding: 20px;
            width: auto;
            align-items: center; /* Optional: aligns items vertically centered */
                white-space: nowrap; /* Prevents text from wrapping */
        }

.CardContent span {
    display: block; /* Ensures each span is on a new line */
    margin-bottom: 5px; /* Adds space between the lines */
    font-style: italic; /* Applies italic styling */
}
.CardTitle span {
    display: block; /* Ensures each span is on a new line */
    margin-bottom: 5px; /* Adds space between the lines */
    font-family: Arial; /* Applies italic styling */
}
   #SectionTable {
    table-layout: auto; /* Allow the table to resize based on content */
    width: 100%;
      border-collapse: collapse; /* Optional: removes space between borders */

  }
  
        .CardTitle {
            background-color: #eee2ed;
            padding: 20px;
            width: auto;
               white-space: nowrap; /* Prevents text from wrapping */
    align-items: center; /* Optional: aligns items vertically centered */
        }

            .dragging{z-index:111!important}.block{position:absolute;z-index:9}.indicator{width:12px;height:12px;border-radius:60px;background-color:#217ce8;margin-top:-5px;opacity:1;transition:all .3s cubic-bezier(.05,.03,.35,1);transform:scale(1);position:absolute;z-index:2}.invisible{opacity:0!important;transform:scale(0)}.indicator:after{content:"";display:block;width:12px;height:12px;background-color:#217ce8;transform:scale(1.7);opacity:.2;border-radius:60px}.arrowblock{position:absolute;width:100%;overflow:visible;pointer-events:none}.arrowblock svg{width: -webkit-fill-available;overflow: visible;}

  .side-div {
    display: flex;
    flex-direction: row; /* Aligns child elements in a row */
    background-color: #f1f1f1;
}
  .wrapper{
    overflow-x: auto;

}

  .chart-side-div {
    display: flex;
    flex-direction: row; /* Aligns child elements in a row */
    width: auto;
       background-color: #ffffff;
    min-height: 100px; /* Sets a minimum height */
    position: relative; /* Required for absolute positioning of ::before */
}

    .content {
    background-color: #f8f9fa;
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
   .EmployeeImg {
    width: 100%;
    height: auto; /* Maintain aspect ratio */
    object-fit: cover; /* Or 'contain' depending on your requirement */
}


#chart-container {
    background-color: #f8f9fa;
  height: auto;
  border: 1px solid #aaa;
  margin: 0.5rem;
}

#orgChartContainer {
    height: 800px;
    background-color: #f8f9fa;
   position: relative;
  height: auto;
  border: 1px solid #aaa;
  margin: 0.5rem;
  overflow: auto;
  text-align: center;
}

  .content {
       display: flex;
    flex-direction: column; /* Stack children vertically */
height: 100vh; /* Make sure the body and html take full height */
margin: 0;
        }

#GridDiv {

  display: block;
overflow: hidden;
position: relative;
}

 .div2 {
    flex: 0.5; /* Takes 7 parts of the total height */

height:10%;
}

.orgchart {
  box-sizing: border-box;
  display: inline-block;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  linear-gradient(to right, rgba(200, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0) 5%),
  linear-gradient(to bottom, rgba(200, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0) 5%),
  linear-gradient(to left, rgba(200, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0) 5%);
  background-size: 10px 10px; /* background square size */
  padding: 20px 20px 0 20px;
  /* border: 0.5px solid rgba(200, 0, 0, 0.15); */
}

.orgchart .hidden, .orgchart~.hidden {
  display: none;
}

.orgchart div,
.orgchart div::before,
.orgchart div::after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.orgchart.b2t {
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

.orgchart.l2r {
  position: absolute;
  -ms-transform: rotate(-90deg) rotateY(180deg);
  -moz-transform: rotate(-90deg) rotateY(180deg);
  -webkit-transform: rotate(-90deg) rotateY(180deg);
  transform: rotate(-90deg) rotateY(180deg);
  -ms-transform-origin: left top;
  -moz-transform-origin: left top;
  -webkit-transform-origin: left top;
  transform-origin: left top;
}

.orgchart .verticalNodes ul {
  list-style: none;
  margin: 0;
  padding-left: 18px;
  text-align: left;
}

.orgchart .verticalNodes ul:first-child {
  margin-top: 3px;
}

.orgchart .verticalNodes>td::before {
  content: '';
  border: 1px solid #AFAFAF;

}

.orgchart .verticalNodes>td>ul>li:first-child::before {
  top: -4px;
  height: 30px;
  width: calc(50% - 2px);
  border-width: 2px 0 0 2px;
}

.orgchart .verticalNodes ul>li {
  position: relative;
}

.orgchart .verticalNodes ul>li::before,
.orgchart .verticalNodes ul>li::after {
  content: '';
  position: absolute;
  left: -6px;
  border-color: #AFAFAF;
  border-style: solid;
  border-width: 0 0 2px 2px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.orgchart .verticalNodes ul>li::before {
  top: -4px;
  height: 30px;
  width: 11px;
}

.orgchart .verticalNodes ul>li::after {
  top: 1px;
  height: 100%;
}

.orgchart .verticalNodes ul>li:first-child::after {
  top: 24px;
  width: 11px;
  border-width: 2px 0 0 2px;
}

.orgchart .verticalNodes ul>li:last-child::after {
  border-width: 2px 0 0;
}

.orgchart.r2l {
  position: absolute;
  -ms-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  -ms-transform-origin: left top;
  -moz-transform-origin: left top;
  -webkit-transform-origin: left top;
  transform-origin: left top;
}

.orgchart>.spinner {
  font-size: 100px;
  margin-top: 30px;
  color: rgba(68, 157, 68, 0.8);
}

.orgchart table {
  border-spacing: 0;
  border-collapse: separate;
}

.orgchart>table:first-child{
  margin: 20px auto;
}

.orgchart td {
  text-align: center;
  vertical-align: top;
  padding: 0;
}

.orgchart tr.lines .topLine {
  border-top: 2px solid #AFAFAF;
}

.orgchart tr.lines .rightLine {
  border-right: 1px solid  #AFAFAF;
  float: none;
  border-radius: 0;
}

.orgchart tr.lines .leftLine {
  border-left: 1px solid  #AFAFAF;
  float: none;
  border-radius: 0;
}

.orgchart tr.lines .downLine {
  background-color:  #AFAFAF;
  margin: 0 auto;
  height: 20px;
  width: 2px;
  float: none;
}

/* node styling */
.orgchart .node {
         display: flex;
  box-sizing: border-box;
  display: inline-block;
  position: relative;
    margin: 0 0 20px 0;
  padding: 3px;
  border: 2px dashed transparent;
  text-align: center;
    flex-direction: row; /* Align children in a row */

}

.orgchart.l2r .node, .orgchart.r2l .node {
  width: 50px;
  height: 130px;
}

.orgchart .node>.hazy {
  opacity: 0.2;
}

.orgchart .node>.spinner {
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  vertical-align: middle;
  font-size: 30px;
  color: rgba(68, 157, 68, 0.8);
}

.delete-node-icon {
    /* Hide any potential background, border, or box-shadow */
    background: none; /* Remove background color */
    border: none; /* Remove border */
    box-shadow: none; /* Remove box-shadow */
}

.delete-node-icon.active {
    /* Adjust this based on the class or state that triggers the rectangle */
    background: none;
    border: none;
    box-shadow: none;
}

.orgchart .node:hover {
    background-color:#BFBFBF;

  transition: .5s;
}


.orgchart .ghost-node {
  position: fixed;
  left: -10000px;
  top: -10000px;
}

.orgchart .ghost-node rect {
  fill: #ffffff;
  stroke: #bf0000;
}

.orgchart .node.allowedDrop {
  border-color: rgba(68, 157, 68, 0.9);
}



.orgchart.b2t .node .title {
  -ms-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -webkit-transform: rotate(-180deg);
  transform: rotate(-180deg);
  -ms-transform-origin: center bottom;
  -moz-transform-origin: center bottom;
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
    
}

.orgchart.l2r .node .title {
  -ms-transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  -moz-transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  -webkit-transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  -ms-transform-origin: bottom center;
  -moz-transform-origin: bottom center;
  -webkit-transform-origin: bottom center;
  transform-origin: bottom center;
  width: 120px;
}

.orgchart.r2l .node .title {
  -ms-transform: rotate(-90deg) translate(-40px, -40px);
  -moz-transform: rotate(-90deg) translate(-40px, -40px);
  -webkit-transform: rotate(-90deg) translate(-40px, -40px);
  transform: rotate(-90deg) translate(-40px, -40px);
  -ms-transform-origin: bottom center;
  -moz-transform-origin: bottom center;
  -webkit-transform-origin: bottom center;
  transform-origin: bottom center;
  width: 120px;
}

.orgchart .node .title .symbol {
  float: left;
  margin-top: 4px;
  margin-left: 2px;
}


.orgchart .node .title {
  box-sizing: border-box;
  width: 120px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
    background-color: #f1f1f1;

  color:#A9A9A9;
  border-radius: 4px 4px 0 0;
}
.orgchart .node .content {
  box-sizing: border-box;
  width: 120px;
  height: 20px;
  line-height: 20px;
  font-size: 10px;
  border: 1px solid rgba(217, 83, 79, 0.8);
  border-width: 0 1px 1px 1px;
  border-radius: 0 0 0.25rem 0.25rem;
  text-align: center;
  background-color: #fff;
  color: #333;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.orgchart.b2t .node .content {
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
  -ms-transform-origin: center top;
  -moz-transform-origin: center top;
  -webkit-transform-origin: center top;
  transform-origin: center top;
}

.orgchart.l2r .node .content {
  -ms-transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  -moz-transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  -webkit-transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
  -ms-transform-origin: top center;
  -moz-transform-origin: top center;
  -webkit-transform-origin: top center;
  transform-origin: top center;
  width: 120px;
}

.orgchart.r2l .node .content {
  -ms-transform: rotate(-90deg) translate(-40px, -40px);
  -moz-transform: rotate(-90deg) translate(-40px, -40px);
  -webkit-transform: rotate(-90deg) translate(-40px, -40px);
  transform: rotate(-90deg) translate(-40px, -40px);
  -ms-transform-origin: top center;
  -moz-transform-origin: top center;
  -webkit-transform-origin: top center;
  transform-origin: top center;
  width: 200px;
}

.orgchart .node .edge {
  font-size: 15px;
  position: absolute;
  color: rgba(68, 157, 68, 0.5);
  cursor: default;
  transition: .2s;
  -webkit-transition: .2s;
}

.orgchart.noncollapsable .node .edge {
  display: none;
}

.orgchart .edge:hover {
  color: #449d44;
  cursor: pointer;
}

.orgchart .node .verticalEdge {
  width: calc(100% - 10px);
  width: -webkit-calc(100% - 10px);
  width: -moz-calc(100% - 10px);
  left: 5px;
}

.orgchart .node .topEdge {
  top: -4px;
}

.orgchart .node .bottomEdge {
  bottom: -4px;
}

.orgchart .node .horizontalEdge {
  width: 15px;
  height: calc(100% - 10px);
  height: -webkit-calc(100% - 10px);
  height: -moz-calc(100% - 10px);
  top: 5px;
}

.orgchart .node .rightEdge {
  right: -4px;
}

.orgchart .node .leftEdge {
  left: -4px;
}

.orgchart .node .horizontalEdge::before {
  position: absolute;
  top: calc(50% - 7px);
  top: -webkit-calc(50% - 7px);
  top: -moz-calc(50% - 7px);
}

.orgchart .node .rightEdge::before {
  right: 3px;
}

.orgchart .node .leftEdge::before {
  left: 3px;
}

.orgchart .node .toggleBtn {
  position: absolute;
  left: 5px;
  bottom: -2px;
  color: rgba(68, 157, 68, 0.6);
}

.orgchart .node .toggleBtn:hover {
  color: rgba(68, 157, 68, 0.8);
}

.oc-export-btn {
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  background-color: #5cb85c;
  border: 1px solid transparent;
  border-color: #4cae4c;
  border-radius: 4px;
}

.oc-export-btn:hover,.oc-export-btn:focus,.oc-export-btn:active  {
  background-color: #449d44;
  border-color: #347a34;
}

.orgchart~.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  text-align: center;
  background-color: rgba(0,0,0,0.3);
}

.orgchart~.mask .spinner {
  position: absolute;
  top: calc(50% - 54px);
  left: calc(50% - 54px);
  color: rgba(255,255,255,0.8);
  font-size: 108px;
}

.orgchart .node {
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  top: 0;
  left: 0;
}

.orgchart .slide-down {
  opacity: 0;
  top: 40px;
}

.orgchart.l2r .node.slide-down, .orgchart.r2l .node.slide-down {
  top: 130px;
}

.orgchart .slide-up {
  opacity: 0;
  top: -40px;
}

.orgchart.l2r .node.slide-up, .orgchart.r2l .node.slide-up {
  top: -130px;
}

.orgchart .slide-right {
  opacity: 0;
  left: 130px;
}

.orgchart.l2r .node.slide-right, .orgchart.r2l .node.slide-right {
  left: 40px;
}

.orgchart .slide-left {
  opacity: 0;
  left: -130px;
}

.orgchart.l2r .node.slide-left, .orgchart.r2l .node.slide-left {
  left: -40px;
}

 
    .orgchart .node .title {
        display:flex;
      height: unset;
      text-align: left;
      line-height: 40px;
      width: auto;
    padding: 0 10px;

    }
     .select2-container {
      width: 100% !important; /* Full width of the parent container */
    }
    .select2-dropdown {
      width: 100% !important; /* Same width as the container */
      box-sizing: border-box; /* Ensure padding and border are included in width calculation */
    }

    /* Ensure that the selection box is also full width */
    .select2-selection {
      width: 100% !important;
      box-sizing: border-box;
    }
  #EmployeeSelection {
    position: absolute;
    border: 1px solid #ccc;
    background: white;
    z-index: 1000; /* Ensure it stays on top */
  }
    .orgchart .node .content {
                display:flex;

      text-align: left;
      padding: 0 10px;
      width: auto;
      border: 1px
    }
    .orgchart .node .content .symbol {
      color: #aaa;
      margin-right: 20px;
    }
    .oci-leader::before, .oci-leader::after {
      background-color: rgba(217, 83, 79, 0.8);
    }
    .orgchart .node .avatar {
      width: 60px;
      height: 60px;
      float: left;
      margin: 5px;

    }
    .orgchart .node .verticalEdge, .orgchart .node .horizontalEdge { display: none; }

    .dot {
  height: 15px;
  width: 15px;
      background-color: lightgreen; /* Set the dot color to green */
        right: 0;
        position: absolute;

}

.orgchart .node:hover {
      background-color:#BFBFBF;
}
.dot:hover {
  background-color: green; /* Change to green on hover */
}
.CheckBox:hover {
  background-color: blue; /* Change to green on hover */
}    
.CheckBox:hover {
  background-color: blue; /* Change to green on hover */
}

`,le}x(vt,"appendStyle");var v=Re(Ue(),1),yt=Re(Qt(),1);var Ke=Re(Ue(),1);var Je=Re(Ue(),1),Et=Re(Kt(),1),ae=Re(Ue(),1);function ei(){let le;(p=>(p[p.DIRECTOR=0]="DIRECTOR",p[p.DIVISION=1]="DIVISION",p[p.DEPARTMENT=2]="DEPARTMENT",p[p.SECTION=3]="SECTION"))(le||(le={}));let e=Object.keys(le).filter(n=>isNaN(Number(n)));function t(n){return(0,v.isEmptyOrNull)(n)?"":n.charAt(0).toUpperCase()+n.slice(1).toLowerCase()}x(t,"capitalizeFirstLetter");function r(n){return le[n]}x(r,"getEnumNameFromValue");function i(n){if(n.length===0)throw new Error("The list is empty.");return Math.max(...n)}x(i,"findMax");function a(n){let d=[];if(n.className!=null&&d.push("node "+n.className),n.children&&Array.isArray(n.children))for(let c of n.children)d=d.concat(a(c));return d}x(a,"extractClassesInOrgChart");function l(){var n=document.createElement("dialog");n.style.top="50%",n.style.left="50%",n.style.transform="translate(-50%, -50%)",n.innerHTML='  <button id="confirmAddEmployee" type="button" class="btn btn-light btn-rounded   " data-mdb-ripple-color="#ffffff" style="background-color:#c2f0c2">Confirm</button>  <button id="closeDialog" type="button" class="btn btn-light btn-rounded   " data-mdb-ripple-color="#ffffff" style="background-color:#ffcccc">Close</button> <span style=" white-space: nowrap;" id = "TargetElementSpan"></span>',n.id="EmployeeSelection",n.addEventListener("",()=>{n.close()}),n.querySelector("#closeDialog").addEventListener("click",()=>{n.close()}),n.querySelector("#confirmAddEmployee").addEventListener("click",()=>{var y=document.getElementById("EmployeeIdInput");if($(y).val()==""){(0,Je.notifyError)("Please fill in the Employee");return}let E=0,A;for(E=0;E<q.length;E++)if(q[E].id==$(y).val()){A=q[E].EmployeeName;break}var g=Ge(R,136,153),L=JSON.parse(JSON.stringify(P)),M=L,ee;if(g.length>1)for(let N=1;N<g.length;N++){ee=g[N];var X=r(N);M=st(M,ee);var B=`${X}${q[E][t(X)+"Id"]} Class`;if(B!=M.className){var ie=dt(t(r(2)),q[E][t(r(2))+"Id"]),V=dt(t(r(1)),q[E][t(r(1))+"Id"]),U=dt(t(r(3)),q[E][t(r(3))+"Id"]),F=`${q[E].EmployeeName} should be in `;(0,v.isEmptyOrNull)(U)||(F+=`${U} ${t(r(3))}, under `),(0,v.isEmptyOrNull)(ie)||(F+=`${ie} ${t(r(2))}, under `),(0,v.isEmptyOrNull)(V)||(F+=`${V} ${t(r(1))}`),(0,ae.alertDialog)(F);break}}var I=document.getElementById("chart-container"),H=I.querySelector(".orgchart");h=H.getAttribute("style"),b=H.getAttribute("data-pan-start"),I.innerHTML="";for(let N=0;N<I.children.length;N++)I.children[N].remove();ee=g[g.length-1],ot(M,ee,parseInt($(y).val()),A),P=L,Be(),I=document.getElementById("chart-container"),H=I.querySelector(".orgchart"),H.setAttribute("style",h),H.setAttribute("data-pan-start",b),n.close()});var f=document.createElement("table");f.id="EmployeeSelectionTable";var p=document.createElement("tr"),m=document.createElement("DIV"),C=document.createElement("img");C.setAttribute("id","employeeImg"),C.width=63,C.height=112.5,C.style.display="block",C.style.margin="0 auto",m.appendChild(C);var O=document.createElement("span");O.textContent="ID",O.style.display="block",O.style.whiteSpace="nowrap";var J=document.createElement("TD");J.appendChild(O);var T=document.createElement("span");T.textContent="Name",T.style.display="block",T.style.whiteSpace="nowrap";var Q=document.createElement("TD");Q.appendChild(T);var D=document.createElement("TD"),_=document.createElement("input");_.id="EmployeeIdInput",D.appendChild(_);var se=document.createElement("TD"),S=document.createElement("input");return S.id="EmployeeNameInput",se.appendChild(S),p.appendChild(J),p.appendChild(D),p.appendChild(Q),p.appendChild(se),f.appendChild(p),n.appendChild(m),n.appendChild(f),document.body.appendChild(n),n}x(l,"GenerateEmployeeChoosingDialog"),document.addEventListener("keydown",n=>{if(n.key==="Escape"){pdfDialog.close();var d=document.getElementById("EmployeeSelection");d.close()}});function s(){var n=document.createElement("dialog");n.id="pdfDialog",n.innerHTML=`
    <button id="closePdf" type="button" style="position: absolute; top: 10px; right: 10px; background-color: #ffcccc; border: none; font-size: 20px; cursor: pointer;">
        &times;
    </button>
     <div id="pdfTitle" style="margin: 20px 0; font-size: 20px;"></div>

     <div style="margin-top: 10px;">
        <button id="prevPdf" class="pdf-nav-btn btn btn-light btn-rounded">&lt;</button>
        <button id="nextPdf" class="pdf-nav-btn btn btn-light btn-rounded">&gt;</button>
    </div>
`,n.style.border="none",n.style.width="80%",n.style.height="80%",n.style.transform="translate(-50%, -50%)",n.style.position="fixed",n.style.top="50%",n.style.left="50%",n.querySelector("#closePdf").addEventListener("click",()=>{n.close()});var c=document.createElement("iframe");c.type="application/pdf",c.style.width="100%",c.style.height="calc(100% - 40px)",c.id="pdf",n.appendChild(c),document.body.appendChild(n),document.getElementById("prevPdf").addEventListener("click",()=>{be=(be-1+Ne.length)%Ne.length,o()}),document.getElementById("nextPdf").addEventListener("click",()=>{be=(be+1)%Ne.length,o()})}x(s,"GeneratePdfDialog");function o(){let n=document.getElementById("pdf");n.src=Ne[be];let d=document.getElementById("pdfTitle");d.textContent=nt[be],document.getElementById("prevPdf").disabled=be===0,document.getElementById("nextPdf").disabled=be===Ne.length-1}x(o,"updatePdf"),s();var h=null,b=null;let u=Object.values(le).filter(n=>typeof n=="number").sort((n,d)=>d-n),k=[],R="",Y=[];for(let n of Object.keys(le))if(isNaN(Number(n))){let d=le[n];k.push(d)}let pe=Math.min(...k),ne=i(k)+1,xt=l();var Jt=vt();document.head.appendChild(Jt);var Qe=document.createElement("div");Qe.id="chart-container",Qe.className="BigTab";var Me=document.createElement("div");Me.id="DepartmentPanel",Me.className="tabcontent";var He=document.createElement("div");He.id="DivisionPanel",He.className="tabcontent";var je=document.createElement("div");je.id="SectionPanel",je.className="tabcontent";var q=[],Fe=[];let Ce,P,Le,W;var et=(0,Ke.getLookup)("Occupation.Occupation"),Ct=(0,Ke.getLookup)("JobGrade.JobGrade");$t.List({},n=>{for(var d in n.Entities)(n.Entities[d].Resigned==1||n.Entities[d].Terminated==1||n.Entities[d].Retired==1)&&Fe.push(n.Entities[d].Id),q.push({id:n.Entities[d].Id,ImgPath:n.Entities[d].EmployeeImg,OccupationId:n.Entities[d].OccupationID,EmployeeName:n.Entities[d].EmployeeName,EmployeeId:n.Entities[d].EmployeeID,DivisionId:n.Entities[d].DivisionID,DepartmentId:n.Entities[d].DepartmentID,SectionId:n.Entities[d].SectionID,JobDescPath:n.Entities[d].JobDescription,JobGradeId:n.Entities[d].JobGradeID,SalaryDetails:n.Entities[d].BasicSalary});bt.List({},c=>{var f="",p=0,m=0;function C(I){let H=!1;if(Fe.includes(I.EmployeeRowId)&&(I.EmployeeRowId=null,H=!0),I.children)for(let N of I.children)C(N)&&(H=!0);return H}x(C,"setEmployeeRowIdToNull");function O(I,H){var N=!1,j=J(I.children,H);if(!(0,v.isEmptyOrNull)(j)){console.log(j.id);var Z=Ge(j.id,136,153);if(console.log(I),console.log(H),j){var z=I;z=de(z,j.id);let te=z.children||[];z=I;for(let re=0;re<Z.length-1;re++)z=st(z,Z[re]);let w=z.children.length;z.children=z.children.filter(re=>re.EmployeeRowId!=H),(0,v.isEmptyOrNull)(z.children)?z.children=te:z.children.push(...te),z.children.length!=w&&(N=!0),I=z}return N}}x(O,"removeNodeByEmployeeRowId");function J(I,H){for(let N of I){if(N.EmployeeRowId===H)return N;if(N.children){let j=J(N.children,H);if(j)return j}}return null}x(J,"findParentByEmployeeRowId");for(var T in c.Entities)c.Entities[T].Id>p&&(p=c.Entities[T].Id,m=parseInt(T),f=c.Entities[m].OrgChart);let Q=!1;(0,v.isEmptyOrNull)(f)||(Ce=JSON.parse(f),P=JSON.parse(JSON.stringify(Ce)),Q=C(P),Y=a(P)),Ze.List({},I=>{var H="",N=0,j=0;for(var Z in I.Entities)I.Entities[Z].Id>N&&(N=I.Entities[Z].Id,j=parseInt(Z),H=I.Entities[j].FinalOrgChart);if(!(0,yt.isEmptyObject)(Ce))Y=a(P),Q==!0?Be():Lt();else if($("#chart-container").children().length==0){var z=r(0),te=z,w=De(z,136,153),re={EmployeeRowId:null,hierarchyLevel:0,id:w,name:te,title:z,className:z+" Class"};P=re,Lt()}if(!(0,yt.isEmptyObject)(H)){Le=JSON.parse(H),W=JSON.parse(JSON.stringify(Le));var ve=!1;for(let fe=0;fe<Fe.length;fe++){var $e=O(W,Fe[fe]);$e==!0&&ve==!1&&(ve=$e)}}(0,v.isEmptyOrNull)(W)||(ve==!0?lt():It()),Ae(),ae.Authorization.userDefinition.Permissions[oe.HumanResources]&&Bt.List({},fe=>{var Ie=document.createElement("div");Ie.className="side-div";var ce=document.createElement("div");ce.id="DivisionTable",ce.className="wrapper",Ie.appendChild(ce);var ze=document.createElement("div");ze.className="wrapper";for(var _e in fe.Entities){var he=fe.Entities[_e].Id,Pe=fe.Entities[_e].Name,ue=at(he,Pe,1);ue.className="item",(0,v.isEmptyOrNull)(ue)||ze.appendChild(ue)}ce.appendChild(ze),He.appendChild(Ie),qt.List({},we=>{var ht=document.createElement("div");ht.className="side-div";var ke=document.createElement("div");ke.id="DepartmentTable",ke.className="wrapper",ht.appendChild(ke);var ye=document.createElement("div");ye.className="wrapper";for(var kt in we.Entities){var Ft=we.Entities[kt].Id,Yt=we.Entities[kt].Name,pt=at(Ft,Yt,2);pt.className="item",(0,v.isEmptyOrNull)(pt)||ye.appendChild(pt)}ke.appendChild(ye),Me.appendChild(ht),Dt.List({},ft=>{var ut=document.createElement("div");ut.className="side-div";var We=document.createElement("div");We.id="SectionTable",We.className="wrapper",ut.appendChild(We);var gt=document.createElement("div");gt.className="wrapper";for(var Tt in ft.Entities){var Vt=ft.Entities[Tt].Id,Gt=ft.Entities[Tt].Name,mt=at(Vt,Gt,3);mt.className="item",(0,v.isEmptyOrNull)(mt)||gt.appendChild(mt)}We.appendChild(gt),je.appendChild(ut),$("#defaultOpen").click(),Ae();var Te=document.getElementById("EmployeeIdInput");$(Te).on("change",function(){return Xe(this,null,function*(){$(ge).val()!=$(Te).val()&&$(ge).val($(Te).val()).trigger("change");var G=document.createElement("img");G.width=63,G.height=112.5,G.style.display="block",G.style.margin="0 auto";var Ee=$("#employeeImg");if((0,v.isEmptyOrNull)($(Te).val())){Ee.replaceWith(G),G.setAttribute("id","employeeImg");return}let K=0,me;for(K=0;K<q.length;K++)if(q[K].id==parseInt($(ge).val())){me=q[K].ImgPath;break}(0,v.isEmptyOrNull)($(ge).val())||(G.src="/upload/"+me),Ee.replaceWith(G),G.setAttribute("id","employeeImg")})});var ge=document.getElementById("EmployeeNameInput");$(ge).on("change",function(){return Xe(this,null,function*(){$(ge).val()!=$(Te).val()&&$(Te).val($(ge).val()).trigger("change");var G=document.createElement("img");G.width=63,G.height=112.5,G.style.display="block",G.style.margin="0 auto";var Ee=$("#employeeImg");if((0,v.isEmptyOrNull)($(ge).val())){Ee.replaceWith(G),G.setAttribute("id","employeeImg");return}let K=0,me;for(K=0;K<q.length;K++)if(q[K].id==parseInt($(ge).val())){me=q[K].ImgPath;break}(0,v.isEmptyOrNull)($(ge).val())||(G.src="/upload/"+me),Ee.replaceWith(G),G.setAttribute("id","employeeImg")})}),$("#searcher").on("input",function(){return Xe(this,null,function*(){var G=$("#searcher").val(),Ee=document.getElementsByClassName("tabcontent");let K;for(K=0;K<Ee.length&&Ee[K].style.display!="block";K++);var me=Ee[K].children[0].querySelector(".wrapper").querySelector(".wrapper").children;let Zt=new RegExp(G,"gi");for(K=0;K<me.length;K++)Zt.test(me[K].textContent)?me[K].style.display="":me[K].style.display="none"})});var Rt=0,Wt=q.length;let Xt=new Et.Select2Editor($("#EmployeeIdInput")),Ut=new Et.Select2Editor($("#EmployeeNameInput"));q.forEach(G=>{Rt+=1,Xt.addItem({id:G.id.toString(),text:G.EmployeeId.toString()}),Ut.addItem({id:G.id.toString(),text:G.EmployeeName.toString()}),Rt==Wt&&($("#EmployeeIdInput").trigger("change"),$("#EmployeeNameInput").trigger("change"))})})})})});var D=document.createElement("div");D.setAttribute("class","row div2"),D.setAttribute("id","ElementsTab");var _=document.createElement("div");_.setAttribute("class","tab");var se=document.createElement("nav"),S=document.createElement("div");S.innerHTML=`<div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                          <a class="tab-nav-item nav-link " id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="false">Organisation Structure</a>
                          <a class="tab-nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Organisation Chart</a>
                        </div>`,se.appendChild(S),document.querySelector("#GridDiv").appendChild(se),document.querySelector("#GridDiv").appendChild(Qe);var y=document.createElement("div");y.id="orgChartContainer",y.className="BigTab",document.querySelector("#GridDiv").appendChild(y);function E(I,H){var N,j,Z;if(H==g){$(".tab").show();let w=document.querySelector(".tablinks.active");if(w){console.log(w.textContent);var z=w.textContent+"Panel";document.getElementById(z)!=null&&(document.getElementById(z).style.display="block")}}else H==L&&($(".tab").hide(),$(".tabcontent").hide());for(j=document.getElementsByClassName("BigTab"),N=0;N<j.length;N++)j[N].style.display="none";for(Z=document.getElementsByClassName("tab-nav-item"),N=0;N<Z.length;N++)Z[N].className=Z[N].className.replace(" active","");document.getElementById(H)!=null&&(document.getElementById(H).style.display="block"),I.currentTarget.className+=" active";var te=document.getElementById("orgChartContainer");te.children.length==0&&!(0,v.isEmptyOrNull)(W)&&(It(),jt())}x(E,"openBig");function A(I,H){var N,j,Z;for(j=document.getElementsByClassName("tabcontent"),N=0;N<j.length;N++)j[N].style.display="none";for(Z=document.getElementsByClassName("tablinks"),N=0;N<Z.length;N++)Z[N].className=Z[N].className.replace("active","");document.getElementById(H)!=null&&(document.getElementById(H).style.display="block");var z=document.getElementById(H).children[0].querySelector(".wrapper").querySelector(".wrapper").children;for(let te=0;te<z.length;te++)z[te].style.display="";I.currentTarget.className+=" active"}x(A,"open");var g="chart-container",L="orgChartContainer",M=document.getElementById("nav-home-tab");M.addEventListener("click",function(){E(event,g)},!1);var ee=document.getElementById("nav-profile-tab");ee.addEventListener("click",function(){E(event,L)},!1),M.click(),ae.Authorization.userDefinition.Permissions[oe.HumanResources]&&(D.appendChild(_),D.appendChild(He),D.appendChild(je),D.appendChild(Me),document.querySelector(".content").appendChild(D));var X=document.createElement("div"),B=document.createElement("button");B.addEventListener("click",function(){A(event,"DepartmentPanel")},!1),B.setAttribute("class","tablinks"),B.innerText="Department",B.setAttribute("id","defaultOpen");var ie=document.createElement("button");ie.addEventListener("click",function(){A(event,"DivisionPanel")},!1),ie.setAttribute("class","tablinks"),ie.innerText="Division";var V=document.createElement("button");V.addEventListener("click",function(){A(event,"SectionPanel")},!1),V.setAttribute("class","tablinks"),V.innerText="Section",X.appendChild(ie),X.appendChild(B),X.appendChild(V);var U=document.createElement("div");U.innerHTML='    <input id="searcher" type="text" placeholder="Search..." style="margin-left: 10px;">',_.appendChild(X),_.appendChild(U);let F=null})});function Oe(n,d,c){if(n.className.includes(d))return n.children?n.children.push(c):n.children=[c],!0;if(n.children){for(let f of n.children)if(Oe(f,d,c))return!1}return!1}x(Oe,"addChildren");function Mt(n,d){if(n.children){for(let c of n.children)if(c.className===d.className)return!0}return!1}x(Mt,"hasChild");function tt(n,d,c){if(d.endsWith("Class")||(d=d+" Class"),n.className===d){var f=Mt(n,c);return f}if(n.children){for(let p of n.children)if(tt(p,d,c))return!0}return!1}x(tt,"checkRepeatedChildren");function qe(n,d){if(n.className===d)return n.title;if(n.children)for(let c of n.children){let f=qe(c,d);if(f)return f}return null}x(qe,"findTitleByClassName");function it(n,d){if(n.className===d)return n.id;if(n.children)for(let c of n.children){let f=it(c,d);if(f)return f}return null}x(it,"findIdByClassName");function rt(n,d,c){if(Array.isArray(n))for(let f=0;f<n.length;f++){let p=n[f];rt(p,d,c),p.className===d&&p.title===c&&(n.splice(f,1),f--)}else if(n.children&&(rt(n.children,d,c),n.className===d&&n.title===c))return null}x(rt,"deleteNodeByClassNameAndTitle");function wt(n,d){if(Array.isArray(n))for(let c=0;c<n.length;c++){let f=n[c];wt(f,d),f.className===d&&(n.splice(c,1),c--)}else if(n.children&&(wt(n.children,d),n.className===d))return null}x(wt,"deleteNodeByClassName");function Ht(n,d){n.children&&(n.children=n.children.filter(c=>c.EmployeeRowId===d?!1:Ht(c,d)),n.children.length===0&&delete n.children)}x(Ht,"deleteEmployee");function Ye(n){(0,v.isEmptyOrNull)(n)||n.children&&(n.children.forEach(d=>Ye(d)),n.children.length===0&&delete n.children)}x(Ye,"removeEmptyChildren");function Ve(n,d){if(!(0,v.isEmptyOrNull)(n.id)&&n.id.trim()===d.trim())return n.children||[];if(n.children&&Array.isArray(n.children))for(let c of n.children){let f=Ve(c,d);if(f)return f}return null}x(Ve,"findChildrenById");function jt(){new MutationObserver(d=>{for(let C of d)if(C.type==="childList"){var c=document.getElementById("orgChartContainer");if(!(0,v.isEmptyOrNull)(c)){var f=c.querySelector(".orgchart");if(!(0,v.isEmptyOrNull)(f)){var p=f.getElementsByClassName("node");for(let O=0;O<p.length;O++){var m=JSON.parse(p[O].getAttribute("data-source"));m.hierarchyLevel!=ne&&(p[O].draggable=!1)}}}}}).observe(document.body,{childList:!0,subtree:!0})}x(jt,"DisableOrgChartMovement");var Ne=[],nt=[];let be=0;function Ae(){let n=new MutationObserver(d=>{for(let _ of d)if(_.type==="childList"){var c=document.getElementsByClassName("node");if(c.length>0){let S=[];for(let y=0;y<c.length;y++){var f=c[y];S.push(f),S[y].addEventListener("dragover",function(E){let A=E;A.dataTransfer&&(E.preventDefault(),A.dataTransfer.dropEffect="move",E.stopImmediatePropagation())});var p=JSON.parse(S[y].getAttribute("data-source")),m=p.relationship;(m!="001"||c.length==1)&&ae.Authorization.userDefinition.Permissions[oe.HumanResources]&&(S[y].draggable=!0),S[y].addEventListener("drop",function(E){E.stopImmediatePropagation();var A=E.dataTransfer.getData("text/plain");if(!(0,v.isEmptyOrNull)(A)){var g=JSON.parse(A),L=$(E.target);if((0,v.isEmptyOrNull)(L.attr("class"))||L.attr("class").includes("avatar")&&(L=L.parent()),(0,v.isEmptyOrNull)(L.parent().attr("data-source")))for(;(0,v.isEmptyOrNull)(L.parent().attr("data-source"));)L=L.parent();var M=JSON.parse(L.parent().attr("data-source"));console.log(M);var ee=M.hierarchyLevel,X=M.className,B=M.id;console.log(g);var ie=Ge(B,136,153);if(!(0,v.isEmptyOrNull)(A)){var V=null,U=null,F=null,I=null;if(g.external&&(F=g.id,V=g.title,U=g.name,I=g.hierarchyLevel,ee>I&&!(0,v.isEmptyOrNull)(M.parentId))){var H=t(r(ee))+" cannot be above "+t(r(I));(0,Je.notifyError)(H),E.stopImmediatePropagation();return}var N=parseInt(L.parent().attr("class").replace("node","").replace("Class","").trim());if(N==parseInt(g.parentId)&&g.parentId!==void 0&&N!==void 0||(0,v.isEmptyOrNull)(g.parentId)&&(0,v.isEmptyOrNull)(g.external)||(0,v.isEmptyOrNull)(L.parent().attr("class")))return;var j=g.className;I==null&&(I=g.hierarchyLevel);var Z=L.parent().attr("class").replace("node","").trim().replace("focused","");if(Z==j)return;if(I==ne){let we=0;var z=parseInt(g.EmployeeRowId);for(we=0;we<q.length&&q[we].id!=z;we++);var te=JSON.parse(JSON.stringify(P)),w=te}g.external==null&&(I==ne?V=qe(W,j):V=qe(P,j)),F==null&&(I==ne?F=it(W,j):F=it(P,j)),U==null&&(U=j.replace("Class","").trim()),U=U.replace("focused","");var re;I==ne?re=Ve(W,F):re=Ve(P,F);for(var ve in re)if(re[ve].id==g.id)return;var $e=g.parentId,fe=parseInt(g.hierarchyLevel),Ie=parseInt(g.EmployeeRowId),ce={EmployeeRowId:null,hierarchyLevel:fe,id:F,name:V,title:V,className:`${F} Class`};if(I==ne&&(ce.EmployeeRowId=Ie,ce.className=`EMPLOYEE${Ie} Class`),I==ne){var w=W;if(w=de(w,B),!(0,v.isEmptyOrNull)(w)&&tt(w,X,ce))return}else{var w=P;if(w=de(w,B),console.log(B),tt(w,X,ce))return}if(I==ne){var te=JSON.parse(JSON.stringify(W)),w=te;w=de(w,$e),w.children=w.children.filter(ke=>ke.EmployeeRowId!==g.EmployeeRowId);for(var ve in re)w.children.push(re[ve]);W=te,w=W,w=de(w,B),(0,v.isEmptyOrNull)(w.children)||w.children.length==1&&(0,v.isEmptyOrNull)(w.EmployeeRowId)&&w.children[0].title==w.title&&((0,v.isEmptyOrNull)(w.children[0].EmployeeRowId)||(B=w.children[0].id,Z=w.children[0].className,w=w.children[0]));var ze=De(`EMPLOYEE${parseInt(g.EmployeeRowId)}`,136,153);ce.id=`${B}${ze}`,Oe(w,Z,ce),Ye(W);var _e=document.getElementById("orgChartContainer"),he=_e.querySelector(".orgchart");h=he.getAttribute("style"),b=he.getAttribute("data-pan-start"),_e.innerHTML="",(0,v.isEmptyOrNull)(W)||lt(),he=_e.querySelector(".orgchart"),he.setAttribute("style",h),he.setAttribute("data-pan-start",b)}else{var Pe=De(F,136,153);(0,v.isEmptyOrNull)(B)||(Pe=B+Pe);var ce={EmployeeRowId:null,hierarchyLevel:fe,id:Pe,name:V,title:V,className:`${F} Class`},w=P;if((0,v.isEmptyOrNull)(g.external)&&(w=de(w,$e),!(0,v.isEmptyOrNull)(w.children))){w.children=w.children.filter(ye=>ye.id!==g.id);for(var ve in re)w.children.push(re[ve])}w=P,(0,v.isEmptyOrNull)(ie)||(w=de(w,B)),Oe(w,Z,ce),Ye(P);var ue=document.getElementById("chart-container"),he=ue.querySelector(".orgchart");h=he.getAttribute("style"),b=he.getAttribute("data-pan-start"),ue.innerHTML="";for(let ye=0;ye<ue.children.length;ye++)ue.children[ye].remove();(0,v.isEmptyOrNull)(P)||Be(),ue=document.getElementById("chart-container"),he=ue.querySelector(".orgchart"),he.setAttribute("style",h),he.setAttribute("data-pan-start",b)}Ae(),E.dataTransfer.dropEffect="none"}}}),S[y].addEventListener("dragstart",function(E){E.stopImmediatePropagation();var A=E.target.getAttribute("data-source");E.dataTransfer.setData("text/plain",A),E.dataTransfer.dropEffect="move"})}n.disconnect()}var C=document.getElementsByClassName("avatar");for(let S=0;S<C.length;S++){var O=C[S];O.draggable=!1}var J=document.getElementsByClassName("side-div");for(let S=0;S<J.length;S++)J[S].addEventListener("drop",function(y){y.stopImmediatePropagation();var E=y.dataTransfer.getData("text/plain"),A=JSON.parse(E);console.log(A);var g=A.hierarchyLevel;if(!A.external){var L=A.hierarchyLevel,M=A.id,ee=A.title,X=A.name,B=A.className,ie=A.parentId;B==null&&(B=A.id);var V=Ve(P,M);if(L!=ne){var U=JSON.parse(JSON.stringify(P)),F=U;F=de(F,ie),rt(F,B,ee),console.log(JSON.parse(JSON.stringify(F))),F=U;var I=Ge(ie,136,153),H=`${I[I.length-1]}`,N=`${H} Class`;F=de(F,ie),console.log(ie);for(var j in V){var Z={EmployeeRowId:null,hierarchyLevel:V[j].hierarchyLevel,id:V[j].id,name:V[j].name,title:V[j].title,className:V[j].className};Oe(F,N,Z)}P=U,Ye(P);var z=document.getElementById("chart-container"),te=z.querySelector(".orgchart");h=te.getAttribute("style"),b=te.getAttribute("data-pan-start"),z.innerHTML="";for(let re=0;re<z.children.length;re++)z.children[re].remove();Ce=JSON.parse(JSON.stringify(P)),(0,v.isEmptyOrNull)(P)||Be(),z=document.getElementById("chart-container"),te=z.querySelector(".orgchart"),te.setAttribute("style",h),te.setAttribute("data-pan-start",b),y.dataTransfer.dropEffect="none";var w=r(g);M=M.replace(w,"")}}}),J[S].addEventListener("dragover",function(y){y.stopImmediatePropagation(),y.preventDefault()});var T=document.getElementsByClassName("CheckBox");for(let S=0;S<T.length;S++)T[S].addEventListener("change",x(function(){event.stopImmediatePropagation();let E=this.checked;var A=JSON.parse(this.parentElement.parentElement.getAttribute("data-source")),g=A.EmployeeRowId;for(let B=0;B<q.length&&q[B].id!=g;B++);var L=A.id,M=JSON.parse(JSON.stringify(W)),ee=M;ee=de(ee,L),ee.Rights[this.id]=E,W=M;let X=JSON.stringify(W);Ze.Create({Entity:{FinalOrgChart:X}})},"handleCheckboxChange"));$(".SelectEmployee").on("click",function(S){console.log("haha"),S.stopImmediatePropagation();let y=$(this);console.log(y.parent());let E=JSON.parse(y.parent().attr("data-source"));var A=E.id;console.log(E);var g=y.parent().attr("class");R=A;var L=g.replace("node","").trim();console.log(xt);var M=document.getElementById("TargetElementSpan");M.textContent=qe(P,L),qe(P,L),xt.show()}),$(".clickable-icon").on("click",function(S){S.stopImmediatePropagation(),console.log(S.target);for(var y=$(S.target),E=null;(0,v.isEmptyOrNull)(E);)E=y.attr("data-source"),y=y.parent();var A=JSON.parse(E),g=A.id,L=A.className,M=JSON.parse(JSON.stringify(P)),ee=M;ee=de(ee,g),ot(ee,L,null,null),P=M;var X=document.getElementById("chart-container"),B=X.querySelector(".orgchart");h=B.getAttribute("style"),b=B.getAttribute("data-pan-start"),X.innerHTML="";for(let ie=0;ie<X.children.length;ie++)X.children[ie].remove();Be(),X=document.getElementById("chart-container"),B=X.querySelector(".orgchart"),B.setAttribute("style",h),B.setAttribute("data-pan-start",b)}),$("#generateOrgChartButton").on("click",function(S){S.stopImmediatePropagation(),(0,v.isEmptyOrNull)(W)?(St(),Ae()):(0,Je.confirmDialog)("Do you want to generate Organization Chart? The original chart will be override.",()=>{St(),Ae()})}),$("#togglePanel").on("click",function(S){console.log("haha"),S.stopImmediatePropagation();function y(A){return window.getComputedStyle(A).display==="none"}x(y,"isDivHidden");let E=document.getElementById("ElementsTab");y(E)?(E.style.display="block",this.textContent="Hide Tab"):(E.style.display="none",this.textContent="Display Tab")}),$(".orgchart").addClass("noncollapsable");var Q=document.getElementById("orgChartContainer");if(!(0,v.isEmptyOrNull)(Q)&&ae.Authorization.userDefinition.Permissions[oe.HumanResources]){var D=Q.querySelector(".orgchart");if(!(0,v.isEmptyOrNull)(D)){var c=D.getElementsByClassName("node");for(let y=0;y<c.length;y++){var p=JSON.parse(c[y].getAttribute("data-source"));p.hierarchyLevel!=ne&&(c[y].draggable=!1),(0,v.isEmptyOrNull)(p.EmployeeRowId)||c[y].addEventListener("click",function(A){A.stopImmediatePropagation();var g=$(A.target);let L=!1;if(!g.hasClass("CheckBox")){g.hasClass("dot")&&(L=!0);for(var M=null;(0,v.isEmptyOrNull)(M);)M=g.attr("data-source"),g=g.parent();var ee=JSON.parse(M),X=ee.EmployeeRowId;if(L==!0){console.log(q);let V=q.find(U=>U.id===X);console.log(V);var B=document.getElementById("pdf");console.log(B),console.log($(B)),Ne=[],nt=[];try{let U=JSON.parse(V.JobDescPath);console.log(U);for(let F=0;F<U.length;F++)Ne.push(`/upload/${U[F].Filename}`),nt.push(`${U[F].OriginalName}`)}catch(U){B.src=`/upload/${V.JobDescPath}`}o(),be=0,pdfDialog.show();return}else{var ie=new zt(X);ie.loadByIdAndOpenDialog(X)}}})}}}}});n.observe(document.body,{childList:!0,subtree:!0})}x(Ae,"setCallbacks");function Nt(n){let d=[];if(n.EmployeeRowId!==void 0&&!(0,v.isEmptyOrNull)(n.EmployeeRowId)&&d.push(parseInt(n.EmployeeRowId)),n.children&&Array.isArray(n.children))for(let c of n.children)d=d.concat(Nt(c));return d}x(Nt,"extractEmployeeInOrgChart");function At(n){for(let c of n){let f=c.children||[];if(c.EmployeeRowId!=null&&c.hierarchyLevel!==ne){c.children=[];let p=`${c.id}${De(`EMPLOYEE${c.EmployeeRowId}`,136,153)}`;var d={EmployeeRowId:c.EmployeeRowId,hierarchyLevel:c.hierarchyLevel,name:c.name,id:p,title:c.title,className:`EMPLOYEE${c.EmployeeRowId} Class`,children:f.length?f:void 0};c.children.push(d),c.EmployeeRowId=null}f.length>0&&At(f)}return n}x(At,"ExtendTree");function de(n,d){if(n.id==d)return n;if(n.children)for(let f of n.children){var c=de(f,d);if(c)return c}return null}x(de,"SearchById");function St(){function n(g){let L=[];if(g.Rights&&g.EmployeeRowId&&L.push({id:g.id,EmployeeRowId:g.EmployeeRowId,Rights:g.Rights}),g.children)for(let M of g.children)L=L.concat(n(M));return L}x(n,"extractRightsAndEmployeeRowId");function d(g){if(g.hierarchy==0){var L={Appraisal:!0,LeaveApproval:!0,OtApproval:!0,MoneyClaiming:!0,Training:!0};g.Rights=L}else if((0,v.isEmptyOrNull)(g.Rights)&&!(0,v.isEmptyOrNull)(g.EmployeeRowId)){var L={Appraisal:!1,LeaveApproval:!1,OtApproval:!1,MoneyClaiming:!1,Training:!1};g.Rights=L}if(g.children)for(let M of g.children)d(M)}if(x(d,"fillInRights"),!(0,v.isEmptyOrNull)(W))var c=n(W);let f=Nt(P);console.log(JSON.parse(JSON.stringify(P)));var p=JSON.parse(JSON.stringify(P)),m;m=JSON.parse(JSON.stringify(p));for(let g=0;g<q.length;g++)if(!f.includes(q[g].id)){var C=m,O;for(var J in et.items)if(et.items[J].Id==q[g].OccupationId){O=et.items[J].Name.replace(/\s/g,"");break}var T=De(`EMPLOYEE${q[g].id}`,136,153),Q={EmployeeRowId:q[g].id,hierarchyLevel:ne,id:T,name:O,title:O,className:`EMPLOYEE${q[g].id} Class`},D;for(let L of Object.keys(le))if(isNaN(Number(L))){if((0,v.isEmptyOrNull)(q[g][`${t(L)}Id`]))continue;var _=`${L}${q[g][t(L)+"Id"]} Class`,se=C;if(C=st(C,_),(0,v.isEmptyOrNull)(C)){C=se,_=D;break}D=_}(0,v.isEmptyOrNull)(C)||f.includes(q[g].id)||(Q.id=C.id+Q.id,Oe(C,_,Q))}var S=m,y=At(S.children);if(S.children=[],S.children=y,!(0,v.isEmptyOrNull)(c))for(let g=0;g<c.length;g++){var C=m,E=de(C,c[g].id);(0,v.isEmptyOrNull)(E)||(E.Rights=c[g].Rights)}C=m,d(C),W=m;var A=document.getElementById("orgChartContainer");A.innerHTML="";for(let g=0;g<A.children.length;g++)A.children[g].remove();lt()}x(St,"GenerateOrgChartData");function at(n,d,c){var f=document.createElement("div");f.className="flex-child";var p=document.createElement("td"),m=document.createElement("div");p.appendChild(m);var C=le[c];m.className="flex-container "+C,m.style.border="1px solid #ccc",m.style.padding="10px",m.draggable=!0;var O=`{ "EmployeeRowId":"null","hierarchyLevel":"${c}" ,"id":"${C+n}",
        "type":"${c}","title":"${d}","external": "true","ElementId": "", "className":"${C+n} Class"}`;m.setAttribute("data-source",O),m.id=C+n.toString();var J=document.createElement("div");return J.textContent=d,J.className="CardTitle",f.appendChild(J),m.appendChild(f),m.addEventListener("dragstart",function(T){var Q=T.target,D=Q.getAttribute("data-source");T.dataTransfer.setData("text/plain",D),T.dataTransfer.dropEffect="move"}),m.addEventListener("dragend",function(T){}),p}x(at,"GenerateCard");function ot(n,d,c,f){if(d.endsWith("Class")||(d=d+" Class"),n.className===d)return n.EmployeeRowId=parseInt(c),!0;if(n.children){for(let p of n.children)if(ot(p,d,c,f))return!1}return!1}x(ot,"SetEmployeeByClassName");function st(n,d){d.endsWith("Class")||(d=d+" Class");let c=null;if((0,v.isEmptyOrNull)(n))return c;let f=[n];for(;f.length>0;){let p=f.shift();if(p.className===d)return p;p.children&&f.push(...p.children)}return c}x(st,"findByClassName");function Lt(){if(Ce=JSON.parse(JSON.stringify(_t(ct(P)))),new xe({chartContainer:"#chart-container",data:Ce,nodeContent:"title",nodeId:"thisOrgChart",zoom:!0,pan:!0,id:"orgStructure",createNode:function(c,f){let p="";c.hierarchyLevel!=ne&&(c.draggable=!1);let m=$(c);if((0,v.isEmptyOrNull)(f.EmployeeRowId))ae.Authorization.userDefinition.Permissions[oe.HumanResources]&&(p='<button type="button"  class="btn btn-light btn-rounded SelectEmployee" data-mdb-ripple-color="#ffffff" style="background-color:#e4dbd8"> <span style="display:block;">Select Employee</span> </button>',m.append(p));else{var C=q.find(_=>_.id===f.EmployeeRowId),O=C.ImgPath;if(p=` 

                    <div  style="display: flex; align-items: center; height: 100%;" class=" row">
                        </div>
                <div style="text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px">
                    <div style="text-align: left;height: 100%;width:100%;padding-right:0">
                            <div class="col-1"  style="font-size: 10px; display: flex; justify-content: space-between; align-items: center; width: 100%; white-space: nowrap;"> <span  style="display: block;white-space: nowrap;"> ${C.EmployeeName} </span>  </div>
                            </div>
                    `,m.append(p),f.hierarchyLevel!=ne&&ae.Authorization.userDefinition.Permissions[oe.HumanResources]){let _='<div class="fa fa-times btn clickable-icon"></div>';m.find(".col-1").append(_)}var J=document.createElement("div"),T=document.createElement("img");T.src=`/upload/${O}`,T.className="avatar",T.crossOrigin="anonymous",T.draggable=!1,T.width=63,T.height=112.5,T.style.marginRight="20px",T.onerror=function(){T.src=""},J.appendChild(T),m.find(".row").append(J)}m.find(".content").remove()}}),ae.Authorization.userDefinition.Permissions[oe.HumanResources]){var n=document.getElementById("chart-container"),d=document.createElement("div");d.innerHTML=`
            <button id="generateOrgChartButton" class="btn btn-light btn-rounded" style="top: 50px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);">Generate Organisation Chart</button>
            <button id="togglePanel" class="btn btn-light btn-rounded" style="bottom: 10px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);">Hide Tab</button>
            `,n.appendChild(d)}}x(Lt,"GenerateOrgStructure");function Be(){Ce=JSON.parse(JSON.stringify(P));let n=ct(P);for(let m=0;m<n.length;m++)Pt.Create({Entity:{ParentId:n[m].parentId,NodeId:n[m].id,Name:n[m].name,Title:n[m].title,ClassName:n[m].className,HierarchyLevel:n[m].hierarchyLevel,EmployeeRowId:n[m].EmployeeRowId}});let d=new xe({chartContainer:"#chart-container",data:Ce,nodeContent:"title",nodeId:"thisOrgChart",zoom:!0,pan:!0,id:"orgStructure",createNode:function(m,C){let O="",J=$(m);if((0,v.isEmptyOrNull)(C.EmployeeRowId))ae.Authorization.userDefinition.Permissions[oe.HumanResources]&&(O='<button type="button"  class="btn btn-light btn-rounded SelectEmployee" data-mdb-ripple-color="#ffffff" style="background-color:#e4dbd8"> <span style="display:block;">Select Employee</span> </button>',J.append(O));else{var T=q.find(y=>y.id===C.EmployeeRowId),Q=T.ImgPath;if(O=` 
                    <div  style="display: flex; align-items: center; height: 100%;" class=" row">
                        </div>
                <div style="text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px">
                    <div style="text-align: left;height: 100%;width:100%;padding-right:0">
                            <div class="col-1"  style="font-size: 10px; display: flex; justify-content: space-between; align-items: center; width: 100%; white-space: nowrap;"> <span  style="display: block;white-space: nowrap;"> ${T.EmployeeName} </span>  </div>
                            </div>
                    `,J.append(O),C.hierarchyLevel!=ne&&ae.Authorization.userDefinition.Permissions[oe.HumanResources]){let y='<div class="fa fa-times btn clickable-icon"></div>';J.find(".col-1").append(y)}var D=document.createElement("div"),_=document.createElement("img");_.src=`/upload/${Q}`,_.className="avatar",_.crossOrigin="anonymous",_.draggable=!1,_.width=63,_.height=112.5,_.style.marginRight="20px",_.onerror=function(){_.src=""},D.appendChild(_),J.find(".row").append(D)}J.find(".content").remove()}});d.chart.style=h;var c=document.getElementById("chart-container"),f=document.createElement("div");f.innerHTML=`
            <button id="generateOrgChartButton" class="btn btn-light btn-rounded" style="top: 50px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);">Generate Organisation Chart</button>
            <button id="togglePanel" class="btn btn-light btn-rounded" style="bottom: 10px; right: 10px; position: absolute; background-color: rgb(197, 216, 240);">Hide Tab</button>
            `,c.appendChild(f),Ae();let p=JSON.stringify(P);bt.Create({Entity:{OrgChart:p}})}x(Be,"GenerateSaveOrgStructure");function It(){Le=JSON.parse(JSON.stringify(W)),console.log(_t(ct(W))),new xe({chartContainer:"#orgChartContainer",data:Le,nodeContent:"title",nodeId:"thisOrgChart",zoom:!0,pan:!0,id:"orgChart",createNode:function(n,d){let c="";n.hierarchyLevel==ne&&(n.draggable=!1);let f=$(n);if(!(0,v.isEmptyOrNull)(d.EmployeeRowId)){var p=q.find(y=>y.id===d.EmployeeRowId),m="";(0,v.isEmptyOrNull)(p.JobGradeId)||(m=Ct.itemById[p.JobGradeId].Name);var C=ae.Authorization.userDefinition.Permissions[oe.HumanResources]==!0?p.SalaryDetails:"N/A",O=p.ImgPath;if(c=` 
                    <div  style=" display: flex; align-items: center; height: 100%; flex-direction: column;" class=" rowData">
                        </div>
                    <div style=" text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px">
                    <div style="text-align: left;height: 100%;width:100%;padding-right:0">
                            <div class="col-1"  style="font-size: 10px; display: flex; justify-content: space-between; align-items: center; width: 100%; white-space: nowrap;"> <span  style="display: block;white-space: nowrap;"> Name : ${p.EmployeeName} <br> Job Grade : ${m} <br> Salary Details : ${C} </span>  </div>
                            </div>
                    `,ae.Authorization.userDefinition.Permissions[oe.HumanResources]&&d.hierarchyLevel!=ne&&d.hierarchyLevel!=0){var J;if((0,v.isEmptyOrNull)(d.Rights))J=`
                    <div>
                    <i class="fas fa-band-aid" title="Approve Leave Requests" ></i>
                    <i class="fa fa-wrench" title="Approve Overtime Requests"></i>
                    <i class="fa fa-money-bill" title="Approve Money Claiming Requests"></i>
                    <i class="fa fa-check"  title="Evaluate Employee Requests"></i>
                    <i class="far fa-clock" title="Manage Training Requests"></i>
                    </div>
                    <div>
                    <input class = "CheckBox"  id="LeaveApproval" type="checkbox"  title="Approve Leave Requests">
                    <input  class = "CheckBox" id="OtApproval" type="checkbox" title="Approve Overtime Requests">
                    <input class = "CheckBox"  id="MoneyClaiming" type="checkbox" title="Approve Money Claiming Requests" >
                    <input class = "CheckBox"  id="Appraisal" type="checkbox" title="Evaluate Employee Requests" >
                    <input class = "CheckBox"  id="Training" type="checkbox" title="Manage Training Requests" >

                    </div>    
`;else{J=`
                <div>
                    <i class="fas fa-band-aid" title="Approve Leave Requests"></i>
                    <i class="fa fa-wrench" title="Approve Overtime Requests"></i>
                   <i class="fa fa-money-bill" title="Approve Money Claiming Requests"></i>
                    <i class="fa fa-check" title="Evaluate Employee Requests"></i>
                    <i class="far fa-clock" title="Manage Training Requests"></i>
                </div>
                <div>
            `;var T=["LeaveApproval","OtApproval","MoneyClaiming","Appraisal","Training"];for(let y of T){var Q=d.Rights[y];let E=Q?"checked":"";J+=`
                    <input class="CheckBox" id="${y}" type="checkbox" title="${y.replace(/([A-Z])/g," $1")}" ${E}>
                `}J+="</div>"}c=J+c}f.append(c);var D=document.createElement("img");D.src=`/upload/${O}`,D.className="avatar",D.crossOrigin="anonymous",D.draggable=!1,D.width=63,D.height=112.5,D.style.marginRight="20px",D.onerror=function(){D.src=""};let S=f.find(".rowData");S.append(D);var _=document.createElement("span");_.className="dot",ae.Authorization.userDefinition.Permissions[oe.HumanResources]&&S.append(_)}f.find(".content").remove()}})}x(It,"GenerateOrgChart");function lt(){Le=JSON.parse(JSON.stringify(W)),new xe({chartContainer:"#orgChartContainer",data:Le,nodeContent:"title",nodeId:"thisOrgChart",zoom:!0,pan:!0,id:"orgChart",createNode:function(d,c){let f="",p=$(d);if(!(0,v.isEmptyOrNull)(c.EmployeeRowId)){var m=q.find(E=>E.id===c.EmployeeRowId),C=Ct.itemById[m.JobGradeId].Name,O=ae.Authorization.userDefinition.Permissions[oe.HumanResources]==!0?m.SalaryDetails:"N/A",J=m.ImgPath;if(f=` 
                    <div  style="display: flex; align-items: center; height: 100%; flex-direction: column;" class=" rowData">
                        </div>
                <div style="text-align: left;height: 100%;padding-right:0;align-items: center;justify-content: center;display: flex;padding-top: 5px;padding-bottom: 5px">
                    <div style="text-align: left;height: 100%;width:100%;padding-right:0">
                            <div class="col-1"  style="font-size: 10px; display: flex; justify-content: space-between; align-items: center; width: 100%; white-space: nowrap;"> <span  style="display: block;white-space: nowrap;"> Name : ${m.EmployeeName} <br> Job Grade : ${C} <br> Salary Details : ${O} </span>  </div>
                            </div>`,c.hierarchyLevel!=ne&&c.hierarchyLevel!=0){var T;if((0,v.isEmptyOrNull)(c.Rights))T=`
                    <div>
                 <i class="fas fa-band-aid" title="Approve Leave Requests"></i>
                    <i class="fa fa-wrench" title="Approve Overtime Requests"></i>
                   <i class="fa fa-money-bill" title="Approve Money Claiming Requests"></i>
                    <i class="fa fa-check" title="Evaluate Employee Requests"></i>
                    <i class="far fa-clock" title="Manage Training Requests"></i>
                    </div>
                    <div>
                    <input class = "CheckBox"  id="LeaveApproval" type="checkbox"  title="Approve Leave Requests">
                    <input  class = "CheckBox" id="OtApproval" type="checkbox" title="Approve Overtime Requests">
                    <input class = "CheckBox"  id="MoneyClaiming" type="checkbox" title="Approve Money Claiming Requests" >
                    <input class = "CheckBox"  id="Appraisal" type="checkbox" title="Evaluate Employee Requests" >
                    <input class = "CheckBox"  id="Training" type="checkbox" title="Manage Training Requests" >

                    </div>    
`;else{T=`
                <div>
                     <i class="fas fa-band-aid" title="Approve Leave Requests"></i>
                    <i class="fa fa-wrench" title="Approve Overtime Requests"></i>
                   <i class="fa fa-money-bill" title="Approve Money Claiming Requests"></i>
                    <i class="fa fa-check" title="Evaluate Employee Requests"></i>
                    <i class="far fa-clock" title="Manage Training Requests"></i>
                </div>
                <div>`;var Q=["LeaveApproval","OtApproval","MoneyClaiming","Appraisal","Training"];for(let E of Q){var D=c.Rights[E];let A=D?"checked":"";T+=`
                    <input class="CheckBox" id="${E}" type="checkbox" title="${E.replace(/([A-Z])/g," $1")}" ${A}>
                `}T+="</div>"}f=T+f}p.append(f);var _=document.createElement("img");_.src=`/upload/${J}`,_.className="avatar",_.crossOrigin="anonymous",_.draggable=!1,_.width=63,_.height=112.5,_.style.marginRight="20px",_.onerror=function(){_.src=""};let y=p.find(".rowData");y.append(_);var se=document.createElement("span");se.className="dot",ae.Authorization.userDefinition.Permissions[oe.HumanResources]&&y.append(se)}p.find(".content").remove()}}),Ae();let n=JSON.stringify(W);Ze.Create({Entity:{FinalOrgChart:n}})}x(lt,"GenerateSaveOrgChart");function dt(n,d){var c,f=(0,Ke.getLookup)(`${t(n)}.${t(n)}`);for(var p in f.items)if(f.items[p].Id==d){c=f.items[p].Name.replace(/\s/g,"");break}return c}x(dt,"GetLookupValueFromId");function Ge(n,d,c){var f="",p=!1,m=[];for(let O=0;O<n.length;O++){var C=n.charCodeAt(O);C==d||p==!0&&C!=c?(p==!0&&(f+=n[O].toString()),p=!0):C==c&&(m.push(f),p=!1,f="")}return m}x(Ge,"DecomposeStringToList");function De(n,d,c){var f=String.fromCharCode(d)+n+String.fromCharCode(c);return f}x(De,"EncodeString");function ct(n){let d=[],c=[];function f(m,C){d.push({id:m.id,EmployeeRowId:m.EmployeeRowId,name:m.name,title:m.title,className:m.className,hierarchyLevel:m.hierarchyLevel,parentId:C}),m.children&&m.children.forEach(O=>f(O,m.id))}x(f,"processNode");function p(m){m.Rights&&c.push({id:m.id,Rights:m.Rights}),m.children&&m.children.forEach(C=>p(C))}return x(p,"extractRights"),p(n),f(n,null),d}x(ct,"splitIntoNodes");function _t(n){let d={},c=null;n.forEach(p=>{d[p.id]=Ot({},p)}),n.forEach(p=>{p.parentId?(d[p.parentId].children||(d[p.parentId].children=[]),d[p.parentId].children.push(d[p.id])):c=d[p.id]});function f(p){return p.children&&(p.children=p.children.filter(f),p.children.length===0&&delete p.children),p}return x(f,"removeEmptyChildren"),f(c)}x(_t,"buildHierarchy")}x(ei,"pageInit");export{ei as default};
//# sourceMappingURL=OrganisationChartPage.js.map
