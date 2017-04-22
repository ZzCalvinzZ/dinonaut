import BaseObject from 'main/objects/base';
import {getTexture} from 'main/utils';

class Planet extends BaseObject {
	get texture() {
		return getTexture('planet');
	}

	constructor({x=0, y=0, radius=100, scene=null}) {
		super(scene);
		//position based on center of the planet instead of top left
		this.setPosition(x - radius, y - radius);

		this.createSprite();
		this.sprite.hitArea = new PIXI.Circle(this.x, this.y, this.radius);
		this.addSprite();
	}


}

module.exports = Planet;


