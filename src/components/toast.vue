<template>
	<div class="header">
		<div class="header-bar">
			<el-row>
			   <el-col :span="3">
			   	  <p @click="back"><i class="el-icon-arrow-left"></i></p>
			   </el-col>
			   <el-col :span="18">
			   	  <p>{{ singerInfor.name }}</p>
			   </el-col>
			   <el-col :span="3">
			   	  <p><i class="el-icon-share"></i></p>
			   </el-col>
			</el-row>
			<div class="linear"></div>
		</div>
		<div @click.prevent="change()" class="header-animate">
		  <div v-if="show">
		  	<div :class="{rotates:!audioStart}" class="catch-bar"></div>
		    <div class=" header-post">
			    <div class="wheel-bar "></div>
			    <img class="wheel-img" :class="{istrue:audioStart}" :src="singerInfor.al.picUrl">
		    </div>
		    <el-row class="anim-infor" align="center">
		        <el-col :span="6"><i class="el-icon-star-off"></i></el-col>
		        <el-col :span="6"><i class="el-icon-upload2"></i></el-col>
		        <el-col :span="6"><i class="el-icon-upload"></i></el-col>
		        <el-col @click.native.stop="addMore()" :span="6"><i class="el-icon-more"></i></el-col>
		    </el-row>
		  </div>
		  <div class="lrc-bar" v-else>
		    <div class="scroll" :style="{'transform':' translate3d(0px,' + getindex +'px, 0px)'}">
		    	<p class="lrc-info" v-for="item in newLrc">{{item[1]}}</p>
		    </div>
		  </div>
		</div>
	    <div class="header-control">
	        <el-progress :text-inside="true" :stroke-width="10" :percentage="50" status="exception"></el-progress>
	    	<el-row>
		        <el-col :span="4"><img src="../images/seq.png"></el-col>
		        <el-col :span="5"><img src="../images/prev.png"></i></el-col>
		        <el-col :span="6">
                    <div @click="toggle()" :class="{playing:!audioStart}" class="plays"></div>
		        </el-col>
		        <el-col :span="5"><img src="../images/next.png"></el-col>
		        <el-col @click.native="showList()" :span="4"><img src="../images/list.png"></el-col>
		    </el-row>
		    <List :class="closelist?'showArc':''"></List>
	    </div>
	    
	    <div class="bg-filter" :style="{'background-image':'url(' + singerInfor.al.picUrl + '?param=500y500' + ')'}">
	    </div>
	    
	</div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import List from './list.vue'
    import {getLic} from '../config/ajax.js'
	export default{
		data(){
			return{
				num:0,
				show:true,
                list:[],
                newLrc:[]
			}
		},
		components:{
            List
		},
		created(){
			
		},
		methods:{
			back(){
				this.$router.go(-1)
				this.$store.commit('CLOSE')
			},
			toggle(){
				if(this.audioStart){
                    document.getElementById('audio').pause()
					this.$store.commit('AUDIOSTART')
				}else{
					this.$store.commit('AUDIOSTART')
					document.getElementById('audio').play()
				}
                
			},
			change(){
                 this.show=!this.show
			},
			getNewLic(id){
				getLic(id).then(res=>{
					if(res.data.nolyric){
                        this.list="暂无歌词"
					}else{
						this.list=res.data.lrc.lyric
                        this.songsLrc(this.list)
					}
				})
			},
			songsLrc(li){
                var Lrc=li.split('\n')
                var part=/(\[\d+:\d+\.\d+\])|(\[\d+:\d+\])/g
                Lrc[Lrc.length-1].length === 0 && Lrc.pop()
                var result=[]
                while(!part.test(Lrc[0])){
                    Lrc=Lrc.slice(1)
                }
                Lrc.forEach((item,index,arr)=>{
                	var val=item.replace(part,' ')
                	var time=item.match(part)
                	time.forEach((v,i,a)=>{
                       var t = v.slice(1,-1).split(':')
                       result.push([Math.round(parseInt(t[0],10)*60+parseFloat(t[1])),val])
                	})
                })
                this.newLrc=result
			},
			showList(){
				this.$store.commit('CLOSELIST')
			},
			addMore(){
                
			}
		},
		beforeRouteEnter:(to,from,next)=>{
			next(vm=>{
				if(to.params.id!==vm.singerInfor.id){
                    vm.getNewLic(vm.singerInfor.id)
				}
			})
        },
		computed: {
		...mapGetters([
             'singerInfor',
             'singsLic',
             'currenttime',
             'audioStart',
             'closelist'
			]),
			getindex(){
				if(this.newLrc){ 
					var current=Math.round(this.currenttime)
					for(var i=0;i<this.newLrc.length;i++){
                        if(current===this.newLrc[i][0]){
                            this.num=i
                        }
					}
					return 170-((this.num)*40)
				}
			}
		},
		props:['onClick']
	}
