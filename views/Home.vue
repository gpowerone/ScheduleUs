<template>
    <div class="moduleWrapper">
        <div class='loadingImg'  v-show="loading===null">
                <img src="@/assets/loading.gif" />
        </div>
        <div v-show="loading!==null">
            Schedule Us Home Page Will Go Here
        </div>
       
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            loading: false
        }
    },
   
}
</script>