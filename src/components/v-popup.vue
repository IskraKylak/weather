<template>
	<div class="popup_wrapper" ref="popup_wrapper" :class="(type ? 'popup_wrapper_'+type : '')">
		<div class="v-popup">
			<div class="popup_close" @click="closePopup"></div>
			<div class="popup_text">{{ popup.text }}</div>
			<div class="wrapBtn">
				<button class="btnYesNo" @click="clickBtn(!status)">Yes</button>
				<button class="btnYesNo" @click="clickBtn(status)">No</button>
			</div>
			
		</div>
	</div>
</template>

<script>
export default {
	name: "v-popup",
	data() {
		return {
			popup: {
				text: 'Do you want to delete the card?'
			},
			status: false
		}
	},
	computed: {
	},
	methods: {
		closePopup() {
			this.$emit('closePopup')
		},
		clickBtn(val) {
			this.$emit('removeCard', val)
		}
	},
}
</script>

<style lang="scss" scoped>
.popup_wrapper {
	display: flex;
	justify-content: center;
	position: fixed;
	align-items: center;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	background: rgba(73, 67, 67, 0.5);
	z-index: 98;
	padding: 0;
	overflow: auto;
}

.v-popup {
	border-top: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: desktop-vw(16);
	padding: desktop-vw(50);
	background: rgb(230, 230, 230);
	backdrop-filter: blur(12px);
	z-index: 10;
	max-width: desktop-vw(1114);
	height: max-content;
	position: relative;
	margin-top: desktop-vw(-40);
}

.wrapBtn {
	margin-top: desktop-vw(20);
	width: desktop-vw(150);
	display: flex;
	justify-content: space-between;
	margin: desktop-vw(20) auto 0 auto;
}

.btnYesNo {
	padding: desktop-vw(5);
	height: desktop-vw(40);
	width: desktop-vw(60);
	font-size: desktop-vw(16);
	cursor: pointer;
	border: 1px solid #000;
	border-radius: 5px;
}

.popup_text {
	font-size: desktop-vw(16);
}

.popup_close {
	position: absolute;
	width: desktop-vw(21);
	height: desktop-vw(21);
	top: desktop-vw(54);
	right: desktop-vw(62);
	cursor: pointer;
}


@media screen and (max-width: $mobile) {
	.popup_wrapper {
		padding: 0 mobile-vw(20);
	}

	.v-popup {
		border-radius: mobile-vw(16);
		padding: mobile-vw(50);
		background: rgb(230, 230, 230);
		max-width: mobile-vw(1114);
		margin-top: mobile-vw(-40);
	}

	.wrapBtn {
		margin-top: mobile-vw(20);
		width: mobile-vw(150);
		margin: mobile-vw(20) auto 0 auto;
	}

	.btnYesNo {
		padding: mobile-vw(5);
		height: mobile-vw(40);
		width: mobile-vw(60);
		font-size: mobile-vw(16);
	}

	.popup_text {
		font-size: mobile-vw(16);
	}

	.popup_close {
		width: mobile-vw(21);
		height: mobile-vw(21);
		top: mobile-vw(54);
		right: mobile-vw(62);
	}

}
</style>
