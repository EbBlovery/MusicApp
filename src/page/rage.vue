<template>
	<div class="main">
		<div>
		    <el-carousel class="wheel">
		        <el-carousel-item>
		            <img src="http://p3.music.126.net/J0DSsHZ77hvYToqX2iWEQA==/18992963858350072.jpg">
		        </el-carousel-item>
		        <el-carousel-item>
		            <img src="http://p3.music.126.net/JQOh7-7h6j9yyF21nU0Fwg==/19129303300198252.jpg">
		        </el-carousel-item>
		        <el-carousel-item>
		            <img src="http://p3.music.126.net/eo5HXwCHTAJLB4lbyw2b3A==/19082024300201562.jpg">
		        </el-carousel-item>
		        <el-carousel-item>
		            <img src="http://p4.music.126.net/-MFF2wkyR6rDMdCMCe9k-A==/19143596951357309.jpg">
		        </el-carousel-item>
		        <el-carousel-item>
		            <img src="http://p3.music.126.net/sjeFlnGonRNfSrx6vehk-w==/18614731860189474.jpg">
		        </el-carousel-item>
		        <el-carousel-item>
		            <img src="http://p3.music.126.net/MD1Rxeu4O21KQ9SBgx0EBQ==/18880813672319248.jpg">
		        </el-carousel-item>
            </el-carousel>
		</div>
		<div class="g-title song-list">推荐歌单 <router-link :to="{path: '/index/songlist'}">更多></router-link></div>
		<div class="songlist">
			<el-row type=:flex :gutter="10" justify="space-around">
				<el-col :xs="8" :sm="8" :md="8" :lg="8" class="startlist" v-for="item in list" :key="item.id" >
					<router-link :to="{name: 'playListDetail',params: { id: item.id, name: item.name, coverImg: item.coverImgUrl, creator: item.creator, count: item.playCount, desc: item.description }}">
					   <span class="startlist-bar">{{item.playCount | personCount}}</span>
					   <img class="startlist-img" :src="item.coverImgUrl">
					   <span class="startlist-name">{{item.name}}</span>
					</router-link>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
    import {getSongList} from '../config/ajax.js'
	export default{
		data(){
			return{
				loading:true,
				list:[]
			}
		},
		created(){
			this.get()
		},
		methods:{
             get(){
             	getSongList('全部', 'hot', 0, true, 6).then((res)=>{
                    this.list=res.data.playlists
             	})
             },
   //           getHandleClick(item){
   //              this.$router.push({
   //              	name:'playListDetail',
   //              	pramas:{
   //                     id: item.id,
   //                     name: item.name, 
   //                     coverImg: item.coverImgUrl, 
   //                     creator: item.creator, 
   //                     count: item.playCount, 
   //                     desc: item.description
   //              	}
   //              })
   //              this.$store.commit('GETSONGLIST',id)
			// }
		},
		filters:{
			personCount(value){
                if(value>=10000){
                    return parseInt(value/10000) + '万'
                }else{
                	return value
                }
			}
		}
	}
</script>
<style lang="less" scoped>
    @import '../asset/common.less';
    .wheel{
    	width:100%;
    	height:100%;
    	img{
    		width:100%;
    		height:100%;
    	}
    }
    .startlist{
    	a{
		   color:rgba(0,0,0,0.87)
	    }
    	position:relative;
    	&-name{
    		overflow:hidden;
    		font-size:12px;
    		height:1.7rem;
    		text-overflow: ellipsis;
    		display:-webkit-box;
    		-webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
    	}
    	&-bar{
    		position:absolute;
    		top:0;
    		right:20px;
    		color:#fff;
    		font-size:12px;
    	}
    	&-img{
    		width:100%;
    		height:100%
    	}
    }
    .g-title {
	    padding-left: 25px;
	    color: #333;
	    height: 35px;
	    line-height: 35px;
	    font-size: 16px;
	    a {
	      float: right;
	      font-size: 12px;
	      color: #666;
	    }
	  }
</style>