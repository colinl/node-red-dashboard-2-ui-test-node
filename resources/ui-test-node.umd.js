(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode("/* CSS is auto scoped, but using named classes is still recommended */\n.ui-test-cl-wrapper[data-v-6e6d8067] {\n    padding: 10px;\n    margin: 10px;\n    border: 1px solid black;\n}\n.ui-test-cl-class[data-v-6e6d8067] {\n    color: green;\n    font-weight: bold;\n}\n.cl-test[data-v-6e6d8067]{\n    position:relative;\n}\n.cl-test .label[data-v-6e6d8067] {\n    fill:currentColor;\n    font-size:0.5rem;\n    dominant-baseline:hanging;\n}\n.cl-test .value[data-v-6e6d8067] {\n    fill:currentColor;\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("vuex")) : typeof define === "function" && define.amd ? define(["exports", "vue", "vuex"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["ui-test-node"] = {}, global.Vue, global.vuex));
})(this, function(exports2, vue, vuex) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main = {
    name: "UITestNode",
    inject: ["$socket"],
    props: {
      /* do not remove entries from this - Dashboard's Layout Manager's will pass this data to your component */
      id: { type: String, required: true },
      props: { type: Object, default: () => ({}) },
      state: { type: Object, default: () => ({ enabled: false, visible: false }) }
    },
    setup(props) {
    },
    data() {
      return {
        label: "",
        class: "",
        //don't change these
        value: null
      };
    },
    computed: {
      ...vuex.mapState("data", ["messages"])
    },
    mounted() {
      this.$socket.on("widget-load:" + this.id, (msg) => {
        this.$store.commit("data/bind", {
          widgetId: this.id,
          msg
        });
      });
      this.$socket.on("msg-input:" + this.id, (msg) => {
        this.$store.commit("data/bind", {
          widgetId: this.id,
          msg
        });
      });
      console.log(`In test node mounted()`);
      this.$socket.emit("widget-load", this.id);
    },
    unmounted() {
      var _a, _b;
      (_a = this.$socket) == null ? void 0 : _a.off("widget-load" + this.id);
      (_b = this.$socket) == null ? void 0 : _b.off("msg-input:" + this.id);
    },
    methods: {}
  };
  const _withScopeId = (n) => (vue.pushScopeId("data-v-6e6d8067"), n = n(), vue.popScopeId(), n);
  const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode(
    "svg",
    {
      class: "cl-test",
      width: "100%",
      height: "100%",
      viewBox: "0 0 100 100"
    },
    [
      /* @__PURE__ */ vue.createElementVNode("g", null, [
        /* @__PURE__ */ vue.createElementVNode("text", {
          class: "label",
          y: "10",
          x: "50%",
          "text-anchor": "middle"
        }, "Test node SVG"),
        /* @__PURE__ */ vue.createElementVNode("path", {
          d: "M 3 3 L 97 3 L 97 97 L 3 97 Z",
          style: { "fill": "none", "stroke": "green", "stroke-width": "3" }
        })
      ])
    ],
    -1
    /* HOISTED */
  ));
  const _hoisted_2 = [
    _hoisted_1
  ];
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" Component must be wrapped in a block so props such as className and style can be passed in from parent "),
        vue.createElementVNode(
          "div",
          {
            className: "ui-test-cl-wrapper",
            class: vue.normalizeClass($data.class)
          },
          [..._hoisted_2],
          2
          /* CLASS */
        )
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const UITestNode = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6e6d8067"], ["__file", "/home/colinl/nodes/node-red-dashboard-2-ui-test-node/ui/components/UITestNode.vue"]]);
  exports2.UITestNode = UITestNode;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
