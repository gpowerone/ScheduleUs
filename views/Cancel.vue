<template>
    <div class="moduleWrapper">
        <h1>Maybe Next Time</h1>
        <div class="mt-2">Thank you for your interest in Schedule Us Premium or Pro</div>
        <div class="mt-2"><button @click="goToContact()">Tell Us Why You Didn't Buy</button>
    </div>
</template>

<script>
    export default {
        name: "Cancel",
        methods: {
            goToContact: function() {
                this.$router.push("contact")
            }
        }
    }
</script>