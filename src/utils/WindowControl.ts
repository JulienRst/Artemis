import * as THREE from 'three';

export interface ScreenSize {
	width: number;
	height: number;
	ratio: number;
}

export default class WindowControl {
	private width: number = 0;
	private height: number = 0;
	private bindedResize: any;

	private domElement!: HTMLElement;

	public constructor (domElement: HTMLElement|null = null) {
		if (domElement) {
			this.domElement = domElement;
		}
		this.updateSize();
		this.bindedResize = this.updateSize.bind(this);

		((this.domElement) ? this.domElement : window).addEventListener('resize', this.bindedResize);
	}

	public onDestroy () {
		((this.domElement) ? this.domElement : window).removeEventListener('resize', this.bindedResize);
	}

	public screenSize (): ScreenSize {
		return {
			width: this.width,
			height: this.height,
			ratio: this.width / this.height
		};
	}

	public getVisibleHeight (camera: THREE.PerspectiveCamera) {
		let depth = 0;
		// compensate for cameras not positioned at z=0
		const cameraOffset = camera.position.z;
		if (depth < cameraOffset) {
			depth -= cameraOffset;
		} else {
			depth += cameraOffset;
		}
		// vertical fov in radians
		const vFOV = camera.fov * Math.PI / 180;

		// Math.abs to ensure the result is always positive
		return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
	}

	public getVisibleWidth (camera: THREE.PerspectiveCamera) {
		const height = this.getVisibleHeight(camera);
		return height * camera.aspect;
	}

	private updateSize () {
		this.width = (this.domElement) ? this.domElement.offsetWidth : window.innerWidth;
		this.height = (this.domElement) ? this.domElement.offsetHeight : window.innerHeight;
	}
}
