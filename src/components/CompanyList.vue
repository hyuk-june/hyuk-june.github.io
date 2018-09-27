<template>
    <div id="arealist">
        <ul class="premium">
            <li v-for="(company, index) in getlist" v-bind:key="index">
                <div class=" premium-item">
                    <img src="{{company.image}}">
                    <div class="caption">
                        <div class="title">
                            {{ company.cp_sangho }}
                            {{ company.cp_area_tag }}
                        </div>
                        <div class="summary">
                            <span class="gd-sale-rate">{{ company.sale_rate }}%</span>
                            <span class="gd-sale-price">{{ company.gd_sale_price }}</span>
                            <span class="gd-price">{{ company.gd_price }}</span>
                        </div>
                    </div>
                </div>
                
            </li>
        </ul>
    </div>
</template>

<script>
import Config from '../store/globals.js'
import Device from '../store/device.js'

export default {
    props: ['cplist'],
    
    data(){
        return {
            show: false,
            acclist: []
        }
    },

    computed:{
        getlist(){
            
            this.acclist = this.acclist.concat(this.cplist);
            console.log(this.acclist);
            return this.acclist;
        }
    }

    /*
    methods: {

        getArIdx(){
            console.log(this.as_idx);
        },

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

        getList(){

            var ref = this;

            var url = '';

            if(this.type == 'am') url = Config.url_cplist_area_main;
            else url = Config.url_cplist_area_sub;

            var form = new FormData();
            form.append('as_idx', this.idx);

            this.$axios.post(
                Config.url_area_list,
                form
            ).then(function(response){
                console.log(response);
            }).catch(function(err){

            });
        }
    },
    mounted() {
        this.getArIdx();
    }
    */
}
</script>

<style>

</style>