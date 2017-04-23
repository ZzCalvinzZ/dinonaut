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
		this.sprite.hitArea = new PIXI.Circle(this.x, this.y, this.radius);
		this.setPosition(x, y);
		console.log(this.sprite.x, this.sprite.y);
	}
}

module.exports = Planet;


