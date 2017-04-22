import {renderer} from 'main/utils';
import {CANVAS, renderStage, stage} from 'main/utils';
import Planet from 'main/objects/planet';


class MainScene {
	scene = new PIXI.Container();

	constructor() {
		this.setScene();
	}

	setScene() {
		this.planet = new Planet({
			x: CANVAS.x/2,
			y: CANVAS.y/2
		});

		this.scene.addChild(this.planet.sprite);
		stage.addChild(this.scene);
	}

}

module.exports = MainScene;

