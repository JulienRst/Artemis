<template>
	<router-view />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
	name: 'App'
})
export default class App extends Vue {
	public mounted () {
		console.log('App has been properly mounted');
	}
}
</script>

<style lang="scss">
html, body {
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
}
</style>