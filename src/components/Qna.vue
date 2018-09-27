<template>
    <div id="notice">
        <div class="header">
            <router-link to="/frame/mypage" class="btn-close"><font-awesome-icon icon="arrow-left" /></router-link>
            <h1 class="title">1:1 문의</h1>
        </div>
        <div class="content">
            <ul class="list">
                <li v-for="(item, index) in list" v-bind:key="index">
                    <router-link v-bind:to="{name: 'QnaView', params:{ page: page, bo_idx:item.bo_idx}}" class="ellipsis d-flex justify-content-between">
                        <span class="subject">{{ item.bo_subject }}</span>
                        <span v-bind:class="{'ans': true, 'ans-exists': isAnswer(item.is_answer)}">{{ getAnswerStr(item.is_answer) }}</span>
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
        isAnswer(is_answer){
            return is_answer == '1' ? true : false;
        },
        getAnswerStr(is_answer){
            let str = '';
            if(is_answer == '1') str = '답변완료';
            else str = '처리중';
            return str;
        },
        infiniteHandler($state) {
            var ref = this;
            
            axios.get(Config.url_qna,{
                params: {
                    page: this.page
                }
            })
            .then(function(result){
                if(result.status !== 200){
                    ref.$dialogs.alert('네트워크 에러입니다', {title:'Info', size:'sm'});
                    return;
                }
                console.log(result.data);

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
#notice ul.list li a .ans{font-size:.9rem;}
#notice ul.list li a .ans.ans-exists{color:#f00;}
</style>
