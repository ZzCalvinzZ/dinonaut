import _ from 'underscore';
import {CircleBase} from 'main/objects/base';
import {getTexture, CANVAS, getRandomPointOnPerimeter, b, meteorSpeed, sounds, toRadians} from 'main/utils';

class Meteor extends CircleBase {
	get texture() {
		return getTexture('meteorImg');
	}

	constructor({x=0, y=0, scene=null, planet=null}) {
		super(scene);

		this.planet = planet;
		this.radius = this.texture.width / 2;
		this.rotation = _.random(0, 359);
		this.rotationSpeed = _.random(-5, 5);

		this.pivot = {
			x: this.radius,
			y: this.radius,
		};

		({x, y} = this.getStartPosition());

		this.createAnimatedSprite({
			numOfSheets: 3,
			speed: 0.2,
			name: 'meteor',
		});
		this.setPosition(x, y);

		[this.sprite.vx, this.sprite.vy] = this.calculateTrajectory();
	}

	calculateTrajectory() {
		let speedFactor = Math.random() * (meteorSpeed[0] - meteorSpeed[1]) + meteorSpeed[0];

		let x1 = this.x;
		let y1 = this.y;

		let x2 = this.planet.x;
		let y2 = this.planet.y;

		let xt = x2 - x1;
		let yt = y2 - y1;

		return [speedFactor * xt, speedFactor * yt];
	}

	getStartPosition() {
		return getRandomPointOnPerimeter();
	}

	setPosition(x, y) {
		this.sprite.rotation = toRadians(this.rotation);
		super.setPosition(x, y);
	}

	isOutOfBounds() {
		if (
			(this.x < -50) ||
			(this.x > (CANVAS.x + 50)) ||
			(this.y < -50) ||
			(this.y > (CANVAS.y + 50))
		) {
			return true;
		}
	}

	explode({deleteMeteors=null, soundExplosion=true, pointSound=true, gameOver=null}) {
		this.exploding = true;
		this.removeSprite();

		if (soundExplosion) {
			sounds.explosionsound.play();

			this.createAnimatedSprite({
				numOfSheets: 6,
				speed: 0.1,
				name: 'explosion1',
				loop: false
			});

			this.sprite.onComplete = () =>  {
				if (gameOver) {
					return gameOver();
				}

				this.removeSprite();
				if (!deleteMeteors.includes(this)) {
					deleteMeteors.push(this);
				}
			};

			this.setPosition(this.x, this.y);

		} else {
			if (!deleteMeteors.includes(this)) {
				deleteMeteors.push(this);
			}
		}

		if (pointSound) {
			sounds.point.play();
		}

	}

	gameLoop({planet=null, player=null, meteors=null, deleteMeteors=[], gameOver=null}) {
		if (this.isOutOfBounds() && !this.exploding) {
			this.explode({
				deleteMeteors: deleteMeteors,
				soundExplosion: false,
			});

			return;
		}

		//handle player
		if (player.shielding && !this.deflected && !this.exploding) {
			if (b.circleCollision(this.sprite, player.sprite, true)) {
				sounds.shield.play();
				this.deflected = true;
			}
		} 

		//handle planet
		if (!this.exploding) {
			if (b.circleCollision(this.sprite, planet.sprite)) {
				this.explode({
					deleteMeteors: deleteMeteors,
					soundExplosion: true,
					pointSound: false,
					gameOver: gameOver
				});
			}
		}

		//handle meteors
		for (let meteor of meteors) {
			if (meteor !== this && !meteor.exploding) {
				if (b.circleCollision(this.sprite, meteor.sprite)) {
					this.explode({deleteMeteors: deleteMeteors});

					meteor.explode({deleteMeteors: deleteMeteors});
				}

			}
		}

		if (!this.exploding) {
			let newX = this.x + this.sprite.vx;
			let newY = this.y + this.sprite.vy;
			this.rotation += this.rotationSpeed;
			this.setPosition(newX, newY);
		}

	}
}

module.exports = Meteor;
