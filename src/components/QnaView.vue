<template>
    <div id="qna_view">
        <div class="header">
            <router-link to="/qna" class="btn-close"><font-awesome-icon icon="arrow-left" /></router-link>
            <h1 class="title">공지사항</h1>
        </div>
        <div class="content">
            <h2 class="bo-subject">{{ bo_subject }}</h2>
            <div class="bo-content">
                {{ bo_content }}
            </div>
            <div class="bo-answer">
                <div v-if="isAnswer" class="cmt">
                    <span class="ans-date">{{ bo_ansdate }}</span>
                    {{ bo_answer }}
                </div>
                <div v-else>아직 등록된 답변이 없습니다</div>
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
            bo_content: '',
            bo_regdate: '',
            is_answer: '',
            bo_answer: '',
            bo_ansdate: ''
        }
    },
    computed:{
        isAnswer(){
            return this.is_answer == '1' ? true : false;
        },
    },
    methods:{
        getContent(){
            var ref = this;
            
            axios.get(Config.url_qna_view,{
                params:{
                    bo_idx: this.bo_idx
                }
            }).then(function(result){
                if(result.status !== 200){
                    ref.$dialogs.alert('네트워크 에러입니다', {title:'Info', size:'sm'});
                    return;
                }
                console.log(result.data);
                ref.bo_subject = result.data.bo_subject;
                ref.bo_content = result.data.bo_content;
                ref.bo_regdate = result.data.bo_regdate;
                ref.is_answer = result.data.is_answer;
                ref.bo_answer = result.data.bo_answer;
                ref.bo_ansdate = result.data.bo_ansdate;
            });
        }
    },
    mounted(){
        this.getContent();
    }
}
</script>


<style>
#qna_view .bo-subject{font-size:1rem; padding:10px; border-bottom:1px solid #ddd;}
#qna_view .bo-content{padding:10px; border-bottom:1px solid #ddd; min-height:100px;}
#qna_view .bo-answer{padding:10px; min-height:100px;}
#qna_view .bo-answer .ans-date{display:block;}
</style>
