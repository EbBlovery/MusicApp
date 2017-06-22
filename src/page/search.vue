<template>
	<div>
	    <div class="header">
	    	<el-row>
	    		<el-col  :span="6"><i @click="back()" class="el-icon-arrow-left back"></i></el-col>
	    		<el-col :span="18">
	    		     <div class="header-search">
	    		     	<input id="newSearch" placeholder="搜索" class="search" v-on:keyup.enter="submit()">
	    		     </div>
	    		</el-col>
	    	</el-row>
	    </div>
		<div class="songsList">
			<el-row v-for="item in list" :key="item.id">
				<el-col  :span="22">
					<div @click="pushSongs(item)" class="songList-bar ">
						<p class="songsList-name">{{item.name}}</p>
						<p class="songsList-ar">{{item.ar[0].name}}</p>
						<div class="linear"></div>
					</div>
				</el-col>
				<el-col :span="2"><i class="el-icon-more"></i></el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
    import {searchWords,songAudios} from '../config/ajax.js'
	export default{
		data(){
			return{
				value:'',
                list:[]
			}
		},
		created(){
            this.get()
		},
		methods:{
			get(){
				
			},
			back(){
				this.$router.go(-1)
			},
			submit(){
				var newSearch=document.getElementById('newSearch').value
                searchWords(newSearch).then(res=>{
                   this.list=res.data.result.songs
				})
			},
			pushSongs(item){
				var arr=[]
				arr.id=item.id
				arr.name=item.name
                arr.al=item.al 
                this.$store.commit('GETSTART',arr)
			}
		}
	}
</script>
<style lang="less" scoped>
    @import '../asset/common.less';
	.header{
		position:fixed;
		z-index:100;
		top:0;
		left:0;
		width:100%;
		height:60px;
		background:#e4343c;
		.back{
            position:absoiute;
            vertical-align:center;
		}
		.header-search{
			position:relative;
			.search{
				position:absoiute;
				bottom:0px;
				right:10%;
				font-size:20px;
				height:50px;
				vertical-align:center;
				line-height:50px;
				max-width:200px;
				background:inherit;
				border:none;
				border-bottom:1px solid #fff;
				outline:medium;
			}
		}
		
	}
	.songsList{
		width:100%;
		height:100%;
		margin-top:60px;
		.songList-bar{
			padding:10px 15px;
			width:inherit;
			height:50px;
			position:relative;
			cursor:pointer;
			.songsList-name{
				height:20px;
                width:inherit;
                font-size:17px;
                color:rgb(66,128,236)
			}
			.songsList-ar{
				height:20px;
                width:inherit;
                font-size:13px;
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
		}
		
	}
</style>