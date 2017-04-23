import BaseObject from 'main/objects/base';
import {getTexture, toRadians} from 'main/utils';

class Player extends BaseObject {
	name = 'dinonaut';

	setControls() {
		this.left = this.getInput({key:'left'});
		this.right = this.getInput({key:'right'});
		this.space = this.getInput({
			key: 'space',
			onPress: this.activateShield.bind(this),
			onRelease: this.deactivateShield.bind(this),
		});
	}

	constructor({x=0, y=0, scene=null, angle=null, rotation=0}) {
		super(scene);

		this.texture = getTexture(this.name);

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

	activateShield() {
		this.createAnimatedSprite({
			numOfSheets: 3,
			speed: 0.2,
			loop: false,
			name: 'dinonautshield'
		});
		this.setPosition(this.x, this.y);
		this.shielding = true;
	}

	deactivateShield() {
		this.texture = getTexture(this.name);
		this.createSprite();
		this.setPosition(this.x, this.y);
		this.shielding = false;
	}

}

module.exports = Player;


