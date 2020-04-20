import ground, { Ground } from './Ground';
import Wall from './Wall';
import Goal from './Goal';

export class Stadium {
	public ground: Ground;
	public walls: Wall[] = [];
	public goals: Goal[] = [];

	constructor () {
		this.ground = ground;
		this.initWalls();
		this.initGoal();
	}

	private initWalls () {
		// Left Wall
		const leftWall = new Wall(50, 100);
		leftWall.mesh.rotateY(Math.PI / 2);
		leftWall.mesh.rotateZ(Math.PI / 2);
		leftWall.mesh.position.x = -25;
		leftWall.mesh.position.y = 25;
		this.walls.push(leftWall);
		// Right Wall
		const rightWall = new Wall(50, 100);
		rightWall.mesh.rotateY(Math.PI / 2);
		rightWall.mesh.rotateZ(Math.PI / 2);
		rightWall.mesh.position.x = 25;
		rightWall.mesh.position.y = 25;
		this.walls.push(rightWall);
		// Front Wall
		const frontWall = new Wall(50, 50);
		frontWall.mesh.position.z = -50;
		frontWall.mesh.position.y = 25;
		this.walls.push(frontWall);
		// BackWall Wall
		const backWall = new Wall(50, 50);
		backWall.mesh.position.z = 50;
		backWall.mesh.position.y = 25;
		this.walls.push(backWall);
	}

	private initGoal () {
		// Front Goal
		const frontGoal = new Goal();
		frontGoal.mesh.position.z = -60;
		frontGoal.mesh.position.y = 10;
		this.goals.push(frontGoal);
		// Back Goal
		const backGoal = new Goal();
		backGoal.mesh.position.z = 60;
		backGoal.mesh.position.y = 10;
		this.goals.push(backGoal);
	}
}

const stadium = new Stadium();

export default stadium;
