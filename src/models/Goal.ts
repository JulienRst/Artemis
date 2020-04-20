import * as THREE from 'three';
import { GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH } from './constant';

export default class Wall {
	public mesh: THREE.Mesh;
	private geometry: THREE.PlaneGeometry;
	private material: THREE.MeshBasicMaterial;

	constructor () {
		this.geometry = new THREE.BoxGeometry(
			GOAL_WIDTH, GOAL_HEIGHT, GOAL_DEPTH,
			GOAL_WIDTH / 10, GOAL_HEIGHT / 10, GOAL_DEPTH / 10
		);
		this.material = new THREE.MeshBasicMaterial({ color: 0x0000FF, wireframe: true });
		this.mesh = new THREE.Mesh(this.geometry, this.material);
	}
}
