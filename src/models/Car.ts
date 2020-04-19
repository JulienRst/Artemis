import * as THREE from 'three';

export default class Car {
	public mesh: THREE.Mesh;
	private geometry: THREE.BoxGeometry;
	private material: THREE.MeshBasicMaterial;
	private defaultSpeed = 0.4;
	private brakeCoefficient = 0;
	private maxBrakeCoefficient = 65 * Math.PI / 180;
	private brakeCap = 0.05;

	constructor () {
		this.geometry = new THREE.BoxGeometry(1, 1, 2);
		this.material = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
		// Generate
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.y = 0.5;
		this.mesh.position.z = 15;
	}

	public calculate (chars: string[]) {
		// Check Brake Coefficient
		if (chars.indexOf('Q') !== -1) {
			this.brakeCoefficient -= this.brakeCap;
			if (this.brakeCoefficient < - this.maxBrakeCoefficient) { this.brakeCoefficient = - this.maxBrakeCoefficient; }
		}

		if (chars.indexOf('D') !== -1) {
			this.brakeCoefficient += this.brakeCap;
			if (this.brakeCoefficient > this.maxBrakeCoefficient) { this.brakeCoefficient = this.maxBrakeCoefficient; }
		}

		if (chars.indexOf('Q') === -1 && chars.indexOf('D') === -1) {
			this.brakeCoefficient = 0;
		}

		if (chars.indexOf('Z') !== -1) {
			this.mesh.rotation.y -= this.brakeCoefficient / 25;
			this.mesh.position.z -= Math.cos(this.mesh.rotation.y) * this.defaultSpeed;
			this.mesh.position.x -= Math.sin(this.mesh.rotation.y) * this.defaultSpeed;
		}

		if (chars.indexOf('S') !== -1) {
			this.mesh.rotation.y -= this.brakeCoefficient / 25;
			this.mesh.position.z += Math.cos(this.mesh.rotation.y) * this.defaultSpeed;
			this.mesh.position.x += Math.sin(this.mesh.rotation.y) * this.defaultSpeed;
		}
	}
}
