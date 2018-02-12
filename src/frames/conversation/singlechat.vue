<template>
	<section>
		<head-top :crossover="chatname" v-on:listenToHeadEvent='MsgFromHead'>
			<section class="coversPart" slot="person" id='coversPart' v-if='coversPart'>
				<router-link to='/singlechat/chatmessage' class="person_link">
					<svg fill="#fff" class="icon-search">
					    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#person"></use>
					</svg>	
				</router-link>
			</section>
		</head-top>
		<section class="coversation"   >
			<section class="coversationlist" @click="bottomHide" ref="chat">
				<ul id="chat-content">
					<!-- 对方 -->
					<li v-for="item in conversine">
						<div class="other" :class="{mysay : item.sendobject !== 1 }">
						
							<div class='say-time'>{{item.sendobject == 1 ? item.time : new Date(Number(new Date().getTime())).toLocaleDateString() + " " + new Date(Number(new Date().getTime())).toLocaleTimeString().substr(0, 7)}}</div>

							<img :src="item.sendobject == 1 ? item.headurl : userInfoData.avatar"  alt="" @click="enlargeImg(item.headurl)">
							<div class="whatsay">
								<div class="whatsay_svg">
									<svg>
										<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="item.sendobject !== 1 ? '#trigon-right' : '#trigon-left'"></use>
									</svg>
								</div>
								<div class="whatsay_text">
									{{item.Messageblob}}
								</div>
							</div>
						</div>
					</li>
				</ul>
			</section>
		</section>
		<footer :class=" {footshow : clickmore}">
			<section class="foot_top">
				<div>
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#voice"></use>
					</svg>
				</div>
				<div>
					<input type="text" v-model="inputmessage" maxlength="100"  @input="whatInput" @click="inputBottomHide" :class="{lightborder : light}" @keyup.enter="enterThing">
				</div>
				<div>
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#face"></use>
					</svg>
				</div>
				<div>
					<div class="send" v-if="light" @click="clickSend">
						<span>发送</span>
					</div>
					<svg v-else @click="bottomShow">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#addthing"></use>
					</svg>
				</div>
			</section>
			<section class="foot_bottom">
	    		<div class="swiper-container">
			        <div class="swiper-wrapper">
           	            <div class="swiper-slide" v-for="(value,item) in chatData">
                       		<ul class="clear">
                       			<li v-for="value in value">
                       				<div class="swiper_svg">
           	            				<svg fill="#7a8187">
           	            					<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="value.chatSvgid"></use>
           	            				</svg>
                       				</div>
                       				<div class="swiper_text">
                       					{{value.chatSvgname}}
                       				</div>
                       			</li>
                       		</ul>
           	            </div>
			        </div>
			        <div class="swiper-pagination"></div>
			    </div>
			</section>
		</footer>
		<section class="enlarge" v-if="enlarge" @click="enlargeHide" :class="{'movein-animate' : enlargeShow, 'moveout-animate-leave' : enlargehides}" >
			<img :src="enlargeurl" alt="">
		</section>
		
		    <router-view></router-view>
		 
	</section>

</template>

