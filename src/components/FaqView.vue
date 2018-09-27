<template>
    <div id="notice_view">
        <div class="header">
            <router-link to="/notice" class="btn-close"><font-awesome-icon icon="arrow-left" /></router-link>
            <h1 class="title">공지사항</h1>
        </div>
        <div class="content">
            <h2 class="bo-subject">{{ bo_subject }}</h2>
            <div class="bo-content">
                {{ bo_content }}
            </div>
        </div>
    </div>
</template>


<script>
import Config from '../store/globals.js'
import axios from 'axios';

export default {
    props:['bo_idx'],
    data(){
        return {
            bo_subject: '',
            bo_content: ''
        }
    },
    methods:{
        getContent(){
            var ref = this;
            
            axios.get(Config.url_notice_view,{
                params:{
                    bo_idx: this.bo_idx
                }
            }).then(function(result){
                if(result.status !== 200){
                    ref.$dialogs.alert('네트워크 에러입니다', {title:'Info', size:'sm'});
                    return;
                }
                ref.bo_subject = result.data.bo_subject;
                ref.bo_content = result.data.bo_content;
            });
        }
    },
    mounted(){
        this.getContent();
    }
}
</script>


<style>
#notice_view .bo-subject{font-size:1rem; padding:10px; border-bottom:1px solid #ddd;}
#notice_view .bo-content{padding:10px;}
</style>
