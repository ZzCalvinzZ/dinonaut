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

			this.center = {
				x: x + this.width / 2,
				y: y + this.height / 2,
			}
		}
	}

	createSprite(pivot) {
		this.width = this.texture.width;
		this.height = this.texture.height;

		this.sprite = new PIXI.Sprite(this.texture);

		if (this.pivot) {
			this.sprite.pivot.x = this.pivot.x;
			this.sprite.pivot.y = this.pivot.y;
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
