import {renderStage, stage} from 'main/utils';
import KeyboardInput from 'main/controls';

class BaseObject {
	get texture() {
		throw 'unimplemented';
	}

	constructor(scene) {
		this.scene = scene;
	}

	setPosition(x, y) {
		this.x = x;
		this.y = y;

		if (this.sprite) {
			this.sprite.x = x;
			this.sprite.y = y;
		}
	}

	createSprite() {
		this.sprite = new PIXI.Sprite(this.texture);
		this.sprite.x = this.x;
		this.sprite.y = this.y;

		this.width = this.sprite.width;
		this.height = this.sprite.height;

		this.center = {
			x: this.x + this.width / 2,
			y: this.y + this.height / 2,
		}

		this.addSprite();
	}

	gameLoop() {
		return;
	}

	addSprite() {
		this.scene.addChild(this.sprite);
	}

	getInput(control) {
		return new KeyboardInput(control);
	}
}

module.exports = BaseObject;
