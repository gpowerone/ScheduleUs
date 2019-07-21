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

/* Utility classes */
.moduleWrapper {
    padding:5%;
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
.fullWidth {
    width:100%
}
.emphasis1 {
  font-weight:bold;
}
.highlightbox {
  font-size:0.9em;
}

</style>