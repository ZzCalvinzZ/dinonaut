import {renderStage, stage} from 'main/utils';
import KeyboardInput from 'main/controls';

class BaseObject {
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

			if (this.leftFacing) {
				this.sprite.scale.x = -1;
			} else {
				this.sprite.scale.x = 1;
			}

			this.xMin = this.setXMin();
			this.xMax = this.setXMax();
			this.yMin = this.setYMin();
			this.yMax = this.setYMax();
		}

	}

	createSprite() {
		if (this.sprite) {
			this.scene.removeChild(this.sprite);
		}

		this.width = this.texture.width;
		this.height = this.texture.height;

		this.sprite = new PIXI.Sprite(this.texture);
		if (this.circular) this.sprite.circular = true;

		this.setPivot(this.pivot, this.pivot);

		this.addSprite();
	}

	createAnimatedSprite({numOfSheets=0, speed=1, loop=true, name=null}) {
		if (this.sprite) {
			this.scene.removeChild(this.sprite);
		}

		let frames = [];

		for (let i = 0; i < numOfSheets; i++) {
			frames.push(PIXI.Texture.fromFrame(`${name}${i}.png`));
		}


		this.width = frames[0].width;
		this.height = frames[0].height;

		this.sprite = new PIXI.extras.AnimatedSprite(frames);
		if (this.circular) this.sprite.circular = true;

		this.sprite.animationSpeed = speed;
		this.sprite.loop = loop;
		this.sprite.play();

		this.setPivot(this.pivot, this.pivot);
		this.addSprite();
	}

	setPivot(x, y) {
		if (this.pivot) {
			this.sprite.pivot.x = this.pivot.x;
			this.sprite.pivot.y = this.pivot.y;
		}
	}

	setXMin() {
		return this.x;
	}

	setXMax() {
		return this.x + this.width;
	}

	setYMin() {
		return this.y;
	}

	setYMax() {
		return this.y + this.height;
	}

	gameLoop() {
		return;
	}

	addSprite() {
		this.scene.addChild(this.sprite);
	}

	removeSprite() {
		this.scene.removeChild(this.sprite);
	}

	getInput(control) {
		return new KeyboardInput(control);
	}
}

class CircleBase extends BaseObject {
	circular = true;
}

module.exports = {
	BaseObject: BaseObject,
	CircleBase: CircleBase
};
