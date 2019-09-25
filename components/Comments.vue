<template>
  <div class="comment-tree" v-bind:ref="comment.EventCommentID">
    <div v-bind:class="comment.IndentLevel">
      <div>{{comment.Comment}}</div>
      <div class="mt-1 comment-name">
        {{comment.CommenterName}} ({{parseDateTime(comment.CreationDate)}})
      </div>
      <div class="comment-rr">
          <a class="replyBtn" @click="doReply(comment.EventCommentID)">Reply</a>&nbsp;&nbsp;<a @click="doReport(comment.EventCommentID)">Report</a>
      </div>
      <comments v-for="(node,n) in children" v-bind:key="n" :comment="node.item" :children="node.children">
      </comments>
    </div>
  </div>
</template>

<style scoped>
.i-0 {
    border-top:1px dashed #666;
}
.i-1 {
    padding-left:5%;
    padding-right:5%;
}
.i-1 .replyBtn {
    display:none;
}
.comment-name {
   font-size:0.8rem;
   color:#888;
}
.comment-rr {
   text-align:right;
   font-size:0.8rem;   
}
</style>

<script>
import { EventBus } from '../bus';

export default { 
    props: [ 'comment', 'children' ],
    name: 'comments',
    methods: {
        doReport: function(ec) {
           EventBus.$emit("CommentReportEvent", ec);
        },
        doReply: function(ec) {
           EventBus.$emit("CommentReplyEvent", ec);
        },
        parseDateTime: function(tstp) {
            var d = new Date(parseInt(tstp));
                
            var mth="";
            switch(d.getMonth()) {
                case 0: mth="Jan"; break;
                case 1: mth="Feb"; break;
                case 2: mth="Mar"; break;
                case 3: mth="Apr"; break;
                case 4: mth="May"; break;
                case 5: mth="Jun"; break;
                case 6: mth="Jul"; break;
                case 7: mth="Aug"; break;
                case 8: mth="Sep"; break;
                case 9: mth="Oct"; break;
                case 10: mth="Nov"; break;
                case 11: mth="Dec"; break;
            }

            var h = d.getHours();
            var ap="AM";
            if (h>12) {
                ap="PM";
                h-=12;
            }
            var mins = d.getMinutes();
            var dmin = String(mins);
            if (mins<10) {
                dmin="0"+dmin;
            }

            return mth +" "+d.getDate()+", "+d.getFullYear() + " | "+ h+":"+dmin+" "+ap; 
        },
        scrollMeTo(refName) {
          var element = this.$refs[refName];
          var top = element.offsetTop;

          window.scrollTo(0, top);
        }
     }
}
</script>