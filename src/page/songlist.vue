<template>
	<div v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="10">
		<div class="g-title">全部歌单</div>
		<div>
             
		    <!-- <el-table v-if="loading" v-loading="loading"></el-table> -->
			<el-row type=:flex :gutter="10" class="mianio">
				<el-col :key="item.id" :xs="12" :sm="12" :md="12" :lg="12" class="startlist" v-for="item in list" >
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
				list:[],
				num:0
			}
		},
		created(){
			this.get()
		},
		methods:{
			get(){
               getSongList('全部', 'hot', this.num, true, 6).then((res)=>{
               	   // this.list=res.data.playlists
               	   var l= (res.data.playlists)
               	   var t=res.data.total
               	   for(let i=0;i<l.length;i++){
                       this.list.push(l[i])
               	   }
               	   this.num=this.num+6
               	   if(this.num>t)this.num=t
               	   this.loading=true
               })
			},
			loadMore(){
				this.loading=true
				setTimeout(()=>{
                    this.get()
				},1000)
				
			}
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
  .mianio{
  	 width:100%;
  	 height:100%;
  	 .startlist{
  	 	position:relative;
    	a{
		   color:rgba(0,0,0,0.87)
	    }
    	&-name{
    		overflow:hidden;
    		font-size:12px;
    		height:2.1rem;
    		text-overflow: ellipsis;
    		display:-webkit-box;
    		-webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
    	}
    	&-img{
    		width:100%;
    		height:100%
    	}
    	.startlist-bar{
    		position:absolute;
    		top:0;
    		right:20px;
    		color:#fff;
    		font-size:12px;
    	}
    }
  }
	
    .g-title {
	    padding-left: 5px;
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