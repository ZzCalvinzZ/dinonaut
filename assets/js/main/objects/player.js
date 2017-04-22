import BaseObject from 'main/objects/base';
import {getTexture} from 'main/utils';

class Player extends BaseObject {
	get texture() {
		return getTexture('player');
	}

	constructor({x=0, y=0, scene=null}) {
		super(scene);
		//position based on bottom middle of feet
		this.setPosition(x - this.texture.width / 2, y - this.texture.height);

		this.createSprite();
		this.addSprite();
	}

}

module.exports = Player;


