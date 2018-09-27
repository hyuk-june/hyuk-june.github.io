<template>
    <div id="naver_map">
        <div class="header">
            <span v-on:click="closeWindow" class="btn-close"><i class="fa fa-arrow-left" /></span>
            <!-- <span v-on:click="closeWindow" class="btn-close"><i class="fa fa-arrow-left">&nbsp;</i></span> -->
            <h1 class="title">지도보기</h1>
        </div>
        <div class="content">
            <div id="map" style="width:100%;"></div>
        </div>
    </div>
    
</template>

<script>
import loadScriptOnce from 'load-script-once';
import Config from '../store/globals.js'

export default {
    map: null,
    pos: null,
    props: ['lat', 'lng', 'label'],
    data(){
        return{
            appKey: Config.daum_apikey
        }
    },

    methods: {
        closeWindow(){
            this.$router.go(-1);
        },

        initMap(){
            
            this.pos = new naver.maps.LatLng(this.lat, this.lng);

            var mapOptions = {
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: naver.maps.MapTypeControlStyle.BUTTON,
                    position: naver.maps.Position.TOP_RIGHT
                },
                zoomControl: true,
                zoomControlOptions: {
                    style: naver.maps.ZoomControlStyle.SMALL,
                    position: naver.maps.Position.TOP_RIGHT
                },
                scaleControl: true,
                scaleControlOptions: {
                    position: naver.maps.Position.RIGHT_CENTER
                },
                logoControl: true,
                logoControlOptions: {
                    position: naver.maps.Position.TOP_LEFT
                },
                mapDataControl: true,
                mapDataControlOptions: {
                    position: naver.maps.Position.BOTTOM_LEFT
                },
                center: this.pos,
                zoom: 11
            };

            this.map = new naver.maps.Map('map', {
                mapOptions
            });

            let marker = new naver.maps.Marker({
                position: this.pos,
                map: this.map
            });

            let infohtml = '<div style="padding:10px;"><h2 style="font-size:1rem; margin:0;">' + this.label + '</h2></div>';

            let infowindow = new naver.maps.InfoWindow({
                content: infohtml,
                borderColor:'#ffa500'
            });
            infowindow.open(this.map, marker);

            this.resizeMap();
        },

        resizeMap(){
            
            if(this.map === null) return;

            let doc = document.documentElement;
            let header = document.getElementsByClassName('header')[0];
            let w = doc.clientWidth;
            let h = doc.clientHeight;// - header.offsetHeight;

            this.map.setSize(new naver.maps.Size(w, h));
            this.map.setCenter(this.pos);
        }
    },

    mounted(){

        let ref = this;

        loadScriptOnce(`https://openapi.map.naver.com/openapi/v3/maps.js?clientId=${this.appKey}&submodules=geocoder`, function(err){
            if (err) {
                console.error(err);
                return;
            }
            ref.initMap();
        });

        window.addEventListener('resize', this.resizeMap);
    }
}
</script>

<style>

</style>
