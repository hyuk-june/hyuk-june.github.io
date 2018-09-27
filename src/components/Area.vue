<template>
    <div id="area">
        <ul class="area">
            <li v-for="(item, index) in areas" v-bind:key="index" v-bind:class="{ active: index == selectedIndex }">
                <span v-on:click="setActive(index)">{{ item.am_area }}</span>
            </li>
        </ul>
        <div class="subarea">
            <ul v-for="(item, index) in areas" v-bind:key="index" v-if="index == selectedIndex">
                <li v-for="(subitem, sindex) in item.sub_list" v-bind:key="sindex">
                    <router-link v-bind:to="{ name:'ListArea', params:{am_idx: item.am_idx, as_idx: subitem.as_idx}}">{{ subitem.as_area }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
import Config from '../store/globals.js'
import axios from 'axios'

export default {

    data(){
        return {
            list: [],
            selectedIndex: 0
        }
    },

    methods:{
        setActive(index){
            //this.$store.commit('setSelectedAreaIndex', index);
            this.selectedIndex = index;
        }
    },

    computed:{
        areas(){
            return this.$store.getters.getAreaList;
        }
    }
}
</script>


<style>
#area{ text-align:left; position:relative; height:100%; overflow-y: hidden;}
#area .area{position:absolute; height:100%; left:0; top:0; overflow-y:scroll; width:100px; margin:0;}
#area .area li{padding:0; border-bottom:1px solid #ddd; border-right:1px solid #ddd; background-color:#f1f1f1; text-align:center; font-size:1rem; line-height:2.5rem;}
#area .area li:last-child{border-bottom:0;}
#area .area li.active{background-color:#fff;}
#area .area li span{display:block;width:100%;height:100%;}
#area .subarea{margin-left:100px; height:100%;overflow-y: scroll;}
#area .subarea ul{margin:0;}
#area .subarea li{padding:0 4px; border-bottom:1px solid #ddd; font-size:.9rem; line-height:2.5rem;}
</style>