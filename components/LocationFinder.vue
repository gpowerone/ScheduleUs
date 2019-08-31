<template>
    <div class="locationFinder">
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
                <button @click="locationFinderClose" class="red">Cancel</button>
             </div>
             <div class="flex xs6 textright">
                <button @click="doCustomFind">Go</button>
             </div>
        </div>
    <div>
</template>

<script>
export default {
    name: "locationfinder",
    methods: {
        doCustomFind: function() {

        },
        locationFinderClose: function() {
            this.$parent.closeLocationFinder();
        }
    }
}
</script>