</script>
<style lang="less" scoped>
.header{
	width:100%;
}
	.header-bar{
    	position:fixed;
    	top:0;
    	left:0;
    	height:60px;
    	width:100%;
    	z-index:100;
    	opacity:1;
    }
    .bg-filter{
    	position:absolute;
    	top:0;
    	left:0;
    	background-repeat:no-repeat;
    	background-size:cover;
    	background-position:bottom right;
    	filter: blur(60px);
    	-webkit-fliter:blur(60px);
    	z-index:-1;
    	width:100%;
    	height:100%;
    }
    .header-animate{
		position:relative;
		margin-top:100px;
		width:100%;
		height:100%;
		.catch-bar{
    		position: absolute;
	        width: 5rem;
	        height: 7rem;
	        top:-3rem;
	        right: 30%;
	        background: url("../images/stick_bg.png") no-repeat left -.4rem;
	        background-size: cover;
	        z-index: 8;
	        -webkit-transform-origin: left top;
	        transform-origin: left top;
	        -webkit-transform: rotate(-40deg);
	        transform: rotate(-40deg);
	        transition: transform .5s;
    	}
    	.header-post{
    		position:relative;
    		max-width:65%;
    		padding:.8rem .9rem;
    		min-width:80px;
    		margin: 3rem auto 0;
            .wheel-bar{
	    		position:absolute;
		        width: 100%;
		        height: 100%;
		        right: 0;
		        background: url("../images/cd_wrapper.png") no-repeat;
		        background-position:center center;
		        background-size: contain;
		        z-index: 8;
	    	}
	    	.wheel-img{
	    		width:100%;
	    		height:100%;
	    		min-height:80px;
	    		border-radius:50%;
	    		margin:20px auto 0;
	    	}
    	}
    	.lrc-bar{
    		position:relative;
    		width:100%;
    		height:400px;
    		margin-top:90px;
    		overflow:hidden;
    		.scroll{
    			width:100%;
    			height:100%;
    			.lrc-info{
	    			width:100%;
	    			height:100%;
	    			font-size:13px;
	    			color:#fff;
	    			width:100%;
	    			text-align:center;
	    			height:40px;
	    			margin:0;
	    			padding:0;
	    		}
    		}
    	}
    	.anim-infor{
    		width:100%;
    		height:40px;
    		position:absolute;
    		bottom:-180px;
    		left:0px;
    		i{
    			display:block;
    			font-size:25px;
    			margin-left:30px;
    		}
    	}
    }
    .linear{
    	height:1px;
    	background:#000;
    	-webkit-transform:scaleY(0.5);
    	-webkit-transform-origin:0 0;
    	transform:scaleY(0.5);
    	transform-origin:0 0;
    	overflow:hidden;

    }
    .istrue{
    	animation: Wheels 10s linear .5s infinite;
    }
    @keyframes Wheels {
	    0% { 
	    	transform: rotate(0deg);
	    	-webkit-transform:rotate(0deg)
	    }
	    100% { 
	    	transform: rotate(360deg);
	    	-webkit-transform:rotate(360deg)
	    }
    }
    .header-control{
       width:100%;
       height:100px;
       position:fixed;
       bottom:0px;
       left:0px;
       img{
       	width:50px;
       	height:50px;
       	margin: 10px 0 11px 0;
       }
       .plays{
           width:50px;
           height:55px;
           background:url('../images/pause.png') no-repeat;
           background-size:cover;
           margin:10px 0 11px 0;
       }
    }
    .playing{
    	width:50px;
        height:55px;
        margin:10px 0 11px 0;
        background:url('../images/play.png') no-repeat!important;
        background-size:cover!important;
    }
    .rotates{
    	transform:rotate(-9deg)!important;
    }
</style>