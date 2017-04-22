import BaseObject from 'main/objects/base';
import {getTexture} from 'main/utils';

class Meteor extends BaseObject {
	get texture() {
		return getTexture('meteor');
	}

	constructor({x=50, y=50, scene=null}) {
		super(scene);
		this.setPosition(x, y);

		this.createSprite();
	}
}

module.exports = Meteor;
