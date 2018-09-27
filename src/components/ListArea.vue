<template>
    <div id="list_area">
        <div v-if="show">
            <div class="header">
                <span v-on:click="closeWindow" class="btn-close"><i class="fa fa-arrow-left">&nbsp;</i></span>
                <h1 class="title">{{ title }}</h1>
            </div>
            <div class="content">
                <CompanyList
                    v-bind:cplist="cplist"
                ></CompanyList>
            </div>
        </div>
    </div>
</template>

<script>
import Config from '../store/globals.js'
import CompanyList from '@/components/CompanyList'

export default {

    props:['am_idx', 'as_idx'],

    data(){
        return {
            show: false,
            args:{
                area_type: this.area_type,
                idx: this.idx
            },
            lat: 0,
            lng: 0,
            page: 1,
            cplist: []
        }
    },

    methods: {
        setTitle(title){
            this.title = title;
        },

        closeWindow(){
            this.$router.go(-1);
        },

        getType(){
            if(this.as_idx !== null && this.as_idx !== ''){
                return 'sub';
            }
            return 'main';
        },

        buildURIObject(){

            let form = new FormData();
            form.append('lat', this.lat);
            form.append('lng', this.lng);
            form.append('page', this.page);
            
            if(this.type == 'main'){

                form.append('am_idx', this.am_idx)

                return {
                    url: Config.url_cplist_area_main,
                    params: form
                }
            }else{
                form.append('as_idx', this.as_idx)

                return {
                    url: Config.url_cplist_area_sub,
                    params: form
                }
            }
        },

        loadCompanyList(){

            let ref = this;

            return new Promise(function(resolve, reject){
                
                let obj = ref.buildURIObject();
                console.log('-------');
                console.log(obj);
                
                ref.$axios.post(
                    obj.url,
                    obj.params
                ).then(function(response){
                    console.log('-----');
                    console.log(response.data.data);
                    ref.cplist = response.data.data.ad_period;
                    resolve();

                }).catch(function(error){
                    reject(error);
                });
            });
        }
    },

    mounted(){

        let ref = this;

        this.$store.dispatch('loadLatLng', this)
        .then(function(result){

            ref.lat = result.lat;
            ref.lng = result.lng;

            return ref.loadCompanyList();

        }).then(function(result){
            console.log(result);
            ref.show = true;

        }).catch(function(result){
            console.log(result);
        });
    },


    computed:{
        
        title(){
            
            let title = '';
            let main = null;
            let list = this.$store.getters.getAreaList;

            let am_idx = this.am_idx.toString();
            let as_idx = this.as_idx.toString();

            for(let i=0; i<list.length; i++){
                let area = list[i];
                if(area.am_idx == am_idx){
                    title = area.am_area;
                    main = area;
                    break;
                }
            }
            if(main === null) return title;
            
            let slist = main.sub_list;

            if(title !== '' && as_idx !== null && as_idx !== ''){
                for(let i=0; i<slist.length; i++){
                    let area = slist[i];
                    if(area.as_idx == as_idx){
                        title = area.as_area;
                        break;
                    }
                }
            }

            return title;
        },

        type(){
            if(this.as_idx !== null && this.as_idx !== ''){
                return 'sub';
            }
            return 'main';
        }
    },

    components:{
        CompanyList
    },
}
</script>