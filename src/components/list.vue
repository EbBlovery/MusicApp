<template>
	<div class="list">
	    <div>
	        <div class="close" @click="close()">
	        	
	        </div>
	        <div class="songslist">
	        	<ul> 
		    	    <li v-for="item in getstartlist">{{item.name}}</li>
				</ul>
	        </div>
	    </div>
	</div>
</template>
<script>
    import {mapGetters} from 'vuex'
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			close(){
                this.$store.commit('CLOSELIST')
			}
		},
		computed:{
			...mapGetters([
               'getstartlist'
			])
		}
	}
</script>
<style lang="less" scoped>
    @import '../asset/common.less';
    .list{
        width:100%;
   	    height:100%;
   	    position:absolute;
   	    left:0px;
   	    transform: translateY(100px);
   	    transition: transform .5s;
   	    .close{
   	    	width:100%;
   	    	height:420px;
   	    	background:rgba(0,0,0,0.8);
   	    }
   	    .songslist{
   	    	width:100%;
   	    	height:400px;
   	    	background:#fff;
   	    }
    }
    .showArc{
    	transform:translateY(-800px)
    }
</style>