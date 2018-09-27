<template>
    <div id="company_view" v-if="show">

        <div class="photo-wrap premium pb-2">
            <b-carousel id="photo_list" style="text-shadow: 1px 1px 2px #333;"
            background="#ababab"
            :interval="2000"
            img-width="1024"
            img-height="220"
            v-model="slide"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd">

                <div class="carousel-image premium-item">
                <b-carousel-slide class="wrap"
                v-bind:class="{active:isZero(index)}" v-for="(row, index) in company.files" v-bind:key="index"
                v-bind:img-src="row.fi_rname"
                >
                </b-carousel-slide>
                </div>

            </b-carousel>

            <div class="btn-close" v-on:click="closeWindow"><i class="fa fa-arrow-left"></i></div>
            <div class="slide-page">{{slide+1}} / {{slide_cnt}}</div>
        </div>

        <div class="view-sec">
            <div class="info p-1">
                <h1 class="title mb-0">{{ company.cp_sangho }} ({{ company.cp_area_tag }})</h1>
                <div class="d-flex justify-content-start mb-1">
                    <star-rating v-model="star_cnt"
                    v-bind:increment=0.5
                    v-bind:read-only=true
                    v-bind:max-rating=5
                    v-bind:show-rating=false
                    v-bind:star-size=20
                    ></star-rating>
                    <div style="padding-top:7px;">{{ star_num }}</div>
                </div>
                <p class="opt mb-1">
                    {{ str24Hour }}
                    {{ strNoHoliday }}
                </p>
                <p class="addr mb-0">
                    {{ company.cp_addr }}
                </p>
                <div class="dist">
                   <i class="fa fa-map-marker-alt"></i> {{ company.dist }}
                </div>
            </div>
        </div>

        <div class="mb-5">
            <div class="detail">
                <CompanyViewTabs v-bind:company="company"></CompanyViewTabs>
            </div>
        </div>

        
        <div class="buttons d-flex">
            <div class="map">
                <router-link v-bind:to="{name: 'NaverMap', params: {lat: company.cp_lat, lng: company.cp_lng, label: company.cp_sangho}}">
                <i class="fa fa-map-marker-alt"></i> 길찾기</router-link>
            </div>
            <div class="phone flex-grow-1">
                <a v-bind:href="`tel:${company.cp_vphone}`"><i class="fa fa-phone"></i> 예약하기</a>
            </div>
        </div>

    </div>
</template>


<script>
import Config from '../store/globals.js'
import Device from '../store/device.js'
import StarRating from 'vue-star-rating'
import CompanyViewTabs from '@/components/CompanyViewTabs'

export default {
    name:'CompanyView',
    props: ['cp_idx'],
    data(){
        return {
            show: false,
            company:null,
            slide:0,
            slide_cnt: 0,
            star_cnt: 0,
            star_num: 0,
            latlng: null
        }
    },

    methods: {

        loadLatLng(){

            let ref = this;

            return new Promise(function(resolve, reject){
                try{
                    Device.loadLatLng(function(latlng){
                        ref.latlng = latlng;
                        resolve();
                    });
                }catch(e){
                    reject(e);
                }
            });
        },

        loadCompany(){

            let ref = this;

            return new Promise(function(resolve, reject){
                ref.$axios.get(
                    Config.url_company_view,
                    {
                        params:{
                            'cp_idx': ref.cp_idx,
                            'lat': ref.latlng.lat,
                            'lng': ref.latlng.lng
                        }
                    }
                ).then(function(response){

                    let data = response.data.data;

                    //업체정보 세팅
                    ref.company = data.company;
                    
                    //슬라이드 총갯수 세팅
                    ref.slide_cnt = ref.company.files.length;
                    
                    //별점
                    ref.star_num = (parseFloat(ref.company.cp_star)).toFixed(1);
                    
                    //별갯수(나누기 2로 보여줌)
                    ref.star_cnt = parseFloat((ref.star_num / 2).toFixed(1));

                    //현재 슬라이드 번호
                    ref.slide = document.querySelectorAll('.photo-item').length;
                    
                    resolve();

                }).catch(function(error){
                    let msg = '';
                    if(error.response !== undefined)
                        msg = error.response.data.message;
                    else
                        msg = error;

                    ref.$toast(msg);

                    reject(msg);
                });
            });
        },

        isZero (index) {
            var b = false;
            if(index==0) b = true;
            return b;
        },

        onSlideStart (slide) {
            this.sliding = true
        },

        onSlideEnd (slide) {
            this.sliding = false
        },

        closeWindow(){
            this.$router.go(-1);
        },

        showRouterView(val){
            console.log(val);
            this.show_router = val;
        }
    },
    mounted(){

        let ref = this;

        let p = new Promise(function(resolve, reject){
            resolve();
        });

        //위도경도 얻기
        p.then(function(result){
            return ref.loadLatLng();
        })
        //업체정보 얻기
        .then(function(result){
            return ref.loadCompany();
        })
        //완료되면 화면 보여줌
        .then(function(result){
            ref.show = true;
        })
        .catch(function(result){
            console.log(result);
            ref.$toast('로딩 실패 - ' + result);
            ref.$router.go(-1);
        });
    },

    computed: {
        str24Hour(){
            return this.company.cp_24hour == '1' ? '24시간' : '';
        },
        strNoHoliday(){
            return this.company.cp_no_holiday == '1' ? '연중무휴' : '';
        }
    },

    components: {
        StarRating,
        'CompanyViewTabs': CompanyViewTabs
    }
}
</script>


<style>

#company_view .carousel-inner{max-height: 220px;}
#company_view .view-sec{
    border-bottom:4px solid #f1f1f1;
}

#company_view .view-sec:last-child{
    border-bottom:0 !important;
}

#company_view .sec-title{
    font-weight: bold;
}

#company_view .photo-wrap{background-color:#fff;}
#company_view .info{position: relative;}
#company_view .info .title{font-size:1.2rem;}
#company_view .info .opt,
#company_view .info .addr{
    font-size:.9rem;
}
#company_view .info .dist{
    position: absolute;
    bottom:0;
    right:.25rem;
}
#company_view .info .dist i{ color: #f00; }

#company_view .buttons{background: #f00; position: fixed; bottom:0; left:0; right:0;}
#company_view .buttons >div{text-align: center;}
#company_view .buttons a{display:block; padding:10px; color:#fff !important; font-weight: bold; }
#company_view .buttons div.map a{border-right:1px solid #fff; padding-left: 20px; padding-right: 20px;}
</style>
