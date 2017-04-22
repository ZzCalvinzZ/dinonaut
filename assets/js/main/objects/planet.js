import BaseObject from 'main/objects/base';
import {getTexture} from 'main/utils';

class Planet extends BaseObject {
	get texture() {
		return getTexture('planet');
	}

	constructor(options) {
		//position based on center of the planet instead of top left
		options.radius = options.radius || 100;
		options.x = options.x - options.radius;
		options.y = options.y - options.radius;

		super(options)

		this.radius = options.radius;

		this.sprite.hitArea = new PIXI.Circle(this.x, this.y, this.radius);

	}


}

module.exports = Planet;


