<template>
	<section class="child_page">
		<head-top crossover="退出"></head-top>
		<section class="login">
			<div class='logo'>
				<img src="../../../../images/logout_logo.png" alt="">
			</div>
			<div class="login_botton" @click="isLogout"> 
				确定
			</div>
		</section>
	</section>	
</template>

<script>
	import headTop from 'src/components/header/head'
	import { contacts } from 'src/service/data/contacts'
    
	export default{
		data(){
			return{
				inputaccounts: "",		//帐号	
				inputcode: "",			//密码
				accounts: false,		//清除帐号
				code: false,			//清除密码
				borderColor:true,		//下边框颜色
				borderColortwo: false	
			}
		},
		created(){

		},
		mounted(){
			
		},
		components:{
			headTop,
		},
		computed:{
			
		},
		methods:{
			inpuMark(){
				this.inputaccounts ? this.accounts=true : this.accounts=false;
			},
			inpuCode(){
				this.inputcode ? this.code=true : this.code=false;
			},
			accountsMark(){
				this.borderColor=true;
				this.borderColortwo=false;
			},
			accountsCode(){
				this.borderColor=false;
				this.borderColortwo=true;
			},
			clearMark(){
				this.inputaccounts="";
				this.accounts=false;
			},
			clearCode(){
				this.inputcode="";
				this.code=false;
			},
			isLogout(){
				localStorage.removeItem('status')
				localStorage.removeItem('message')
				localStorage.removeItem('name')
				localStorage.removeItem('id')
				localStorage.removeItem('avatar')
				localStorage.removeItem('wxid')
				localStorage.removeItem('psw')
				this.$router.push('/login')
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "src/style/public";
	.child_page{
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0;
		z-index: 203;
		background-color: #ebebeb;
		width: 100%;
		height: 100%;
	}
	.login{
		// padding-top: 2.6rem;
		width:14.3786666667rem;
		margin: 5rem auto;
		.logo{
			// margin-bottom: 1rem;
			img{
				margin-left: 50%;
				transform: translate(-50%);
				width: 120px;
				height: 120px;
			}
		}
		.login_botton{
			// margin-top:1.536rem;
			text-align:center;
			background:#1aad19;
			border:1px solid #179e16;
			border-radius:5px;
			line-height:1.6rem;
			@include sizeColor(.7rem,#fff);
		}
	}
</style>