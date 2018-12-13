<template>
    <div id="app">
        <h1>{{msg}}</h1>
        <img :src="imgUrl" alt="">
        <input type="text" v-model="msg">
    </div>
</template>
<script>

import getData from "./util"
export default {
    name:"app",
    data(){
        return {
            msg:"Welcome to my vue",
            imgUrl:require("./assets/img/258203-1510030RP894.jpg")
        }
    },
    created(){
        this.fetchData()
    },
    methods:{
        async fetchData(){
            const data = await getData();
            this.msg = data;
        }
    }
}
</script>
<style lang="scss" scoped>
#app{
    color:blue;
}
</style>

