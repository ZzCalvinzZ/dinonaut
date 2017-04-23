import _ from 'underscore';
import BaseObject from 'main/objects/base';
import {getTexture, CANVAS, getRandomPointOnPerimeter} from 'main/utils';

class Meteor extends BaseObject {
	get texture() {
		return getTexture('meteor');
	}

	constructor({x=0, y=0, scene=null, planet=null}) {
		super(scene);

		this.planet = planet;
		//pivot based on bottom middle of feet
		this.pivot = {
			x: parseInt(this.texture.width / 2),
			y: parseInt(this.texture.height / 2),
		};

		({x, y} = this.getStartPosition());

		this.createSprite();
		this.setPosition(x, y);

		this.trajectory = this.calculateTrajectory();
	}

	calculateTrajectory() {
		let speedFactor = Math.random() * (0.005 - 0.002) + 0.005;

		let x1 = this.x;
		let y1 = this.y;

		let x2 = this.planet.x;
		let y2 = this.planet.y;

		let xt = x2 - x1;
		let yt = y2 - y1;

		return {
			x: Math.ceil(speedFactor * xt),
			y: Math.ceil(speedFactor * yt),
		}
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

	gameLoop({planet=null, player=null}) {
		if (this.isOutOfBounds()) {
			this.removeSprite();
			return 'outofbounds';
		}

		if (!this.collision) {
			let newX = this.x + this.trajectory.x;
			let newY = this.y + this.trajectory.y;
			this.setPosition(newX, newY);
		}

	}
}

module.exports = Meteor;
