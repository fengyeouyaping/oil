<template>
	<div class="home_page">
		您暂时没有任何权限，请联系管理员
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	export default {
		data() {
			return {
				
			};
		},
		//计算属性
		computed: {
			...mapState({
			
			})
		},
		mounted() {

		},
		methods: {
			
		}
	};
</script>

<style lang="stylus" scoped>
.home_page
	font-size 24px
	font-weight bold
	margin 30% 0
	text-align center
</style>