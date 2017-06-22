<template>
	<div>
		<div class="header-bar" :style="{'background': 'rgba(206, 61, 62, '+ opacity +')'}" style="transition: opacity .1s;">
			<div>
				<el-row >
					<el-col :span="4"><i @click="back"  class="el-icon-arrow-left"></i></el-col>
					<el-col :span="20">{{frame}}</el-col>
				</el-row>
			</div>
		</div>
		<div class="header-main">
			<el-row class="header-main-info">
				<el-col class="main-gallery" :xs="12" :sm="12" :md="12" :lg="12">
					<span>{{playCount | countNumber}}</span>
					<img :src="coverImgUrl + '?param=300y300'">
				</el-col>
				<el-col class="main-title" :xs="12" :sm="12" :md="12" :lg="12">
						<p class="title">{{name}}</p>
						<p class="author">
						    <img :src="creator.avatarUrl + '?param=50y50'"><!-- 作者描述 -->
							<span>{{creator.nickname}}</span>
						</p>
				</el-col>
			</el-row>
			<div class="bg-mask"></div>
            <div class="bg-player" id="backImg" :style="{'background-image':'url(' + coverImgUrl + '?param=300y300)'}" >
            </div>
		</div>
		<div class="container">
		    <el-table v-if="load" v-loading="load"></el-table>
			<div class="container-bar">
				<div class="container-title"><i class="el-icon-view"></i>&nbsp;&nbsp;&nbsp;播放全部</div>
				<div class="container-menu">
					<div @click.prevent.once="pushSongs(item)" v-for="(item,index) in list" class="container-menu-nav">
						<el-row>
							<el-col class="index" :span="4">{{index+1}}</el-col>
							<el-col class="name" :span="20">
                                 <div class
                                 ="linear"></div>
                                 <p>{{item.name}}</p>
                                 <span></span>
                            </el-col>
						</el-row>
					</div> 
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import {getPlaySongs} from '../config/ajax.js'
	export default{
		data(){
			return{
				load:true,
				coverImgUrl:'',
				frame:'歌单',
				name:'',
				id:0,
				playCount:0,
				description:'描述',
				creator:{
					avatarUrl:'',
					nickname:'昵称'
				},
				list:[],
				opacity:0
			}
		},
		created(){
            
		},
		methods:{
            back(){
            	this.$router.go(-1)
            },
            get(){
                getPlaySongs(this.$route.params.id).then(res=>{
                	this.load=false
                    this.list=res.data.playlist.tracks
                })
            },
            pushSongs(item){
                var arr={}
                arr.id=item.id
                arr.name=item.name
                arr.al=item.al
                this.$store.commit('GETSTART',arr)
                this.$store.commit('GETSTARTLIST',arr)
                this.$store.commit('AUDIOSTART')
            }
		},
		beforeRouteEnter: (to,from,next)=>{
           next(vm=>{
              if(parseInt(to.params.id) !== parseInt(vm.id)){
                 vm.get()
              }
              if(to.params.coverImg){
                 vm.coverImgUrl= vm.$route.params.coverImg
                 vm.name=vm.$route.params.name
                 vm.description=vm.$route.params.desc
                 vm.playCount=vm.$route.params.count
                 vm.creator=vm.$route.params.creator
                 vm.id=vm.$route.params.id
              }
              window.onscroll = () => {
		         var opa = window.pageYOffset / 150
		         if (opa > 0.5) {
		             vm.frame = vm.name
		         } else {
		              vm.frame = '歌单'
		         }
		         vm.opacity = window.pageYOffset / 150
		      }
           })
		},
		beforeRouteLeave:(to,from,next)=>{
            next(vm=>{
               window.onscroll=null
            })
		},
		computed:{
			
		},
		filters:{
             countNumber(value){
                 if(value>=10000){
                    return parseInt(value/10000)+ "万"
                 }else{
                   return value+"位"
                 }
             }
		}
	}
</script>
<style lang="less" scoped>
	.header-bar{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:56px;
		z-index:15;
		font-size:20px;
		line-height:56px;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
	.header-main{
		position:relative;
		padding:60px .5rem 0;
		height:10rem;
	}
	.header-main-info{
		position:relative;
		z-index:10;
		color:#fff;
        .main-gallery{
        	position:relative;
        	float:left;
        	width:9rem;
        	overflow:hidden;
        	span{
        		position:absolute;
        		display:block;
        		padding-right:5px;
        		width:100%;
        		left:0;
        		top:0;
        		font-size:12px;
        		text-align:right;
        		background:rgba(0,0,0,.35);
        		z-index:11;
        	}
        	img{
        		max-width:100%;
        		height:auto;
        	}
        }
        .main-title{
        	float:left;
        	width:7.5rem;
        	height:100%;
        	margin-left:1rem;
        	.title{
        		font-size:16px;
        		word-wrap:wrapper;
        	}
        	.author{
        		span{
        			overflow:hidden;
        			display:inline-block;
        			height:30px;
        			text-overflow:ellipsis;
        			width:5.4rem;
        			white-space:nowrap;
        			font-size:14px;
        			vertical-align:top;
        			line-height:30px;
        		}
        	}
        }
	}
	.bg-player {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom right;
        filter: blur(40px);
        -webkit-filter: blur(40px);
        z-index: 1;
    }
    .container{
    	margin-bottom:50px;
    	width:100%;
    	height:100%;
    	.container-bar{
    		position:relative;
    		width:100%;
    		height:100%;
    		.container-title{
    			position:absolute;
    			top:0;
    			left:0;
    			width:100%;
                font-size:16px;
                font-weight:bold;
    		}
    		.container-menu{
    			padding-top:40px;
    			width:100%;
    			height:100%;
                .container-menu-nav{
                    width:100%;
                    height:3rem;
                    .center{
                        line-height:3rem;
                        text-indent:1rem;
                    }
                    .name{
                        line-height:1.5rem;
                        .linear{
                            height:1px;
                            background:#000;
                            -webkit-transform:scaleY(0.5);
                            -webkit-transform-origin:0 0;
                            transform:scaleY(0.5);
                            transform-origin:0 0;
                            overflow:hidden;
                       }
                       p{
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap;
                       }
                    }
                    
                }
    		}
    	}
    }
</style>