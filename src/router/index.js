import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/components/Frame'
import Main from '@/components/Main'
import Near from '@/components/Near'
import Area from '@/components/Area'
import ListArea from '@/components/ListArea'
import MyPage from '@/components/MyPage'
import Notice from '@/components/Notice'
import NoticeView from '@/components/NoticeView'
import Faq from '@/components/Faq'
import FaqView from '@/components/FaqView'
import Qna from '@/components/Qna'
import QnaView from '@/components/QnaView'
import Login from '@/components/Login'
import Register from '@/components/Register'
import CompanyView from '@/components/CompanyView'
import NaverMap from '@/components/NaverMap'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Main'
      }
    },
    {
      path: '/frame',
      name: 'Frame',
      component: Frame,
      children: [
        {
          path: 'main',
          name: 'Main',
          component: Main
        },
        {
          path: 'near',
          name: 'Near',
          component: Near
        },
        {
          path: 'area',
          name: 'Area',
          component: Area
        },
        {
          path: 'mypage',
          name: 'MyPage',
          component: MyPage
        }
      ]
    },
    {
      path: '/area_list/:am_idx/:as_idx?',
      name: 'ListArea',
      component: ListArea,
      props: true
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice,
      props: true
    },
    {
      path: '/notice/:bo_idx',
      name: 'NoticeView',
      component: NoticeView,
      props: true
    },
    {
      path: '/faq',
      name: 'Faq',
      component: Faq,
      props: true
    },
    {
      path: '/faq/:bo_idx',
      name: 'FaqView',
      component: FaqView,
      props: true
    },
    {
      path: '/qna',
      name: 'Qna',
      component: Qna,
      props: true
    },
    {
      path: '/qna/:bo_idx',
      name: 'QnaView',
      component: QnaView,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/company_view/:cp_idx',
      name: 'CompanyView',
      component: CompanyView,
      props: true
    },
    {
      path: '/naver_map/:lat/:lng/:label',
      name: 'NaverMap',
      component: NaverMap,
      props: true
    }
  ]
})
