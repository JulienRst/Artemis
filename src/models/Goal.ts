import * as THREE from 'three';

export default class Wall {
	public mesh: THREE.Mesh;
	private geometry: THREE.PlaneGeometry;
	private material: THREE.MeshBasicMaterial;

	constructor () {
		this.geometry = new THREE.BoxGeometry(30, 20, 20, 30, 20, 20);
		this.material = new THREE.MeshBasicMaterial({ color: 0x0000FF, wireframe: true });
		this.mesh = new THREE.Mesh(this.geometry, this.material);
	}
}
