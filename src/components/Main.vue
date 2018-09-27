<template>
  <div id="main">
    <!-- <h1>{{ myarea }} {{ '@/src' }}</h1> -->
    
    <div class="main-banner mb-4">

      <b-carousel id="main_cp" style="text-shadow: 1px 1px 2px #333;"
        background="#ababab"
        :interval="2000"
        img-width="1024"
        img-height="230"
        v-model="slide"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd">

        <div class="carousel-image premium-item">
          <b-carousel-slide class="wrap"
          v-bind:class="{active:isZero(index)}" v-for="(row, index) in mainVisual" v-bind:key="index"
          v-bind:img-src="row.src"
          >
            <div class="caption">
              <h5 class="title">{{row.area}} {{row.cp_sangho}} {{row.cp_area_tag}}</h5>
              <div class="summary">
                <span class="gd-sale-rate">[{{row.sale_rate}}]%</span>
                <span class="gd-sale-price">{{row.gd_sale_price}}</span>
                <span class="gd-price">{{row.gd_price}}</span>
              </div>
            </div>
          </b-carousel-slide>
        </div>
      </b-carousel>
      
    </div>
    

    <section class="mymsg container mb-4">
        <h4>나에게 맞는 마사지 찾기</h4>
        <div>
          
          <div class="row mb-2">
            <div class="col"><button>태국</button></div>
            <div class="col"><button>태국</button></div>
            <div class="col"><button>태국</button></div>
          </div>
          <div class="row mb-2">
            <div class="col"><button>태국</button></div>
            <div class="col"><button>태국</button></div>
            <div class="col"><button>태국</button></div>
          </div>
          
        </div>
    </section>

    <section class="mysvc container mb-4">
        <h4>나에게 맞는 서비스 찾기</h4>
        <ul>
          <li v-for="(img, index) in mymsg_banners" v-bind:key="index">
            <img v-lazy="img.src" class="img-fluid" />
          </li>
        </ul>
    </section>

  </div>
</template>

<script>
import image1 from '@/assets/img/car01.jpg'
import image2 from '@/assets/img/car02.jpg'
import image3 from '@/assets/img/car03.jpg'
import image4 from '@/assets/img/car04.jpg'
import image5 from '@/assets/img/car05.jpg'
import image6 from '@/assets/img/car06.jpg'

export default {
  name: 'Main',
  data () {

    return {
      
      myarea: '부산광역시 남구 용호동 538-41',
      slide:0,
      sliding: null,
      mainVisual: [
        {
          src: image1,
          area: '대연동',
          cp_sangho: '타이마사지',
          cp_area_tag: '경성대',
          sale_rate: 60,
          gd_sale_price: '70,000',
          gd_price: '80,000'
        },
        {
          src: image2,
          area: '대연동',
          cp_sangho: '타이마사지',
          cp_area_tag: '경성대',
          sale_rate: 60,
          gd_sale_price: '70,000',
          gd_price: '80,000'
        },
        {
          src: image3,
          area: '대연동',
          cp_sangho: '타이마사지',
          cp_area_tag: '경성대',
          sale_rate: 60,
          gd_sale_price: '70,000',
          gd_price: '80,000'
        },
        {
          src: image4,
          area: '대연동',
          cp_sangho: '타이마사지',
          cp_area_tag: '경성대',
          sale_rate: 60,
          gd_sale_price: '70,000',
          gd_price: '80,000'
        },
        {
          src: image5,
          area: '대연동',
          cp_sangho: '타이마사지',
          cp_area_tag: '경성대',
          sale_rate: 60,
          gd_sale_price: '70,000',
          gd_price: '80,000'
        },
        {
          src: image6,
          area: '대연동',
          cp_sangho: '타이마사지',
          cp_area_tag: '경성대',
          sale_rate: 60,
          gd_sale_price: '70,000',
          gd_price: '80,000'
        }
      ],

      mymsg_banners:[
        {
          src: 'http://www.dbdbdeep.com/upload/merchant/S00206045U_B.jpg',
          href: 'http://www.dbdbdeep.com//naver.com'
        },
        {
          src: 'http://www.dbdbdeep.com/upload/merchant/S00125897R_B.jpg',
          href: 'http://www.dbdbdeep.com//naver.com'
        },
        {
          src: 'http://www.dbdbdeep.com/upload/merchant/S00125911I_B.jpg',
          href: 'http://www.dbdbdeep.com//naver.com'
        },
        {
          src: 'http://www.dbdbdeep.com/upload/merchant/S00155058A_B.jpg',
          href: 'http://www.dbdbdeep.com//naver.com'
        },
        {
          src: 'http://www.dbdbdeep.com/upload/merchant/S00155058A_B.jpg',
          href: 'http://www.dbdbdeep.com//naver.com'
        },
        {
          src: 'http://www.dbdbdeep.com/upload/merchant/S00155058A_B.jpg',
          href: 'http://www.dbdbdeep.com//naver.com'
        },
        {
          src: 'http://www.dbdbdeep.com/upload/merchant/S00155058A_B.jpg',
          href: 'http://www.dbdbdeep.com//naver.com'
        }
    
      ]
      
    }
    
  },

  methods: {
    
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
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main .mymsg h4{font-size:1rem; text-align: left;}
#main .mysvc h4{font-size:1rem; text-align: left;}
#main .mysvc ul{list-style-type: none; padding:0; margin:0;}
#main .mysvc ul li{margin-bottom:10px;}
</style>
