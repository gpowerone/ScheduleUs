<template>
  <div>
    <amplify-authenticator></amplify-authenticator>
  </div>
</template>

<script>
import { AmplifyEventBus } from "aws-amplify-vue";
export default {
  name: "Auth",
  data() {
    return {};
  },
  mounted() {
    AmplifyEventBus.$on("authState", eventInfo => {
      if (eventInfo === "signedIn") {
        this.$router.push({ name: "home" });
      } else if (eventInfo === "signedOut") {
        this.$router.push({ name: "frontDoor" });
      }
    });
  }
};
</script>


