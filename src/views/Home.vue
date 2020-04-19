<template>
	<div id="render-view" tabindex="0"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as THREE from 'three';
import WindowControl, { ScreenSize } from '@/utils/WindowControl';
import KeyboardControl from '@/utils/KeyboardControl';
import ground from '@/models/Ground';
import Car from '@/models/Car';

@Component({
	name: 'HomeView'
})
export default class HomeView extends Vue {
	// THREE
	private scene!: THREE.Scene;
	private camera!: THREE.PerspectiveCamera;
	private renderer!: THREE.WebGLRenderer;
	// UTILS
	private windowControl!: WindowControl;
	private screenSize!: ScreenSize;
	private keyboardControl!: KeyboardControl;
	private timeout!: number;
	private framerate = 1000 / 30;
	// MODELS
	private car!: Car;

	public mounted () {
		const target: HTMLElement|null = document.querySelector('#render-view');
		// Init Utils
		this.windowControl = new WindowControl(target);
		this.screenSize = this.windowControl.screenSize();
		// Init Three
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(60, this.screenSize.ratio, 0.1, 500);
		this.renderer = new THREE.WebGLRenderer();
		this.setSize();
		window.addEventListener('resize', this.setSize);

		if (target) {
			target.appendChild(this.renderer.domElement);
			this.keyboardControl = new KeyboardControl(target);
		}

		this.scene.add(ground.mesh); // Add Ground
		this.car = new Car(); // Create Car
		this.scene.add(this.car.mesh); // Add Car
		this.animate();
	}

	public beforeDestroy () {
		window.clearTimeout(this.timeout);
		this.keyboardControl.destroy();
	}

	private setSize () {
		this.screenSize = this.windowControl.screenSize();
		this.camera.aspect = this.screenSize.ratio;
		this.renderer.setSize(this.screenSize.width, this.screenSize.height);
	}

	private setCamera () {
		this.camera.position.x = this.car.mesh.position.x;
		this.camera.position.y = this.car.mesh.position.y + 3;
		this.camera.position.z = this.car.mesh.position.z + 5;
		this.camera.lookAt(this.car.mesh.position);
	}

	private calculate () {
		this.car.calculate(this.keyboardControl.active);
	}

	private animate () {
		this.calculate();
		this.setCamera();
		this.renderer.render(this.scene, this.camera); // Add View

		this.timeout = window.setTimeout(() => {
			this.animate();
		}, this.framerate);
	}
}
</script>

<style lang="scss" scoped>
#render-view {
	width: 100vw;
	height: 100vh;
}
</style>