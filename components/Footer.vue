<template>
  <div class="footer">
      <div class="adWell">
          <div class="sampleAd">Ad Goes Here</div>
      </div>
      <div class="authLine">
          Want to remove ads? Sign up for premium!
      </div>
      <div class="infoLine">
          <span class="schdusPurple">Schedule Us</span> v1.0 (ALPHA), &copy;2019 Michael McDermott
      </div>
  </div>
</template>

<style scoped>
.footer {
    width:100%;
}
.adWell {
   height:60px;
   width:100%;
   padding-top:5px;
   padding-bottom:5px;
}
.sampleAd {
   height:50px;
   width:320px;
   margin:0 auto;
   background-color:#000;
   text-align:center;
   padding-top:16px;
   color:#FFF;
}
.authLine, .infoLine {
    font-size:0.8rem;
    text-align:center;
}
.infoLine {
    border-top:1px solid #777; 
}
</style>

<script>
export default {
    name: "Footer"
}
</script>