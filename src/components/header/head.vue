<template>
	<header>
		<section id='test' class="logoPart" v-if="logoPart" @click='showOrhide'>
			网信
		</section>
		<section class="logoPart" v-if="crossover">
			<section class="goback" @click="goBackThing">
				<svg fill="#fff"> 
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
				</svg>
			</section>
			<section class="wall">|</section>
			<slot name='searchpart'></slot>
			<!-- <slot name='clickrefresh' ></slot> -->
			<section class="covers_name" v-if="$route.path.indexOf('search') == -1" @click="refreshPage">
				<span class="ellipsis">
					{{crossover}}
				</span>
			</section>
		</section>						<!-- searchPart -->
		<section class="searchPart" v-if="isshow">
			<router-link to class="searchlink">
				<svg class="icon-search" fill="#fff">
				    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
				</svg>
			</router-link>
		</section>					<!-- add  -->
		<section class="addPart" v-if="isshow" @click='controlShow'>
			<svg class="icon-search">
			    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#add"></use>
			</svg>	
		</section>
			<!-- arrow -->
			<section class="arrowPart" v-if='arrowIsshow' v-on:click='spreadOrshrink' id='arrrow'>
				<svg class='icon-svgarrowsup' fill='#FFF'> 
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svgarrowsup"></use>
				</svg>
			</section>
		<!-- 下拉框 -->
		<section class="selectpart" v-show="addthing">
			<div class="cover" @click="controlhide"></div>
			<div class="selectlist">
				<ul>
					<router-link to='' tag="li" class="selectpart_li">
						<section class="selectsvg">
							<svg fill="#fff"> 
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#wxspeak"></use>
							</svg>
						</section>
						<section class="selectext">
							发起群聊
						</section>
					</router-link>
					<router-link to='' tag="li" class="selectpart_li">
						<section class="selectsvg">
							<svg fill="#fff"> 
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#addfriend"></use>
							</svg>
						</section>
						<section class="selectext">
							添加朋友
						</section>
					</router-link>
					<router-link to='' tag="li" class="selectpart_li">
						<section class="selectsvg">
							<svg fill="#fff"> 
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#onesweep"></use>
							</svg>
						</section>
						<section class="selectext">
							扫一扫
						</section>
					</router-link>
					<router-link to='' tag="li" class="selectpart_li">
						<section class="selectsvg">
							<svg fill="#fff"> 
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#receipt"></use>
							</svg>
						</section>
						<section class="selectext">
							收付款
						</section>
					</router-link>
					<router-link to='' tag="li" class="selectpart_li">
						<section class="selectsvg">
							<svg fill="#fff"> 
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#help"></use>
							</svg>
						</section>
						<section class="selectext">
							帮助与反馈
						</section>
					</router-link>
				</ul>
			</div>
		</section>
		<slot name='person'></slot>
	</header>	
</template>

<script>
	import {mapState, mapMutations} from 'vuex'

	var scan = null

	export default{
		data(){
			return{
				addthing:false,
				show: true,	
				isshow: true,
				arrowIsshow: true,
				count: 1
			}
		},
		props: ['logoPart', 'crossover', 'searchPart', 'add', 'person', "search", "clickrefresh"],
		created(){
			this.showOrhide()
		},
		mounted(){
		
		},
		components:{

		},
		computed:{
			// ...mapState([
			// 	'showOrhide'
			// ])
		},
		updated(){
			// this.spreadOrshrink()
		},
		methods:{

			// ...mapMutations([
			// 	'SHOWORHIDE'
			// ]),
			// change(){
			// 	// alert('sdf')
			// 	this.SHOWORHIDE(false)
			// },

			//子组件向父组件传值
			spreadOrshrink(){
				this.$nextTick(() => {
					this.$emit('listenToHeadEvent', this.count++)
				})
				
			},
			showOrhide(){
				if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && this.$route.path == '/singlechat' || '/groupchat'){
					this.isshow = false
				}
				if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && (this.$route.path !== '/dialogue' || '/addressbook' || '/find' || '/me')) {
					this.isshow = true
					this.arrowIsshow = false
				}
				else{
					this.isshow = false
					this.arrowIsshow = true
				}

			},
			controlShow(){
				this.addthing=!this.addthing;
			},
			controlhide(){
				this.addthing=false;
			},
			goBackThing(){
				this.$route.path == '/singlechat' ? this.$router.push('/dialogue') : window.history.go(-1);
			},
			refreshPage(){//点击头部刷新页面
				this.$emit('refreshPage');
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../style/public";
	header{
		@include widthHeight(100%,2.06933rem);
		background:$black;
		z-index:200;
		color:#fff;
		position: fixed;
		.logoPart{
			@include topcenter;
			@include sizeColor(0.704rem,#fff);
			left:0.5973333333rem;
			@include justify(flex-start);
			align-items:center;
			.goback{
				@include widthHeight(1rem,1rem);
				svg{
					@include widthHeight(100%,100%);
				}
			}
			.wall{
				margin:0 0.5333333333rem;
				@include sizeColor(1.0666666667rem,#2e3235);
			}
			
			.covers_name{
				span{
					@include sizeColor(0.704rem,#fff);
					display:block;
					width:9.5rem;
				}
			}
		}
		.searchPart{
			@include topcenter;
			right:3.52rem;
			@include widthHeight(0.8106666667rem,0.8106666667rem);
			.searchlink{
				dispaly:block;
				@include widthHeight(0.8106666667rem,0.8106666667rem);
				svg{
					@include widthHeight(100%,100%);
				}
			}
		}
		.addPart{
			@include topcenter;
			right:1.0453333333rem;
			@include widthHeight(0.8106666667rem,0.8106666667rem);
			svg{
				@include widthHeight(100%,100%);
			}
			
		}
		.arrowPart{
			@include topcenter;
			right:1.0453333333rem;
			@include widthHeight(0.8106666667rem,0.8106666667rem);
			svg{
				@include widthHeight(100%,100%);
			}
		}
		.selectpart{
			// position: fixed;
			// z-index:2;
			// width:100%;
			// height:100%;
			// top:0;
			// right:0;
			// .cover{
			// 	position: fixed;
			// 	width:100%;
			// 	height:100%;
			// 	background:#000;
			// 	opacity: 0;
			// }
			.selectlist{
				position: absolute;
				z-index:100;
				top:2.06933rem;
				right:0rem;
				width:8.5333333333rem;
				background:#373b3e;
				ul{
					width:8.5333333333rem;
					.selectpart_li{
						@include widthHeight(100%,1.9626666667rem);
						border-bottom:1px solid #2f3336;
						@include justify(flex-start);
						align-items:center;
						.selectsvg{
							@include widthHeight(0.96rem,0.9386666667rem);
							margin:0 0.7466666667rem;
							svg{
								@include widthHeight(100%,100%);
							}
						}
						.selectext{
							@include sizeColor(0.64rem,#fff);
						}
					}
				}
			}
			
		}
	}
</style>