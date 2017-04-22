import {CANVAS, renderStage, stage, toRadians} from 'main/utils';
import Planet from 'main/objects/planet';
import Player from 'main/objects/player';
import Meteor from 'main/objects/meteor';


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
			y: this.planet.y,
			angle: 270, // in degrees
		});

		//this.meteor = new Meteor({
			//scene: this.scene,
		//});

		this.objects = [this.planet, this.player];

		stage.addChild(this.scene);
	}

	handlePlayerPosition() {
		let posChange = null;

		if (this.player.left.isDown) {
			this.player.angle -= 1;
			this.player.rotation -= 1;
			posChange = true;

		} else if (this.player.right.isDown) {
			this.player.angle += 1;
			this.player.rotation += 1;
			posChange = true;

		}

		if (posChange) {
			let x = this.planet.center.x + this.planet.radius * Math.cos(toRadians(this.player.angle));
			let y = this.planet.center.y + this.planet.radius * Math.sin(toRadians(this.player.angle));
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

