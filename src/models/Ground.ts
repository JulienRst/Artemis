import * as THREE from 'three';
import { STADIUM_WIDTH, STADIUM_DEPTH } from './constant';

export class Ground {
	public mesh: THREE.Mesh;
	private geometry: THREE.PlaneGeometry;
	private material: THREE.MeshBasicMaterial;

	constructor () {
		this.geometry = new THREE.PlaneGeometry(STADIUM_WIDTH, STADIUM_DEPTH, STADIUM_WIDTH / 4, STADIUM_DEPTH / 4);
		this.material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, wireframe: true });
		this.geometry.rotateX(Math.PI / 2);

		// Generate
		this.mesh = new THREE.Mesh(this.geometry, this.material);
	}
}

const ground = new Ground();
export default ground;
