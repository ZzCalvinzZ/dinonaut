import {BaseObject} from 'main/objects/base';
import {getTexture, CANVAS, sounds} from 'main/utils';

class Speaker extends BaseObject {
	constructor({x=0, y=0, scene=null}) {
		super(scene);
		this.name = 'speaker';
		this.makeSprite();

	}

	makeSprite() {
		this.texture = getTexture(this.name)
		this.createSprite();
		this.sprite.interactive = true;
		this.setPosition(CANVAS.x - 40, 20);

		this.sprite.on('click', () => {
			if (this.name === 'speaker') {
				this.name = 'speaker_off';
				sounds.dinonauttheme.pause();
			} else {
				this.name = 'speaker';
				sounds.dinonauttheme.play();
			}
			this.makeSprite();

		});

		this.sprite.on('mouseover', () => {
			document.body.style.cursor = 'pointer';
		});

		this.sprite.on('mouseout', () => {
			document.body.style.cursor = 'initial';
		});

	}
}

module.exports = Speaker;
