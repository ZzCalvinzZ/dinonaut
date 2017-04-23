import _ from 'underscore';
import {CANVAS, renderStage, stage, toRadians, meteorInterval, meteorIntervalAcceleration} from 'main/utils';
import Planet from 'main/objects/planet';
import Player from 'main/objects/player';
import Meteor from 'main/objects/meteor';
import BackgroundScene from 'main/scenes/background';

class MainScene {
	scene = new PIXI.Container();

	constructor() {
		this.setScene();
	}

	setScene() {
		this.background = new BackgroundScene();

		//meteor stuff
		this.meteors = [];
		this.setNewMeteorInterval();

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

		this.objects = [this.background, this.planet, this.player];

		stage.addChild(this.scene);
	}

	handlePlayerPosition() {
		let posChange = null;
		let i = 2

		if (this.player.left.isDown && !this.player.shielding) {
			this.player.moveLeft(i);
			posChange = true;

		} else if (this.player.right.isDown && !this.player.shielding) {
			this.player.moveRight(i);
			posChange = true;

		}

		if (posChange) {
			let x = this.planet.center.x + this.planet.radius * Math.cos(toRadians(this.player.angle));
			let y = this.planet.center.y + this.planet.radius * Math.sin(toRadians(this.player.angle));
			this.player.setPosition(x, y);
		};

	}

	shouldFireMeteor() {
		if (this.timeSinceLastMeteor === this.currentMeteorInterval) {
			return true;
		}
	}

	setNewMeteorInterval() {
		this.currentMeteorInterval = _.random(meteorInterval[0], meteorInterval[1]);
		this.timeSinceLastMeteor = 0;
	}

	handleMeteors() {

		if (this.shouldFireMeteor()) {
			console.log('fire');
			this.setNewMeteorInterval();
		} else {
			this.timeSinceLastMeteor++;
			console.log(this.timeSinceLastMeteor);
		}

	}

	gameLoop() {
		for (let object of this.objects) {
			object.gameLoop();
		}

		this.handlePlayerPosition();
		this.handleMeteors();

	}

}

module.exports = MainScene;

