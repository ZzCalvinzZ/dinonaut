import BaseObject from 'main/objects/base';
import {getTexture, CANVAS, getRandomPointOnPerimeter} from 'main/utils';

class Meteor extends BaseObject {
	get texture() {
		return getTexture('meteor');
	}

	constructor({x=50, y=50, scene=null}) {
		super(scene);

		//pivot based on bottom middle of feet
		this.pivot = {
			x: parseInt(this.texture.width / 2),
			y: parseInt(this.texture.height / 2),
		};

		({x, y} = this.getStartPosition());

		this.createSprite();
		this.setPosition(x, y);
	}
	getStartPosition() {
		return getRandomPointOnPerimeter();
	}
}

module.exports = Meteor;
