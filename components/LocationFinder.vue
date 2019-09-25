<template>
    <div class="locationFinder">
        <div v-show="errorMessage!==null&&loading===null" class="errorBox">
            {{errorMessage}}
        </div>

        <div v-show="loading===true">
             Loading...
        </div>
    
        <div v-show="locations.length>0&&loading===null">
             <div class="layout row">
                <div class="xs12 flex textcenter">
                    <img  src="@/assets/powered_by_google_on_white.png" alt="Powered by Google" />
                </div>
            </div>
            <div class="layout row locationTop">
                <div class="xs6 flex">
                    <v-icon @click="restartFinder()">keyboard_backspace</v-icon>
                </div>
                <div class="xs6 flex">
                    <div class="textright " v-html="currentPage"></div>
                </div>
            </div>
            <template v-for="p in pageData">
                <div class="foundLocation" :key="p">
                   <div class="row layout">
                      
                        <div class="flex xs9 pl2">
                                <b>{{p.name}}</b><br />
                                {{p.vicinity}}<br />
                                Distance: {{ latlongdist(p.geometry.location.lat, p.geometry.location.lng) }} miles<br /> 
                                Rating: {{ getRating(p.rating) }}
                        </div>
                          <div class="flex xs3 textcenter p5top">
                            <button v-on:click="selectLocation(p.name, p.vicinity)">Select</button>
                        </div>
                   </div>
                </div> 
            </template>
            <div class="layout row mt-2">
                <div class="flex xs6" >
                    <button @click="prevPage" v-show="pageNumber>0">Previous</button>
                </div>
                <div class="flex xs6 textright">
                    <button @click="nextPage" v-show="pageNumber<pageCount-1">Next</button>
                </div>
            </div>
        </div>
        <div v-show="locations.length===0&&loading===null" class="relative pbot20">
            <h1>Your Location</h1>
             
            <div class="mt-2">
                 <input type="radio" name="picklocation" v-model="picklocation" v-bind:value=true /> Search locations near:
            </div>
            <div v-show="picklocation===true" class="mt-1">
                <div class="layout row">
                    <div class='fieldwell flex xs-12 mt-1'>      
                        <label>Address</label><br /> 
                        <input type='text' class='textfield' v-model="address"  />
                    </div>
                </div>
         
                <div class="layout row">
                    <div class='fieldwell flex xs8'>
                        <label>City:</label><br />
                        <input type='text' class='textfield' v-model="city" />
                    </div>
                    <div class='fieldwell flex xs4 ml-2'>
                        <label>State:</label><br />
                        <select class="textfield" v-model="state">
                            <option value="--" selected>-Choose-</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>				
                    </div>
                </div>
            </div>
            <div v-show="hasGeoLocation===null" class="mt-2">Loading your current location...</div>
            <div v-show="hasGeoLocation===false" class="mt-2">Geolocation is turned off</div>
            <div v-show="hasGeoLocation===true" class="mt-2">
                  <input type="radio" name="picklocation" v-model="picklocation" v-bind:value=false /> Search near my current location
            </div>

            <div class="layout row btop mt-2">
                <div class="flex xs5">
                    <h1 class="mtp-10">Where To?</h1>
                </div>
                <div class="flex xs7 textright">
                    <img class="mtp-10" src="@/assets/powered_by_google_on_white.png" alt="Powered by Google" />
                </div>
            </div>
            <div class="layout row mt-2">
                <div class="flex xs6">
                    <div class="mt-4 spfield fieldwell" @click="doCustomFind('restaurant')">
                        <v-icon>restaurant</v-icon> Restaurant
                    </div>
                    <div class='mt-4 spfield fieldwell' @click="doCustomFind('night_club')">
                        <v-icon>local_bar</v-icon> Bar/Nightlife
                    </div>
                    <div class='mt-4 spfield fieldwell' @click="doCustomFind('park')">
                        <v-icon>nature</v-icon> Park
                    </div>      
                </div>
                <div class="flex xs6"> 
                    <div class='mt-4 spfield fieldwell' @click="doCustomFind('shopping_mall')">
                        <v-icon>local_mall</v-icon> Shopping Mall
                    </div>              
                    <div class="mt-4 spfield fieldwell" @click="doCustomFind('museum')">
                        <v-icon>account_balance</v-icon> Museum
                    </div>
                    <div class="mt-4 spfield fieldwell" @click="doCustomFind('movie_theater')">
                        <v-icon>local_movies</v-icon> Movie Theater
                    </div>
                </div>
            </div>
            <div class="mt-4 layout row">
                <div class="flex xs12 fieldwell">
                    <label>Somewhere Else</label><br />
                    <input type="text" v-model="keyword" class="textfield">
                </div>
            </div>
            <div class="mt-3 layout row">
                <div class="flex xs6 textleft">
                    <button @click="locationFinderClose" class="red">Close</button>
                </div>
                <div class="flex xs6 textright">
                    <button @click="doCustomFind(null)">Go</button>
                </div>
            </div>
                
 
        </div>
     
    <div>
   
