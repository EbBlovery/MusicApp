<template>
	<div class="footer">
		<audio id="audio" @canplay="playSongs" @timeupdate="timeUpdateChange()" :src="startSongs.url"></audio>
		<div v-show="show" @click.prevent="bordSongs()">
		   <el-row class="bord">
		       <el-col :span="4"><img :src="singerInfor.al.picUrl + '?param=50y50'">
		       </el-col>
			   <el-col :span="14">
			        <p v-text="singerInfor.name"></p>
			   </el-col>
			   <el-col class="bord-cast" :span="3" @click.native.stop="toggleStart()">
			        <div :class="{playing:!audioStart}" class="plays"></div>
			   </el-col>
			   <el-col @click.native.stop="showList()" class="bord-list" :span="3">
			        <img src="../images/playbar_btn_playlist.png">
			   </el-col>
		   </el-row>
		</div>
		<List :class="closelist?'showArc':''"></List>
	</div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import List from './list.vue'
	export default{
		data(){
			return{
                
			}
		},
		created(){
			
		},
		components:{
			List
		},
		methods:{
			toggleStart(){
				if(this.audioStart){
                    document.getElementById('audio').pause()
				}else{
					document.getElementById('audio').play()
				}
				this.$store.commit('TOGGLE')
			},
			bordSongs(){
				this.$router.push({
					path:'/toast'
				})
			    this.$store.commit('CLOSE')
			},
			timeUpdateChange(){
                var Audio = document.getElementById('audio')
                var time=Audio.currentTime
                this.$store.commit('CURRENTTIME',time)
			},
			showList(){
				this.$store.commit('CLOSELIST')
			},
			playSongs(){
				if(this.audioStart){
					document.getElementById('audio').play()
				}else{
					document.getElementById('audio').pause()
				}
            }
		},
		computed:{
			startSongs(){ 
				return this.$store.state.startSongs
			},
			show(){
				return this.$store.state.show
			},
			...mapGetters([
                'singerInfor',
                'closelist',
                'audioStart'
			]),
		}
	}
</script>
<style lang="less" scoped>
	.footer{
	   width:100%;
	   height:55px;
	   padding:0px 0;
       position:fixed;
       left:0;
       bottom:0;
       z-index:100;
       background:#fff;
       .bord{
       	  .bord-cast{
       	  	 .plays{
       	  	 	width:50px;
       	  	 	height:55px;
		  	 	background:url('../images/playbar_btn_pause.png') no-repeat;
		  	 	background-size:cover;
		  	 }

       	  }
       	  .bord-list{
             img{
       	  	 	width:50px;
       	  	 	height:55px
       	  	 }
       	  }
       }
	}
  	.playing{
        background:url('../images/playbar_btn_play.png') no-repeat!important;
  	 	background-size:cover!important;
  	}
</style>