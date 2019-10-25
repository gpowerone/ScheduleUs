<template>
    <div>
        <div v-show="showFinder===true">
              <locationfinder ref="locfin"></locationfinder>
        </div>
        <div v-show="showFinder===false">

            <div v-show="errorMessage!==null" class="errorBox">
                {{errorMessage}}
            </div>

            <div class='fieldwell xs-12 mt-2'>
                <label>Location</label>
                <div class="layout row">
                    <div class="flex xs6 spfield textleft" @click="goLocationFinder()">
                        <v-icon>location_on</v-icon>&nbsp;<span>Find a Location</span>
                    </div>                            
                </div>
                <div class='mt-1'>
                    <input type='text' class='textfield' v-model="evlocation" :class='evlocationfe'  />
                </div>
                <div class='mt-1 fieldwell'>
                    <label>Address</label><br /> 
                    <input type='text' class='textfield' v-model="evstreet" :class='evstreetfe'  />
                </div>
            </div>
            <div class="layout row mt-2">
                <div class='fieldwell flex xs6'>
                    <label>City:</label><br />
                    <input type='text' class='textfield' v-model="evcity" :class='evcityfe'   />
                </div>
                <div class='fieldwell flex xs3 ml-2'>
                    <label>State:</label><br />
                    <select class="textfield" v-model="evstate"  >
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
                <div class='fieldwell flex xs3 ml-2'>
                    <label>Zip:</label><br />
                    <input type='text' class='textfield' id='eventZip'   v-model='evzip' />
                </div>
            </div>
            <div class="mt-2 fieldwell textright">
                    <button @click="doLocationChange" :disabled="btnlocationchange">Submit</button> 
            </div>
        </div>
    </div>
</template>

<script>
import locationfinder from "@/components/LocationFinder"

export default {
    name: "Event",
    components: {locationfinder},
    data() {
        return {
            errorMessage: null,
            evlocation:"",
            evstreet:"",
            evcity:"",
            evstate:"",
            evzip:"",
            evlocationfe: "",
            evstreetfe: "",
            evcityfe: "",
            showFinder: false
        }
    },
    methods: {
        closeLocationFinder: function() {
            this.showFinder=false;
        },
        goLocationFinder: function() {
            this.$refs.locfin.doRender();
            this.showFinder=true;
        },
        loadData: function(location,street,city,state,zip) {
            this.evlocation=location;
            this.evstreet=street;
            this.evcity=city;
            this.evstate=state;
            this.evzip=zip;
        }
    }
}
</script>