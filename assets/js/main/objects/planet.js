import BaseObject from 'main/objects/base';
import {getTexture} from 'main/utils';

class Planet extends BaseObject {
	get texture() {
		return getTexture('planet');
	}

	constructor({x=0, y=0, radius=100, scene=null}) {
		super(scene);
		//position based on center of the planet instead of top left
		this.radius = radius;
		this.setPosition(x, y);

		this.createSprite();
		this.sprite.hitArea = new PIXI.Circle(this.x, this.y, this.radius);
	}

	//position based on bottom middle of feet
	setPosition(x, y) {
		super.setPosition(x - this.radius, y - this.radius);
	}
}

module.exports = Planet;


