import _ from 'underscore';
import {CircleBase} from 'main/objects/base';
import {getTexture, CANVAS, getRandomPointOnPerimeter, b, meteorSpeed, sounds} from 'main/utils';

class Meteor extends CircleBase {
	get texture() {
		return getTexture('meteor');
	}

	constructor({x=0, y=0, scene=null, planet=null}) {
		super(scene);

		this.planet = planet;
		this.radius = this.texture.width / 2;

		this.pivot = {
			x: this.radius,
			y: this.radius,
		};

		({x, y} = this.getStartPosition());

		this.createSprite();
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

	explode(deleteMeteors, playSound=true) {
		if (playSound) {
			sounds.explosion1.play();
		}

		this.exploding = true;
		this.removeSprite();

		if (!deleteMeteors.includes(this)) {
			deleteMeteors.push(this);
		}

	}

	gameLoop({planet=null, player=null, meteors=null, deleteMeteors=[]}) {
		if (this.isOutOfBounds()) {
			this.explode(deleteMeteors, false);
			return;
		}

		if (player.shielding && !this.deflected) {
			if (b.circleCollision(this.sprite, player.sprite, true)) {
				this.deflected = true;
			}
		} 

		if (b.circleCollision(this.sprite, planet.sprite)) {
			this.explode(deleteMeteors);
			return 'gameover';
		}

		for (let meteor of meteors) {
			if (meteor !== this) {
				if (b.circleCollision(this.sprite, meteor.sprite)) {
					this.explode(deleteMeteors);
					meteor.explode(deleteMeteors);
				}

			}
		}

		if (!this.exploding) {
			let newX = this.x + this.sprite.vx;
			let newY = this.y + this.sprite.vy;
			this.setPosition(newX, newY);
		}

	}
}

module.exports = Meteor;
