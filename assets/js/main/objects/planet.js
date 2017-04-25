import {CircleBase} from 'main/objects/base';
import {getTexture} from 'main/utils';

class Planet extends CircleBase {
	name = 'planet';

	get texture() {
		return getTexture(this.name);
	}

	constructor({x=0, y=0, radius=100, scene=null}) {
		super(scene);
		this.radius = radius;

		this.pivot = {
			x: this.radius,
			y: this.radius,
		};

		this.createSprite();
		this.sprite.radius = this.radius - 10
		this.setPosition(x, y);
	}
}

module.exports = Planet;


