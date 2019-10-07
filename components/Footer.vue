<template>
  <div class="footer">
      
      <div class="infoLine">
          <span class="schdusPurple">Schedule Us</span> v2.0 (BETA 1), &copy;2019 Conjurus Technologies
      </div>
  </div>
</template>

<style scoped>
.footer {
    width:100%;
    background-color:#FFF;
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