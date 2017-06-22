import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUi)
Vue.use(ElementUI)
new Vue({
	el:"#app",
	router,
	store,
	mode:'hash',
	render:h=>h(App)
})