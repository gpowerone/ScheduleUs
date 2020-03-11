<template>
  <div>
    <v-toolbar class="drawerHeader" flat>
      <v-toolbar-title class="schdusPurple menuHeader">Menu</v-toolbar-title>
    </v-toolbar>
    <v-list dense>
      <template v-for="(item, i) in items">
        <div v-if="item.display" :key="i">
          <v-divider dark v-if="item.divider" :key="i"></v-divider>
          <v-list-tile class="menuItem" :to="item.action" :key="i" v-else>
                <v-list-tile-action>
                  <v-icon class="iconSize">{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="menuSize">
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
          </v-list-tile>         
        </div>
      </template>
    </v-list>
  </div>
</template>

<style scoped>
.menuHeader {
   font-family: 'Dream Orphans';
   font-size:25px;
}
.menuItem {
  border-bottom:1px dotted #AAA;
}
.menuSize {
   color:#555;
}

.primary--text .menuSize, .primary--text .iconSize {
   color:#a80cba!important;
}
.menuSize {
   font-family: 'Aileron';
   font-size:16px!important;
}
.iconSize {
   font-size:28px!important;
   color:rgb(25, 118, 210);
}

</style>

<script>
import { EventBus } from '../bus';

export default {
  name: "drawer",
  data: function() {
    return {
      items: [            
        { icon: 'event_seat', text: "My Events", action: '/dashboard', display:false },  
        { icon: 'event', text: "Schedule Event", action: '/create', display: false },   
        { icon: 'https', text: "Log In", action: '/auth', display:false },
        { icon: 'person_add', text: "Sign Up", action: '/signup', display:false },
        { icon: 'person', text: "My Account", action: '/myaccount', display:false },
        { icon: 'star', text: "Premium", action: '/premium', display:false },
        { icon: 'phone', text: "Contact Us", action: '/contact', display:false },
        { icon: 'home', text: "Home", action: '/', display:true },
        { icon: 'exit_to_app', text: "Logout", action: '/logout', display:false }      
      ]
    }
  },
  mounted() {
      this.updateMenu();

      EventBus.$on("MenuUpdateEvent", () => {
         this.updateMenu();
      })
  },
  methods: {
     isLoggedIn: function() {
        var c = localStorage.getItem("_c");
        if (typeof(c)==="undefined" || c===null || c==="null") {

            return false;
        }
        return true;
     },
     updateMenu: function() {
        var isIOS=false;
        if (typeof (window.cordova)!=="undefined" && window.cordova.platformId==="ios") {
          isIOS=true;
        }

        this.items[0].display=(this.isLoggedIn()===true);
        this.items[1].display=(this.isLoggedIn()===true);
        this.items[2].display=(this.isLoggedIn()===false);
        this.items[3].display=(this.isLoggedIn()===false);
        this.items[4].display=(this.isLoggedIn()===true);
        this.items[5].display=(this.isLoggedIn()===true)&&!isIOS;    
        this.items[6].display=true;
        this.items[8].display=(this.isLoggedIn()===true);
     }
  }
}
</script>
