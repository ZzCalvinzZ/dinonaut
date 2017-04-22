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

	createAnimatedSprite({pivot=null, numOfSheets=0, speed=1}) {

		let frames = [];

		for (let i = 0; i < numOfSheets; i++) {
			frames.push(PIXI.Texture.fromFrame(`${this.name}${i}.png`));
		}


		this.width = frames[0].width;
		this.height = frames[0].height;

		this.sprite = new PIXI.extras.AnimatedSprite(frames);
		this.sprite.animationSpeed = speed;
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
