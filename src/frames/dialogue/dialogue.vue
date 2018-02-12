<template>

	<section class="dialogue" key='dialogue'>
	
		<!-- 头部 -->
		<head-top logo-part="true" search-part="true" add="false" key='head-top' v-on:listenToHeadEvent='MsgFromHead'></head-top>
		
			<div class="dialogue_con"  key='dialogue_con' v-if='' id='dialogue_con'>
				<!-- 电脑登录 -->
				<section class="computer" v-if="computershow">
					<router-link to='/computer' class="computer_link">
						<section class="computer_icon">
							<svg>
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#computer"></use>
							</svg>
						</section>
						<section class="computer_text">Windows 网信已登录<span v-if="mute">， 手机通知已关闭</span></section>
					</router-link>
				</section>
				<!-- 对话列表 -->
				<section class="conversation">
					<ul>
						<router-link to="/singlechat" tag="li" v-for="item in dialogueList" @click.native="refreshInfor(userMap[item.wxid])">
							<div class="imgwipe">
								<div class="imgstyle">
									<img :src="item.headurl" alt="">
								</div>
							</div>
							<div class="infordetail" @click='isEnter'>
								<div class="infordetail_top clear">
									<span class="left ellipsis">{{userMap[item.wxid].petname}}</span>
									<span class="right">{{item.time}}</span>
								</div>
								<div class="infordetail_bot ellipsis">
									{{item.msg}}
								</div>
								<i class="redicon" v-if='item.showOrhide'></i>
							</div> 
						</router-link>
					</ul>
				</section>
				<!-- 群聊 -->
				<section class="conversation">
					<ul>
						<router-link to="/groupchat" tag="li">
							<div class="imgwipe">
								<i class="redicon_num" v-if="newinfor">1</i>
								<i class="redicon" v-if="newtext"></i>
								<div class="imgstyle imgstyletwo">
									<img :src="item.avatar" alt="" v-for="item in groupHead">
								</div>
							</div>
							<div class="infordetail">
								<div class="infordetail_top clear">
									<span class="left ellipsis">群聊</span>
									<span class="right">12:07</span>
								</div>
								<div class="infordetail_bot ellipsis">
									请同学们文明交流~~~
								</div>
							</div>
						</router-link>
					</ul>
				</section>
			</div>
			<!-- 输入用户名弹窗 -->

			<!-- 底部导航 -->
			<foot-guide key='foot-guide' v-if='' id='foot-guide'></foot-guide>
			
			<router-view></router-view>
		
		 
	</section>	

</template>

