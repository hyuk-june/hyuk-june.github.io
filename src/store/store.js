import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import Config from '../store/globals'

Vue.use(Vuex)

export default new Vuex.Store({

    state:{
        shopList: [],
        area_list: {},
        selectedAreaIndex: 0,
        member: null,
        phone_number: '010-000-0001',
        lat: 0,
        lng: 0
    },

    getters:{
        getShopList(state){
            return state.shopList;
        },
        getAreaList(state){
            return state.area_list;
        },
        getSelectedAreaIndex(state){
            return state.selectedAreaIndex;
        },
        getToken(state){
            return localStorage.getItem('token') || null;
        },
        getMember(state){
            return state.member;
        },
        getPhoneNumber(state){
            return state.phone_number;
        }
    },

    mutations:{

        clearShopList(state){
            state.shopList = [];
        },

        setShopList(state, payload){
            state.shopList = payload;
        },

        addShopList(state, payload){
            payload.forEach(function(el){
                state.shopList.push(el);
            });
        },

        setAreaList(state, payload){
            state.area_list = payload;
        },

        setSelectedAreaIndex(state, payload){
            state.selectedAreaIndex = payload;
        },

        setToken(state, payload){
            localStorage.setItem('token', payload.token);
        },

        setMember(state, payload){
            state.member = payload.member;
        },

        clearMember(state, payload){
            localStorage.removeItem('token');
            state.member = null;
        }
    },
    
    actions:{

        loadUser(context, vue){

            if(context.getters.getToken === null) return;
            
            vue.$axios.get(
                Config.url_userinfo,
                {
                    headers:{
                        "X-Http-Token": context.getters.getToken
                    }
                }
            ).then(function(response){

                let data = response.data.data;

                context.commit("setMember", {
                    member: data.member
                });

            }).catch(function(error){

                if(error.response !== undefined)
                    vue.$toast(error.response.data.message);
                else
                    vue.$toast(error);

            });
        },

        //TODO: AJAX 처리해야 함
        loadShopList(context){
            let arr = []
            for(let i=0; i<10; i++){
                
                arr.push({
                    idx: 1,
                    sangho: '가자마사지',
                    img: 'http://www.msgtong.com/_Manager/_upfiles/org/2018119.18247.554.jpg',
                    comment: 5,
                    star: 7.4,
                    favorite: 115,
                    lat: 55.5555,
                    long: 329.445,
                    addr: '부산 남구 용호동',
                    distance: '3.0km',
                    price: 70000,
                    sale_price: 30000,
                    sale_rate: 57
                });
                
            }
            context.commit('addShopList', arr);
        },

        loadAreas(context, vue){
            
            var ref = this;
            
            vue.$axios.get(Config.url_area_list)
            .then(function(result){
                if(result.status !== 200){
                    vue.$dialogs.alert('네트워크 에러입니다', {title:'Info', size:'sm'});
                    return;
                }
                
                context.commit('setAreaList', result.data.data.area_main);
            }).catch(function(result){
                console.log(result);
            });
        },

        loadPhoneNumber(context, vue){
            return new Promise(function(resolve, result){
                resolve('010-333-' + ((Math.random() * 9999) + 1000).toFixed(0));
            });
        },

        loadLatLng(context, vue){
            return new Promise(function(resolve, reject){
                resolve({
                    lat: '35.11144523515915', lng: '129.108608844296'
                });
            });
        }
    }

});