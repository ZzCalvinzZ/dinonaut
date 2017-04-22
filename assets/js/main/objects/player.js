import BaseObject from 'main/objects/base';
import {getTexture, toRadians} from 'main/utils';

class Player extends BaseObject {
	name = 'player';

	setControls() {
		this.left = this.getInput({key:'left'});
		this.right = this.getInput({key:'right'});
	}

	get texture() {
		return getTexture(this.name);
	}

	constructor({x=0, y=0, scene=null, angle=null, rotation=0}) {
		super(scene);

		//pivot based on bottom middle of feet
		this.pivot = {
			x: parseInt(this.texture.width / 2),
			y: this.texture.height,
		}

		this.angle = angle;
		this.rotation = rotation;
		this.setControls();

		this.createSprite();
		this.setPosition(x, y);
	}

	setPosition(x, y) {
		this.sprite.rotation = toRadians(this.rotation);

		super.setPosition(x, y);
	}

}

module.exports = Player;


