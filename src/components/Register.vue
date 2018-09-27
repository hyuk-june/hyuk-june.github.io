<template>
    <div id="register">
        <div class="register-header">
            <button type="button" class="btn btn-link btn-close" v-on:click="closeWindow"><i class="fa fa-times"></i></button>
            <h1>회원가입</h1>
        </div>

        <div id="register-wrap" class="p-4">
            <form v-on:submit="onSubmit" id="frm_register" class="mb-5">
                <div class="form-group mb-2">
                    <label class="sr-only" for="mb_emai">이메일</label>
                    <div class="input-group">
                        <div class="input-group-prepend"><span class="fa fa-envelope input-group-text">&nbsp;</span></div>
                        <input type="email" ref="mb_email" placeholder="이메일" class="form-control">
                    </div>
                </div>

                <div class="form-group mb-2">
                    <label class="sr-only" for="mb_pwd">비밀번호</label>
                    <div class="input-group">
                        <div class="input-group-prepend"><span class="fa fa-key input-group-text">&nbsp;</span></div>
                        <input type="password" ref="mb_pwd" placeholder="비밀번호(영문,숫자4자리이상 16자이하)" class="form-control">
                    </div>
                </div>

                <div class="form-group mb-2">
                    <label class="sr-only" for="mb_pwd2">비밀번호확인</label>
                    <div class="input-group">
                        <div class="input-group-prepend"><span class="fa fa-key input-group-text">&nbsp;</span></div>
                        <input type="password" ref="mb_pwd2" placeholder="비밀번호확인" class="form-control">
                    </div>
                </div>

                <div class="form-group mb-2">
                    <label class="sr-only" for="mb_nick">닉네임</label>
                    <div class="input-group">
                        <div class="input-group-prepend"><span class="fa fa-user input-group-text">&nbsp;</span></div>
                        <input type="text" ref="mb_nick" placeholder="닉네임(영문,한글,숫자4자리이상)" class="form-control">
                    </div>
                </div>

                <div class="my-4">
                    <p class="form-text">로그인/회원가입 시</p>
                    <p class="form-text">이용약관,개인정보처리 방침에</p>
                    <p class="form-text">동의한 것으로 간주됩니다</p>
                </div>

                <button type="submit" id="btn_sumit" class="btn btn-danger btn-block">동의하고 가입하기</button>
            </form>
        </div>
    </div>
</template>


<script>
import Config from '../store/globals.js'

export default {
    name: 'Register',

    methods: {

        onSubmit(evt){
            evt.preventDefault();

            if(this.$refs.mb_email.value == ''){
                this.$toast('이메일을 입력해 주세요');
                return;
            }else if(this.$refs.mb_pwd.value == ''){
                this.$toast('비밀번호를 입력해 주세요');
                return;
            }else if(this.$refs.mb_pwd2.value == ''){
                this.$toast('비밀번호확인을 입력해 주세요');
                return;
            }else if(this.$refs.mb_pwd.value != this.$refs.mb_pwd2.value){
                this.$toast('두개의 비밀번호가 다릅니다');
                return;
            }else if(this.$refs.mb_nick.value == ''){
                this.$toast('닉네임을 입력해주세요');
                return;
            }

            let form = new FormData();
            form.append('mb_type', 'N');
            form.append('mb_email', this.$refs.mb_email.value);
            form.append('mb_pwd', this.$refs.mb_pwd.value);
            form.append('mb_name', '');
            form.append('mb_nick', this.$refs.mb_nick.value);
            form.append('mb_phone', this.$store.getters.getPhoneNumber);

            let ref = this;

            this.$axios.put(
                Config.url_register,
                form

            ).then(function(response){
                
                let data = response.data.data;
                let message = response.data.message;
                
                let token = data.member_token;
                let member = data.member;

                
                ref.procLogin(token, data.member);

                ref.$toast(message);

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
        console.log(this.$store.getters.getToken);
        if(this.$store.getters.getToken != null){
            
            this.closeWindow();
        }
    }

}
</script>


<style>
html, body {background-color:#f1f1f1;}

#register .register-header{
    position:relative;
}
#register .register-header h1{
    font-size:1rem;
    text-align: center;
    margin:0;
    background-color: #fff;
    padding:.8rem;
    margin-bottom:.5rem;
    border-bottom:1px solid #ddd;
    box-shadow: 0 1px 1px #ddd;
}

#register .register-header .btn-close{
    position:absolute;
    left:0rem;
    top:.25rem;
    color:#333;
}

.input-group .input-group-text{background:#fff; border-right:0; font-size:.8rem; }

.input-group .fa{vertical-align: middle; line-height:normal}

.form-control{font-size:.9rem; border-left:0; padding-left:0;}

.form-text{font-size:.8rem; margin-bottom:0;}
</style>
