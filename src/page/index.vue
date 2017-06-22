<template>
	<div>
		<div class="fixed-bar">
			<el-row class="main-bar">
				<el-col :span="18"><div class="logo"></div></el-col>
				<el-col :span="6"><i @click="search()" class="searchfor el-icon-search"></i></el-col>
			</el-row>
			<el-tabs type="flex" v-model="activeName" @tab-click="handleClick" class="view-tabs">
			    <el-tab-pane label="流行" name="rage"></el-tab-pane>
			    <el-tab-pane label="歌单" name="songlist"></el-tab-pane>
			    <el-tab-pane label="主播电台" name="mv"></el-tab-pane>
			    <el-tab-pane label="排行榜" name="search"></el-tab-pane>
            </el-tabs>
		</div>
		<div class="default-view">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				activeName:'rage'
			}
		},
		watch:{
			
		},
        methods:{
        	handleClick(tab){
        		if(tab.name){
        			this.activeName=tab.name
        		}else{
        			this.activeName=tab
        		}
                this.$router.push({path:'/index/' + tab.name})
        	},
        	search(){
        		this.$router.push({
        			path:'/search'
        		})
        	}
        }
	}
</script>
<style lang="less" scoped>
@import '../asset/common.less';

.logo{
	width:150px;
	height:48px;
	background:url('../images/logo.png') no-repeat left center;
	background-size:150px;
}
.fixed-bar{
	position:fixed;
	width:100%;
	top:0;
	left:0;
	z-index:15;
	.main-bar{
		background:#e4343c;
		.searchfor{
			position:absolute;
			right:10%;
			top:10px;
			font-size:25px;
			color:#fff;
		}
	}

}
.default-view{
	margin-top:104px;
}
.view-tabs{
	background:#fff;
	font-size:24px;
	.panel{
		padding:0px 40px;
	}
	
}
</style>