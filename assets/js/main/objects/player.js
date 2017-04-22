import BaseObject from 'main/objects/base';
import {getTexture} from 'main/utils';

class Player extends BaseObject {
	setControls() {
		this.left = this.getInput({
			key: 'left',
			onPress: this.moveLeft,
		});

		this.right = this.getInput({
			key: 'right',
			onPress: this.moveRight,
		});
	}

	get texture() {
		return getTexture('player');
	}

	constructor({x=0, y=0, scene=null}) {
		super(scene);

		this.setControls();

		this.setPosition(x, y);

		this.createSprite();
	}

	//position based on bottom middle of feet
	setPosition(x, y) {
		super.setPosition(x - this.texture.width / 2, y - this.texture.height);
	}

	moveLeft() {
		console.log('left');
	}

	moveRight() {
		console.log('right');
	}

}

module.exports = Player;


