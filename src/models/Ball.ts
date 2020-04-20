import * as THREE from 'three';
import Car from './Car';
import { Vector3 } from 'three';
import {
	BALL_RADIUS,
	BALL_DETAILS,
	CAR_DEPTH,
	STADIUM_WIDTH,
	STADIUM_DEPTH,
	GOAL_WIDTH,
	GOAL_HEIGHT
} from './constant';

export default class Ball {
	// Mesh
	public mesh!: THREE.Mesh;
	private geometry!: THREE.SphereGeometry;
	private material!: THREE.MeshNormalMaterial;
	// Physics
	private speed = new THREE.Vector3();

	constructor () {
		this.geometry = new THREE.SphereGeometry(BALL_RADIUS, BALL_DETAILS, BALL_DETAILS);
		this.material = new THREE.MeshNormalMaterial();
		this.mesh = new THREE.Mesh(this.geometry, this.material);

		// Default position
		this.mesh.position.y = BALL_RADIUS;
	}

	public calculate (cars: Car[]) {
		// Wall Collision
		// Detect Wall collision X
		if (
			this.mesh.position.x > (STADIUM_WIDTH / 2 - BALL_RADIUS) ||
			this.mesh.position.x < - (STADIUM_WIDTH / 2 - BALL_RADIUS)
		) {
			this.speed.x = -this.speed.x;
		}

		// Detect Wall collision Z
		if (
			this.mesh.position.z > (STADIUM_DEPTH / 2 - BALL_RADIUS) ||
			this.mesh.position.z < - (STADIUM_DEPTH / 2 - BALL_RADIUS)
		) {
			// Detect if it's goal collision
			if (
				this.mesh.position.x < (GOAL_WIDTH / 2 - BALL_RADIUS) &&
				this.mesh.position.x > - (GOAL_WIDTH / 2 - BALL_RADIUS) &&
				this.mesh.position.y < (GOAL_HEIGHT - BALL_RADIUS)
			) {
				if (
					this.mesh.position.z > (STADIUM_DEPTH / 2 + BALL_RADIUS) ||
					this.mesh.position.z < -(STADIUM_DEPTH / 2 + BALL_RADIUS)
				) {
					console.log('GOOOAAAAL');
				} else {
					// It's not completely in the goal !
				}
			} else {
				this.speed.z = -this.speed.z;
			}
		}

		// Car collision
		cars.forEach((car) => {
			// Detect if collision
			if (car.mesh.position.distanceTo(this.mesh.position) < BALL_RADIUS + CAR_DEPTH / 2) {
				this.speed = new Vector3();
				this.speed.x = (this.mesh.position.x - car.mesh.position.x) * car.speed * 2;
				this.speed.y = (this.mesh.position.y - car.mesh.position.y) * car.speed * 2;
				this.speed.z = (this.mesh.position.z - car.mesh.position.z) * car.speed * 2;
			}

			// Apply to speed of the ball
			if (this.speed.distanceTo(new Vector3()) > 0) {
				// Apply Gravity
				if (this.mesh.position.y > BALL_RADIUS) {
					this.speed.y -= 0.08;
				}

				if (Math.abs(this.speed.x) < 0.001 && Math.abs(this.speed.y) < 0.001 && Math.abs(this.speed.z) < 0.001) {
					this.speed = new Vector3();
				} else {
					// Apply friction
					this.speed.divideScalar(1.05);
				}
			}
		});

		// Apply to model
		this.mesh.position.x += this.speed.x;
		this.mesh.position.y += this.speed.y;
		this.mesh.position.z += this.speed.z;

		if (this.mesh.position.y < BALL_RADIUS) {
			this.mesh.position.y = BALL_RADIUS;
			if (Math.abs(this.speed.y) > 0.1) {
				this.speed.y = -this.speed.y / 2;
			}
		}
	}
}
