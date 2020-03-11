<template>
  <div class="footer">
      
      <div class="infoLine">
          <span class="schdusPurple">Schedule Us</span> Production v1.3.0, &copy;2020 <a href="https://conjurus.com">Conjurus Technologies, LLC</a><br />
          <a @click="routeTerms()">Terms of Service</a> &bull; <a @click="routePrivacy()">Privacy Policy</a> &bull; <a @click="routeEthics()">Ethics</a> &bull; <a @click="routeCredits()">Credits</a>
      </div>
  </div>
</template>

<style scoped>
.footer {
    width:100%;
    margin-bottom:20px;
    background-color:#FFF;
}
.authLine, .infoLine {
    font-size:0.8rem;
    text-align:center;
}
.infoLine {
    border-top:1px solid #777; 
}
.infoLine a {
    text-decoration:underline;
    color:#777;
}
</style>

<script>
export default {
    name: "Footer",
    methods: {
        routeTerms: function() {
            this.$router.push("termsofservice");
        },
        routePrivacy: function() {
            this.$router.push("privacypolicy");
        },
        routeEthics: function() {
            this.$router.push("ethics");
        },
        routeCredits: function() {
            this.$router.push("credits");
        }
    }
}
</script>