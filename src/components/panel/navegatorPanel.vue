<template>
  <nav :class=nav_class @mouseleave="leave">
		<a class="disc l1" @click="index">
			<div id="disc1" class="">发现音乐</div>
		</a>
		<a class="disc l2" @click="search">
			<div id="disc2" class="">搜索音乐</div>
		</a>
		<a  class="disc l3" @click="home">
			<div id="disc3" class="">个人主页</div>
		</a>
		<a class="disc l4" @click="exit">
			<div id="disc4" class="">{{me?'退出登录':'去登录'}}</div>
		</a>
		<a class="disc l5 toggle"  @mouseenter="handle">
			{{menu}}
		</a>
	</nav>
</template>

<script>
import '@/assets/bootstrap/js/bootstrap.min'
import '@/assets/bootstrap/css/bootstrap.min.css'
export default {
	name: 'navegatorPanel',
	data() {
		return {
			nav_class: 'top-right',
			menu: '菜单',
			me: sessionStorage.getItem('userid')
		}
	},
	methods: {
		index() {
			this.$router.push('/')
		},
		exit() {
			sessionStorage.setItem('path', this.$router.history.current.fullPath)
			this.$router.push('/login')
			sessionStorage.removeItem('userid')
		},
		search() {
			this.$router.push('/search')
		},
		home() {
			this.me = sessionStorage.getItem('userid')
			if(this.me == null) {
				this.$Message.error('您当前未登录')
				//保存当前路由，登陆后跳回
				let path = this.$router.history.current.fullPath
				sessionStorage.setItem('path', path)
				this.$router.push({path:'/login'})
			} else {
				this.$router.push({path:'/profile/' + this.me + '/mylike', key:this.me})
			}
		},
		handle() {
			this.nav_class = 'top-right open'
			this.menu = '关闭'
				// this.nav_class = 'top-right'
				// this.menu = '菜单'
		},
		leave() {
			this.nav_class = 'top-right'
			this.menu = '菜单'
		}
	}
}
</script>

<style scoped>
nav {
	z-index: 10;
	font-family: 'Youyuan', sans-serif;
	display: block;
	position: fixed;
	width: 500px;
	height: 500px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-webkit-transform: translate3d(25px, -25px, 0);
	transform: translate3d(25px, -25px, 0);
	-webkit-transition: -webkit-transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 0.9);
	transition: -webkit-transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 0.9);
	transition: transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 0.9);
	transition: transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 0.9), -webkit-transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 0.9);
}
nav a{
	text-decoration:none;
	color: #000000;
	font-family: 'Youyuan', sans-serif;
}
nav a:hover{
	text-decoration:none;
	font-family: 'Microsoft YaHei', sans-serif;
}
nav.open {
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
}
nav.top-right {
	top: -140px;
	right: -140px;
	z-index: 901;
}
.disc {
	position: absolute;
	display: inline-block;
	text-align: center;
	cursor: pointer;
	font: 25px Alegreya Sans, sans-serif;
	line-height: 40px;
	padding-top: 10px;
	border-radius: 250px;
	-webkit-transform: scale3d(0.5, 0.5, 0.5) rotate3d(0, 0, 1, 190deg);
	transform: scale3d(0.5, 0.5, 0.5) rotate3d(0, 0, 1, 190deg);
	pointer-events: none;
	opacity: 0;
	cursor: pointer;
	-webkit-transition: opacity 0.5s, -webkit-transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 0.9);
	transition: opacity 0.5s, -webkit-transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 0.9);
	transition: transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 0.9), opacity 0.5s;
	transition: transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 0.9), opacity 0.5s, -webkit-transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 0.9);
}
.disc div {
	-webkit-transform: rotate(180deg);
	transform: rotate(180deg);
}
.disc_current1{
	color:tomato;
}
.disc_current2{
	color:#ff7a39;
}
.disc_current3{
	color:#ff912b;
}
.disc_current4{
	color:#ffa91c;
}
.open .disc {
	pointer-events: auto;
	opacity: 1;
}

