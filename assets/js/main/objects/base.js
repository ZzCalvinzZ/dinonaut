class BaseObject {

	get texture() {
		throw 'unimplemented';
	}

	constructor({x=0, y=0}) {
		this.x = x;
		this.y = y;
		this.createSprite();
	}

	createSprite() {
		this.sprite = new PIXI.Sprite(this.texture);
		this.sprite.x = this.x;
		this.sprite.y = this.y;
	}
}

module.exports = BaseObject;
