import BaseObject from 'main/objects/base';
import {getTexture} from 'main/utils';

class Background extends BaseObject {
	get texture() {
		return getTexture('background');
	}

	constructor({x=0, y=0, scene=null}) {
		super(scene);
		this.setPosition(x, y);

		this.createAnimatedSprite({
			NumOfSheets: 63,
			width: 800,
			height: 800,
		});
	}
}

module.exports = Background;
