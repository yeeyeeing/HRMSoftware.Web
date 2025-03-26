export default function appendStyle() {

    var Linkx = document.createElement('style')
    Linkx.textContent = `
    .scrollable {
            max-height: 200px;
            overflow-y: auto;
            padding: 10px;
        }

.left-panel-class {
  position: fixed; /* Sticks to the left side of the page */
display: flex;
     flex-direction: row; /* Align children in a row */
    z-index: 9999; /* Bring the panel to the front */
  background-color: #f4f4f4; /* Light gray background */
  border-right: 1px solid #ccc; /* Optional border */
  padding: 15px; /* Padding inside the panel */
}

.nested {
    list-style-type: none;
    padding-left: 20px; /* Indent nested lists */
    margin-left: 10px; /* Provide left margin for nested lists */
    display: block; /* Ensure it's vertically aligned */
}



/* Add some space between the checkbox and text */
.filterCheckBox {
    margin-left: 10px;
}
.OrgChartFilterCheckBox {
    margin-left: 10px;
}
/* Optional: Style the toggle button */
.toggle {
    cursor: pointer;
    color: #007BFF;
    text-decoration: underline;
    margin-right: 10px; /* Space between the toggle and checkbox */
}
.select2-container {
    width: 100% !important;  /* Ensure Select2 matches the input width */
    box-sizing: border-box;
}

.select2-selection {
    height: 100% !important;  /* Match input height */
    line-height: normal;
}

.select2-selection__rendered {
    padding: 8px !important;  /* Adjust text alignment */
}

.select2-selection__arrow {
    height: 100% !important;
}

.select2-container .select2-choice {
    height: 100% !important;
    line-height: normal;
    padding: 0 8px;
}

    .flex-container {
        display: flex;
     flex-direction: row; /* Align children in a row */
}

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
    background-color: #f8f9fa;
  height: auto;
  border: 1px solid #aaa;
  margin: 0.5rem;
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

`

    return Linkx
}