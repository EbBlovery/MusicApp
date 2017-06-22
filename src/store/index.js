import Vuex from 'vuex'
import Vue from 'vue'
import {getPlaySongs,songAudios,getLic} from '../config/ajax.js'
Vue.use(Vuex)

const store=new Vuex.Store({
	state:{
        songlists:[],
        songdiscrp:[],
        startSongs:[],
        singerInfor:[],  //songs information
        show:true,
        currenttime:0,
        closelist:false,
        getstartlist:[],
        audioStart:false,
	},
    getters: {
        show: state=> state.show,
        singerInfor: state=> state.singerInfor,
        currenttime: state=> state.currenttime,
        closelist: state=> state.closelist,
        getstartlist: state=> state.getstartlist,
        audioStart: state=> state.audioStart,

    },
	mutations:{
         GETSONGLIST(state,id){
            getPlaySongs(id).then(res=>{
            	state.songdiscrp=res.data.playlist
            	state.songlists=res.data.playlist.tracks
            })
         },
         GETSTART(state,arr){
             songAudios(arr.id).then(res=>{
                state.startSongs=res.data.data[0]
             })
             state.singerInfor=arr
         },
         CLOSE(state){
             state.show=!state.show
         },
         CURRENTTIME(state,time){
             state.currenttime=time
         },
         CLOSELIST(state){
            state.closelist=!state.closelist
         },
         GETSTARTLIST(state,arr){
            var items = Array.prototype.concat.call(arr)
            items.forEach((i)=>{
                var flag=false
                state.getstartlist.forEach((item,index)=>{
                    if(item.id===i.id){
                        flag=true
                    }
                })
                if(!flag){
                    state.getstartlist.push(i)
                }
            })
         },
         AUDIOSTART(state){
              state.audioStart=!state.audioStart
         },
         TOGGLE(state){
              state.audioStart=!state.audioStart
         }
	},
	actions:{

	}
})
export default store