.l1 {
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	background: tomato;
	-webkit-transition-delay: 0s;
	transition-delay: 0s;
}
.open .l1 {
	-webkit-transition-delay: 0s;
	transition-delay: 0s;
	-webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 190deg);
	transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 190deg);
	opacity: 1;
}
.open .l1:hover {
	background: #1a0a07;
	color: tomato;
	-webkit-transition-delay: 0s;
	transition-delay: 0s;
}
.open .l1:active {
	background: #803224;
	color: tomato;
}
.open .l1.toggle {
	-webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, 10deg);
	transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, 10deg);
}

.l2 {
	top: 50px;
	left: 50px;
	right: 50px;
	bottom: 50px;
	background: #ff7a39;
	-webkit-transition-delay: 0.1s;
	transition-delay: 0.1s;
}
.open .l2 {
	-webkit-transition-delay: 0.1s;
	transition-delay: 0.1s;
	-webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 190deg);
	transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 190deg);
	opacity: 1;
}
.open .l2:hover {
	background: #1a0c06;
	color: #ff7a39;
	-webkit-transition-delay: 0s;
	transition-delay: 0s;
}
.open .l2:active {
	background: #803d1d;
	color: #ff7a39;
}
.open .l2.toggle {
	-webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, 10deg);
	transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, 10deg);
}

.l3 {
	top: 100px;
	left: 100px;
	right: 100px;
	bottom: 100px;
	background: #ff912b;
	-webkit-transition-delay: 0.2s;
	transition-delay: 0.2s;
}
.open .l3 {
	-webkit-transition-delay: 0.2s;
	transition-delay: 0.2s;
	-webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 190deg);
	transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 190deg);
	opacity: 1;
}
.open .l3:hover {
	background: #1a0f04;
	color: #ff912b;
	-webkit-transition-delay: 0s;
	transition-delay: 0s;
}
.open .l3:active {
	background: #804916;
	color: #ff912b;
}
.open .l3.toggle {
	-webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, 10deg);
	transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, 10deg);
}

.l4 {
	top: 150px;
	left: 150px;
	right: 150px;
	bottom: 150px;
	background: #ffa91c;
	-webkit-transition-delay: 0.3s;
	transition-delay: 0.3s;
}
.open .l4 {
	-webkit-transition-delay: 0.3s;
	transition-delay: 0.3s;
	-webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 190deg);
	transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 190deg);
	opacity: 1;
}
.open .l4:hover {
	background: #1a1103;
	color: #ffa91c;
	-webkit-transition-delay: 0s;
	transition-delay: 0s;
}
.open .l4:active {
	background: #80550e;
	color: #ffa91c;
}
.open .l4.toggle {
	-webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, 10deg);
	transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, 10deg);
}

.l5 {
	top: 200px;
	left: 200px;
	right: 200px;
	bottom: 200px;
	background: #ffc00e;
	-webkit-transition-delay: 0.4s;
	transition-delay: 0.4s;
}
.open .l5 {
	-webkit-transition-delay: 0.4s;
	transition-delay: 0.4s;
	-webkit-transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 190deg);
	transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 190deg);
	opacity: 1;
}
.open .l5:hover {
	background: #1a1301;
	color: #ffc00e;
	-webkit-transition-delay: 0s;
	transition-delay: 0s;
}
.open .l5:active {
	background: #806007;
	color: #ffc00e;
}
.open .l5.toggle {
	-webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, 10deg);
	transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, 10deg);
}

.toggle {
	line-height: 100px;
	padding: 0;
	width: 100px;
	background: gold;
	opacity: 1;
	-webkit-transform: none;
	transform: none;
	pointer-events: auto;
	-webkit-transition-delay: 0s;
	transition-delay: 0s;
}
.open .toggle {
	-webkit-transform: rotate3d(0, 0, 1, 0deg);
	transform: rotate3d(0, 0, 1, 0deg);
}
.toggle:hover {
	background: #1a1600;
	color: gold;
}
.toggle:active {
	background: #806c00;
	color: rgba(255, 215, 0, 0.5);
	-webkit-transform: scale(0.9);
	transform: scale(0.9);
	-webkit-transition-duration: 0s;
	transition-duration: 0s;
}
/*-- //footer --*/

</style>

