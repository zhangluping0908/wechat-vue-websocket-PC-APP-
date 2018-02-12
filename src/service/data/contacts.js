/*通讯录所以联系人
*	wxid:网信号
*	headurl:头像图片地址
*	petname:昵称
*	sex:性别(男0女1)
*	remarks:备注
* 	sdasd:个性签名
*	phone:电话号码
*	gallery:相册
*	district:地区
*	source:添加来源
*	Messageblob:对话内容,
*	newmeassage:对话最新一条消息
*	sendobject:发送信息的对象(1是别人0是自己)
*
*
*
*	imgurl:图片地址
*/	
import {imgurl} from 'src/config/env';

export const userMap = {
	chuqiao: {
		"wxid":"chuqiao",
		"headurl":require('../../images/avatar/chuqiao.jpg'),
		"petname":"楚乔",
		"sex":1,
		"remarks":"楚乔",
		"sdasd":"披荆斩棘",
		"phone":"13333333333",
		"sendobject":1,
		"gallery":[
			// imgurl+'yuwenyue.jpg',imgurl+'c.jpg',imgurl+'chenchangsheng.jpg'
		],
		"district":"奴籍少女",
		"source":"通过搜索手机号添加",
		"newmeassage":"从前有个剑客，他人很冷，心很冷，剑很冷，最后冷死了",
		"sendobject":1,
		"Messageblob":"",
		
	},
	yuwenyue: {//没有备注
		"wxid":"yuwenyue",
		"headurl":require('../../images/avatar/yuwenyue.jpg'),
		"petname":"宇文玥",
		"sex":0,
		"remarks":"",
		"sdasd":"涅槃而生",
		"phone":"13000000000",
		"gallery":[
			// imgurl+'wudaoya.jpg',imgurl+'h.jpg',imgurl+'hexiao.jpg'
		],
		"district":"宇文府",
		"source":"通过搜索网信号添加",
		"newmeassage":"你的肩膀，那么近却那么远，到最后想说的话都未曾讲。!",
		"sendobject":1,
		"Messageblob":""
	},
	zhangxinzhe: {
		"wxid":"zhangxinzhe",
		"headurl":require('../../images/avatar/zhangxinzhe.jpg'),
		"petname":"张信哲",
		"sex":1,
		"remarks":"张信哲",
		"sdasd":"情歌王子",
		"phone":"133333333",
		"sendobject":1,
		"gallery":[
			// imgurl+'zhangxinzhe.jpg',imgurl+'c.jpg',imgurl+'chenchangsheng.jpg'
		],
		"district":"情歌王子",
		"source":"通过搜索手机号添加",
		"newmeassage":"从开始到现在",
		"sendobject":1,
		"Messageblob":"",
		
	},
	caiwei: {
		"wxid":"caiwei",
		"headurl":require('../../images/avatar/caiwei.jpg'),
		"petname":"采薇",
		"sex":1,
		"remarks":"",
		"sdasd":"",
		"phone":"13000000000",
		"gallery":[
			// imgurl+'caiwei.jpg',imgurl+'lichun.jpg',
		],
		"district":"淳公主的侍女",
		"source":"通过群聊添加",
		"newmeassage":"一发型师在给一个女客人做头发的时候把她脸给烫伤了，后来经过协商。。。。他把她给娶了。。。",
		"sendobject":1,
		"Messageblob":"",
	},
	chenchangsheng: {
		"wxid":"chenchangsheng",
		"headurl":require('../../images/avatar/chenchangsheng.jpg'),
		"petname":"陈长生",
		"sex":0,
		"remarks":"",
		"sdasd":"逆天改命",
		"phone":"13002566500",
		"gallery":[
			// imgurl+'b1.jpg',imgurl+'chenchangsheng.jpg',imgurl+'xiaoyu.jpg'
		],
		"district":"河边",
		"source":"通过搜索网信号添加",
		"newmeassage":"你因为穷做过什么违心的事？——上班。",
		"sendobject":1,
		"Messageblob":"",
	},
	chenyuan: {
		"wxid":"chenyuan",
		"headurl":require('../../images/avatar/chenyuan.jpg'),
		"petname":"程鸢",
		"sex":0,
		"remarks":"",
		"sdasd":"",
		"phone":"13002566500",
		"gallery":[
			// imgurl+'b1.jpg',imgurl+'chenyuan.jpg',imgurl+'yexun.jpg'
		],
		"district":"燕洵手下将军",
		"source":"通过群聊添加",
		"newmeassage":"跟长辈聊天时，我们总是用尽方法想讨他们开心，而长辈三言两语就可以让我们烦心。",
		"sendobject":1,
		"Messageblob":"",
	}
}

//同学录数据
export const contacts = {
A:[
	userMap.chuqiao,
	userMap.yuwenyue
],
B:[
	userMap.zhangxinzhe,
],
C:[
	userMap.caiwei,
	userMap.chenchangsheng,
	userMap.chenyuan,
]
}