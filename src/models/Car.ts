import * as THREE from 'three';

export default class Car {
	public mesh: THREE.Mesh;
	private geometry: THREE.BoxGeometry;
	private material: THREE.MeshBasicMaterial;
	private defaultSpeed = 0.4;

	constructor () {
		this.geometry = new THREE.BoxGeometry(1, 1, 2);
		this.material = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
		// Generate
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.y = 0.5;
		this.mesh.position.z = 15;
	}

	public calculate (chars: string[]) {
		if (chars.indexOf('Z') !== -1) {
			this.mesh.position.z -= this.defaultSpeed;
		}

		if (chars.indexOf('S') !== -1) {
			this.mesh.position.z += this.defaultSpeed;
		}
	}
}
