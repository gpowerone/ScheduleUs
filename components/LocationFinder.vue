<template>
    <div class="locationFinder">
        <div v-show="hasGeoLocation===true">
            <h1>Where Do You Want To Go?</h1>
            <div class="layout row mt-2">
                <div class="flex xs6">
                    <div class="mt-4 spfield fieldwell">
                        <v-icon>restaurant</v-icon> Restaurant
                    </div>
                    <div class='mt-4 spfield fieldwell'>
                        <v-icon>local_bar</v-icon> Bar/Nightlife
                    </div>
                    <div class='mt-4 spfield fieldwell'>
                        <v-icon>nature</v-icon> Park
                    </div>
                </div>
                <div class="flex xs6"> 
                    <div class='mt-4 spfield fieldwell'>
                        <v-icon>local_mall</v-icon> Retail Store/Mall
                    </div>
                    <div class="mt-4 spfield fieldwell">
                        <v-icon>golf_course</v-icon> Sporting Activity
                    </div>
                    <div class="mt-4 spfield fieldwell">
                        <v-icon>account_balance</v-icon> Museum
                    </div>
                </div>
            </div>
            <div class="mt-4 layout row">
                <div class="flex xs12 fieldwell">
                    <label>Somewhere Else</label><br />
                    <input type="text" class="textfield">
                </div>
            </div>
            <div class="mt-3 layout row">
                <div class="flex xs6 textleft">
                    <button @click="locationFinderClose" class="red">Close</button>
                </div>
                <div class="flex xs6 textright">
                    <button @click="doCustomFind">Go</button>
                </div>
            </div>
        </div>
         <div v-show="hasGeoLocation===false">
            <h1>Location Required</h1>
            <div class="mt-2">
                You must allow Schedule Us to access your location in order to use the Location Finder
            </div>
            <div class="mt-2 textleft">
                 <button @click="locationFinderClose" class="red">Close</button>
            </div> 
        </div>
        <div v-show="hasGeoLocation===null">
            <div>
               Loading, please wait
            </div>
            <div class="mt-2 textleft">
                 <button @click="locationFinderClose" class="red">Close</button>
            </div> 
        </div>
    <div>
   
</template>

<script>
export default {
    name: "locationfinder",
    data() {
        return {
            hasGeoLocation:null,
            theseCoords:null,
            isLoading:true
        }
    },
    methods: {
        doCustomFind: function() {

        },
        doRender: function() {
         
            var self=this;
            this.getCoords().then(position=> {

                if (position!==null) {
                    self.isLoading=false;
                    self.hasGeoLocation=true;
                    self.theseCoords=position;
                    self.$forceUpdate();
                }
                else {
                    self.isLoading=false;           
                    self.hasGeoLocation=false;
                    self.$forceUpdate();   
                }
           
            }, error=> {
              
                navigator.geolocation.getCurrentPosition(function(pos) {
                    self.isLoading=false;
                    if (typeof(pos.coords)!==null) {
                         self.hasGeoLocation=true;
                         self.theseCoords=pos;
                    }
                    else {      
                        self.hasGeoLocation=false;
                    }
                    self.$forceUpdate();  
                });
            });
              

        }, 
        getCoords: function() {
            return new Promise((resolve, reject) => navigator.permissions ?

                navigator.permissions.query({
                    name: 'geolocation'
                }).then(permission =>

                    permission.state === "granted" || permission.state === "prompt"
                    ? navigator.geolocation.getCurrentPosition(pos => resolve(pos.coords)) 
                    : resolve(null)
                ) :

                reject(null)
            )
        },
        locationFinderClose: function() {
            this.$parent.closeLocationFinder();
        }
    }
}
</script>