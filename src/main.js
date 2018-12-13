import Vue from "vue";
import "./style/common.scss";
import App from "./App.vue"

var app = new Vue({
    el:"#app",
    template:'<App/>',
    components:{App}
})