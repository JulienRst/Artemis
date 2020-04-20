import ground, { Ground } from './Ground';
import Wall from './Wall';
import Goal from './Goal';
import { STADIUM_WIDTH, STADIUM_DEPTH, STADIUM_HEIGHT, GOAL_DEPTH, GOAL_HEIGHT } from './constant';

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
		const leftWall = new Wall(STADIUM_DEPTH, STADIUM_HEIGHT);
		leftWall.mesh.rotateY(Math.PI / 2);
		leftWall.mesh.position.x = -STADIUM_WIDTH / 2;
		leftWall.mesh.position.y = STADIUM_HEIGHT / 2;
		this.walls.push(leftWall);
		// Right Wall
		const rightWall = new Wall(STADIUM_DEPTH, STADIUM_HEIGHT);
		rightWall.mesh.rotateY(Math.PI / 2);
		rightWall.mesh.position.x = STADIUM_WIDTH / 2;
		rightWall.mesh.position.y = STADIUM_HEIGHT / 2;
		this.walls.push(rightWall);
		// Front Wall
		const frontWall = new Wall(STADIUM_WIDTH, STADIUM_HEIGHT);
		frontWall.mesh.position.z = -STADIUM_DEPTH / 2;
		frontWall.mesh.position.y = STADIUM_HEIGHT / 2;
		this.walls.push(frontWall);
		// BackWall Wall
		const backWall = new Wall(STADIUM_WIDTH, STADIUM_HEIGHT);
		backWall.mesh.position.z = STADIUM_DEPTH / 2;
		backWall.mesh.position.y = STADIUM_HEIGHT / 2;
		this.walls.push(backWall);
	}

	private initGoal () {
		// Front Goal
		const frontGoal = new Goal();
		frontGoal.mesh.position.z = - (STADIUM_DEPTH / 2 + GOAL_DEPTH / 2);
		frontGoal.mesh.position.y = GOAL_HEIGHT / 2;
		this.goals.push(frontGoal);
		// Back Goal
		const backGoal = new Goal();
		backGoal.mesh.position.z = STADIUM_DEPTH / 2 + GOAL_DEPTH / 2;
		backGoal.mesh.position.y = GOAL_HEIGHT / 2;
		this.goals.push(backGoal);
	}
}

const stadium = new Stadium();

export default stadium;
