import * as THREE from 'three';

export default class Wall {
	public mesh: THREE.Mesh;
	private geometry: THREE.PlaneGeometry;
	private material: THREE.MeshBasicMaterial;

	constructor () {
		this.geometry = new THREE.PlaneGeometry(50, 50, 50, 50);
		this.material = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true });
		this.mesh = new THREE.Mesh(this.geometry, this.material);
	}
}
