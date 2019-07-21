<template>
  <div>
    <div>
    <v-navigation-drawer v-model="drawer" app>
      <myContentDrawer />
    </v-navigation-drawer>

    <v-toolbar clipped-left flat app>
      <v-toolbar-side-icon  @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="mt-2" @click="goHome"><img src="@/assets/ScheduleUsWeb.png" width="150" alt="Schedule Us Logo" /></v-toolbar-title>
    </v-toolbar>
    </div>
   
  </div>
</template>

<script>
import myContentDrawer from "@/components/Drawer"

export default {
  name: "Toolbar",
  components: {myContentDrawer},
  data: function() {
    return {
      drawer: false
    }
  },
  mounted: function () {
    // Listen for event openDrawer (triggered by other component, like the button in the home)
    document.addEventListener("toggleDrawer", this.toggleDrawer);
  },
  beforeDestroy: function () {
    // If the component is unmount, unlisten the event.
    document.removeEventListener("toggleDrawer", this.toggleDrawer);
  },
  methods: {
    toggleDrawer (){
      this.drawer = !this.drawer;
    },
    goHome (){
      window.location.hash = "/";
    }
  }
}
</script>
