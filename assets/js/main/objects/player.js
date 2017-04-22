import BaseObject from 'main/objects/base';
import {getTexture, toRadians} from 'main/utils';

class Player extends BaseObject {
	setControls() {
		this.left = this.getInput({key:'left'});
		this.right = this.getInput({key:'right'});
	}

	get texture() {
		return getTexture('player');
	}

	constructor({x=0, y=0, scene=null, angle=null, rotation=0}) {
		super(scene);

		this.angle = angle;
		this.rotation = rotation;
		this.setControls();

		this.createSprite();
		this.setPosition(x, y);
	}

	//position based on bottom middle of feet
	setPosition(x, y) {
		let x2 = parseInt(this.texture.width / 2);
		let y2 = this.texture.height;

		this.sprite.rotation = toRadians(this.rotation);

		this.sprite.pivot.x = x2;
		this.sprite.pivot.y = y2;

		super.setPosition(x, y);
	}

}

module.exports = Player;


