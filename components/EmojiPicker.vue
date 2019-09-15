<template>
    <div class="p2">
         <div v-for="(emojiGroup, category) in emojis" :key="category">
            <h5 class="mt-2">{{ category }}</h5>
            <div>
                <span class="pemoji"
                v-for="(emoji, emojiName) in emojiGroup"
                :key="emojiName"
                @click="insert(emoji)"
                :title="emojiName"
                >{{ emoji }}</span>
            </div>
        </div>
     
    </div>
</template>

<script>
    import emojis from './emojis'

    export default {
        name: 'emojipicker',
        props: {          
            emojiTable: {
                type: Object,
                required: false,
                default() {
                    return emojis
                },
            },
        },
        computed: {
            emojis() {
                return this.emojiTable
            },
        },
        methods: {
            insert: function(emoji) {
                this.$parent.$parent.insertEmoji(emoji);
            }
        }
    }
</script>