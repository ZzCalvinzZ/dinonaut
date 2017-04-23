import _ from 'underscore';
import {CANVAS, renderStage, stage, toRadians, meteorInterval, meteorIntervalAcceleration, playerSpeed} from 'main/utils';
import Planet from 'main/objects/planet';
import Player from 'main/objects/player';
import Meteor from 'main/objects/meteor';
import BackgroundScene from 'main/scenes/background';

class MainScene {
	scene = new PIXI.Container();

	constructor() {
		this.score = 0;
		this.setScene();
	}

	setScene() {
		this.background = new BackgroundScene();

		//score
		this.scoreCard = new PIXI.Text(
			'Score: 0',
			{
				fontFamily: 'Arial',
				fontSize: 24,
				fill: 0xFFFFFF,
				align: 'center',
			}
		);

		this.scoreCard.x = 20;
		this.scoreCard.y = 20;
		this.scene.addChild(this.scoreCard);

		//meteor
		this.meteors = [];
		this.setNewMeteorInterval();

		//planet
		this.planet = new Planet({
			scene: this.scene,
			x: CANVAS.x/2,
			y: CANVAS.y/2
		});

		//player
		this.player = new Player({
			scene: this.scene,
			x: this.planet.x,
			y: this.planet.y - this.planet.radius,
			angle: 270, // in degrees
		});

		this.objects = [this.background, this.planet, this.player];

		stage.addChild(this.scene);
	}

	handlePlayerPosition() {
		let posChange = null;

		if (this.player.left.isDown && !this.player.shielding) {
			this.player.moveLeft(playerSpeed);
			posChange = true;

		} else if (this.player.right.isDown && !this.player.shielding) {
			this.player.moveRight(playerSpeed);
			posChange = true;

		}

		if (posChange) {
			let x = this.planet.x + this.planet.radius * Math.cos(toRadians(this.player.angle));
			let y = this.planet.y + this.planet.radius * Math.sin(toRadians(this.player.angle));
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

			this.meteors.push(new Meteor({
				scene: this.scene,
				planet: this.planet,
			}));

			this.setNewMeteorInterval();
		} else {
			this.timeSinceLastMeteor++;
		}

		let deleteMeteors = [];

		for (let meteor of this.meteors) {
			let meteorStatus = meteor.gameLoop({
				planet: this.planet,
				player: this.player,
				meteors: this.meteors,
				deleteMeteors: deleteMeteors
			});

		}

		for (let meteor of deleteMeteors) {
			this.meteors.splice(this.meteors.indexOf(meteor), 1);
			this.score += 1;
			this.scoreCard.text = `Score: ${this.score}`;
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

