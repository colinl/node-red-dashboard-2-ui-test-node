<!-- A test node by @colinl
-->
<template>
    <!-- Component must be wrapped in a block so props such as className and style can be passed in from parent -->
    <div className="ui-test-cl-wrapper" :class="class">
        <svg class="cl-test" width="100%" height="100%" viewBox="0 0 100 100" >
            <g>
                <text class="label" y="10" x="50%" text-anchor="middle">Test node SVG</text>
                <path d="M 3 3 L 97 3 L 97 97 L 3 97 Z" style="fill:none;stroke:green;stroke-width:3" />
            </g>
        </svg>
    </div>
</template>

<script>
import { markRaw } from 'vue'
import { mapState } from 'vuex'

export default {
    name: 'UITestNode',
    inject: ['$socket'],
    props: {
        /* do not remove entries from this - Dashboard's Layout Manager's will pass this data to your component */
        id: { type: String, required: true },
        props: { type: Object, default: () => ({}) },
        state: { type: Object, default: () => ({ enabled: false, visible: false }) }
    },
    setup (props) {
        //console.info('UITestNode setup with:', props)
        //console.debug('Vue function loaded correctly', markRaw)
    },
    data () {
        return {
            label:"",

            class: "",

            //don't change these
            value: null,
        }
    },
    computed: {
        ...mapState('data', ['messages']),
    },
    mounted () {
        this.$socket.on('widget-load:' + this.id, (msg) => {
            this.$store.commit('data/bind', {
                widgetId: this.id,
                msg
            })
        })
        this.$socket.on('msg-input:' + this.id, (msg) => {

            // store the latest message in our client-side vuex store when we receive a new message
            this.$store.commit('data/bind', {
                widgetId: this.id,
                msg
            })
        })
        console.log(`In test node mounted()`)
        // tell Node-RED that we're loading a new instance of this widget
        this.$socket.emit('widget-load', this.id)
    },
    unmounted () {
        /* Make sure, any events you subscribe to on SocketIO are unsubscribed to here */
        this.$socket?.off('widget-load' + this.id)
        this.$socket?.off('msg-input:' + this.id)
    },
    methods: {
    },
}
</script>

<style scoped>
    /* CSS is auto scoped, but using named classes is still recommended */
    @import "../stylesheets/ui-test-node.css";
</style>
