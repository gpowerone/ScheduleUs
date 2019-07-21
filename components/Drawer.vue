<template>
  <div>
    <v-toolbar/>
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
        { icon: 'event', text: "Create Event", action: '/', display: true },
        { icon: 'event_seat', text: "My Events", action: '/myevents', display: false },
        { icon: 'https', text: "Log In", action: '/auth', display: true },
        { icon: 'person_add', text: "Sign Up", action: '/signup', display: true },
        { icon: 'cake', text: "About", action: '/about', display: true },    
        { icon: 'all_inclusive', text: "Premium", action: '/premium', display: true },
        { icon: 'phone', text: "Contact Us", action: '/contact', display: true },
        { icon: 'exit_to_app', text: "Logout", action: '/logout', display: false }
      ]
    }
  }
}
</script>
