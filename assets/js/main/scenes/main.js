import _ from 'underscore';
import {CANVAS, renderStage, stage, toRadians, meteorInterval, meteorIntervalAcceleration, playerSpeed, speedAcceleration} from 'main/utils';
import Planet from 'main/objects/planet';
import Player from 'main/objects/player';
import Meteor from 'main/objects/meteor';

class MainScene {
	scene = new PIXI.Container();

	constructor({gameOver=()=>{}}) {
		this.score = 0;
		this.gameOver = gameOver;
		this.setScene();
	}

	setScene() {
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
		this.playerSpeed = playerSpeed;

		//meteor
		this.meteors = [];
		this.meteorInterval = meteorInterval.slice();
		this.setNewMeteorInterval();

		this.objects = [this.planet, this.player];

		stage.addChildAt(this.scene, stage.children.length - 1);
	}

	handlePlayerPosition() {
		let posChange = null;

		if (this.player.left.isDown && !this.player.shielding) {
			this.player.moveLeft(this.playerSpeed);
			posChange = true;

		} else if (this.player.right.isDown && !this.player.shielding) {
			this.player.moveRight(this.playerSpeed);
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
		this.meteorInterval[0] = Math.ceil(this.meteorInterval[0] * meteorIntervalAcceleration);
		this.meteorInterval[1] = Math.ceil(this.meteorInterval[1] * meteorIntervalAcceleration);
		this.playerSpeed += speedAcceleration;
		console.log(this.meteorInterval);
		console.log(this.playerSpeed);
		this.currentMeteorInterval = _.random(this.meteorInterval[0], this.meteorInterval[1]);
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
				deleteMeteor: this.deleteMeteor.bind(this),
				gameOver: this.gameOver
			});

		}

		for (let meteor of deleteMeteors) {
			this.deleteMeteor(meteor);
		}

	}
	deleteMeteor(meteor) {
		this.meteors.splice(this.meteors.indexOf(meteor), 1);
		this.score += 1;
		this.scoreCard.text = `Score: ${this.score}`;
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

