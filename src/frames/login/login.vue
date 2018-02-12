<template>
	<section class="child_page">
		<head-top logoPart="login" v-on:listenToHeadEvent='MsgFromHead'></head-top>
		<section class="login">
			<div class='logo'>
				<img src="../../images/logo.jpg" alt="">
			</div>
			<div class="useid" :class="{'useid_border' : borderColor}">
				<div class="mark">帐号</div>
				<div class="input_mark"><input  autocomplete="off" type="text" placeholder="网信号" v-model="inputaccounts" @input="inpuMark" @click="accountsMark" /></div>
				<div class="svg_close" v-if="accounts" @click="clearMark">
					<svg fill="#c3c3c3">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use>
					</svg>
				</div>
			</div>
			<div class="useid" :class="{'useid_border' : borderColortwo}">
				<div class="mark">密码</div>
				<div class="input_mark"><input  autocomplete="off" type="password" placeholder="密码" maxlength="16" @input="inpuCode" v-model="inputcode" @click="accountsCode" /></div>
				<div class="svg_close" v-if="code" @click="clearCode">
					<svg fill="#c3c3c3">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use>
					</svg>
				</div>
			</div>
			<div class="login_botton" @click="loginSuccess"> 
				登 录
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
			//接收从子组件传来的值
			MsgFromHead(data){
				console.log(data)
				if(data%2 == 0){
					$("#weixin").css({
						'position':'fixed ',
						'bottom': "-460px"
					})					
				}else{
					$("#weixin").css({
						'position':'fixed',
						'bottom': "0px"
					})
				}
			},
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
			loginSuccess(){
				if(this.inputaccounts){
				var arr = [] 
				for(var key in contacts){
					arr.push(contacts[key])
				}
				var newArr = arr.reduce((a, b) => {
					return a.concat(b)
				})
				var str = this.inputaccounts
				if(this.inputaccounts){
					this.consumer = true
					try{
						for(var i = 0; i < newArr.length; i++){
							if(newArr[i].petname == str){
								localStorage.setItem('status', 200)
								localStorage.setItem('message', '注册成功')
								localStorage.setItem('name', newArr[i].petname)
								localStorage.setItem('id', i)
								localStorage.setItem('avatar', newArr[i].headurl)
								localStorage.setItem('wxid', newArr[i].wxid)
								localStorage.setItem('psw', this.inputcode)
							}
						}
						const res = {
							status: localStorage.getItem('status'),
							message: localStorage.getItem('message'),
							user_info: {
								avatar: localStorage.getItem('avatar'),
								name: localStorage.getItem('name'),
								id: localStorage.getItem('id')
							}
						}
						// if(res.status == 200){
						// 	// localStorage.setItem('user_id', newArr[i].wxid)
						// 	this.GET_USERINFO(res.user_info)
						// 	this.LOGIN_COVER(false)
						// }
					}catch(err){
						this.LOGIN_COVER(true)
					}
				}
					this.$router.push('/dialogue')
				}
				
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
			margin-bottom: 1rem;
			img{
				margin-left: 50%;
				transform: translate(-50%);
				width: 2.8rem;
				height: 2.8rem;
			}
		}
		.useid{
			width:100%;
			border-bottom:1px solid #d4d4d4;
			@include justify(flex-start);
			align-items:center;
            margin-bottom: 1rem;
			.mark{
				@include sizeColor(0.64rem, #333);
				letter-spacing:0.5546666667rem;
				line-height:2.0266666667rem;
				padding-left:0.4266666667rem;
			}
			.input_mark{
				margin-right:0.34rem;
				margin-left:1rem;
				// background: rgb(235, 235, 235) !important;
				@include widthHeight(9.1rem,2.0266666667rem);
				input{
					display:inline-block;
					width:9.1rem;
					line-height:2rem;
					@include sizeColor(0.64rem, #333);
				}
				input:-webkit-autofill,
						textarea:-webkit-autofill,
						select:-webkit-autofill{
							-webkit-box-shadow: 0 0 0 1000px rgb(235, 235, 235) inset;
						}
				input,textarea {
								-moz-appearance:none !important;
								background-color:rgb(235, 235, 235) !important;
								}
			}
			.svg_close{
				@include widthHeight(0.64rem, 0.64rem);
                position: absolute;
                top: 9.8rem;
                right: 2rem;
				svg{
					display:block;
					@include widthHeight(100%, 100%);
				}
			}
		}
		.useid_border{
			border-color:#45c01a;
		}
		.login_botton{
			margin-top:1.536rem;
			text-align:center;
			background:#1aad19;
			border:1px solid #179e16;
			border-radius:5px;
			line-height:1.6rem;
			@include sizeColor(.7rem,#fff);
		}
	}
</style>