import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes=[{
      path:'/index',
      component: require('../page/index'),
      children:[
          {
	      	path:'rage',
	      	component: require('../page/rage')
	      },{
	      	path:'songlist',
	      	component: require('../page/songlist')
        },{
          path:'mv',
          component: require('../page/mv.vue')
        }
      ]
   },{
      path:'/search',
      component: require('../page/search.vue')
   },{
   	  path:'/playListDetail/:id',
   	  name:'playListDetail',
   	  component: require('../page/playlistDetail')
   },{
      path:'/playList',
      component: require('../components/list.vue')
   },{
      path:'/toast',
      component: require('../components/toast.vue')
   },{
   	  path:'*', redirect:'/index/rage'
}]

export default new VueRouter({
	routes
})