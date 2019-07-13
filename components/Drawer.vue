<template>
  <div>
    <v-toolbar class="indigo" flat/>
    <v-list dense>
      <template v-for="(item, i) in items">
        <div v-if="item.display" :key="i">
          <v-divider dark v-if="item.divider" :key="i"></v-divider>
          <v-list-tile :to="item.action" :key="i" v-else>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </template>
    </v-list>
  </div>
</template>


<script>
export default {
  name: "drawer",
  data: function() {
    return {
      items: [
        { icon: 'nfc', text: "Create Event", action: '/',  display:true },
        { icon: 'nfc', text: "Login", action: '/Auth', display:true }
      ]
    }
  }
}
</script>
