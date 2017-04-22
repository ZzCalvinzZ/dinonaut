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

		this.setPivot(this.pivot, this.pivot);

		this.addSprite();
	}

	createAnimatedSprite({pivot=null, width=0, height=0, NumOfSheets=0}) {

		let textureArray = [];
		let count = 0

		for (let j = 0; j < this.texture.height; j+=height) {
			for (let i = 0; i < this.texture.width; i+=width) {
				let textureSection = new PIXI.Rectangle({x: i, y: j, width: width, height: height});

				textureArray.push(this.texture, textureSection);
				count += 1;
				if (count >= NumOfSheets) break;
			}
			if (count >= NumOfSheets) break;
		}

		this.width = textureArray[0].width;
		this.height = textureArray[0].height;

		this.sprite = new PIXI.extras.AnimatedSprite(textureArray);

		this.setPivot(this.pivot, this.pivot);
		this.addSprite();
	}

	setPivot(x, y) {
		if (this.pivot) {
			this.sprite.pivot.x = this.pivot.x;
			this.sprite.pivot.y = this.pivot.y;
		}
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
