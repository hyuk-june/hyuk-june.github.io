<template>
    <div id="near">
        <h1>거리순</h1>
        <ul id="list">
            <li v-for="(shop, index) in getShopList" v-bind:key="index">
                <div class="d-flex mb-2 p-2 border-bottom">
                    <div class="thumbnail mr-2">
                        <img class="shop-img" v-lazy="shop.img" v-bind:alt="shop.sangho" />
                    </div>
                    <div class="summary">
                        <h5 class="mt-0">{{ shop.sangho }}</h5>
                        <p class="line1">
                            <span class="comment">
                                <font-awesome-icon icon="pencil-alt" />
                                {{ shop.comment }}
                            </span>
                            <span class="favorite">
                                <font-awesome-icon icon="heart" />
                                {{ shop.favorite }}
                            </span>
                            <span class="star">
                                <font-awesome-icon icon="star" />
                                {{ shop.star }}
                            </span>
                        </p>
                        <p class="line2">
                            <span class="addr">{{ shop.addr }}</span>
                            <span class="distance"><font-awesome-icon class="marker" icon="map-marker-alt"/> {{ shop.distance }}</span>
                        </p>
                        <p class="line3">
                           <span class="sale-rate">{{ shop.sale_rate }}%</span>
                           <span class="price">{{ shop.price }}원</span>
                           <span class="rarr">&rarr;</span>
                           <span class="sale-price">{{ shop.sale_price }}원</span>
                        </p>
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    methods: {
        clearShopList(){
            this.$store.commit('clearShopList');
        },
        loadShopList(){
            this.$store.dispatch('loadShopList');
        }
    },
    computed: {
        getShopList(){
            return this.$store.getters.getShopList;
        }
    },
    mounted() {
        this.clearShopList();
        this.loadShopList();
    }
}
</script>

<style>
#near h1{text-align:left; font-size:1rem; padding:4px; background-color:#ddd;}
#near{width:100%; background-color:#fff;}

#list .thumbnail{width:150px; height:150px;}
#list .thumbnail img.shop-img{width:100%; height:100%;}

#list .summary {text-align:left;}
#list .summary .line2{position:relative;}
#list .summary .line2 .distance{position:absolute; right:0; top:0;}
#list .summary span{display:inline-block; vertical-align: middle; font-size:.9rem;}
#list .summary .marker{color:#f00;}
#list .summary .sale-rate{padding:3px; background-color:#f00; color:#fff; font-weight:bold;}
#list .summary .price{text-decoration: line-through; color:#999;}
#list .summary .sale-price{font-weight:bold; color:#f00; font-size:1.1rem;}
</style>
