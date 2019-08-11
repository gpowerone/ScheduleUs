<template>
  <v-app>
    <myToolbar />
    <v-content>
      <v-slide-y-transition mode="out-in">
        <v-container pa-0 fluid align-content-center align-center>
          <router-view></router-view>
        </v-container>
      </v-slide-y-transition>
    </v-content>
    <myFooter />
  </v-app>
</template>

<script>
import myToolbar from "@/components/Toolbar"
import myFooter from "@/components/Footer"
export default {
  name: 'app',
  components: {myToolbar, myFooter}
}
</script>

<style>
/* Define global styles here */
button {
    background:#cc3300;
    color:#FFF;
    padding:1% 4%;
    border-radius:6px;
}

.linkbtn {
    background:transparent;
    border:none;
    padding:2px;
    color:#777;
    padding:0%;
    font-weight:bold;
    text-decoration:underline;
    border:none;
}

.schdusButton {
    background: #a80cba;
}

.tanButton {
   background:#ffffee;
   color:#666699;
   padding:2px 4px;
   border:1px solid #666699;
}

.transButton {
   background:transparent;
   border:none;
   text-decoration:none;
   color:#777;
}

.redButton {
  border:none;
  background:red;
}

button span, button i {
  vertical-align: middle!important;
}

h1 {
    color:#4d79ff;
    font-size:1.4rem;
}

/* Layout specific */
.v-content {
   background-color:#FFF!important;
}
.v-toolbar {
    background-color:#FFF!important;
    border-bottom:1px solid #777;
}
.v-toolbar__side-icon {
    color: #666699!important;
}
.v-toolbar .material-icons {
  font-size:38px;
}
.v-collapse-content {
  display:none;
}
.v-collapse-content-end {
  display:block!important;
}

/* Utility classes */
.moduleWrapper {
    padding:5%;
}
.accheader {

    border:1px solid #777;
    padding:2%;
    margin-top:10px;
}
.accheader span, .accheader i {
    vertical-align:middle;
    font-weight: bold;
}
.accheader i {
    color: #777;
}
.accheader span {
    color: #777;
}
.acccontent {
    border-left: 1px solid #666699;
    border-right: 1px solid #666699;
    border-bottom: 1px solid #666699;
    padding:3%;
   
}
.biggerisbadder {
   font-size:1.3rem;
}
.boldchoice { 
    font-weight:bold;
}
.btop {
    border-top:1px solid #777;
}
.fieldwell label {
    color: #777;
    font-weight:bold;
}
.fieldwell {
    color:#777;
}
.indented1 {
    padding-left:5%;
}
.spfield span, .spfield i {
  color:#777!important;
  vertical-align:middle!important;
}
.textcenter {
  text-align:center;
}
.textright {
  text-align:right;
}
.textleft {
  text-align:left;
}
.nopadding {
    padding:0px!important;
}
.notopmargin {
    margin-top:0px;
}
input.textfield, select.textfield {
      border:1px solid #b4cde4;
      height:4vh;
      padding:3px;
      width:100%;
      border-radius:6px;
      color:#777;
}   
.fieldwell input:focus, .fieldwell select:focus {
     box-shadow: 0 0 5px #a80cba;
     padding: 3px 0px 3px 3px;
     margin: 5px 1px 3px 0px;
     border: 1px solid #a80cba;
}

.nounderline {
    text-decoration:none!important;
}
.buttonwell {
    margin-top:4%;
}
.errorBox {
   border:2px solid #800000;
   background-color: #ff3333;
   color:white;
   padding:2%;
   margin-bottom:5px;
}
.okBox {
   border:2px solid darkgreen;
   background-color: forestgreen;
   color:white;
   padding:2%;
   margin-bottom:5px;
}
.pl2 {
   padding-left:2%;
}
.p2 {
   padding:2%;
}
.fullWidth {
    width:100%
}
.paddedField {
    padding:3%;
}
.emphasis1 {
  font-weight:bold;
}
.highlightbox {
  font-size:0.9em;
}

.menuSize,.iconSize {
   color:#777;
}
.primary--text .menuSize {
   color:rgb(25, 118, 210)!important
}
.menuSize {
   font-size:13px!important;
}
.iconSize {
   font-size:28px!important;
}
.menuHeader {
   font-size:25px;
}
.schdusPurple {
   color:#a80cba;
}
.stdPadding {
   padding:5%;
}
.borderTopLinks {
   border-left:1px solid #777;
   border-bottom:1px solid #777;
   border-right:1px solid #777;
}
 .year-month-wrapper, .nav-r, .nav-l, .activePort {
    background-color: #a80cba!important;
 }

 .okButton, .days {
     color: #a80cba!important;
 }

.relative {
    position:relative;
}

 .vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

</style>