<script>
	import headTop from 'src/components/header/head'
	import footGuide from 'src/components/footer/foot'
	import {imgurl} from 'src/config/env';
	import {mapState,mapActions,mapMutations} from 'vuex'
	import {groupChat, userInfo, login, dialog} from 'src/service/getData'
	import { contacts, userMap } from 'src/service/data/contacts'
	import fetch from 'src/config/fetch'
	import {requireImgUrl} from 'src/utils/requireImgUrl'

	export default{
		data(){
			return{
				newinfor:false,		//未静音时新消息提醒
				newtext:false,		//静音时消息提醒
				dialogList:[],
				consumer:false,
				inputaccounts: "",		//帐号	
				inputcode: "",			//密码
				accounts: false,		//清除帐号
				code: false,			//清除密码
				borderColor:true,		//下边框颜色
				borderColortwo: false,
				timer:null,	
				groupHead:[],
				dialogueList: [],
				userMap:userMap,
				list: {},
				count: 0
			}
		},
		created(){
			this.initData()
			this.getDialogueData()
		},
		beforeDestroy(){
			
		},
		beforeMount(){
			
			// console.log('this.contactList', this.contactList)
		},
		mounted(){
				
			groupChat().then( (res) =>{
				this.groupHead=[...res.grouphead]
			});	
		},
		components:{
			headTop,
			footGuide
		},
		computed:{
			...mapState([
				// 'mute', 'computershow', 'infor' ,'contactList','consumerthing',
				'mute', 'computershow', 'infor' ,'contactList','showOrhide'
			]),
			
		},
		// watch:{
		// 	list: function(val, oval){
		// 		console.log(val, oval)
		// 	}
		// },
		methods:{
            ...mapMutations([
				"SAVE_MESSAGE","LOGIN_COVER" ,'GET_USERINFO','SHOWORHIDE'
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
			getDialogueData(){
				
				var that = this
				var ws = new WebSocket('ws://10.20.88.76:8204/multisub-split/' + localStorage.getItem('wxid'))
				ws.onmessage = env => {
					
					var format = decodeURIComponent(env.data).split('&')
					var msg = format[0].split('=')[1]
					var wxid = format[1].split('=')[1]
					var time = format[2].split('=')[1]
					this.list[wxid] = {
						wxid,
						msg ,
						headurl: requireImgUrl(wxid),
						time:new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '),
						showOrhide: 1 == 2 ? false : true
					}
					console.log(this.list)
					that.dialogueList = Object.values(this.list)
				}
			},
			async initData(){
				try{
					const user_id = localStorage.getItem('user_id')
					// const res = await userInfo(user_id)
					const res = {
						status: localStorage.getItem('status'),
						message: localStorage.getItem('message'),
						user_info: {
							avatar: localStorage.getItem('avatar'),
							name: localStorage.getItem('name'),
							id: localStorage.getItem('id')
						}
					}
				}catch(err){
					console.log('获取用户信息失败', err)
					this.LOGIN_COVER(true)
				}
			},
			isEnter(){
				// this.CHANGE_WARN(false)
				console.log(this.$store)
				// console.log(this.$route.path == '/dialogue')
				// if(this.$route.path == '/dialogue'){
					// this.CHANGE_WARN(false)
				// }
			},
            refreshInfor(item){
            	this.SAVE_MESSAGE(item)
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

	.zlp-enter-active, .zlp-leave-active{
		transition: all 2s;
	}
	.zlp-enter, .zlp-leave-active{
		position: absolute;
		bottom: -460px;
	}

	.dialogue{
		width:100%;
		background:#fff;
		.dialogue_con{
			padding-top:2.06933rem;
			-webkit-overflow-scrolling: touch; 
			.computer{
				@include widthHeight(100%, 1.9626666667rem);
				background:#f5f5f5;
				border-bottom:1px solid #e0e0e0;
				.computer_link{
					@include justify(flex-start);
					.computer_icon{
						@include widthHeight(1.2933333333rem, 1.9626666667rem);
						margin-left:1.0666666667rem;
						margin-right:0.96rem;
						@include align;
						svg{
							@include widthHeight(100%,1rem);
						}
					}
					.computer_text{
						line-height:1.9626666667rem;
						@include sizeColor(0.5546666667rem,#474747);
						span{
							display:inline-block;
							@include sizeColor(0.5546666667rem,#474747);
						}
					}
				}
			}
			.conversation{
				width:100%;
				ul{
					width:100%;
					li{
						position: relative;
						padding:0.3413333333rem 0.5973333333rem;
						box-sizing:border-box;
						border-bottom:1px solid #e0e0e0;
						@include justify(flex-start);
						.imgwipe{
							@include widthHeight(2.0906666667rem,2.0906666667rem);
							position: relative;
							margin-right:0.512rem;
							.redicon_num{
								position: absolute;
								right:-0.4rem;
								top:-0.3rem;
								@include widthHeight(0.8106666667rem,0.8106666667rem);
								@include sizeColor(0.512rem,#fff);
								line-height:0.8806666667rem;
								padding:0 4px;
								text-align:center;
								@include bg('../../images/warn.png');
							}

							.imgstyle{
								@include widthHeight(2.0906666667rem,100%);
								display: flex;
								justify-content: center;
								flex-flow:row wrap;
								align-items: flex-start;
								align-content: flex-start;
								overflow: hidden;
								background: #dddbdb;
								img{
									width: 10%;
									height: auto;
									border: 0;
									flex-grow:2;
								}
							}
							.imgstyletwo{
								img{
									width: 50%;
									height:50%;
									flex-grow:0;
								}
							}
						}
						.infordetail{
							width:11.5626666667rem;
							padding-top:0.2133333333rem;
							.infordetail_top{
								width:100%;
								padding-bottom:0.2133333333rem;
								span:nth-of-type(1){
									width:6.7466666667rem;
									@include sizeColor(0.5973333333rem,#38373c);
								}
								span:nth-of-type(2){
									@include sizeColor(0.4266666667rem,#b2b6b9);
								}
							}
							.infordetail_bot{
								width:9.5573333333rem;
								@include sizeColor(0.512rem,#9e9e9e);
							}
							.redicon{
								position: absolute;
								left:2.6rem;
								top:0.21rem;
								@include widthHeight(0.4266666667rem,0.4266666667rem);
								@include bg('../../images/warn.png');
								border-radius:50%;
							}

						}
						
					}
				}
			}
		}
		
	}
	
</style>