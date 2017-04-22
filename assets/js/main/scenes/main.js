import {CANVAS, renderStage, stage, toRadians} from 'main/utils';
import Planet from 'main/objects/planet';
import Player from 'main/objects/player';


class MainScene {
	scene = new PIXI.Container();

	constructor() {
		this.setScene();
	}

	setScene() {
		this.planet = new Planet({
			scene: this.scene,
			x: CANVAS.x/2,
			y: CANVAS.y/2
		});

		this.player = new Player({
			scene: this.scene,
			x: this.planet.center.x,
			y: this.planet.y
		});

		this.playerAngle = 90; // in degrees

		this.objects = [this.planet, this.player];

		stage.addChild(this.scene);
	}

	handlePlayerPosition() {
		let posChange = null;

		if (this.player.left.isDown) {
			this.playerAngle += 1;
			posChange = true;

		} else if (this.player.right.isDown) {
			this.playerAngle -= 1;
			posChange = true;

		}

		if (posChange) {
			let x = this.planet.center.x + this.planet.radius * Math.cos(toRadians(this.playerAngle));
			let y = this.planet.center.y + this.planet.radius * Math.sin(toRadians(this.playerAngle));
			this.player.setPosition(x, y);
		};

	}

	gameLoop() {
		for (let object of this.objects) {
			object.gameLoop();
		}

		this.handlePlayerPosition();

	}

}

module.exports = MainScene;