<script>
	import headTop from 'src/components/header/head';
	import {mapState, mapActions, mapMutations} from 'vuex';
	import {userWord, chatData} from 'src/service/getData'
	import {imgurl} from 'src/config/env';
	import 'src/config/swiper.min.js' 
	import 'src/style/swiper.min.css'
	import fetch from 'src/config/fetch'
	import $ from 'jquery'
	import {requireImgUrl} from 'src/utils/requireImgUrl'

	export default{ 
		data(){
			return{
				inputmessage:'',//输入的文本内容
				light:false,	//输入框不为空时，input下边框变色
				clickmore:false,	//点击加号底部显示、隐藏
				chatname:'this.infor.petname',		//聊天名字
				ifme:false,			//发消息的对象是否是自己
				enlargeurl:'',		//头像地址
				enlargehides:false,
				enlargeShow:false,
				enlarge:false,
				timer:null,
				conversine:[],		//对话列表
				robotCont:'',
				newInfo:{},
				chatData:{},
				userInfoData:{},
				talk:[],
				coversPart: true
			}
		},
		created(){
			this.coversPart_isshow()
			this.getSingleTalkData()
		},
		beforeMount(){
			console.log('beforeMount')	
		},
		mounted(){
			
		    chatData().then((res) => {
		    	this.chatData=res;
		    }).then(()=>{
	    		//初始化swiper
	    		new Swiper('.swiper-container', {
	    	        pagination: '.swiper-pagination',
	    	        loop: false,
	    	    });
		    })
			this.chatname=this.infor.remarks ? this.infor.remarks : this.infor.petname;
			// this.getUserInfo();
			// this.userInfoData=this.userInfo
			this.userInfoData = {
				avatar: requireImgUrl(localStorage.getItem('wxid')),
				id: localStorage.getItem('id'),
				name: localStorage.getItem('name'),
				wxid: localStorage.getItem('wxid')
			}
			userWord().then((res) => {
				//this.conversine=[...res]
			});	
		},
		components:{
			headTop,
		},
		computed:{
			...mapState([
			    "infor", "userInfo",
			]),
			
		},
		beforeDestroy(){
            clearTimeout(this.timer);
        },
		updated: function(){
			this.$nextTick(()=>{
				if(this.$refs.chat){
					$(this.$refs.chat).scrollTop($('#chat-content').height())
				}
			})
		},
		methods:{
			...mapMutations([
				'SAVE_MESSAGE'
			]),
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
			coversPart_isshow(){
				if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
					this.coversPart = true
				}else{
					this.coversPart = false
				}
			},
			...mapActions([
                'getUserInfo',
            ]),
			whatInput(){
				if(this.inputmessage.replace(/\s+/g, "") == ''){
					this.light=false;
				}else{
					this.light=true;
				}
			},
			enterThing(){
				if(this.light){
					this.clickSend()
				}
			},
			bottomShow(){
				this.clickmore=!this.clickmore;
			},
			bottomHide(){
				this.clickmore=false;
			},
			inputBottomHide(){
				this.clickmore=false;
			},
			getSingleTalkData(){
				var ws = new WebSocket('ws://10.20.88.76:8204/multisub-split/' + localStorage.getItem('wxid'))
				ws.onmessage = env => {
					var str = decodeURIComponent(env.data).split('=')[1].split('&')[0]
					const fromUserId = env.data.split('&')[1].split('=')[1]
					var timeStamp = decodeURIComponent(env.data).split('&')[2].split('=')[1];				
					if(fromUserId == this.infor.wxid && 
						fromUserId != this.userInfoData.wxid
					){
						this.conversine.push({
							"wxid":this.infor.wxid,
							'headurl': requireImgUrl(this.infor.wxid),
							"sendobject":this.infor.sendobject,
							"Messageblob":str,
							"time":new Date(parseInt(timeStamp) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '),
							"flag": decodeURIComponent(env.data).split('&')[1] == 'fromUserId=' + this.userInfoData.wxid
						});	
					}
				}
			},
			async clickSend(){						
				this.conversine.push({
					"wxid": this.userInfoData.wxid,
					"avatar": this.userInfoData.avatar,
					"sendobject":0,
					"Messageblob":this.inputmessage,	
				});
				const inputmessage = this.inputmessage;
				this.inputmessage='';
				$.ajax({
					url:'http://maybach.wxfaelocal.com:8204/pub-proxy/123',
					data:{
						data: JSON.stringify({
						'toUserId': this.infor.wxid,
						'fromUserId': this.userInfoData.wxid,
						'message': inputmessage
						})
					},
					method:'post',
					dataType:'json'
				})
			},
			enlargeImg(enlargeImg){
				this.enlargeurl=enlargeImg;
				this.enlarge=true;
				this.enlargeShow=true;
				this.enlargehides=false;
			},
			enlargeHide(){
				clearTimeout(this.timer)
				this.enlargehides=true;
				this.enlargeShow=false;
				this.timer = setTimeout(() =>{
                    this.enlarge=false;
                },400)
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "src/style/public";
	.router-show-enter-active,.router-show-leave-active{
		transition: all .4s;
	}
	.router-show-enter,.router-show-leave-active{
		transform:translateX(100%)
	}

	.coversPart{
		@include topcenter;
		right:0.5973333333rem;
		@include widthHeight(0.8533333333rem,0.8533333333rem);
		.person_link{
			display:block;
			@include widthHeight(0.8533333333rem,0.8533333333rem);
			svg{
				@include widthHeight(100%,100%);
			}
		}
	}
	.coversation{
		// background-color: #ebebeb;
		// -webkit-overflow-scrolling: touch; 
		// padding-top: 2.06933rem;
		// height: 630px;
		background-color: #ebebeb;
		-webkit-overflow-scrolling: touch; 
		padding-top: 2.3rem;
		overflow-x: hidden;
		position: relative;
		.coversationlist{
			// position: relative;
			// padding:0 .32rem;
			// overflow:auto;
			// margin:0 auto;
			position: relative;
			right: -.5rem;
			padding-right: 1rem;
			overflow:auto;
			overflow-x: hidden;
			// margin-left: -10px;
			height: 25.1rem;
			.underscore{
				padding-top:0.2rem;
				text-align:center;
				@include sizeColor(0.5546666667rem,#999);
			}
			ul{
				// padding-top:.4rem;
				// padding-bottom:2.2rem;
				// width:15.4rem;
				// overflow-scrolling: touch; 
				// -webkit-overflow-scrolling: touch; 
				// top:0;
				overflow: auto;
				overflow-x: hidden;
				overflow-scrolling: touch; 
				-webkit-overflow-scrolling: touch; 	
				-moz-overflow-scrolling: touch;
				// padding-top: 20px;
				>li:first-child{
					margin-top:.5rem;
				}
				>li:last-child{
					margin-bottom:2rem;
				}
				li{
					.other{
						width:100%;
						@include justify(flex-start);
						// margin-bottom:0.512rem;
						// align-items:top;
						margin-bottom:1rem;
						// padding-right: 20px;
						align-items:top;
						position: relative;
						img{
							display:block;
							margin-top: .4rem;
							@include widthHeight(1.7493333333rem,1.7493333333rem);
						}
						.say-time{
							@include sizeColor(.48rem,#999);
							width: 11rem;
							position: absolute;
							top: -.3rem;
							// right:.8rem;						
						}
						.whatsay{
							margin-top: .4rem;
							position: relative;
							.whatsay_svg{
								@include widthHeight(0.4266666667rem,0.64rem);
								position: absolute;
								top:.5546667rem;
								left:.36rem;
								z-index:2;
								svg{
									display:block;
									@include widthHeight(0.4266666667rem,0.64rem);
								}
							}
							
							.whatsay_text{
								margin-left:0.6399997rem;
								max-width:10.3253333333rem;
								background:#fff;
								padding:0.42rem 0.384rem;
								border:1px solid #d9d9d9;
								border-radius:8px;
								@include sizeColor(0.64rem, #333);
								line-height:0.8533333333rem;
								word-break: break-all;
							}
						}
						
					}
					.mysay{
						display:flex;
						flex-direction:row-reverse;
						position: relative;
						.say-time{
							position: absolute;
							top: -.3rem;
							right:-5.3rem;
							width: 11rem;					
						}
						img{

						}
						.whatsay{
							.whatsay_svg{
								right:.36rem;
								left:auto;
							}
							.whatsay_text{
								margin-right:0.6399997rem;
								margin-left:0;
								background:#9fe658;
							}
						}
					}
				}
			}
			
		}
	}
	footer{
		position: fixed;
		z-index:10;
		border-top:1px solid #e0e0e0;
		background:#f5f5f5;
		bottom:-11.712rem;
		width:100%;
		.foot_top{
			padding:0 0.512rem;
			height:2.0053333333rem;
			background:#f3f3f3;
			@include justify(flex-start);
			align-items:center;
			div:nth-of-type(1),div:nth-of-type(3),div:nth-of-type(4){
				@include widthHeight(1.3653333333rem,1.3653333333rem);
				margin-right:0.3413333333rem;
				svg{
					@include widthHeight(100%, 100%);
				}
			}
			div:nth-of-type(2){
				margin-right:0.3413333333rem;
				width:9.8rem;
				height:1.152rem;
				border-bottom:1px solid #e0e0e0;
				input{
					display:block;
					width:9.8rem;
					padding:0 0.4133333333rem;
					line-height:1.152rem;
					height:1.152rem;
					border:0;
					background:none;
					@include sizeColor(0.64rem,#000);
					border-bottom:1px solid #e0e0e0;
				}
				.lightborder{
					border-color:#19ad17;
				}
			}
			div:nth-of-type(4){
				margin-right:0;
				.send{
					width:1.4133333333rem;
					background:#16af17;
					height:1.3653333333rem;
					padding:.682666rem 0;
					border-radius:5px;
					@include justify(center);
					align-items:center;
					span{
						display:block;
						@include sizeColor(0.5973333333rem,#fff);
					}
				}
				.send:active{
					background:#33c034;
				}
			}
		}
		.foot_bottom{
			height:11.712rem;
			border-top:1px solid #e0e0e0;
			.swiper-container{
				width:100%;
				height:11.712rem;
				overflow:hidden;
				.swiper-slide{
					width:100%;
					ul{
						padding:1.408rem 1.1946666667rem 0;
						box-sizing:border-box;
						li{
							float:left;
							width:2.5466666667rem;
							margin-right:1rem;
							margin-bottom:1.1946666667rem;
							.swiper_svg{
								@include widthHeight(2.5466666667rem,2.5466666667rem);
								background:#fcfcfc;
								border:1px solid #d3d3d3;
								border-radius:10px;
								@include justify(center);
								align-items:center;
								svg{
									@include widthHeight(1.28rem,0.9386666667rem);
									display:block;
								}
							}
							.swiper_text{
								width:100%;
								margin-top:0.256rem;
								text-align:center;
								@include sizeColor(0.4693333333rem,#7a8187);
							}
						}
						li:nth-of-type(4n+4){
							margin-right:0;
						}
					}
				}
			}
		}
	}
	.footshow{
		bottom:0;
		transition: all .2s;
	}
	.enlarge{
		position:fixed;
		@include widthHeight(100%,100%);
		background:#000000;
		top:0;
		z-index:100;

		img{
			display:block;
			width:100%;
			height:15.0186666667rem;
			position: absolute;
			top:50%;
			left:0;
			margin-top:-7.5093333333rem;
		}
	}
	.enlarge_part{
		display:none;
	}
	body .movein-animate{
		transition:all 1s;
		animation:fadeIn .6s;
	}
	body .moveout-animate-leave{
		transition:all 1s;
		animation:zoomOut .6s;
	}
	@-webkit-keyframes fadeIn {
	  from {
	    opacity: 0;
	  }

	  100% {
	    opacity: 1;
	  }
	}

	@keyframes fadeIn {
	  from {
	    opacity: 0;
	  }

	  100% {
	    opacity: 1;
	  }
	}

	@-webkit-keyframes zoomOut {
	  from {
	    opacity: 1;
	  }

	  50% {
	    opacity: 0;
	    -webkit-transform: scale3d(.3, .3, .3);
	    transform: scale3d(.3, .3, .3);
	  }

	  100% {
	    opacity: 0;
	  }
	}

	@keyframes zoomOut {
	  from {
	    opacity: 1;
	  }

	  50% {
	    opacity: 0;
	    -webkit-transform: scale3d(.3, .3, .3);
	    transform: scale3d(.3, .3, .3);
	  }

	  100% {
	    opacity: 0;
	  }
	}
</style>