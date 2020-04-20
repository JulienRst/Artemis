import * as THREE from 'three';
import Car from './Car';
import { Vector3 } from 'three';

export default class Ball {
	// Mesh
	public mesh!: THREE.Mesh;
	private geometry!: THREE.SphereGeometry;
	private material!: THREE.MeshNormalMaterial;
	// Physics
	private speed = new THREE.Vector3();

	constructor () {
		this.geometry = new THREE.SphereGeometry(2, 16, 16);
		this.material = new THREE.MeshNormalMaterial();
		this.mesh = new THREE.Mesh(this.geometry, this.material);

		// Default position
		this.mesh.position.y = 2;
	}

	public calculate (cars: Car[]) {
		cars.forEach((car) => {
			// Detect if collision
			if (car.mesh.position.distanceTo(this.mesh.position) < 2 + 1) {
				this.speed = new Vector3();
				this.speed.x = (this.mesh.position.x - car.mesh.position.x) * car.speed * 2;
				this.speed.y = (this.mesh.position.y - car.mesh.position.y) * car.speed * 2;
				this.speed.z = (this.mesh.position.z - car.mesh.position.z) * car.speed * 2;
			}

			// Detect Wall collision X
			if (this.mesh.position.x > 23 || this.mesh.position.x < -23) {
				this.speed.x = -this.speed.x;
			}

			if (this.mesh.position.z > 48 || this.mesh.position.z < -48) {
				this.speed.z = -this.speed.z;
			}

			// Apply to speed of the ball
			if (this.speed.distanceTo(new Vector3()) > 0) {
				// Apply Gravity
				if (this.mesh.position.y > 2) {
					this.speed.y -= 0.08;
				}

				if (Math.abs(this.speed.x) < 0.001 && Math.abs(this.speed.y) < 0.001 && Math.abs(this.speed.z) < 0.001) {
					this.speed = new Vector3();
				} else {
					// Apply frottement
					this.speed.divideScalar(1.05);
				}

				// Apply to model
				this.mesh.position.x += this.speed.x;
				this.mesh.position.y += this.speed.y;
				this.mesh.position.z += this.speed.z;

				if (this.mesh.position.y < 2) {
					this.mesh.position.y = 2;
					if (Math.abs(this.speed.y) > 0.1) {
						this.speed.y = -this.speed.y / 2;
					}
				}
			}
		});
	}
}
