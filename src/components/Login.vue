<template>
    <div id="login">

        <div class="login-header">
            <button type="button" class="btn btn-link btn-close" v-on:click="closeWindow"><i class="fa fa-times"></i></button>
            <h1>로그인</h1>
        </div>

        <div id="login-wrap" class="p-4">

            <div class="user-wrap">
                <i class="fa fa-user-circle icon"></i>
            </div>

            <form v-on:submit="onSubmit" id="frm_login" class="mb-5">
                <div class="form-group mb-2">
                    <label class="sr-only" for="mb_emai">이메일</label>
                    <div class="input-group">
                        <div class="input-group-prepend"><span class="fa fa-envelope input-group-text">&nbsp;</span></div>
                        <input type="email" id="mb_email" name="mb_email" ref="mb_email" placeholder="이메일" class="form-control">
                    </div>
                </div>

                <div class="form-group mb-2">
                    <label class="sr-only" for="mb_pwd">비밀번호</label>
                    <div class="input-group">
                        <div class="input-group-prepend"><span class="fa fa-key input-group-text">&nbsp;</span></div>
                        <input type="password" id="mb_pwd" name="mb_pwd" ref="mb_pwd"  placeholder="비밀번호" class="form-control">
                    </div>
                </div>

                <div class="mb-2">
                    <button type="submit" variant="primary" class="btn btn-danger btn-block btn-submit">로그인</button>
                </div>

                <div class="form-group form-check mb-2">
                    <input type="checkbox" class="form-check-input" id="auto_login" name="auto_login" ref="auto_login" value="1">
                    <label for="auto_login" class="form-check-label">
                        자동로그인
                    </label>
                </div>
            </form>

            <button type="button" id="btn_kakao" class="btn btn-block">카카오톡 간편 로그인</button>
            <button type="button" id="btn_naver" class="btn btn-block">네이버 간편 로그인</button>


            <div class="login-footer">
                <ul>
                    <li><router-link to="/register">회원가입</router-link></li>
                    <li><router-link to="/find_password">비밀번호찾기</router-link></li>
                </ul>
            </div>

        </div>
        
    </div>
</template>

<script>
import Config from '../store/globals.js'

export default {
    name: 'Login',
    data(){
        return {
            get token(){
                return localStorage.getItem('token') || null;
            }
        }
    },

    methods:{

        onSubmit(evt){

            evt.preventDefault();

            let form = new FormData();
            form.append('mb_type', 'N');
            form.append('mb_email', this.$refs.mb_email.value);
            form.append('mb_pwd', this.$refs.mb_pwd.value);

            let ref = this;

            this.$axios.post(
                Config.url_login,
                form
            ).then(function(response){
                if(response.data.code !== 200){
                    return;
                }
                let data = response.data.data;
                
                let token = data.member_token;
                let member = data.member;
                
                ref.procLogin(token, data.member);

            }).catch(function(error){
                if(error.response !== undefined)
                    ref.$toast(error.response.data.message);
                else
                    ref.$toast(error);

            });
        },

        procLogin(token, member){
            this.$store.commit('setToken', {
                token: token
            });
            this.$store.commit('setMember', {
                member: member
            });
            this.closeWindow();
        },

        closeWindow(){
            this.$router.push('/frame/mypage');
        }
    },

    mounted(){
        if(this.$store.getters.getToken != null){
            this.closeWindow();
        }
    }
}
</script>

<style>

html, body {background-color:#f1f1f1;}

#login .login-header{
    position:relative;
}
#login .login-header h1{
    font-size:1rem;
    text-align: center;
    margin:0;
    background-color: #fff;
    padding:.8rem;
    margin-bottom:.5rem;
    border-bottom:1px solid #ddd;
    box-shadow: 0 1px 1px #ddd;
}

#login .login-header .btn-close{
    position:absolute;
    left:0rem;
    top:.25rem;
    color:#333;
}

#login .user-wrap{
    margin:3rem 0 1rem 0;
    text-align:center;
    position:relative;
}

#login .user-wrap .icon{
    font-size:4rem;
    color:#ccc;
}

#login .login-user{
    background: #fff;
    color:#ccc;
    border-radius: 50%;
}

.input-group .input-group-text{background:#fff; border-right:0;}

.input-group .fa{vertical-align: middle; line-height:normal}

.login-footer{
    position: absolute;
    bottom:2rem;
    left:0;
    right:0;
    text-align:center;
    font-size:.8rem;
}

.login-footer ul{
    display:flex;
    justify-content: center;
}

.login-footer ul li:after{
    content: ' | ';
    display:inline-block;
    margin:0 10px;
}

.login-footer ul li:last-child:after{
    content: '';
    margin:0;
}

.form-group.form-check{
    text-align:left;
}
</style>
