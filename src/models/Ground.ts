import * as THREE from 'three';

export class Ground {
	public mesh: THREE.Mesh;
	private geometry: THREE.PlaneGeometry;
	private material: THREE.MeshBasicMaterial;

	constructor () {
		this.geometry = new THREE.PlaneGeometry(50, 100, 50, 100);
		this.material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, wireframe: true });
		this.geometry.rotateX(Math.PI / 2);

		// Generate
		this.mesh = new THREE.Mesh(this.geometry, this.material);
	}
}

const ground = new Ground();
export default ground;
