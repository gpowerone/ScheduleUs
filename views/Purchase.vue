<template>
    <div class="moduleWrapper">
        <h1>Purchase Successful</h1>
        <p>You may begin using the product immediately</p>
        <p><button @click="goToMyEvents()">Go to My Events</button></p>
    </div>
</template>

<script>
    export default {
        name: "Cancel",
        methods: {
            goToMyEvents: function() {
                this.$router.push("dashboard")
            }
        }       
    }
</script>