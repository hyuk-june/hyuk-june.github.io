<template>
    <div id="mypage">
        <div class="profile" v-if="profile">
            <!-- <span class="photo" v-bind:style="{'background': 'url(' + profile.photo + ') center center no-repeat /cover'}"></span> -->
            <span class="name">{{ profile.mb_nick }}</span>
        </div> 
        <div class="profile" v-else>
            <router-link to="/login">로그인 및 회원가입</router-link>
        </div>
        
        <div class="menu">
            <ul class="list-group">
                <li class="list-group-item">
                    <router-link to="/notice">
                        <div class="d-flex justify-content-between align-items-center">
                            공지사항
                            <i class="fa fa-angle-right pull-right"></i>
                        </div>
                    </router-link>
                </li>
                <li class="list-group-item">
                    <router-link to="/faq">
                        <div class="d-flex justify-content-between align-items-center">
                            자주 묻는 질문
                            <i class="fa fa-angle-right pull-right"></i>
                        </div>
                    </router-link>
                </li>
                <li class="list-group-item">
                    <router-link to="/qna">
                        <div class="d-flex justify-content-between align-items-center">
                            1:1 문의
                            <i class="fa fa-angle-right pull-right"></i>
                        </div>
                    </router-link>
                </li>
                <li class="list-group-item">
                    <router-link to="/recent">
                        <div class="d-flex justify-content-between align-items-center">
                            최근 본 샵 목록
                            <i class="fa fa-angle-right pull-right"></i>
                        </div>
                    </router-link>
                </li>
                <li class="list-group-item">
                    <router-link to="/favor">
                        <div class="d-flex justify-content-between align-items-center">
                            찜한 샵 목록
                            <i class="fa fa-angle-right pull-right"></i>
                        </div>
                    </router-link>
                </li>
                <li class="list-group-item">
                    <router-link to="/myreview">
                        <div class="d-flex justify-content-between align-items-center">
                            내가 쓴 후기
                            <i class="fa fa-angle-right pull-right"></i>
                        </div>
                    </router-link>
                </li>
                <li class="list-group-item">
                    <router-link to="/myinfo">
                        <div class="d-flex justify-content-between align-items-center">
                            내 정보 수정
                            <i class="fa fa-angle-right pull-right"></i>
                        </div>
                    </router-link>
                </li>
                <li class="list-group-item">
                    <router-link to="/change_pwd">
                        <div class="d-flex justify-content-between align-items-center">
                            비밀번호 수정
                            <i class="fa fa-angle-right pull-right"></i>
                        </div>
                    </router-link>
                </li>
                <li class="list-group-item">
                    <router-link to="/setting">
                        <div class="d-flex justify-content-between align-items-center">
                            설정
                            <i class="fa fa-angle-right pull-right"></i>
                        </div>
                    </router-link>
                </li>
                <li class="list-group-item">
                    <div v-on:click="logout">
                        <div class="d-flex justify-content-between align-items-center">
                            로그아웃
                            <i class="fa fa-angle-right pull-right"></i>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            
        }
    },

    methods: {
        logout(){
            this.$store.commit('clearMember');
        }
    },

    computed: {
        profile(){
            return this.$store.getters.getMember;
        }
    }
}
</script>


<style>
#mypage .profile {text-align: center; padding:1rem 0; border-bottom:4px solid #f1f1f1;}
#mypage .profile .photo{display: block; margin:0 auto; width:5rem; height:5rem; border-radius: 100%;}
</style>