</template>

<script>
export default {
    name: "locationfinder",
    data() {
        return {
            address:null,
            city:null,
            errorMessage:null,
            hasGeoLocation:null,
            foundCoords:null,
            keyword: null,
            theseCoords:null,
            loading:null,
            locations:[],
            pageNumber: 0,
            picklocation:true,
            state:"--"
        }
    },
    computed: {
        currentPage: function() {
            return "Page: <b>"+(this.pageNumber+1)+"</b> of <b>"+this.pageCount+"</b>";
        },
        pageCount: function() {
            return Math.ceil(this.locations.length/this.size);
        },
        pageData: function() {
             return this.locations.slice((this.pageNumber * this.size), (this.pageNumber * this.size)+ this.size);
        }
    },
    props: {
        size:{
            type:Number,
            required:false,
            default: 5
        }
    },
    methods: {
        doCustomFind: function(qry) {
            this.errorMessage=null;
            var geocode="";

            if (this.picklocation===true) {
               if (this.address===null || this.city===null || this.state===null || this.address.length===0 || this.city.length===0 || this.state==="--") {
                   this.errorMessage="Address, city, and state are required";
                   this.$forceUpdate();
                   return;
               }
               else {
                   geocode=this.address+", "+this.city+", "+this.state;
               }
            }

            this.loading=true;
            var kwrd=null;
            if (qry===null && this.keyword!==null && this.keyword.length>0) {
                kwrd=this.keyword; 
            }

            this.$http({
                method:'post',
                url:this.$hostname+'/locationfinder',
                data: {
                    Place: qry,
                    PickLocation: this.picklocation,
                    Geocode: geocode,
                    Keyword: kwrd,
                    Coords: [this.theseCoords.coords.latitude, this.theseCoords.coords.longitude]                            
                }
            }).then(r=> {
                this.loading=null;
                if (r.status===200) {
                    if (r.data.status===200) {
                        var dd = JSON.parse(r.data.message);
                        this.locations=dd.results;
                        if (typeof(dd.foundCoords)!=="undefined") {
                            this.foundCoords=dd.foundCoords;
                        }
                        else {
                            this.foundCoords=null;
                        }
                        
                        if (this.locations.length===0) {
                            this.errorMessage="No locations were found near your area";
                            this.$forceUpdate();
                        }
                    }
                    else {
                        this.errorMessage="Error getting locations";
                        this.$forceUpdate();
                    }
                }
                else {
                    this.errorMessage="Could not connect to backend service, please check your internet connection";
                    this.$forceUpdate();
                }
            
            })
        },
        doRender: function() { 
            this.theseCoords=this.getCoords();
        }, 
        getCoords: function() {
            try {
                return navigator.geolocation.getCurrentPosition(this.renderOK,this.renderFail);   
            }
            catch(e) {    
                this.hasGeoLocation=false;
                this.$forceUpdate();   
            }              
        },
        getRating: function(rat) {
            if (typeof(rat)!=="undefined") {
                return rat+"/5";
            }
            else {
                return "No Rating"
            }
        },
        latlongdist(lat2, lon2) {
            var lat1=this.theseCoords.coords.latitude;
            var lon1=this.theseCoords.coords.longitude;

            if (this.foundCoords!==null) {
                lat1=this.foundCoords[0];
                lon1=this.foundCoords[1];
            }

            if ((lat1 === lat2) && (lon1 === lon2)) {
                return 0;
            }
            
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            
            var dis = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dis > 1) {
                dis = 1;
            }
            dis = Math.acos(dis);
            dis = dis * 180/Math.PI;
            dis = dis * 60 * 1.1515;

            return dis.toFixed(2);         
        },
        locationFinderClose: function() {
            this.$parent.closeLocationFinder();
        },
        nextPage(){
            this.pageNumber++;
        },
        prevPage(){
            this.pageNumber--;
        },
        renderFail: function() { 
            this.hasGeoLocation=false;
            this.$forceUpdate();   
        },
        renderOK: function(position) {
            if (position!==null) {
                this.hasGeoLocation=true;
                this.theseCoords=position;
                this.$forceUpdate();
            }
            else {      
                this.hasGeoLocation=false;
                this.$forceUpdate();   
            }
        },
        restartFinder: function() {
            this.foundCoords=null;
            this.locations=[];
        },
        selectLocation: function(name, fulladdress) {
            var pts=fulladdress.split(',');
            this.foundCoords=null;
            this.locations=[];
            this.$parent.fillLocation(name, pts[0].trim(), pts[1].trim());
        }
    }
}
</script>