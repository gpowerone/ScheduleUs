<template>
  <v-app scheduleus>
    <myToolbar />
    <v-content>
      <v-slide-y-transition mode="out-in">
        <v-container pa-0 fluid fill-height align-content-center align-center>
          <router-view></router-view>
        </v-container>
      </v-slide-y-transition>
    </v-content>
  </v-app>
</template>

<script>
import myToolbar from "@/components/Toolbar"
export default {
  name: 'app',
  components: {myToolbar}
}
</script>

<style>
.authenticator > div {
    padding: 0;
    min-width: 100%;
    box-shadow: none;
    -webkit-box-shadow: none;
}
</style>