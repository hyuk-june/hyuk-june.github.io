<template>
    <div id="notice">
        <div class="header">
            <router-link to="/frame/mypage" class="btn-close"><i class="fa fa-arrow-left" /></router-link>
            <h1 class="title">공지사항</h1>
        </div>
        <div class="content">
            <ul class="list">
                <li v-for="(item, index) in list" v-bind:key="index">
                    <router-link v-bind:to="{name: 'NoticeView', params:{ page: page, bo_idx:item.bo_idx}}" class="ellipsis">
                        <span>{{ getNotice(item.bo_notice)  }}{{ item.bo_subject }}</span>
                    </router-link>
                </li>
                <infinite-loading v-on:infinite="infiniteHandler">
                    <span slot="no-more"></span>
                </infinite-loading>
            </ul>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import Config from '../store/globals.js'
import InfiniteLoading from 'vue-infinite-loading'

export default {
    data(){
        return{
            page: 1,
            list:[]
        }
    },
    methods:{
        getList(callback){

            
        },
        getNotice(bo_notice){
            let str;
            if(bo_notice == '1') str = '[공지]';
            else str = '';
            return str;
        },
        infiniteHandler($state) {
            var ref = this;
            
            axios.get(Config.url_notice,{
                params: {
                    page: this.page
                }
            })
            .then(function(result){
                if(result.status !== 200){
                    ref.$dialogs.alert('네트워크 에러입니다', {title:'Info', size:'sm'});
                    return;
                }

                if(result.data.length > 0){
                    ref.list = ref.list.concat(result.data);
                    ref.page++;
                    $state.loaded();
                }else{
                    $state.complete();
                }

            });
        }
    },
    components:{
        InfiniteLoading
    }
}
</script>


<style>
#notice ul.list{width:100%; text-align:left;}
#notice ul.list li{padding:10px 5px; border-bottom:1px solid #ddd;}
#notice ul.list li a{display:block;}
</style>
