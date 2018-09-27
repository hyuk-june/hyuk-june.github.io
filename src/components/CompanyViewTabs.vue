<template>
    <div id="cp_tabs">
        
        <b-tabs v-bind:card=false v-bind:no-nav-style=true nav-wrapper-class="tab-nav" v-bind:small=true v-on:input="onShowTab">
            
            <b-tab title="가격&amp;코스" active title-item-class="tab-item">
                
                <div v-html="company.cp_content" class="p-1 view-sec intro"></div>
                
                <div class="course p-1 view-sec">
                    <h6 class="sec-title">가능한 코스</h6>
                    <ul class="d-flex">
                        <li v-for="(item, index) in company.goods" v-bind:key="index" class="mr-1">
                            <span class="badge badge-warning">{{item.gd_name}}</span>
                        </li>
                    </ul>
                </div>

                <div class="service p-1 view-sec">
                    <h6 class="sec-title">가능한 서비스</h6>
                    <ul class="d-flex">
                        <!-- <li v-for="(item, index) in company.goods" v-bind:key="index" class="mr-1">
                            <span class="badge badge-warning">{{item.gd_name}}</span>
                        </li> -->
                    </ul>
                </div>

            </b-tab>
            <b-tab title="이벤트" title-item-class="tab-item">
                <div class="event p-1">
                    <div v-if="event" class="p-1">
                        {{event}}
                    </div>
                    <div v-else class="p-1">
                        이벤트가 없습니다
                    </div>
                </div>
            </b-tab>
            <b-tab title="리뷰" title-item-class="tab-item">
                <div class="review p-1">
                    <div v-if="review" class="p-1">
                    </div>
                    <div v-else class="p-1">
                        리뷰가 없습니다
                    </div>
                </div>
            </b-tab>
        </b-tabs>
        
    </div>
</template>

<script>
export default {
    props:['company'],
    data(){
        return{
            event:null,
            review:null
        }
    },
    methods: {
        onShowTab(index){
            console.log(index);
            switch(index){
                case 0:
                break;

                case 1:
                this.loadEvent();
                break;

                case 2:
                this.loadReview();
                break;
            }
        },

        loadEvent(){
            //this.event = '후기 이벤트';
        },

        loadReview(){

        }
    },

    mounted(){
        console.log('aaa');

        let tabs = document.querySelector('.tab-nav');
        let tabs_top = tabs.offsetTop;

        window.addEventListener('scroll', function(){

            let scroll_top = document.documentElement.scrollTop;
            
            //console.log(scroll_top + ' : ' + tabs.offsetTop);
            
            if(scroll_top >= tabs_top){
                tabs.classList.add('nav-fixed');
            }else if(tabs.classList.contains('nav-fixed')){
                tabs.classList.remove('nav-fixed');
            }
            //console.log();
            //console.log(document.);

        });
    }
}
</script>

<style>
#cp_tabs .tab-nav {border-top:1px solid #ddd; border-bottom:1px solid #ddd; background-color:#fff;}
#cp_tabs .tab-nav li a.active{font-weight:bold; color:#f00 !important;}
#cp_tabs .tab-nav .nav-item{border-right:1px solid #ddd;}
#cp_tabs .tab-nav.nav-fixed{position: fixed; top:0; left:0; right:0; z-index:9;}
#cp_tabs .tab-nav ul{display:flex; justify-content: space-between;}
#cp_tabs .tab-nav ul .tab-item{flex-grow: 1; width:0; text-align:center;}
#cp_tabs .course li span{font-size:1.1rem;}
#cp_tabs .intro img{max-width:100%;}
</style>
