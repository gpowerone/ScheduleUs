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
    background:green;
    color:#FFF;
    padding:2% 4%;
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
    background-color:#ffffe6!important;
    border-bottom:1px solid #666699;
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
    background-color:#ffffe6;
    border:1px solid #666699;
    padding:2%;
    margin-top:10px;
}
.accheader span, .accheader i {
    vertical-align:middle;
    font-weight: bold;
}
.accheader i {
    color: rgb(102, 102, 153);
}
.accheader span {
    color: rgb(102, 102, 153);
}
.acccontent {
    border-left: 1px solid #666699;
    border-right: 1px solid #666699;
    border-bottom: 1px solid #666699;
    padding:3%;
   
}
.textcenter {
  text-align:center;
}
.notopmargin {
    margin-top:0px;
}
input.textfield, select.textfield {
      border:1px solid gray;
      height:4vh;
      padding:3px;
      width:100%;
}   
.linkbtn {
    background:transparent;
    color:#666699;
    padding:0%;
    text-decoration:underline;
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
.redButton {
  background:red;
}
.menuSize,.iconSize {
   color:#777777;
}
.primary--text .menuSize {
   color:rgb(25, 118, 210)!important;
}
.menuSize {
   font-size:17px!important;
}
.iconSize {
   font-size:30px!important;
}
.menuHeader {
   font-size:25px;
}
.schdusPurple {
   color:#a80cba;
}

</style>