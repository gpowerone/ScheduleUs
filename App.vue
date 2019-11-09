<template>
  <v-app>
    <myToolbar />
    <v-content style="padding:0px!important;">
      <v-slide-y-transition mode="out-in">
        <v-container class="dmContainer" pa-0 fluid align-content-center align-center>
          <div class="layout row dmRowContainer">
            <div class="desktopOnly lg2 toolbarMenu">
                <myContentDrawer />
            </div>
            <div class="dmRouter">
              <router-view></router-view>
            </div>
          </div>
        </v-container>
      </v-slide-y-transition>
    </v-content>
    <myFooter />
  </v-app>
</template>

<style>
   @import 'assets/coreStyles.css';
   @import 'assets/desktopStyles.css';
</style>

<script>
import myToolbar from "@/components/Toolbar"
import myFooter from "@/components/Footer"
import myContentDrawer from "@/components/Drawer"
export default {
  name: 'app',
  components: {myToolbar, myFooter, myContentDrawer}
}
</script>
