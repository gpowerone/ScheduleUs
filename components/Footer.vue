<template>
  <div class="footer">
      
      <div class="infoLine">
          <span class="schdusPurple">Schedule Us</span> Production v1.0.8, &copy;2020 <a href="https://conjurus.com">Conjurus Technologies, LLC</a><br />
          <a href="/termsofservice">Terms of Service</a> &bull; <a href="/privacypolicy">Privacy Policy</a> &bull; <a href="/ethics">Ethics</a> &bull; <a href="/credits">Credits</a>
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
    name: "Footer"
}
</script>