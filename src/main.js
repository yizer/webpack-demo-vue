import getData from "./util"
import Vue from "vue";
import "./style/common.scss";
getData().then((res)=>{
    console.log(res); 
})

Vue.component('my-component', {
    template: '<img :src="url" />',
    data() {
      return {
        url: require('./img/thread_16313966_20180726164538_s_65949_o_w1024_h1024_62044.jpg')
      }
    }
  })

var app = new Vue({
    el:"#app",
    data:{
        message:"hello, world"
    },
    created(){
        this.fetchData();
    },
    methods:{
        async fetchData(){
            const data = await getData();
            this.message = data;
        }
    }
})