import {BaseObject} from 'main/objects/base';
import {getTexture} from 'main/utils';

class Background extends BaseObject {
	name = 'background';

	get texture() {
		return getTexture(this.name);
	}

	constructor({x=0, y=0, scene=null}) {
		super(scene);
		this.setPosition(x, y);

		this.createAnimatedSprite({
			numOfSheets: 63,
			speed: 0.3,
			name: this.name
		});
	}
}

module.exports = Background;
